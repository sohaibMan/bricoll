import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import useScript from "./useScript";
import customTheme from "../utils/theme";
import Sidebar from "../components/Dashboard/Sidebar";
import Header from "../components/Dashboard/Header";
import MyProfile from "../components/Dashboard/MyProfile";
import { gql, useQuery } from "@apollo/client";
import { User } from "../types/resolvers";
import DashBoardProjects from "../components/Dashboard/DashBoardProjects";
import { useSession } from "next-auth/react";
import { DashBoardProposals } from "../components/Dashboard/DashBoardProposals";
import moment from "moment";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import IconButton from "@mui/joy/IconButton";
import CircularProgress from "@mui/joy/CircularProgress";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
// import { Skeleton } from "@material-ui/core";

const useEnhancedEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

// list of all menus in the dashboard_tmp
export enum DashboardItems {
  MyProfile = "MyProfile",
  Projects = "Projects",
  Home = "Home",
  CreateProject = "CreateProject",
  Proposals = "Proposals",
}

const USER_PROFILE = gql`
  query Profile {
    Profile {
      _id
      name
      email
      # role
      image
      projects {
        client_id
        _id
        title
        description
        price
        skills
        created_at
        projectScope {
          estimated_duration_in_days
          level_of_expertise
          size_of_project
        }
        attachments {
          url
          type
        }
        category
        stats {
          declined_count
          completed_count
          approved_count
          in_progress_count
        }
      }
      proposals {
        _id
        project_id
        freelancer_id
        client_id
        price
        duration
        description
        cover_letter
        created_at
        updated_at
        status
        attachments {
          url
          type
          name
        }
      }
    }
  }
`;

export default function Index() {
  const session = useSession();
  const status = useScript(`https://unpkg.com/feather-icons`);
  const { loading, error, data } = useQuery<{ Profile: User }>(USER_PROFILE);
  const [currentComponent, setCurrentComponent] = React.useState(
    DashboardItems.Home
  );

  // const defaultComponents= searchParams.get('search') as DashboardItems ||  DashboardItems.Home ;// defaultComponents from the url
  // const [currentComponent, setCurrentComponent] = React.useState(defaultComponents);

  //  const searchParams = useSearchParams();
  //  const router=useRouter()
  // const pathname=usePathname()
  // //  // searchParams with a provided key/value pair
  //  const createQueryString = useCallback(
  //      (name: string, value: string) => {
  //          const params = new URLSearchParams(searchParams);
  //          params.set(name, value);
  //
  //          return params.toString();
  //      },
  //      [searchParams],
  //  );
  //
  //  // todo fix this
  //  useEffect( ()=>{
  // //update the pathname on currentComponent change
  //      router.push(pathname + '?' + createQueryString('search',currentComponent));
  //  },[currentComponent])

  useEnhancedEffect(() => {
    // Feather icon setup: https://github.com/feathericons/feather#4-replace
    // @ts-ignore
    if (typeof feather !== "undefined") {
      // @ts-ignore
      feather.replace();
    }
  }, [status]);

  if (loading)
    return (
      <Box
        sx={{
          justifyContent: "center",
          display: "flex",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
          marginTop: "350px",
        }}
      >
        {/* <Button startDecorator={<CircularProgress variant="solid" thickness={2} />}>
            Loading…
          </Button>
          <IconButton>
            <CircularProgress thickness={2} />
          </IconButton> */}
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link
          component="button"
          variant="outlined"
          startDecorator={
            <CircularProgress
              variant="plain"
              thickness={2}
              sx={{ "--CircularProgress-size": "16px" }}
            />
          }
          sx={{ p: 1 }}
        >
          Loading...
        </Link>
      </Box>
    );

  if (!session.data?.user?.userRole) return <h1>not auth</h1>; // todo add a middlware instead/add userRole to the user data
  const userRole = session.data?.user.userRole;

  if (error || !data || !data.Profile.projects || !data.Profile.proposals)
    return (
      <h1>
        `Error! {error !== undefined ? error?.message : "An Error has occurred"}
      </h1>
    );

  return (
    <CssVarsProvider disableTransitionOnChange theme={customTheme}>
      <GlobalStyles
        styles={{
          "[data-feather], .feather": {
            color: "var(--Icon-color)",
            margin: "var(--Icon-margin)",
            fontSize: "var(--Icon-fontSize, 20px)",
            width: "1em",
            height: "1em",
          },
        }}
      />
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Header />
        <Sidebar
          userRole={userRole}
          currentComponent={currentComponent}
          user={data.Profile}
          setCurrentComponent={setCurrentComponent}
        />

        {/* <Stack spacing={1}>
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={210}
            height={60}
          />
        </Stack> */}
        <Box
          component="main"
          className="MainContent"
          sx={(theme) => ({
            "--main-paddingTop": {
              xs: `calc(${theme.spacing(2)} + var(--Header-height, 0px))`,
              md: "32px",
            },
            px: {
              xs: 2,
              md: 3,
            },
            pt: "var(--main-paddingTop)",
            pb: {
              xs: 2,
              sm: 2,
              md: 3,
            },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            height: "100dvh",
            gap: 1,
            overflow: "auto",
          })}
        >
          {currentComponent === DashboardItems.Home ? (
            <p>welcome to home (to be done)</p>
          ) : null}
          {currentComponent === DashboardItems.MyProfile ? (
            <MyProfile user={data.Profile} />
          ) : null}
          {data.Profile.projects && (
            <DashBoardProjects
              currentComponent={currentComponent}
              projectsArr={data.Profile.projects
                .slice()
                .sort((a, b) =>
                  moment(b.created_at).isAfter(a.created_at) ? 1 : -1
                )}
            />
          )}
          {data.Profile.proposals && (
            <DashBoardProposals
              userRole={userRole}
              currentComponent={currentComponent}
              proposalArr={data.Profile.proposals
                .slice()
                .sort((a, b) =>
                  moment(b.created_at).isAfter(a.created_at) ? 1 : -1
                )}
            />
          )}
        </Box>
      </Box>
    </CssVarsProvider>
  );
}

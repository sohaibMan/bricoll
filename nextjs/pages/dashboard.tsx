import * as React from "react";
import {CssVarsProvider} from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import customTheme from "../utils/theme";
import Sidebar from "../components/Dashboard/Sidebar";
import Header from "../components/Dashboard/Header";
import {gql, useQuery} from "@apollo/client";
import {User} from "../types/resolvers";
import {useSession} from "next-auth/react";
import Link from "@mui/joy/Link";
import CircularProgress from "@mui/joy/CircularProgress";
import {DashBoardWrapper} from "../components/Dashboard/MenuItems/DashBoardWrapper";


// list of all menus in the dashboard_tmp
export enum DashboardItems {
    MyProfile = "MyProfile",
    Projects = "Projects",
    Home = "Home",
    CreateProject = "CreateProject",
    Proposals = "Proposals",
    Contracts = "Contracts",
    CreateContract = "CreateContract",
}

const USER_PROFILE = gql`
    query Profile {
        Profile {
            _id
            name
            email
            # role
            image
            payments {
                currency
                amount
                contract_id
                description
            }
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
                    name
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
                    name
                    type
                }
                user {
                    _id
                    name
                    image
                }
            }
            contracts {
                _id
                freelancer_id
                client_id
                project_id
                proposal_id
                price
                duration
                status
                created_at
                updated_at
                terms
                #                submission_reviews {
                #                    _id
                #                    attachments {
                #                        url
                #                        type
                #                        name
                #                    }
                #                    title
                #                    description
                #                    created_at
                #                    updated_at
                #                    accepted_at
                #                    status
                #                }
                fees
            }

        }
    }
`;

export default function Index() {
    const session = useSession();
    const {loading, error, data} = useQuery<{ Profile: User }>(USER_PROFILE);
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

    // useEnhancedEffect(() => {
    //     // Feather icon setup: https://github.com/feathericons/feather#4-replace
    //     // @ts-ignore
    //     if (typeof feather !== "undefined") {
    //         // @ts-ignore
    //         feather.replace();
    //     }
    // }, [status]);

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
                {/* <PayButton startDecorator={<CircularProgress variant="solid" thickness={2} />}>
            Loading…
          </PayButton>
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
                            sx={{"--CircularProgress-size": "16px"}}
                        />
                    }
                    sx={{p: 1}}
                >
                    Loading...
                </Link>
            </Box>
        );

    if (!session.data?.user?.userRole) return <h1>not auth</h1>; // todo add a middlware instead/add userRole to the user data
    const userRole = session.data?.user.userRole;
    // todo :fix this crap
    if (error || !data || !data.Profile || !data.Profile.projects || !data.Profile.proposals || !data.Profile.contracts)
        return (
            <h1>
                `Error! {error !== undefined ? error?.message : "An Error has occurred"}
            </h1>
        );

    return (
        <CssVarsProvider disableTransitionOnChange theme={customTheme}>
            <CssBaseline/>
            <Box sx={{display: "flex", minHeight: "100dvh"}}>
                <Header/>
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

                    <DashBoardWrapper currentComponent={currentComponent} userRole={userRole} profile={data.Profile}/>

                </Box>
            </Box>
        </CssVarsProvider>
    );
}

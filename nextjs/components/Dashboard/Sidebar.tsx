/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import {ChangeEvent} from "react";
import {styled} from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import ColorSchemeToggle from "./ColorSchemeToggle";
import {closeSidebar} from "../../pages/utils";
import {DashboardItems} from "../../pages/dashboard";
import {User, UserRole} from "../../types/resolvers";
import {useRouter} from "next/router";

const Dropdown = styled("i")(({ theme }) => ({
  color: theme.vars.palette.text.tertiary,
}));

export default function Sidebar(props: {
  setCurrentComponent: React.Dispatch<React.SetStateAction<DashboardItems>>;
  currentComponent: DashboardItems;
  user: User;
  userRole:UserRole // to custom the links per userRole
}) {
  const [query, setQuery] = React.useState("");
  const router = useRouter();

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const performSearch = () => {
    console.log("Searching for:", query);
  };

  function handleLogout(e: ChangeEvent<HTMLButtonElement>) {
    e.preventDefault();
  }

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: {
          xs: "fixed",
          md: "sticky",
        },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 10000,
        height: "100dvh",
        width: "var(--Sidebar-width)",
        top: 0,
        p: 1.5,
        py: 3,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "224px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "256px",
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          bgcolor: "background.body",
          opacity: "calc(var(--SideNavigation-slideIn, 0) - 0.2)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        {/* <MuiLogo /> */}
        <Typography fontWeight="xl">Bricoll</Typography>
        <ColorSchemeToggle sx={{ ml: "auto" }} />
      </Box>
      {/* <Input
                startDecorator={<i data-feather="search"/>}
                placeholder="Search"
            /> */}
      <Input
        startDecorator={<i data-feather="search" />}
        placeholder="Search"
        value={query}
        onChange={handleSearch}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            performSearch();
          }
        }}
      />
      {/*<button onClick={performSearch}>Search</button>*/}
      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/*<ListItem>*/}
        {/*    <ListItemButton>*/}
        {/*        <ListItemDecorator>*/}
        {/*            <i data-feather="bar-chart-2"/>*/}
        {/*        </ListItemDecorator>*/}
        {/*        <ListItemContent>Dashboard</ListItemContent>*/}
        {/*        <Dropdown data-feather="chevron-down"/>*/}
        {/*    </ListItemButton>*/}
        {/*</ListItem>*/}

                    {/*<ListItem>*/}
          <List
              sx={{
                  flexGrow: 0,
                  "--ListItem-radius": "8px",
                  "--List-gap": "8px",
              }}
          >
                    <ListItem>
                        <ListItemButton selected={props.currentComponent === DashboardItems.Home}
                                        variant={props.currentComponent === DashboardItems.Home ? "soft" : "plain"}>
                            <ListItemDecorator>
                                <i data-feather="home"/>
                            </ListItemDecorator>
                            <ListItemContent
                                onClick={() => props.setCurrentComponent(DashboardItems.Home)}>Home</ListItemContent>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton selected={props.currentComponent === DashboardItems.MyProfile}
                                        variant={props.currentComponent === DashboardItems.MyProfile ? "soft" : "plain"}>
                            <ListItemDecorator>
                                <i data-feather="chevron-up" />
                            </ListItemDecorator>
                            <ListItemContent
                                onClick={() => props.setCurrentComponent(DashboardItems.MyProfile)}>My Profile</ListItemContent>
                        </ListItemButton>
                    </ListItem>
              {/*only clients*/}
              {props.userRole===UserRole.Client && <ListItem nested>
                  <ListItemButton selected={props.currentComponent === DashboardItems.Projects}
                                  variant={props.currentComponent === DashboardItems.Projects ? "soft" : "plain"}>
                      <ListItemDecorator>
                          <i data-feather="layers"/>
                      </ListItemDecorator>
                      <ListItemContent
                          onClick={() => props.setCurrentComponent(DashboardItems.Projects)}>Projects</ListItemContent>
                  </ListItemButton>
                  <ListItemButton selected={props.currentComponent === DashboardItems.CreateProject}
                                  variant={props.currentComponent === DashboardItems.CreateProject ? "soft" : "plain"}>
                      <ListItemDecorator>
                          <i data-feather="layers"/>
                      </ListItemDecorator>
                      <ListItemContent
                          onClick={() => props.setCurrentComponent(DashboardItems.CreateProject)}>Create
                          Project</ListItemContent>
                  </ListItemButton>
              </ListItem>}


              {/*only freelancer*/}
              {props.userRole === UserRole.Freelancer && <ListItem nested>
                  <ListItemButton selected={props.currentComponent === DashboardItems.Proposals}
                                  variant={props.currentComponent === DashboardItems.Proposals ? "soft" : "plain"}>
                      <ListItemDecorator>
                          <i data-feather="layers"/>
                      </ListItemDecorator>
                      <ListItemContent
                          onClick={() => props.setCurrentComponent(DashboardItems.Proposals)}>Proposals</ListItemContent>
                  </ListItemButton>
                  {/*<ListItemButton selected={props.currentComponent === DashboardItems.CreateProject}*/}
                  {/*                variant={props.currentComponent === DashboardItems.CreateProject ? "soft" : "plain"}>*/}
                  {/*    <ListItemDecorator>*/}
                  {/*        <i data-feather="layers"/>*/}
                  {/*    </ListItemDecorator>*/}
                  {/*    <ListItemContent*/}
                  {/*        onClick={() => props.setCurrentComponent(DashboardItems.CreateProject)}>Create*/}
                  {/*        Project</ListItemContent>*/}
                  {/*</ListItemButton>*/}
              </ListItem>}

          </List>
                    {/*<ListItemButton>New user</ListItemButton>*/}
                    {/*</ListItem>*/}
                    {/*<ListItem>*/}
                    {/*<ListItemButton>Role & Permission</ListItemButton>*/}
                    {/*</ListItem>*/}
                    {/*</List>*/}
                    {/*</ListItem>*/}
                {/*</List>*/}
                {/*</ListItem>*/}
                <List
                    sx={{
                        mt: "auto",
                        flexGrow: 0,
                        "--ListItem-radius": "8px",
                        "--List-gap": "8px",
                    }}
                >
                    <ListItem>
                        <ListItemButton>
                            <ListItemDecorator>
                                <i data-feather="life-buoy"/>
                            </ListItemDecorator>
                            <ListItemContent>Supports</ListItemContent>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemDecorator>
                                <i data-feather="settings"/>
                            </ListItemDecorator>
                            <ListItemContent>Settings</ListItemContent>
                        </ListItemButton>
                    </ListItem>
                </List>

        {/*<Card*/}
        {/*    variant="soft"*/}
        {/*    color="primary"*/}
        {/*    invertedColors*/}
        {/*    sx={{boxShadow: "none"}}*/}
        {/*>*/}
        {/*    <Typography fontSize="sm" fontWeight="lg" mb={0.5}>*/}
        {/*        Used space*/}
        {/*    </Typography>*/}
        {/*    <Typography level="body3">*/}
        {/*        Your team has used 80% of your available space. Need more?*/}
        {/*    </Typography>*/}
        {/*    <LinearProgress value={80} determinate sx={{my: 1.5}}/>*/}
        {/*    <Box sx={{display: "flex", gap: 2}}>*/}
        {/*        <Link fontSize="sm" component="button" fontWeight="lg">*/}
        {/*            Upgrade plan*/}
        {/*        </Link>*/}
        {/*        <Link fontSize="sm" component="button">*/}
        {/*            Dismiss*/}
        {/*        </Link>*/}
        {/*    </Box>*/}
        {/*</Card>*/}
      </Box>
      <Divider />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        { props.user.image && 
        <Avatar variant="outlined" src={props.user.image} />
}
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography fontSize="sm" fontWeight="lg">
            {props.user.name}
          </Typography>
          <Typography level="body3"> {props.user.email}</Typography>
        </Box>
        <IconButton variant="plain" color="neutral">
          <i
            onClick={(e: any) => {
              e.preventDefault();
              router.push("/api/auth/signout");
              // signOut();
            }}
            data-feather="log-out"
          />
        </IconButton>
      </Box>
    </Sheet>
  );
}

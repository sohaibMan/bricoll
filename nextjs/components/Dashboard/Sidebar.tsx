import {useContext, useState} from "react";
import {signOut} from "next-auth/react"
import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import ColorSchemeToggleButton from "../Buttons/ColorSchemeToggleButton";
import {closeSidebar} from "../../utils/utils";
import {DashboardItems} from "../../pages/dashboard";
import {User, UserRole} from "../../types/resolvers";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SplitscreenOutlinedIcon from "@mui/icons-material/SplitscreenOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import GavelIcon from '@mui/icons-material/Gavel';
import LogoutIcon from '@mui/icons-material/Logout';
import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link"
import Badge from '@mui/joy/Badge';
import {currentComponentContext} from "./DashBoardWrapper";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function Sidebar(props: {
    user: User;
    userRole: UserRole // to custom the links per userRole
    projectsCount: number
    proposalsCount: number
    contractsCount: number
}) {

    const [projectsTab, setProjectsTabsOpen] = useState(false);
    const [contractsTab, setContractsTabOpen] = useState(false);
    const {currentComponent, setCurrentComponent} = useContext(currentComponentContext)


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
                zIndex: 1000,
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
            <Box sx={{display: "flex", gap: 1, alignItems: "center"}}>

                {/*<Avatar src={logo} sx={{width: 40, height: 40}}/>*/}
                <Link href="/">
                    {/*<Typography sx={{ fontWeight: 'medium' }}>Bricoll</Typography>*/}
                    <Image alt={"logo"} src={logo} width={"24"} height={"24"}/>
                </Link>
                <ColorSchemeToggleButton sx={{ml: "auto"}}/>
            </Box>
            {/*<Input*/}
            {/*    startDecorator={<SearchIcon/>}*/}
            {/*    placeholder="Search"*/}
            {/*    value={query}*/}
            {/*    onChange={handleSearch}*/}
            {/*    onKeyPress={(event) => {*/}
            {/*        if (event.key === "Enter") {*/}
            {/*            // performSearch();*/}
            {/*        }*/}
            {/*    }}*/}
            {/*/>*/}
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
                        <ListItemButton
                            onClick={() => setCurrentComponent(DashboardItems.Home)}
                            selected={currentComponent === DashboardItems.Home}
                            variant={
                                currentComponent === DashboardItems.Home
                                    ? "soft"
                                    : "plain"
                            }
                        >
                            <ListItemDecorator>


                                <OtherHousesOutlinedIcon/>

                            </ListItemDecorator>
                            <ListItemContent

                            >
                                Home
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton
                            selected={currentComponent === DashboardItems.MyProfile}
                            variant={
                                currentComponent === DashboardItems.MyProfile
                                    ? "soft"
                                    : "plain"
                            }
                            onClick={() =>
                                setCurrentComponent(DashboardItems.MyProfile)
                            }
                        >
                            <ListItemDecorator>
                                {/* <i data-feather="chevron-up" /> */}
                                <AccountCircleOutlinedIcon/>
                            </ListItemDecorator>
                            <ListItemContent

                            >
                                My Profile
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>
                    {/*only clients*/}
                    {props.userRole === UserRole.Client && (
                        <ListItem nested>
                            <ListItemButton
                                onClick={() => {
                                    setProjectsTabsOpen(!projectsTab)
                                    setCurrentComponent(DashboardItems.Projects)
                                }}
                                selected={currentComponent === DashboardItems.Projects}
                                variant={
                                    currentComponent === DashboardItems.Projects
                                        ? "soft"
                                        : "plain"
                                }
                            >
                                <ListItemDecorator>
                                    {/* <i data-feather="layers" /> */}
                                    <Badge size="sm" badgeContent={props.projectsCount}>
                                        <ListAltOutlinedIcon/>
                                    </Badge>
                                </ListItemDecorator>
                                <ListItemContent

                                >

                                    Projects

                                </ListItemContent>
                                {projectsTab ? (

                                    <ExpandLessOutlinedIcon/>

                                ) : (
                                    <KeyboardArrowDownOutlinedIcon/>
                                )}
                            </ListItemButton>
                            {projectsTab && (
                                <ListItem nested>
                                    <ListItemButton

                                        onClick={() =>
                                            setCurrentComponent(DashboardItems.CreateProject)
                                        }
                                        selected={
                                            currentComponent === DashboardItems.CreateProject
                                        }
                                        variant={
                                            currentComponent === DashboardItems.CreateProject
                                                ? "soft"
                                                : "plain"
                                        }
                                    >
                                        <ListItemDecorator>
                                            {/* <i data-feather="layers" /> */}
                                            <AddBoxOutlinedIcon/>
                                        </ListItemDecorator>
                                        <ListItemContent
                                        >
                                            Create Project
                                        </ListItemContent>
                                    </ListItemButton>
                                </ListItem>
                            )}
                        </ListItem>
                    )}


                    {/*only freelancer*/}
                    {/*{props.userRole === UserRole.Freelancer && */}
                    <ListItem nested>
                        <ListItemButton
                            selected={currentComponent === DashboardItems.Proposals}
                            variant={
                                currentComponent === DashboardItems.Proposals
                                    ? "soft"
                                    : "plain"
                            }
                            onClick={() =>
                                setCurrentComponent(DashboardItems.Proposals)
                            }
                        >
                            <ListItemDecorator>
                                {/* <i data-feather="layers" /> */}
                                <Badge size="sm" badgeContent={props.proposalsCount}>
                                    <SplitscreenOutlinedIcon/>
                                </Badge>
                            </ListItemDecorator>
                            <ListItemContent

                            >
                                Proposals
                            </ListItemContent>
                        </ListItemButton>
                        {/*<ListItemButton selected={currentComponent === DashboardItems.CreateProject}*/}
                        {/*                variant={currentComponent === DashboardItems.CreateProject ? "soft" : "plain"}>*/}
                        {/*    <ListItemDecorator>*/}
                        {/*        <i data-feather="layers"/>*/}
                        {/*    </ListItemDecorator>*/}
                        {/*    <ListItemContent*/}
                        {/*        onClick={() => setCurrentComponent(DashboardItems.CreateProject)}>Create*/}
                        {/*        Project</ListItemContent>*/}
                        {/*</ListItemButton>*/}
                    </ListItem>

                    {/*contracts*/}

                    <ListItem>
                    {/*<ListItem nested>*/}
                        <ListItemButton
                            onClick={() => {
                                setContractsTabOpen(!contractsTab)
                                setCurrentComponent(DashboardItems.Contracts)
                            }}
                            selected={currentComponent === DashboardItems.Contracts}
                            variant={
                                currentComponent === DashboardItems.Contracts
                                    ? "soft"
                                    : "plain"
                            }
                        >
                            <ListItemDecorator>
                                <Badge size="sm" badgeContent={props.contractsCount}>
                                    <GavelIcon/>
                                </Badge>
                            </ListItemDecorator>
                            <ListItemContent>
                                Contracts
                            </ListItemContent>
                            {contractsTab ? (
                                <KeyboardArrowDownOutlinedIcon/>
                            ) : (
                                <ExpandLessOutlinedIcon/>
                            )}
                        </ListItemButton>
                    </ListItem>

                    {/*{contractsTab && props.userRole === UserRole.Freelancer &&*/}
                    {/*    <ListItem nested>*/}
                    {/*        <ListItemButton*/}
                    {/*            onClick={() =>*/}
                    {/*                setCurrentComponent(DashboardItems.SubmitReview)*/}
                    {/*            }*/}
                    {/*            selected={*/}
                    {/*                currentComponent === DashboardItems.SubmitReview*/}
                    {/*            }*/}
                    {/*            variant={*/}
                    {/*                currentComponent === DashboardItems.SubmitReview*/}
                    {/*                    ? "soft"*/}
                    {/*                    : "plain"*/}
                    {/*            }*/}
                    {/*        >*/}
                    {/*            <ListItemDecorator>*/}
                    {/*                /!* <i data-feather="layers" /> *!/*/}
                    {/*                <AddBoxOutlinedIcon/>*/}
                    {/*            </ListItemDecorator>*/}
                    {/*            <ListItemContent*/}

                    {/*            >Submit a Project*/}
                    {/*            </ListItemContent>*/}
                    {/*        </ListItemButton>*/}
                    {/*    </ListItem>*/}
                    {/*}*/}
                    {/*{contractsTab && (*/}
                    {/*    <ListItem nested>*/}
                    {/*        <ListItemButton*/}
                    {/*            onClick={() =>*/}
                    {/*                setCurrentComponent(DashboardItems.SubmissionReviews)*/}
                    {/*            }*/}
                    {/*            selected={*/}
                    {/*                currentComponent === DashboardItems.SubmissionReviews*/}
                    {/*            }*/}
                    {/*            variant={*/}
                    {/*                currentComponent === DashboardItems.SubmissionReviews*/}
                    {/*                    ? "soft"*/}
                    {/*                    : "plain"*/}
                    {/*            }*/}
                    {/*        >*/}
                    {/*            <ListItemDecorator>*/}
                    {/*                <AddShoppingCartIcon/>*/}
                    {/*            </ListItemDecorator>*/}
                    {/*            <ListItemContent*/}

                    {/*            >Submissions*/}
                    {/*            </ListItemContent>*/}
                    {/*        </ListItemButton>*/}
                    {/*    </ListItem>*/}
                    {/*)}*/}

                </List>

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
                                <HelpOutlineOutlinedIcon/>
                            </ListItemDecorator>
                            <ListItemContent>Supports</ListItemContent>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemDecorator>
                                <SettingsOutlinedIcon/>
                            </ListItemDecorator>
                            <ListItemContent>Settings</ListItemContent>
                        </ListItemButton>
                    </ListItem>
                </List>


            </Box>
            <Divider/>

            <Stack direction={"row"} spacing={"1"}>
                {props.user.image && (
                    <Avatar variant="outlined" alt={props.user.username} src={props.user.image}/>
                )}
                <Box sx={{minWidth: 0, flex: 1}}>
                    <Stack direction="row" alignItems="center">
                        <Typography fontSize="sm" fontWeight="lg">
                            {props.user.username}
                        </Typography>
                        <IconButton variant="plain" color="neutral">
                            <LogoutIcon onClick={async () => {
                                await signOut();
                            }}/>
                        </IconButton>
                    </Stack>
                    <Typography level="body3"> {props.user.email}</Typography>
                </Box>


            </Stack>
        </Sheet>
    );
}

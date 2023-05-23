import DashBoardProjects from "./MenuItems/ProjectsItem";
import moment from "moment/moment";
import {ContractsItem} from "./MenuItems/ContractsItem";
import {DashboardItems} from "../../pages/dashboard";
import {User, UserRole} from "../../types/resolvers";
import * as React from "react";
import {useEffect, useState} from "react";
import {MyProfileItem} from "./MenuItems/MyProfileItem";
import {HomeItem} from "./MenuItems/HomeItem";
import {ProposalsItem} from "./MenuItems/ProposalsItem";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Box from "@mui/joy/Box";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import customTheme from "../../utils/theme";
import {CssBaseline, CssVarsProvider} from "@mui/joy";

export const DashBoardWrapper = ({userRole, profile,}: {
    userRole: UserRole,
    profile: User,
}) => {

    const [projects, setProjects] = useState(profile.projects);
    const [proposals, setProposals] = useState(profile.proposals);
    const [contracts, setContracts] = useState(profile.contracts);
    const router = useRouter();
    const pathname = usePathname();
    // extract the search parameter to decide which is the default component to show from the url
    const params = useSearchParams()

    let search = params?.get("search") as DashboardItems || null

    let isSearchExists = search && Object.values(DashboardItems).includes(search)

    const defaultComponent = isSearchExists ? search : DashboardItems.Home

    const [currentComponent, setCurrentComponent] = useState(
        defaultComponent
    );

    // sync the search parameter to url if the currentComponent changes
    useEffect(() => {
        const query = `?search=${currentComponent}`;
        router.push(`${pathname}${query}`);
    }, [currentComponent]);


    return (
        <CssVarsProvider disableTransitionOnChange theme={customTheme}>
            <CssBaseline/>
        <Box sx={{display: "flex", minHeight: "100dvh"}}>
            <Header/>
            <Sidebar
                projectsCount={projects.length}
                proposalsCount={proposals.length}
                contractsCount={contracts.length}
                userRole={userRole}
                currentComponent={currentComponent}
                user={profile}
                setCurrentComponent={setCurrentComponent}
            />
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

                {currentComponent === DashboardItems.Home && <HomeItem userRole={userRole} profile={profile}/>}

                <MyProfileItem currentComponent={currentComponent} user={profile}/>
                <DashBoardProjects
                    currentComponent={currentComponent}
                    projects={projects
                        .slice()
                        .sort((a, b) =>
                            moment(b.created_at).isAfter(a.created_at) ? 1 : -1
                        )}
                    setProjects={setProjects}

                />
                <ProposalsItem
                    userRole={userRole}
                    currentComponent={currentComponent}
                    proposals={proposals
                        .slice()
                        .sort((a, b) =>
                            moment(b.created_at).isAfter(a.created_at) ? 1 : -1
                        )}
                    setProposals={setProposals}
                    setContracts={setContracts}
                />
                <ContractsItem
                    userRole={userRole}
                    currentComponent={currentComponent}
                    contracts={contracts
                        .slice()
                        .sort((a, b) =>
                            moment(b.created_at).isAfter(a.created_at) ? 1 : -1
                        )}
                    setContracts={setContracts}
                />
            </Box>
        </Box>
        </CssVarsProvider>
    );
};
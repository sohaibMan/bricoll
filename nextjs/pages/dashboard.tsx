import * as React from 'react';
import {useState} from 'react';
import {CssVarsProvider} from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import useScript from './useScript';
import customTheme from './theme';
import Sidebar from '../components/Dashboard/Sidebar';
import Header from '../components/Dashboard/Header';
import MyProfile from "../components/Dashboard/MyProfile";
import {gql, useQuery} from "@apollo/client";
import {User} from "../types/resolvers";
import Stack from "@mui/joy/Stack";
import CreateProjectForm from "../components/Forms/CreateProjectForm";
import ProjectItemCard from "../components/Cards/ProjectItemCard";
import {EditDeleteProjectControlButtons} from "../components/Buttons/EditDeleteProjectControlButtons";
import DashBoardProjects from "../components/Dashboard/DashBoardProjects";

const useEnhancedEffect =
    typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;


// list of all menus in the dashboard_tmp
export enum DashboardItems {
    MyProfile = 'MyProfile',
    Projects = 'Projects',
    Home = "Home",
    CreateProject = "CreateProject",
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
        }
    }
`;


export default function Index() {
    const {loading, error, data} = useQuery<{ Profile: User }>(USER_PROFILE);
    const status = useScript(`https://unpkg.com/feather-icons`);
    const [currentComponent, setCurrentComponent] = React.useState(DashboardItems.Home);
    const [projects, setProjects] = useState(data?.Profile?.projects || []);




    useEnhancedEffect(() => {
        // Feather icon setup: https://github.com/feathericons/feather#4-replace
        // @ts-ignore
        if (typeof feather !== 'undefined') {
            // @ts-ignore
            feather.replace();
        }
    }, [status]);

    if (loading) return <h1>Loading... </h1>
    if (error || !data || !data.Profile.projects) return <h1>`Error! {error !== undefined ? error?.message : "An Error has occurred"}</h1>;





    return (
        <CssVarsProvider disableTransitionOnChange theme={customTheme}>
            <GlobalStyles
                styles={{
                    '[data-feather], .feather': {
                        color: 'var(--Icon-color)',
                        margin: 'var(--Icon-margin)',
                        fontSize: 'var(--Icon-fontSize, 20px)',
                        width: '1em',
                        height: '1em',
                    },
                }}
            />
            <CssBaseline/>
            <Box sx={{display: 'flex', minHeight: '100dvh'}}>
                <Header/>
                <Sidebar currentComponent={currentComponent} user={data.Profile}
                         setCurrentComponent={setCurrentComponent}/>
                <Box
                    component="main"
                    className="MainContent"
                    sx={(theme) => ({
                        '--main-paddingTop': {
                            xs: `calc(${theme.spacing(2)} + var(--Header-height, 0px))`,
                            md: '32px',
                        },
                        px: {
                            xs: 2,
                            md: 3,
                        },
                        pt: 'var(--main-paddingTop)',
                        pb: {
                            xs: 2,
                            sm: 2,
                            md: 3,
                        },
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: 0,
                        height: '100dvh',
                        gap: 1,
                        overflow: 'auto',
                    })}
                >
                    {currentComponent === DashboardItems.Home ? <p>welcome to home (to be done)</p> : null}
                    {currentComponent === DashboardItems.MyProfile ? <MyProfile user={data.Profile}/> : null}
                    {data.Profile.projects && <DashBoardProjects currentComponent={currentComponent} projectsArr={data.Profile.projects}/>}
                    {/*{currentComponent === DashboardItems.Projects && <Stack spacing={2}>{projects.map((project) =>*/}
                    {/*    <ProjectItemCard*/}
                    {/*        key={project._id.toString()} project={project}>*/}
                    {/*        <EditDeleteProjectControlButtons project={project} setProjects={setProjects}/>*/}
                    {/*    </ProjectItemCard>*/}
                    {/*)}</Stack>}*/}
                    {/*{currentComponent === DashboardItems.CreateProject && <CreateProjectForm  setProjects={setProjects}/>}*/}
                </Box>
            </Box>
        </CssVarsProvider>
    );
}

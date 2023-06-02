import {Project} from "../../../types/resolvers";
import {Dispatch, useContext, useState} from "react";
import Stack from "@mui/joy/Stack";
import ProjectItemCard from "../../Cards/ProjectItemCard";
import {EditDeleteProjectControlButtons} from "../../Buttons/DashBoardControlButtons/EditDeleteProjectControlButtons";
import CreateProjectForm from "../../Forms/wrappers/CreateProjectForm";
import {DashboardItems} from "../../../pages/dashboard";
import Typography from "@mui/joy/Typography";
import CategoriesAutocomplete from "../../AutoCompletes/CategoriesAutocomplete";
import Attachments from "../../ListItems/Attachments";
import {Divider} from "@mui/joy";
import {ProjectStatsBarChart} from "../../Charts/wrappers/ProjectStats";
import Box from "@mui/joy/Box";
import {Collapse} from "@mantine/core";
import {currentComponentContext} from "../DashBoardWrapper";
import CollapseButton from "../../Buttons/CollapseButton";



function ProjectItemsDetails(props: { project: Project }) {
    const [open, setOpen] = useState<boolean>(false)
    return <>
        <CollapseButton onClick={() => setOpen(prv => !prv)} open={open}/>

        <Collapse in={open}>
            <Divider sx={{margin: "10px"}}/>

            <Typography level="h1" sx={{fontSize: "md", fontWeight: "bold", color: "#495057"}} mb={0.5}>
                Project Attachments
            </Typography>


            {props.project.attachments && props.project.attachments.length > 0 ?
                <Attachments attachments={props.project.attachments}/> : <Typography>No Attachments</Typography>
            }

            <Divider sx={{margin: "10px"}}/>

            <Typography level="h1" sx={{fontSize: "md", fontWeight: "bold", color: "#495057"}} mb={0.5}>
                Project Stats
            </Typography>

            {props.project.stats && <Box sx={{width: "50%"}}>
                <ProjectStatsBarChart stats={props.project.stats}/></Box>

            }
        </Collapse>
    </>;
}

export default function DashBoardProjects(props: {
    projects: Array<Project>,
    setProjects: Dispatch<React.SetStateAction<Project[]>>,
}) {


    const [query, setQuery] = useState<string | null>("")
    const {currentComponent, setCurrentComponent} = useContext(currentComponentContext)


    const filteredProjects = query ? props.projects.filter(project => project.category.split("_").join(" ").toLowerCase() === query) : props.projects;


    if (currentComponent === DashboardItems.Projects) return <Stack spacing={2}>
        <CategoriesAutocomplete changeHandler={(event, value) => setQuery(() => value)}/>
        {filteredProjects.length == 0 && <Typography level="h3">No Projects found</Typography>}
        {filteredProjects.map((project) =>
            <ProjectItemCard
                key={project._id.toString()} project={project}>


                <Stack spacing={2} sx={{width: "100%"}}>

                    <Stack spacing={1} direction="row">
                        <EditDeleteProjectControlButtons project={project} setProjects={props.setProjects}/>
                    </Stack>

                    <ProjectItemsDetails project={project}/>

                </Stack>

            </ProjectItemCard>
        )}</Stack>

    if (currentComponent === DashboardItems.CreateProject) return <CreateProjectForm
        setProjects={props.setProjects}/>


    return null;


}
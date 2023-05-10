import {Project} from "../../types/resolvers";
import * as React from "react";
import {useState} from "react";
import Stack from "@mui/joy/Stack";
import ProjectItemCard from "../Cards/ProjectItemCard";
import {EditDeleteProjectControlButtons} from "../Buttons/EditDeleteProjectControlButtons";
import CreateProjectForm from "../Forms/CreateProjectForm";
import {DashboardItems} from "../../pages/dashboard";


export default function DashBoardProjects(props: { projectsArr: Array<Project>, currentComponent: DashboardItems }) {

    const [projects, setProjects] = useState(props.projectsArr);

    console.log(projects)
    if (props.currentComponent === DashboardItems.Projects) return <Stack spacing={2}>{projects.map((project) =>
        <ProjectItemCard
            key={project._id.toString()} project={project}>
            <EditDeleteProjectControlButtons project={project} setProjects={setProjects}/>
        </ProjectItemCard>
    )}</Stack>

    if (props.currentComponent === DashboardItems.CreateProject) return <CreateProjectForm setProjects={setProjects}/>


    return null;


}
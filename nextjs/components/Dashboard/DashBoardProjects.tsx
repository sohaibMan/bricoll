import {Project} from "../../types/resolvers";
import * as React from "react";
import {useState} from "react";
import Stack from "@mui/joy/Stack";
import ProjectItemCard from "../Cards/ProjectItemCard";
import {EditDeleteProjectControlButtons} from "../Buttons/EditDeleteProjectControlButtons";
import CreateProjectForm from "../Forms/CreateProjectForm";
import {DashboardItems} from "../../pages/dashboard";
import Typography from "@mui/joy/Typography";
import CategoriesAutocomplete from "../AutoCompletes/CategoriesAutocomplete";


export default function DashBoardProjects(props: { projectsArr: Array<Project>, currentComponent: DashboardItems }) {

    const [projects, setProjects] = useState(props.projectsArr);
    const [query, setQuery] = useState<string | null>("")

    const filteredProjects = query ? projects.filter(project => project.category.split("_").join(" ").toLowerCase() === query) : projects;

    // todo filter projects

    if (props.currentComponent === DashboardItems.Projects) return <Stack spacing={2}>
        <CategoriesAutocomplete changeHandler={(event, value) => setQuery(() => value)}/>
        {filteredProjects.length == 0 && <Typography level="h3">No Projects found</Typography>}
        {filteredProjects.map((project) =>
            <ProjectItemCard
                key={project._id.toString()} project={project}>
                <EditDeleteProjectControlButtons project={project} setProjects={setProjects}/>
            </ProjectItemCard>
        )}</Stack>

    if (props.currentComponent === DashboardItems.CreateProject) return <CreateProjectForm setProjects={setProjects}/>


    return null;


}
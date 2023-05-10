import {Project} from "../../types/resolvers";
import * as React from "react";
import {useState} from "react";
import Stack from "@mui/joy/Stack";
import ProjectItemCard from "../Cards/ProjectItemCard";
import {EditDeleteProjectControlButtons} from "../Buttons/EditDeleteProjectControlButtons";


export default function DashBoardProjects(props: { projectsArr: Array<Project> }) {

    const [projects, setProjects] = useState(props.projectsArr);

    return <Stack spacing={2}>{projects.map((project) => <ProjectItemCard key={project._id.toString()} project={project}>
            <EditDeleteProjectControlButtons project={project} setProjects={setProjects} />
        </ProjectItemCard>
    )}</Stack>
}
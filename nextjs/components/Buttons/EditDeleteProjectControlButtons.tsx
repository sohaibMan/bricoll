import * as React from "react";
import DeleteChipWithLabel from "../Chip/DeleteChipWithLabel";
import EditChipWithLabel from "../Chip/EditChipWithLabel";
import {gql, QueryResult, useMutation} from "@apollo/client";
import toast from "react-hot-toast";
import {useRouter} from "next/router";
import {Project} from "../../types/resolvers";


export function EditDeleteProjectControlButtons(props: {
    project_id: string
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>
}) {
    const router = useRouter()
    // todo remove the deleted project from the ui

    const DELETE_PROJECT = gql`
        mutation DeleteProject($deleteProjectId: ObjectID!) {
            deleteProject(id: $deleteProjectId) {
                _id
                acknowledgement
            }
        }
    `
    const [deleteProject, {data, error}] = useMutation<{ deleteProject: QueryResult }>(DELETE_PROJECT,
        {
            variables: {
                deleteProjectId: props.project_id
            }
        })

    const deleteProjectHandler = async function handler() {
        // deleteProjectHandler().then(r => alert(JSON.stringify(r)))
        const confirmation = confirm("Are you sure you want to delete this project ")
        if (confirmation) {
            await toast.promise(
                deleteProject(),
                {
                    loading: 'Deleting...',
                    success: <b>Project deleted successfully!</b>,
                    error: <b>Could not save. {error?.message}</b>,
                }
            ).finally(() => {
                props.setProjects((prev) => prev.filter((project) => project._id !== props.project_id))
            })
        }
    }


    return <>

        <EditChipWithLabel actionHandler={() => router.push(`/projects/${props.project_id}/edit`)}/>
        <DeleteChipWithLabel actionHandler={deleteProjectHandler}/>
    </>;
}
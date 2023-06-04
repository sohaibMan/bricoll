import * as React from "react";
import DeleteChip from "../../Chip/DeleteChip";
import EditChip from "../../Chip/EditChip";
import {gql, QueryResult, useMutation} from "@apollo/client";
import toast from "react-hot-toast";
import {Project} from "../../../types/resolvers";
import {Modal, ModalClose, ModalDialog} from "@mui/joy";
import EditProjectForm from "../../Forms/wrappers/EditProjectForm";


export function EditDeleteProjectControlButtons(props: {
    project: Project
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>
}) {
    const [open, setOpen] = React.useState<boolean>(false);


    const DELETE_PROJECT = gql`
        mutation DeleteProject($deleteProjectId: ObjectID!) {
            deleteProject(id: $deleteProjectId) {
                _id
                acknowledgement
            }
        }
    `
    const [deleteProject, {error}] = useMutation<{ deleteProject: QueryResult }>(DELETE_PROJECT,
        {
            variables: {
                deleteProjectId: props.project._id
            }
        })

    const deleteProjectHandler = async () => {
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
                props.setProjects((prev) => prev.filter((project) => project._id !== props.project._id.toString()))
            })
        }
    }

    const editeProjectHandler = (project: Project) => {

        setOpen(false);
        props.setProjects(prv => prv.map(prj => prj._id === project._id ? project : prj))
    }


    return <>
        <EditChip clickHandler={() => setOpen(true)}/>
        <DeleteChip actionHandler={deleteProjectHandler}/>
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog
                aria-labelledby="basic-modal-dialog-title"
                aria-describedby="basic-modal-dialog-description"
                sx={{minWidth: "50%", overflowY: "auto"}}

            >
                <ModalClose/>
                <EditProjectForm onSubmitProjectHandler={editeProjectHandler} project={props.project}/>

            </ModalDialog>
        </Modal>
    </>;
}
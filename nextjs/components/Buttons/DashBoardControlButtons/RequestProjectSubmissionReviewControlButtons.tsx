import * as React from "react";
import {Dispatch, SetStateAction, useState} from "react";
import {Contract} from "../../../types/resolvers";
import UploadChip from "../../Chip/UploadChip";
import {Modal, ModalClose, ModalDialog} from "@mui/joy";
import SubmissionReviewForm from "../../Forms/wrappers/CreateSubmissionReview";


export function RequestProjectSubmissionReviewControlButtons(props: {
    setContracts: Dispatch<SetStateAction<Contract[]>>
    currentContract: Contract
}) {

    const [open, setOpen] = useState(false);
    const submissionReviewHandler = async () => {
        setOpen(false);
    }

    return <>
        <UploadChip label={"Request Submission Review"} actionHandler={() => {
            setOpen(true)
        }
        }/>
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog
                aria-labelledby="basic-modal-dialog-title"
                aria-describedby="basic-modal-dialog-description"
                sx={{minWidth: "50%", overflowY: "auto"}}
            >
                <ModalClose/>
                <SubmissionReviewForm onSubmissionReview={submissionReviewHandler}
                                      currentContract={props.currentContract}/>

            </ModalDialog>
        </Modal>
    </>

}
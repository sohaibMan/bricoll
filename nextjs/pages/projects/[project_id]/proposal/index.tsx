import {useRouter} from "next/router";
import * as React from "react";
import SubmitProposalForm from "../../../Components/Forms/SubmitProposalForm";

export default function SubmitProposal() {
    const router = useRouter();
    const {project_id} = router.query;
    if (!project_id) return (<></>)
    return <SubmitProposalForm project_id={project_id.toString()}/>

}
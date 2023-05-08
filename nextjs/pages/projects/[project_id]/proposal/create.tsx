import {useRouter} from "next/router";
import * as React from "react";
import ProposalForm from "../../../../components/Forms/ProposalForm";
import {gql} from "@apollo/client";

const CREATE_PROPOSAL_MUTATION = gql`
    mutation CreateProposal($project_id: ObjectID!, $price: Float!, $duration: Int!, $description: String!, $cover_letter: String!) {
        createProposal(project_id: $project_id, price: $price, duration: $duration, description: $description, cover_letter: $cover_letter) {
            _id
        }
    }
`;
export default function SubmitProposal() {
    const router = useRouter();
    const {project_id} = router.query;
    if (!project_id) return (<></>)
    return <ProposalForm PROJECT_MUTATION={CREATE_PROPOSAL_MUTATION} project_id={project_id.toString()}/>

}
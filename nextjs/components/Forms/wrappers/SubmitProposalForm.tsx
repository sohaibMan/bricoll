"use client"
import * as React from "react";
import ProposalForm from "../base/ProposalForm";
import {gql} from "@apollo/client";

const CREATE_PROPOSAL_MUTATION = gql`
    mutation CreateProposal($project_id: ObjectID!, $price: Float!, $duration: Int!, $description: String!, $cover_letter: String!) {
        createProposal(project_id: $project_id, price: $price, duration: $duration, description: $description, cover_letter: $cover_letter) {
            _id
        }
    }
`;
export default function SubmitProposalForm({project_id}: { project_id: string
}) {
    return <ProposalForm onSubmitProposalHandler={() => {
    }} label={"Submit a Proposal"} PROPOSAL_MUTATION={CREATE_PROPOSAL_MUTATION} project_id={project_id}/>

}
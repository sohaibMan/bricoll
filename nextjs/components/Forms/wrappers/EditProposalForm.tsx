import ProposalForm from "../base/ProposalForm";
import {gql} from "@apollo/client";
import {Proposal} from "../../../types/resolvers";
import * as React from "react";


const EDIT_PROPOSAL_MUTATION = gql`
    mutation EditProposal($id: ObjectID!, $price: Float, $description: String, $coverLetter: String, $duration: Int) {
        editProposal(id: $id, price: $price, description: $description, cover_letter: $coverLetter, duration: $duration) {
            _id
            status
        }
    }
`


export default function EditProposalForm(props: {
    proposal: Proposal
    onSubmitProposalHandler: (proposal: Proposal) => void

}) {

    return <ProposalForm project_id={props.proposal.project_id} label="Edit an existing proposal"
                         onSubmitProposalHandler={props.onSubmitProposalHandler}
                         PROPOSAL_MUTATION={EDIT_PROPOSAL_MUTATION}
                         proposal={props.proposal}/>;

};



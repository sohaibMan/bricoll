import ContractForm from "./ContractForm";
import {gql} from "@apollo/client";
import Box from "@mui/joy/Box";
import * as React from "react";
import {Contract, Proposal} from "../../types/resolvers";

const CREATE_CONTRACT_MUTATION = gql`
    mutation CreateContract($freelancer_id: ObjectID!, $project_id: ObjectID!, $proposal_id: ObjectID!, $price: Float!, $duration: Int!, $terms: [String!]!) {
        createContract(freelancer_id: $freelancer_id, project_id: $project_id, proposal_id: $proposal_id, price: $price, duration: $duration, terms: $terms) {
            _id
            freelancer_id
            client_id
            project_id
            proposal_id
            price
            duration
            status
            created_at
            updated_at
            terms
            fees
        }
    }
`;
export default function CreateContractForm(props: {
    onSubmitContractHandler: (contract: Contract) => void
    proposal: Proposal
}) {

    return <Box sx={{padding: "1rem"}}><ContractForm
        proposal={props.proposal}
        CONTRACT_MUTATION={CREATE_CONTRACT_MUTATION}
        onSubmitContractHandler={props.onSubmitContractHandler}
    />
    </Box>
};

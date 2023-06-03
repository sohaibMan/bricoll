import {gql} from "@apollo/client";
import Box from "@mui/joy/Box";
import * as React from "react";
import SubmissionReview from "../base/SubmissionReview";
import {Contract} from "../../../types/resolvers";


const REQUEST_PROJECT_SUBMISSION_REVIEW_MUTATION = gql`
    mutation RequestProjectSubmissionReview($contract_id: ObjectID!, $title: String!, $description: String!, $attachments: [AttachmentInput!]) {
        requestProjectSubmissionReview(contract_id: $contract_id, title: $title, description: $description, attachments: $attachments) {
            _id
            acknowledgement
        }
    }
`

export default function SubmissionReviewForm(props: {
    currentContract:Contract
    onSubmissionReview: () => void
}) {


    return <Box sx={{width: "90%", margin: "auto", height: "100%"}}><SubmissionReview onSubmissionReview={props.onSubmissionReview} label={"Submit your project"}   currentContract={props.currentContract}
                                                                                      REQUEST_PROJECT_SUBMISSION_REVIEW_MUTATION={REQUEST_PROJECT_SUBMISSION_REVIEW_MUTATION}/>
    </Box>
}

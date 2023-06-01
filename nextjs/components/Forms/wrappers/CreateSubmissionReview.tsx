import {gql} from "@apollo/client";
import Box from "@mui/joy/Box";
import * as React from "react";
import SubmissionReview from "../base/SubmissionReview";
import {Submission_Review} from "../../../types/resolvers";

// requestProjectSubmissionReview
const REQUEST_PROJECT_SUBMISSION_REVIEW_MUTATION = gql`
    mutation RequestProjectSubmissionReview($contractId: ObjectID!, $title: String!, $description: String!, $attachments: [AttachmentInput!]) {
        requestProjectSubmissionReview(contract_id: $contractId, title: $title, description: $description, attachments: $attachments) {
            _id
            acknowledgement
        }
    }
`

export default function CreateProjectForm(props: {
    setS: React.Dispatch<React.SetStateAction<Submission_Review[]>>;
}) {
    // const {setCurrentComponent} = useContext(currentComponentContext)

    return <Box sx={{width: "90%", margin: "auto", height: "100%"}}><SubmissionReview label="Submission Review"
                                                                                      onSubmissionReview
                                                                                      REQUEST_SUBMISSION_REVIEW_MUTATION={REQUEST_PROJECT_SUBMISSION_REVIEW_MUTATION}/>
    </Box>
}

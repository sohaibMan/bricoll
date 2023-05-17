// import {gql, useQuery} from "@apollo/client"
// import {Stack} from "@mui/joy";
// import {useRouter} from "next/router";
// import * as React from "react";
// import ProposalForm from "../../../../../../components/Forms/ProposalForm";
// import {Proposal} from "../../../../../../types/resolvers";
//
//
// const GET_PROPOSAL = gql`
//     query Proposal($proposalId: ObjectID!) {
//         Proposal(id: $proposalId) {
//             _id
//             project_id
//             freelancer_id
//             client_id
//             price
//             duration
//             description
//             cover_letter
//             created_at
//             updated_at
//             status
//             attachments {
//                 url
//                 type
//                 name
//             }
//         }
//     }`
//
// const EDIT_PROJECT_MUTATION = gql`
//     mutation EditProject($id: ObjectID!, $price: Float!, $duration: Int!, $description: String!, $cover_letter: String!) {
//         editProposal(id: $id, price: $price, duration: $duration, description: $description, cover_letter: $cover_letter) {
//             _id
//             project_id
//             freelancer_id
//             client_id
//             price
//             duration
//             description
//             cover_letter
//             created_at
//             updated_at
//             status
//             attachments {
//                 url
//                 type
//                 name
//             }
//         }
//     }
// `
//
//
// const EditProposal = () => {
//
//
//     const router = useRouter();
//     const {proposal_id} = router.query;
//     if (!proposal_id) return (<></>)
//
//
//     const {loading, error, data} = useQuery<{ Proposal: Proposal }>(GET_PROPOSAL, {
//         variables: {
//             proposalId: proposal_id
//         }
//     });
//
//     if (loading) return <Stack spacing={4}>
//         <Stack spacing={2}>
//             {/*<ProposalCardSkeleton/>*/}
//             ... to be done ...
//         </Stack>
//     </Stack>
//
//
//     if (error) return <p>Error : {error.message}</p>;
//     if (!data) return <p>No proposals</p>
//
//
//     return <ProposalForm PROPOSAL_MUTATION={EDIT_PROJECT_MUTATION}
//                          proposal={data.Proposal} project_id={data.Proposal.project_id}/>;
//
// };
//
// export default EditProposal;

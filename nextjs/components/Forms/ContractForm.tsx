// import {DocumentNode, useMutation} from "@apollo/client";
// import Box from "@mui/joy/Box";
// import * as React from "react";
// import {FormEvent, useState} from "react";
// import Textarea from '@mui/joy/Textarea';
// import {Stack} from "@mui/joy";
// import PayButton from "@mui/joy/PayButton";
// import toast from "react-hot-toast";
// import {Contract, MutationCreateContractArgs, MutationEditContractArgs} from "../../types/resolvers";
// import {DurationInput} from "../Inputs/DurationInput";
// import {PriceInput} from "../Inputs/PriceInput";
// TODO -COMPLETE OTHER IMPORTANT INTERACTIONS AND GET BACK TO HERE
//
// // TODO - ADD OTHER FIELDS AND CUSTOMIZE THE FUNCTION
// type MutationArgs = MutationCreateContractArgs | MutationEditContractArgs
//
// export default function ContractForm(props: {
//     project_id: string,
//     PROJECT_MUTATION: DocumentNode,
//     contract?: Contract
// }) {
//
//   //todo: remove the hardcoded values
//     const defaultState = {
//         price: props.contract?.price.toString() || "",
//         duration: props.contract?.duration.toString() || "",
//         terms: props.contract?.description || "",
//
//     }
//
//     const [createContract, {data, loading, error}] = useMutation(props.PROJECT_MUTATION);
//     const [price, setPrice] = useState<string>(defaultState.price);
//     const [duration, setDuration] = useState<string>(defaultState.duration);
//     const [description, setDescription] = useState<string>(defaultState.description);
//     const [coverLetter, setCoverLetter] = useState<string>(defaultState.coverLetter);
//     const handleSubmit = async function (e: FormEvent<HTMLFormElement>) {
//         e.preventDefault();
//         if (+price <= 0) return toast.error("Price can't be negative")
//         if (+duration <= 0 || +duration >= 90) return toast.error("Duration should be between 1 and 90 days")
//         if (+description.length >= 10000 || +description.length <= 5) return toast.error("Description should be between 5 and 1000")
//         if (+coverLetter.length >= 10000 || +coverLetter.length <= 5) return toast.error("Cover Letter should be between 5 and 1000")
//         const mutationCreateContractArgs: MutationCreateContractArgs | MutationEditContractArgs = {
//             id: props.contract?._id, // needed in the edit contracts only
//             project_id: props.project_id, // needed in the created project and the edit project
//             price: +price,
//             duration: +duration,
//         }
//         try {
//             toast.promise(
//                 createContract({
//                     variables: mutationCreateContractArgs
//                 }),
//                 {
//                     loading: 'Saving...',
//                     success: <b>Form submitted!</b>,
//                     error: <b>{error?.message}</b>,
//                 }
//             ).then(() => {
//                 setPrice("")
//                 setDuration("")
//                 setDescription("")
//                 setCoverLetter("")
//                 //todo redirect to contracts page
//             })
//
//         } catch (e) {
//             console.error(e)
//         }
//         // toast.success("Hello World")
//     }
//
//
//     return (
//         /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
//         <Box
//             sx={{
//                 py: 2,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: 2,
//                 alignItems: 'center',
//                 flexWrap: 'wrap',
//             }}
//         >
//
//             <form onSubmit={handleSubmit}>
//                 <Stack spacing={2}>
//
//                     <PriceInput value={price} onChange={(e) => setPrice(() => e.target.value)}/>
//
//                     <DurationInput value={duration} onChange={(e) => setDuration(() => e.target.value)}/>
//
//                     <Textarea placeholder="description" value={description} required
//                               onChange={(e) => setDescription(() => e.target.value)} minRows={2}/>
//
//                     <Textarea placeholder="cover letter" value={coverLetter} required
//                               onChange={(e) => setCoverLetter(() => e.target.value)} minRows={4}/>
//
//
//                 </Stack>
//
//
//                 <PayButton type=" submit"> Submit</PayButton>
//
//             </form>
//
//         </Box>
//     )
//         ;
// }
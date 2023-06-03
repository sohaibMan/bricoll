import {
    Contract,
    Contract_Status,
    Submission_Review,
    Submission_Review_Status,
    UserRole
} from "../../../types/resolvers";
import {DashboardItems} from "../../../pages/dashboard";
import Stack from "@mui/joy/Stack";
import ContractItemCard from "../../Cards/ContractItemCard";
import ContractStatusAutocomplete from "../../AutoCompletes/ContractStatusAutocomplete";
import Typography from '@mui/joy/Typography';
import {
    AcceptCancelContractControlButtons
} from "../../Buttons/DashBoardControlButtons/AcceptCancelContractControlButtons";
import {
    RequestProjectSubmissionReviewControlButtons
} from "../../Buttons/DashBoardControlButtons/RequestProjectSubmissionReviewControlButtons";
import {CancelPayContractControlButtons} from "../../Buttons/DashBoardControlButtons/CancelPayContractControlButtons";
import * as React from "react";
import {Dispatch, SetStateAction, useContext, useState} from "react";
import {currentComponentContext} from "../DashBoardWrapper";

import {Chip} from "@mui/joy";
import {Collapse} from "@mantine/core";
import CollapseButton from "../../Buttons/CollapseButton";
import Card from "@mui/joy/Card";
import moment from "moment/moment";
import Box from "@mui/joy/Box";
import Attachments from "../../ListItems/Attachments";
import CancelChip from "../../Chip/CancelChip";
import {gql, useMutation} from "@apollo/client";
import toast from "react-hot-toast";
import AcceptChip from "../../Chip/AcceptChip";

const CANCEL_REQUEST_PROJECT_SUBMISSION_REVIEW = gql`
    mutation CancelRequestProjectSubmissionReview($contractId: ObjectID!, $submissionReviewId: ObjectID!) {
        cancelRequestProjectSubmissionReview(contract_id: $contractId, submission_review_id: $submissionReviewId) {
            _id
            acknowledgement
        }
    }`
const DECLINE_REQUEST_PROJECT_SUBMISSION_REVIEW = gql`
    mutation CancelRequestProjectSubmissionReview($contractId: ObjectID!, $submissionReviewId: ObjectID!) {
        declineRequestProjectSubmissionReview(contract_id: $contractId, submission_review_id: $submissionReviewId) {
            _id
            acknowledgement
        }
    }`

const ACCEPT_REQUEST_PROJECT_SUBMISSION_REVIEW = gql`
    mutation AcceptRequestProjectSubmissionReview($contractId: ObjectID!, $submissionReviewId: ObjectID!) {
        acceptRequestProjectSubmissionReview(contract_id: $contractId, submission_review_id: $submissionReviewId) {
            _id
            acknowledgement
        }
    }`


function ContractItemDetails(props: {
    submissions: Array<Submission_Review>,
    current_contract: Contract,
    userRole: UserRole,
    setContracts: Dispatch<SetStateAction<Contract[]>>
}) {

    const [CancelRequestProjectSubmissionReview] = useMutation(CANCEL_REQUEST_PROJECT_SUBMISSION_REVIEW);
    const [DeclineRequestProjectSubmissionReview] = useMutation(DECLINE_REQUEST_PROJECT_SUBMISSION_REVIEW);
    const [AcceptRequestProjectSubmissionReview] = useMutation(ACCEPT_REQUEST_PROJECT_SUBMISSION_REVIEW);

    const [submissions, setSubmissions] = useState(() => props.submissions)

    const cancelHandler = async (submissionReviewId:string) => {


        const confirmation = confirm("Are you sure you want to cancel this request?");
        if (!confirmation) return;


        const variables = {
            contractId: props.current_contract._id,
            submissionReviewId
        }


        await toast.promise(CancelRequestProjectSubmissionReview({variables}), {
            loading: "Cancelling Request...",
            success: "Request Cancelled",
            error: "Failed to cancel request"
        })

        setSubmissions(prv => prv.map(submission => {
            if (submission._id == submissionReviewId) {
                return {...submission, status: Submission_Review_Status.Cancelled}
            }
            return submission
        }))


    }
    const declineHandler = async (submissionReviewId:string) => {


        const confirmation = confirm("Are you sure you want to decline this request?");
        if (!confirmation) return;


        const variables = {
            contractId: props.current_contract._id,
            submissionReviewId
        }


        await toast.promise(DeclineRequestProjectSubmissionReview({variables}), {
            loading: "Decline Request in progress ...",
            success: "Request Cancelled",
            error: "Failed to cancel request"
        })

        setSubmissions(prv => prv.map(submission => {
            if (submission._id == submissionReviewId) {
                return {...submission, status: Submission_Review_Status.Declined}
            }
            return submission
        }))


    }
    const acceptHandler = async (submissionReviewId:string) => {


        const confirmation = confirm("Are you sure you want to accept this request?");
        if (!confirmation) return;


        const variables = {
            contractId: props.current_contract._id,
            submissionReviewId
        }


        await toast.promise(AcceptRequestProjectSubmissionReview({variables}), {
            loading: "Accept Request in progress ...",
            success: "Request Cancelled",
            error: "Failed to cancel request"
        })


        setSubmissions(prv => prv.map(submission => {
            if (submission._id == submissionReviewId) {
                return {...submission, status: Submission_Review_Status.Accepted}
            }
            return submission
        }))

        props.setContracts(prv => prv.map(contract => {
            if (contract._id === props.current_contract._id) {
                return {...contract, status: Contract_Status.Paid}
            }
            return contract;
        }))


    }


    if (!submissions) return <></>
    if (submissions.length == 0) return <Typography>No Submissions</Typography>;

    return <Stack spacing={2}> {submissions.map(submission => <Card
            variant="outlined"
            key={submission._id}
            sx={(theme) => ({
                width: "100%",
                minHeight: "300px",
                gridColumn: 'span 2',
                flexDirection: 'column',
                gap: "1rem",
                flexWrap: 'wrap',
                overflow: 'hidden',
                // gap: 'clamp(0px, (100% - 360px + 32px) * 999, 16px)',
                transition: 'transform 0.3s, border 0.3s',
                '&:hover': {
                    borderColor: theme.vars.palette.primary.outlinedHoverBorder,
                    transform: 'translateY(-2px)',
                },
                '& > *': {minWidth: 'clamp(0px, (360px - 100%) * 999,100%)'},
            })}
        >

            <Typography level="h1" sx={{fontSize: 'md', fontWeight: "bold", color: "#495057"}} mb={0.5}>
                {submission.title}
            </Typography>
            <Typography level="h6" sx={{fontSize: 'sm', fontWeight: "light", color: "#495057"}} mb={0.5}>
                Submitted {moment(submission.created_at).fromNow()}{" "}
                {submission.accepted_at && "Accepted At" + moment(submission.accepted_at).fromNow()}
            </Typography>

            <Stack
                direction="row"
                alignItems="center"
                spacing={1}

            >
                {submission.status === Submission_Review_Status.Accepted &&
                    <Chip size="sm" color="success">{submission.status.split("_").join(" ").toLowerCase()}</Chip>}
                {submission.status === Submission_Review_Status.Cancelled &&
                    <Chip size="sm" color="warning">{submission.status.split("_").join(" ").toLowerCase()}</Chip>}
                {submission.status === Submission_Review_Status.Pending &&
                    <Chip size="sm" color="neutral">{submission.status.split("_").join(" ").toLowerCase()}</Chip>}
                {submission.status === Submission_Review_Status.Declined &&
                    <Chip size="sm" color="danger">{submission.status.split("_").join(" ").toLowerCase()}</Chip>}

            </Stack>
            <Stack direction={"row"} spacing={1}>


                {/*we can refactor this code, but for simplicity and to remove bad coupling I chose this way, but I still fill it is against the dry principle*/}
                {props.current_contract.status === Contract_Status.Completed && props.userRole === UserRole.Freelancer && submission.status === Submission_Review_Status.Pending &&
                    <CancelChip actionHandler={() => cancelHandler(submission._id)}/>}
                {props.current_contract.status === Contract_Status.Completed && props.userRole === UserRole.Client && submission.status === Submission_Review_Status.Pending &&
                    <CancelChip label={"decline"} actionHandler={() => declineHandler(submission._id)}/>}
                {props.current_contract.status === Contract_Status.Completed && props.userRole === UserRole.Client && submission.status === Submission_Review_Status.Pending &&
                    <AcceptChip actionHandler={() => acceptHandler(submission._id)}/>}
            </Stack>

            {submission.attachments &&
                <Box sx={{width: "100%"}}>

                    <Typography level="h1" sx={{fontSize: 'md', fontWeight: "bold", color: "#495057"}} mb={0.5}>
                        Attachments
                    </Typography>

                    {submission.attachments.length > 0 ?
                        <Attachments attachments={submission.attachments}/> : <Typography>No Attachments</Typography>
                    }
                </Box>}


        </Card>
    )}

    </Stack>


}

export const ContractsItem = (props: {
    contracts: Array<Contract>,
    setContracts: Dispatch<SetStateAction<Contract[]>>
    userRole: UserRole
}) => {

    const [query, setQuery] = useState<string | null>("")
    const {currentComponent} = useContext(currentComponentContext)
    const [open, setOpen] = useState<boolean>(false)
    const filteredContracts = query ? props.contracts.filter(contract => contract.status.split("_").join(" ").toLowerCase() === query) : props.contracts;

    if (!props.contracts) return <></>;
    if (currentComponent === DashboardItems.Contracts) {
        return (
            <Stack spacing={2}>
                <ContractStatusAutocomplete changeHandler={(event, value) => setQuery(() => value)}/>
                {filteredContracts.length == 0 && <Typography level="h3">No contracts found</Typography>}
                {filteredContracts.map((contract) =>
                    <>

                        <ContractItemCard
                            key={contract._id.toString()} contract={contract}>

                            <Stack spacing={2} sx={{width: "100%"}}>
                                {/*freelancer only*/}
                                {props.userRole === UserRole.Freelancer && contract.status === Contract_Status.Pending &&
                                    <AcceptCancelContractControlButtons contract={contract}
                                                                        setContracts={props.setContracts}/>}
                                {props.userRole === UserRole.Freelancer && contract.status === Contract_Status.Completed &&
                                    <RequestProjectSubmissionReviewControlButtons currentContract={contract}
                                                                                  setContracts={props.setContracts}/>}
                                {/*client only*/}
                                {props.userRole === UserRole.Client && (contract.status === Contract_Status.Pending || contract.status === Contract_Status.Accepted) &&
                                    <CancelPayContractControlButtons contract={contract}
                                                                     setContracts={props.setContracts}/>}


                                <CollapseButton onClick={() => setOpen(prv => !prv)} open={open}/>

                                <Collapse in={open}>
                                    {/*<Divider sx={{margin: "10px"}}/>*/}
                                    <Typography level="h1" sx={{fontSize: 'lg', fontWeight: "bold", color: "#495057"}}
                                                mb={1.5}>
                                        Submissions
                                    </Typography>
                                    <ContractItemDetails submissions={contract.submission_reviews.slice().sort((a, b) =>
                                        moment(b.created_at).isAfter(a.created_at) ? 1 : -1
                                    )} current_contract={contract} userRole={props.userRole}
                                                         setContracts={props.setContracts}/>
                                </Collapse>


                            </Stack>
                        </ContractItemCard>

                    </>
                )}


            </Stack>
        )
    }

    return <></>;
}
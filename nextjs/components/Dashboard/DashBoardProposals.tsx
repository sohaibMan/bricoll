import {Proposal, Proposal_Status, UserRole} from "../../types/resolvers";
import {DashboardItems} from "../../pages/dashboard";
import Stack from "@mui/joy/Stack";
import * as React from "react";
import {useState} from "react";
import ProposalItemCard from "../Cards/ProposalItemCard";
import {EditCancelProposalControlButtons} from "../Buttons/EditCancelProposalControlButtons";
import {AcceptDeclineProposalControlButtons} from "../Buttons/AcceptDeclineProposalControlButtons";
import ProposalStatusAutocomplete from "../AutoCompletes/ProposalStatusAutocomplete";


export const DashBoardProposals = (props: {
    proposalArr: Array<Proposal>,
    currentComponent: DashboardItems,
    userRole: UserRole
}) => {
    const [proposals, setProposals] = React.useState(props.proposalArr);
    const [query, setQuery] = useState<string | null>("")

    const filteredProposals = query ? proposals.filter(proposal => proposal.status.split("_").join(" ").toLowerCase() === query) : proposals;

    if (!props.proposalArr) return <></>;
    if (props.currentComponent === DashboardItems.Proposals) return (
        <Stack spacing={2}>
            <ProposalStatusAutocomplete changeHandler={(event, value) => setQuery(() => value)}/>
            {filteredProposals.map((proposal) =>
                <ProposalItemCard
                    key={proposal._id.toString()} proposal={proposal}>
                    {/*freelancer only*/}
                    {props.userRole === UserRole.Freelancer && proposal.status === Proposal_Status.InProgress &&
                        <EditCancelProposalControlButtons proposal={proposal} setProposals={setProposals}/>}
                    {/*    clients only*/}
                    {props.userRole === UserRole.Client && proposal.status === Proposal_Status.InProgress &&
                        <AcceptDeclineProposalControlButtons proposal={proposal} setProposals={setProposals}/>}
                </ProposalItemCard>
            )}</Stack>
    )

    return <></>;
}
import {Proposal, Proposal_Status, UserRole} from "../../types/resolvers";
import {DashboardItems} from "../../pages/dashboard";
import Stack from "@mui/joy/Stack";
import * as React from "react";
import ProposalItemCard from "../Cards/ProposalItemCard";
import {EditCancelProposalControlButtons} from "../Buttons/EditCancelProposalControlButtons";

export const DashBoardProposals = (props: {
    proposalArr: Array<Proposal>,
    currentComponent: DashboardItems,
    userRole: UserRole
}) => {
    const [proposals, setProposals] = React.useState(props.proposalArr);
    if (!props.proposalArr) return <></>;
    if (props.currentComponent === DashboardItems.Proposals) return (
        <Stack spacing={2}>{proposals.map((proposal) =>
            <ProposalItemCard
                key={proposal._id.toString()} proposal={proposal}>
                {/*freelancer only*/}
                {(props.userRole === UserRole.Freelancer && proposal.status === Proposal_Status.InProgress) ?
                    <EditCancelProposalControlButtons proposal={proposal} setProposals={setProposals}/> : <></>}
            </ProposalItemCard>
        )}</Stack>
    )

    return <></>;
}
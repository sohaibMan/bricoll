import {Contract, Proposal, Proposal_Status, UserRole} from "../../../types/resolvers";
import {DashboardItems} from "../../../pages/dashboard";
import Stack from "@mui/joy/Stack";
import * as React from "react";
import {Dispatch, useState} from "react";
import ProposalItemCard from "../../Cards/ProposalItemCard";
import {EditCancelProposalControlButtons} from "../../Buttons/EditCancelProposalControlButtons";
import {AcceptDeclineHireProposalControlButtons} from "../../Buttons/AcceptDeclineHireProposalControlButtons";
import ProposalStatusAutocomplete from "../../AutoCompletes/ProposalStatusAutocomplete";
import Typography from "@mui/joy/Typography";


export const ProposalsItem = (props: {
    proposals: Array<Proposal>,
    setProposals: Dispatch<React.SetStateAction<Proposal[]>>
    setContracts: Dispatch<React.SetStateAction<Contract[]>>
    currentComponent: DashboardItems,
    userRole: UserRole
}) => {
    const [query, setQuery] = useState<string | null>("")

    const filteredProposals = query ? props.proposals.filter(proposal => proposal.status.split("_").join(" ").toLowerCase() === query) : props.proposals;

    if (!props.proposals) return <></>;
    if (props.currentComponent === DashboardItems.Proposals) return (
        <Stack spacing={2}>
            <ProposalStatusAutocomplete changeHandler={(event, value) => setQuery(() => value)}/>
            {filteredProposals.length == 0 && <Typography level="h3">No Proposal found</Typography>}
            {filteredProposals.map((proposal) =>
                <ProposalItemCard
                    key={proposal._id.toString()} proposal={proposal}>
                    {/*freelancer only*/}
                    {props.userRole === UserRole.Freelancer && proposal.status === Proposal_Status.InProgress &&
                        <EditCancelProposalControlButtons proposal={proposal} setProposals={props.setProposals}/>}
                    {/*    clients only*/}
                    {props.userRole === UserRole.Client &&
                        <AcceptDeclineHireProposalControlButtons proposal_status={proposal.status} proposal={proposal}
                                                                 setProposals={props.setProposals}
                                                                 setContracts={props.setContracts}/>}
                </ProposalItemCard>
            )}</Stack>
    )

    return <></>;
}
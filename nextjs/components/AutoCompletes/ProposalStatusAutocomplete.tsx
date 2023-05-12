import {Proposal_Status} from "../../types/resolvers";
import CustomAutocomplete from "./Autocomplete";
import * as React from "react";

const proposal_status = [
    {label: Proposal_Status.InProgress},
    {label: Proposal_Status.Completed},
    {label: Proposal_Status.Approved},
    {label: Proposal_Status.Declined},
    {label: Proposal_Status.Canceled},

];

export default function ProposalStatusAutocomplete(props: {
    changeHandler?: (event: React.ChangeEvent<{}>, value: string | null) => void
}) {
    return (
        <CustomAutocomplete changeHandler={props.changeHandler}
                            labels={proposal_status} placeholder="Proposal Status"/>
    );
}


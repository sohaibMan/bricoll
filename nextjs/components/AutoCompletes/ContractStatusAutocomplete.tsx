import {ContractStatus} from "../../types/resolvers";
import CustomAutocomplete from "./Autocomplete";
import * as React from "react";

const contract_status = [
    {label: ContractStatus.Pending},
    {label: ContractStatus.Completed},
    {label: ContractStatus.Accepted},
    {label: ContractStatus.Paid},
    {label: ContractStatus.CancelledByFreelancer},
    {label: ContractStatus.CancelledByClient},

];

export default function ContractStatusAutocomplete(props: {
    changeHandler?: (event: React.ChangeEvent<{}>, value: string | null) => void
}) {
    return (
        <CustomAutocomplete changeHandler={props.changeHandler}
                            labels={contract_status} placeholder="Contract Status"/>
    );
}


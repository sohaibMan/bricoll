// import {Contract_status} from "../../types/resolvers";
import CustomAutocomplete from "./Autocomplete";
import * as React from "react";
import {Contract_Status} from "../../types/resolvers";

const contract_status = [
    {label: Contract_Status.Pending},
    {label: Contract_Status.Completed},
    {label: Contract_Status.Accepted},
    {label: Contract_Status.Paid},
    {label: Contract_Status.CancelledByFreelancer},
    {label: Contract_Status.CancelledByClient},

];

export default function ContractStatusAutocomplete(props: {
    changeHandler?: (event: React.ChangeEvent<{}>, value: string | null) => void
}) {
    return (
        <CustomAutocomplete changeHandler={props.changeHandler}
                            labels={contract_status} placeholder="Contract Status"/>
    );
}


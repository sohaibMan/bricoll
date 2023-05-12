import {Contract, ContractStatus, UserRole} from "../../types/resolvers";
import {DashboardItems} from "../../pages/dashboard";
import Stack from "@mui/joy/Stack";
import * as React from "react";
import {useState} from "react";
import ContractItemCard from "../Cards/ContractItemCard";
import ContractStatusAutocomplete from "../AutoCompletes/ContractStatusAutocomplete";
import Typography from '@mui/joy/Typography';
import {AcceptCancelContractControlButtons} from "../Buttons/AcceptCancelContractControlButtons";
import {CancelContractControlButtons} from "../Buttons/CancelContractControlButtons";


export const DashBoardContracts = (props: {
    contractArr: Array<Contract>,
    currentComponent: DashboardItems,
    userRole: UserRole
}) => {
    const [contracts, setContracts] = React.useState(props.contractArr);
    const [query, setQuery] = useState<string | null>("")

    const filteredContracts = query ? contracts.filter(contract => contract.status.split("_").join(" ").toLowerCase() === query) : contracts;

    if (!props.contractArr) return <></>;
    if (props.currentComponent === DashboardItems.Contracts) return (
        <Stack spacing={2}>
            <ContractStatusAutocomplete changeHandler={(event, value) => setQuery(() => value)}/>
            {filteredContracts.length == 0 && <Typography level="h3">No contracts found</Typography>}
            {filteredContracts.map((contract) =>
                <ContractItemCard
                    key={contract._id.toString()} contract={contract}>
                    {/*freelancer only*/}
                    {props.userRole === UserRole.Freelancer && contract.status === ContractStatus.Pending &&
                        <AcceptCancelContractControlButtons contract={contract} setContracts={setContracts}/>}
                    {/*client only*/}
                    {props.userRole === UserRole.Client && contract.status === ContractStatus.Pending &&
                        <CancelContractControlButtons contract={contract} setContracts={setContracts}/>}
                </ContractItemCard>
            )}</Stack>
    )

    return <></>;
}
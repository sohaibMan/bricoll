import {Contract, Contract_Status, UserRole} from "../../../types/resolvers";
import {DashboardItems} from "../../../pages/dashboard";
import Stack from "@mui/joy/Stack";
import ContractItemCard from "../../Cards/ContractItemCard";
import ContractStatusAutocomplete from "../../AutoCompletes/ContractStatusAutocomplete";
import Typography from '@mui/joy/Typography';
import {AcceptCancelContractControlButtons} from "../../Buttons/AcceptCancelContractControlButtons";
import {CancelPayContractControlButtons} from "../../Buttons/CancelPayContractControlButtons";
import {Dispatch, useState,SetStateAction} from "react";



export const ContractsItem = (props: {
    contracts: Array<Contract>,
    setContracts: Dispatch<SetStateAction<Contract[]>>
    currentComponent: DashboardItems,
    userRole: UserRole
}) => {

    const [query, setQuery] = useState<string | null>("")

    const filteredContracts = query ? props.contracts.filter(contract => contract.status.split("_").join(" ").toLowerCase() === query) : props.contracts;

    if (!props.contracts) return <></>;
    if (props.currentComponent === DashboardItems.Contracts) { // @ts-ignore
        return (
            <Stack spacing={2}>
                <ContractStatusAutocomplete changeHandler={(event, value) => setQuery(() => value)}/>
                {filteredContracts.length == 0 && <Typography level="h3">No contracts found</Typography>}
                {filteredContracts.map((contract) =>
                    <>

                        <ContractItemCard
                            key={contract._id.toString()} contract={contract}>
                            {/*freelancer only*/}
                            {props.userRole === UserRole.Freelancer && contract.status === Contract_Status.Pending &&
                                <AcceptCancelContractControlButtons contract={contract}
                                                                    setContracts={props.setContracts}/>}
                            {/*client only*/}
                            {props.userRole === UserRole.Client && (contract.status === Contract_Status.Pending || contract.status === Contract_Status.Accepted) &&
                                <CancelPayContractControlButtons contract={contract}
                                                                 setContracts={props.setContracts}/>}
                        </ContractItemCard>
                    </>
                )}</Stack>
        )
    }

    return <></>;
}
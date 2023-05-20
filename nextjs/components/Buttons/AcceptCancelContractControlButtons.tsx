import * as React from "react";
import {gql, useMutation} from "@apollo/client";
import toast from "react-hot-toast";
import {Contract} from "../../types/resolvers";
import AcceptChipWithLabel from "../Chip/AcceptChipWithLabel";
import {CancelPayContractControlButtons} from "./CancelPayContractControlButtons";


export function AcceptCancelContractControlButtons(props: {
    contract: Contract
    setContracts: React.Dispatch<React.SetStateAction<Contract[]>>
}) {

    const ACCEPT_CONTRACT = gql`
        mutation AcceptContract($acceptContractId: ObjectID!) {
            acceptContract(id: $acceptContractId) {
                _id
                freelancer_id
                client_id
                project_id
                proposal_id
                price
                duration
                status
                created_at
                updated_at
                terms
                fees
            }
        }`

    const [acceptContract, {error: acceptError}] = useMutation<{ acceptContract: Contract }>(ACCEPT_CONTRACT,
        {
            variables: {
                acceptContractId: props.contract._id
            }
        })

    const acceptContractHandler = async () => {
        const confirmation = confirm("Are you sure you want to Accept this contract ")
        if (confirmation) {
            await toast.promise(
                acceptContract(),
                {
                    loading: 'Accepting...',
                    success: <b>Contract has been Accepted successfully!</b>,
                    error: <b>Could not save. {acceptError?.message}</b>,
                }
            ).then(({data}) => {
                props.setContracts(prev => prev.map((contract) => contract._id !== props.contract._id.toString() ? contract : data?.acceptContract || contract))
            }).catch((e) => console.error(e))
        }
    }


    // @ts-ignore
    return <>

        {/*<CancelChipWithLabel label={"cancel"} actionHandler={cancelContractHandler}/>*/}
        <CancelPayContractControlButtons contract={props.contract} setContracts={props.setContracts}/>
        <AcceptChipWithLabel actionHandler={acceptContractHandler}/>


    </>;
}
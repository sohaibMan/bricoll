//todo add this page

import {useRouter} from "next/router";
import * as React from "react";

export default function Proposal() {

    const router = useRouter();
    const {contract_id} = router.query;
    if (!contract_id) return (<></>)
    return <h1>proposal n {contract_id.toString()} </h1>
}
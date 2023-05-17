import * as React from "react";
import {ChangeEvent} from "react";
import Input from "@mui/joy/Input";

export function PriceInput(props: { value: string, onChange: (e: ChangeEvent<HTMLInputElement>) => void }) {
    return <Input
        sx={{width : "50%"}}
        value={props.value}
        onChange={props.onChange}
        placeholder="Price"
        startDecorator="$"
        type="number"
        required
        error={props.value != "" && +props.value <= 0}
    />;
}
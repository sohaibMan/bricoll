import * as React from "react";
import {ChangeEvent} from "react";
import Input from "@mui/joy/Input";

export function DurationInput(props: { value: string, onChange: (e: ChangeEvent<HTMLInputElement>) => void }) {
    return <Input
        sx={{width : "50%"}}
        value={props.value}
        onChange={props.onChange}
        placeholder="Duration in days"
        type="number"
        required
        error={props.value != "" && +props.value <= 0 || +props.value >= 90}

    />;
}
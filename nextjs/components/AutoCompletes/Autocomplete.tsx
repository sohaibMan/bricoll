import * as React from 'react';
import Autocomplete from '@mui/joy/Autocomplete';

export default function CustomAutocomplete(props: {
    labels: { label: string }[]
    placeholder: string
    parentRef?: React.RefObject<HTMLInputElement>
    defaultValue?: string
    changeHandler?: (event: React.ChangeEvent<{}>, value: string | null) => void

}) {
    const defaultValue = props.defaultValue ? props.defaultValue : null;
    return (
        <Autocomplete
            onChange={props.changeHandler}
            sx={{width: "100%", borderColor: "#73bb44"}}
            defaultValue={defaultValue}
            placeholder={props.placeholder}
            // disableClearable={false}
            options={props.labels.map(el => el.label.split("_").join(" ").toLowerCase())}
            slotProps={{input: {ref: props.parentRef}}}
        />
    );
}


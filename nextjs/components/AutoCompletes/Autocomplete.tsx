import * as React from 'react';
import Autocomplete from '@mui/joy/Autocomplete';

export default function CustomAutocomplete(props: {
    parentRef: React.RefObject<HTMLInputElement>
    labels: { label: string }[]
    placeholder: string
    defaultValue?: string

}) {
    const defaultValue=props.defaultValue ?  props.defaultValue : null;

    return (
        <Autocomplete
            // isOptionEqualToValue={(option,value)=>option===value}
            sx={{width : "50%"}}
            defaultValue={defaultValue}
            placeholder={props.placeholder}
            disableClearable={false}
            options={props.labels.map(el => el.label.split("_").join(" ").toLowerCase())}
            slotProps={{input: {ref: props.parentRef}}}
        />
    );
}


import * as React from 'react';
import {Size_Of_Project} from "../../types/resolvers";
import CustomAutocomplete from "./Autocomplete";

const projectSizes = [
    {label: Size_Of_Project.Small},
    {label: Size_Of_Project.Medium},
    {label: Size_Of_Project.Large},


];

export default function ProjectSizeAutoComplete(props: {
    parentRef: React.RefObject<HTMLInputElement>
    placeholder: string
    defaultValue?: string
}) {
    return (
        <CustomAutocomplete defaultValue={props.defaultValue} parentRef={props.parentRef} labels={projectSizes} placeholder={props.placeholder}/>
    );
}


import * as React from 'react';
import {Level_Of_Expertise} from "../../types/resolvers";
import CustomAutocomplete from "./Autocomplete";

const levelsOfExpertise = [
    {label: Level_Of_Expertise.Beginner},
    {label: Level_Of_Expertise.Intermediate},
    {label: Level_Of_Expertise.Advanced},

];

export default function LevelOfExpertiseAutoComplete(props: {
    parentRef: React.RefObject<HTMLInputElement>
    placeholder: string
    defaultValue?: string
}) {
    return (
        <CustomAutocomplete defaultValue={props.defaultValue} parentRef={props.parentRef} labels={levelsOfExpertise}
                            placeholder={props.placeholder}/>
    );
}


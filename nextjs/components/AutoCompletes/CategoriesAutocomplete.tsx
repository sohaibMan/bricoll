import * as React from 'react';
import {ProjectCategoriesEnum} from "../../types/resolvers";
import CustomAutocomplete from "./Autocomplete";

const categories = [
    {label: ProjectCategoriesEnum.DataScience},
    {label: ProjectCategoriesEnum.Design},
    {label: ProjectCategoriesEnum.Marketing},
    {label: ProjectCategoriesEnum.MobileDevelopment},
    {label: ProjectCategoriesEnum.Writing},
    {label: ProjectCategoriesEnum.WebDevelopment},
    {label: ProjectCategoriesEnum.Other},

];

export default function CategoriesAutocomplete(props: {
    parentRef?: React.RefObject<HTMLInputElement>
    defaultValue?: string
    changeHandler?: (event: React.ChangeEvent<{}>, value: string | null) => void
}) {
    return (
        <CustomAutocomplete changeHandler={props.changeHandler} defaultValue={props.defaultValue}
                            parentRef={props.parentRef} labels={categories} placeholder={"categories"}/>
    );
}


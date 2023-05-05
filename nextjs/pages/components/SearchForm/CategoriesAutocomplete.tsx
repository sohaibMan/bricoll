import * as React from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import {ProjectCategoriesEnum} from "../../../types/resolvers";

export default function CategoriesAutocomplete(props: {
    parentRef: React.RefObject<HTMLInputElement>
}) {
    return (
        <Autocomplete
            placeholder="categories"
            disableClearable={false}
            options={categories.map(el => el.label.split("_").join(" ").toLowerCase())}
            slotProps={{input: {ref: props.parentRef}}}
        />
    );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const categories = [
    {label: ProjectCategoriesEnum.DataScience},
    {label: ProjectCategoriesEnum.Design},
    {label: ProjectCategoriesEnum.Marketing},
    {label: ProjectCategoriesEnum.MobileDevelopment},
    {label: ProjectCategoriesEnum.Writing},
    {label: ProjectCategoriesEnum.WebDevelopment},
    {label: ProjectCategoriesEnum.Other},

];
import SearchInput from "./SearchInput";
import CategoriesAutocomplete from "./CategoriesAutocomplete";
import * as React from "react";
import {useRef} from "react";
import SearchButton from "../Buttons/SearchButton";
import {ProjectCategoriesEnum, QueryProjectsArgs} from "../../../types/resolvers";
import {OperationVariables} from "@apollo/client";
import MoneyInput from "./MoneyInput";
import SkillsAutocomplete from "./SkillsAutocomplete";


export function SearchForm(props: { onRefetch: (variables?: (Partial<OperationVariables> | undefined)) => void }) {
    const searchInputRef = useRef<HTMLInputElement>(null);
    const categoriesAutocompleteRef = useRef<HTMLInputElement>(null);
    const moneyInputMinRef = useRef<HTMLInputElement>(null);
    const moneyInputMaxRef = useRef<HTMLInputElement>(null);
    const [skills, setSkills] = React.useState<string[]>([]);


    async function searchOnClickHandler() {
        // if all are empty do nothing
        let variables: QueryProjectsArgs = {};
        let isEmpty = true;
        variables.filter = {};
        variables.query = ""
        if (searchInputRef.current && searchInputRef.current.value != "") {
            variables.query = searchInputRef.current.value;
            searchInputRef.current.value = "";
            isEmpty = false;

        }
        if (categoriesAutocompleteRef.current && categoriesAutocompleteRef.current.value !== "") {

            // check the CategoriesAutocomplete component to understand why we do this(the ProjectCategoriesEnum are static and should be changed in the backend first)
            variables.filter.category = categoriesAutocompleteRef.current.value.split(" ").join("_").toUpperCase() as ProjectCategoriesEnum;
            isEmpty = false;
            // categoriesAutocompleteRef.current.value = ""

        }
        if (moneyInputMinRef.current && moneyInputMinRef.current.value != "") {

            variables.filter.priceMin = parseFloat(moneyInputMinRef.current.value);
            moneyInputMinRef.current.value = ""
            isEmpty = false;

        }
        if (moneyInputMaxRef.current && moneyInputMaxRef.current.value != "") {
            variables.filter.priceMax = parseFloat(moneyInputMaxRef.current.value);
            moneyInputMaxRef.current.value = ""
            isEmpty = false;

        }
        if (skills.length >= 1) {
            variables.filter.skills = skills
            setSkills(() => [])
            isEmpty = false;

        }


        !isEmpty && props.onRefetch(variables); // if not empty
        !isEmpty && console.log(variables); // if not empty

    }


    return <>
        <SearchInput parentRef={searchInputRef}/>
        <CategoriesAutocomplete parentRef={categoriesAutocompleteRef}/>
        <SkillsAutocomplete skills={skills} setSkills={setSkills}/>
        <MoneyInput placeholder="price Min" parentRef={moneyInputMinRef}/>
        <MoneyInput placeholder="price Max" parentRef={moneyInputMaxRef}/>
        <SearchButton onClickHandler={searchOnClickHandler}/>

    </>;
}

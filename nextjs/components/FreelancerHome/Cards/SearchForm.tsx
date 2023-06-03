// import SearchInput from "../../Inputs/SearchInput";
// import CategoriesAutocomplete from "../../AutoCompletes/CategoriesAutocomplete";
// import * as React from "react";
// import { useRef, useState } from "react";
// import SearchButton from "../../Buttons/SearchButton";
// import { ProjectCategoriesEnum, QueryProjectsArgs } from "../../../types/resolvers";
// import { OperationVariables } from "@apollo/client";
// import MoneyInput from "../../Inputs/MoneyInput";
// import SkillsAutocomplete from "../../AutoCompletes/SkillsAutocomplete";
// import { Stack } from "@mui/joy";
// import Collapse from "@mui/material/Collapse";

// export function SearchForm(props: { onRefetch: (variables?: (Partial<OperationVariables> | undefined)) => void }) {
//   const searchInputRef = useRef<HTMLInputElement>(null);
//   const categoriesAutocompleteRef = useRef<HTMLInputElement>(null);
//   const moneyInputMinRef = useRef<HTMLInputElement>(null);
//   const moneyInputMaxRef = useRef<HTMLInputElement>(null);
//   const [skills, setSkills] = useState<string[]>([]);
//   const [isOpen, setIsOpen] = useState(false);

//   function searchOnClickHandler() {
//     let variables: QueryProjectsArgs = {};
//     let isEmpty = true;
//     variables.filter = {};
//     variables.query = "";
//     if (searchInputRef.current && searchInputRef.current.value !== "") {
//       variables.query = searchInputRef.current.value;
//       searchInputRef.current.value = "";
//       isEmpty = false;
//     }
//     if (categoriesAutocompleteRef.current && categoriesAutocompleteRef.current.value !== "") {
//       variables.filter.category = categoriesAutocompleteRef.current.value.split(" ").join("_").toUpperCase() as ProjectCategoriesEnum;
//       isEmpty = false;
//     }
//     if (moneyInputMinRef.current && moneyInputMinRef.current.value !== "") {
//       variables.filter.priceMin = parseFloat(moneyInputMinRef.current.value);
//       moneyInputMinRef.current.value = "";
//       isEmpty = false;
//     }
//     if (moneyInputMaxRef.current && moneyInputMaxRef.current.value !== "") {
//       variables.filter.priceMax = parseFloat(moneyInputMaxRef.current.value);
//       moneyInputMaxRef.current.value = "";
//       isEmpty = false;
//     }
//     if (skills.length >= 1) {
//       variables.filter.skills = skills;
//       setSkills(() => []);
//       isEmpty = false;
//     }
//     !isEmpty && props.onRefetch(variables);
//   }

//   const searchBestMatchOnClickHandler = () =>
//     props.onRefetch({
//       query: "",
//       filter: {},
//     });

//   return (
//     <Stack spacing={2} sx={{}}>
//       <SearchInput onClickHandler={searchOnClickHandler} parentRef={searchInputRef} />

//       <Collapse in={isOpen}> {/* Collapse component */}
//         <CategoriesAutocomplete parentRef={categoriesAutocompleteRef} />
//         <SkillsAutocomplete skills={skills} setSkills={setSkills} />
//         <Stack spacing={2} direction="row">
//           <MoneyInput placeholder="price Min" parentRef={moneyInputMinRef} />
//           <MoneyInput placeholder="price Max" parentRef={moneyInputMaxRef} />
//         </Stack>
//       </Collapse>

//       {/* Toggle button */}
//       <SearchButton
//         label={isOpen ? "Hide Filters" : "Show Filters"}
//         onClickHandler={() => setIsOpen(!isOpen)}
//       />

//       <Stack direction="row" spacing={1}>
//         <SearchButton label={"search"} onClickHandler={searchOnClickHandler} />
//         <SearchButton label={"Best match"} onClickHandler={searchBestMatchOnClickHandler} />
//       </Stack>
//     </Stack>
//   );
// }
import * as React from "react";
import { useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";
import {
  ProjectCategoriesEnum,
  QueryProjectsArgs,
} from "../../../types/resolvers";
import { OperationVariables } from "@apollo/client";
import SearchInput from "../../Inputs/SearchInput";
import CategoriesAutocomplete from "../../AutoCompletes/CategoriesAutocomplete";
import MoneyInput from "../../Inputs/MoneyInput";
import SkillsAutocomplete from "../../AutoCompletes/SkillsAutocomplete";
import { motion } from "framer-motion";

export function SearchForm(props: {
  onRefetch: (variables?: Partial<OperationVariables>) => void;
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const searchInputRef = useRef(null);
  const categoriesAutocompleteRef = useRef(null);
  const moneyInputMinRef = useRef(null);
  const moneyInputMaxRef = useRef(null);
  const [skills, setSkills] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  function searchOnClickHandler() {
    let variables: QueryProjectsArgs = {};
    let isEmpty = true;
    variables.filter = {};
    variables.query = "";

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    };

    if (searchInputRef.current && searchInputRef.current.value !== "") {
      variables.query = searchInputRef.current.value;
      searchInputRef.current.value = "";
      isEmpty = false;
    }

    if (
      categoriesAutocompleteRef.current &&
      categoriesAutocompleteRef.current.value !== ""
    ) {
      variables.filter.category = categoriesAutocompleteRef.current.value
        .split(" ")
        .join("_")
        .toUpperCase() as ProjectCategoriesEnum;
      isEmpty = false;
    }

    if (moneyInputMinRef.current && moneyInputMinRef.current.value !== "") {
      variables.filter.priceMin = parseFloat(moneyInputMinRef.current.value);
      moneyInputMinRef.current.value = "";
      isEmpty = false;
    }

    if (moneyInputMaxRef.current && moneyInputMaxRef.current.value !== "") {
      variables.filter.priceMax = parseFloat(moneyInputMaxRef.current.value);
      moneyInputMaxRef.current.value = "";
      isEmpty = false;
    }

    if (skills.length >= 1) {
      variables.filter.skills = skills;
      setSkills([]);
      isEmpty = false;
    }

    !isEmpty && props.onRefetch(variables);
  }

  const searchBestMatchOnClickHandler = () =>
    props.onRefetch({
      query: "",
      filter: {},
    });

  return (
    <Stack spacing={2} sx={{}}>
      <SearchInput
        onClickHandler={searchOnClickHandler}
        parentRef={searchInputRef}
      />

      <Collapse in={isOpen}>
        <CategoriesAutocomplete parentRef={categoriesAutocompleteRef} />
        <Stack
          sx={{ marginTop: "2%", marginBottom: "2%" }}
          // spacing={2}
          direction="row"
        >
          <SkillsAutocomplete skills={skills} setSkills={setSkills} />
        </Stack>
        <Stack
          sx={{ marginTop: "2%", marginBottom: "2%" }}
          spacing={2}
          direction="row"
        >
          <MoneyInput placeholder="price Min" parentRef={moneyInputMinRef} />
          <MoneyInput placeholder="price Max" parentRef={moneyInputMaxRef} />
        </Stack>
      </Collapse>

      {/* <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outlined"
        // color="primary"
        size="small"
        sx={{ alignSelf: 'flex-start', color: "#73bb44" }}
      >
        {isOpen ? 'Hide Filters' : 'Show Filters'}
      </Button> */}

      <Stack sx={{ justifyContent: "center" }} direction="row" spacing={3}>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          // variant="outlined"
          variant="contained"
          size="small"
          color="success"

          sx={{
            alignSelf: "flex-start",
            // backgroundColor: "#73bb44",
            // borderColor: "#73bb44",
            borderRadius: "15px",
            color: "#eee",
            padding: "0.8%",
            paddingRight: "1.5%",
            paddingLeft: "1.5%",
          }}
        >
          {isOpen ? "Hide Filters" : "Show Filters"}
        </Button>
        <Button
          variant="contained"
          size="small"
          color="success"
          sx={{
            alignSelf: "flex-start",
            // backgroundColor: "#73bb44",
            // borderColor: "#73bb44",
            borderRadius: "15px",
            color: "#eee",
            padding: "0.8%",
            paddingRight: "1.5%",
            paddingLeft: "1.5%",
          }}
          onClick={searchOnClickHandler}
          endIcon={<SearchIcon />}
        >
          Search
        </Button>
        <Button
          onClick={searchBestMatchOnClickHandler}
          variant="contained"
          size="small"
          sx={{
            alignSelf: "flex-start",
            // backgroundColor: "#73bb44",
            // borderColor: "#73bb44",
            borderRadius: "15px",
            color: "#eee",
            padding: "0.8%",
            paddingRight: "1.5%",
            paddingLeft: "1.5%",
          }}
          color="success"

          endIcon={<SearchIcon />}
        >
          Best match
        </Button>
      </Stack>
    </Stack>
  );
}

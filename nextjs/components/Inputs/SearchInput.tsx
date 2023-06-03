import * as React from "react";
import Input from "@mui/joy/Input";
import SearchIcon from "@mui/icons-material/Search";
// onKeyPress={(e) => e.key === "Enter" && props.onClickHandler}

export default function SearchInput(props: {
  parentRef: React.RefObject<HTMLInputElement>;
  onClickHandler: () => void;
}) {
  return (
    <>
      <Input
        color="success"
        placeholder="Search for job"
        slotProps={{ input: { ref: props.parentRef } }}
        endDecorator={
          <>
            <SearchIcon
              onClick={props.onClickHandler}
              sx={{ cursor: "pointer" }}
            />
          </>
        }
      />
    </>
  );
}

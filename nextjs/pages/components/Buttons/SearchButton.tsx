import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';

interface SearchButtonProps {
    onClickHandler: () => void,
    label:string
}

export default function SearchButton(props: SearchButtonProps) {
    return (
        <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={props.onClickHandler} endIcon={<SearchIcon/>}>
                {props.label}
            </Button>
        </Stack>
    );
}
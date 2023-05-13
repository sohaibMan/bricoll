import * as React from 'react';
import {useRef} from 'react';
import Input from "@mui/joy/Input";
import DeleteChipX from "../Chip/DeleteChipX";
import Button from '@mui/joy/Button';
import Add from '@mui/icons-material/Add';
import Stack from '@mui/joy/Stack';

export default function TermsAutocomplete(props: {
    terms: string[]
    setTerms: React.Dispatch<React.SetStateAction<string[]>>
}) {

    const InputRef = useRef<HTMLInputElement>(null);
    const deleteHandler = (label: string) => {
        props.setTerms(props.terms.filter(el => el != label))
    }
    const addHandler = () => {
        if (InputRef.current!.value.trim() === "") return;
        if (props.terms.includes(InputRef.current!.value.trim())) return;
        if (props.terms.length >= 5) return;
        props.setTerms([...props.terms, InputRef.current!.value.trim()]);
        InputRef.current!.value = "";
    }

    return <>
        <Stack spacing={2}>
            {props.terms.map((el, i) => <DeleteChipX onDelete={deleteHandler} key={i} label={el}/>)}
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="space-between" sx={{width: "100%"}}>
            <Input disabled={props.terms.length >= 5} size="md" sx={{width: "100%"}}
                   slotProps={{input: {ref: InputRef}}}
                   placeholder={props.terms.length >= 5 ? "Max 5 terms" : "terms"}/>
            <Button disabled={props.terms.length >= 5} onClick={addHandler} size="md"
                    startDecorator={<Add/>}>Add</Button>
        </Stack>

    </>


}


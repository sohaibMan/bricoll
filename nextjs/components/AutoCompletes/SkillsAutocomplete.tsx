import * as React from 'react';
import {useRef} from 'react';
import Input from "@mui/joy/Input";
import DeleteChipX from "../Chip/DeleteChipX";
import Button from '@mui/joy/Button';
import Add from '@mui/icons-material/Add';
import Stack from '@mui/joy/Stack';

export default function SkillsAutocomplete(props: {
    skills: string[]
    setSkills: React.Dispatch<React.SetStateAction<string[]>>
}) {

    const InputRef = useRef<HTMLInputElement>(null);
    const deleteHandler = (label: string) => {
        props.setSkills(props.skills.filter(el => el != label))
    }
    const addHandler = () => {
        if (InputRef.current!.value.trim() === "") return;
        if (props.skills.includes(InputRef.current!.value.trim())) return;
        if (props.skills.length >= 5) return;
        props.setSkills([...props.skills, InputRef.current!.value.trim()]);
        InputRef.current!.value = "";
    }

    return <>
        <Stack direction="row" spacing={2}>
            {props.skills.map((el, i) => <DeleteChipX onDelete={deleteHandler} key={i} label={el}/>)}
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="space-between" sx={{width: "100%"}}>
            <Input disabled={props.skills.length >= 5} size="md" sx={{width: "100%"}}
                   slotProps={{input: {ref: InputRef}}}
                   placeholder={props.skills.length >= 5 ? "Max 5 skills" : "Skills"}/>
            <Button disabled={props.skills.length >= 5} onClick={addHandler} size="md"
                    startDecorator={<Add/>}>Add</Button>
        </Stack>

    </>


}


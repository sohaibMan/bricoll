import * as React from 'react';
import {useRef} from 'react';
import Input from "@mui/joy/Input";
import EditableDeletableChip from "../EditableDeletableChip";
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
        if (InputRef.current!.value === "") return;
        if (props.skills.includes(InputRef.current!.value)) return;
        props.setSkills([...props.skills, InputRef.current!.value]);
        InputRef.current!.value = "";
    }

    return <>
        <Stack direction="row" spacing={2}>
            {props.skills.map((el, i) => <EditableDeletableChip onDelete={deleteHandler} key={i} label={el}/>)}
        </Stack>
        <Stack direction="row" spacing={2}>
            <Input size="sm" slotProps={{input: {ref: InputRef}}} placeholder="Skills"/>
            <Button onClick={addHandler} size="md" startDecorator={<Add/>}>Add to cart</Button>
        </Stack>

    </>


}


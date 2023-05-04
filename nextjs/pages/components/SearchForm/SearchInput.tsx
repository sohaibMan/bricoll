import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Stack from '@mui/joy/Stack';
import Input from '@mui/joy/Input';

export default function SearchInput(props: { parentRef: React.RefObject<HTMLInputElement> }) {
    return (
        <Stack spacing={2} sx={{width: 300}}>
            <FormControl id="free-solo-2-demo">
                <FormLabel>Search query</FormLabel>
                <Input slotProps={{input: {ref: props.parentRef}}} />
            </FormControl>
        </Stack>
    );
}


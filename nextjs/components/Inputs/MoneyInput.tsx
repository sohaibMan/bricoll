import * as React from 'react';
import Input from '@mui/joy/Input';

export default function MoneyInput(props: { placeholder: string, parentRef: React.RefObject<HTMLInputElement> }) {
    return (
        <Input
            // className='my-2'
            sx={{borderColor: "#73bb44"}}
            slotProps={{input: {ref: props.parentRef}}}
            placeholder={props.placeholder}
            startDecorator='$'
            type="number"
        />
    );
}
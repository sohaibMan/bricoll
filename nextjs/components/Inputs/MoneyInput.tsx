import * as React from 'react';
import Input from '@mui/joy/Input';

export default function MoneyInput(props: { placeholder: string, parentRef: React.RefObject<HTMLInputElement> }) {
    return (
        <Input
            slotProps={{input: {ref: props.parentRef}}}
            placeholder={props.placeholder}
            startDecorator='$'
            type="number"
        />
    );
}
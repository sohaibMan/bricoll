import * as React from 'react';
import Divider from '@mui/joy/Divider';
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

export default function MoneyInput(props: { placeholder: string, parentRef: React.RefObject<HTMLInputElement> }) {
    const [currency, setCurrency] = React.useState('dollar');
    return (
        <Input
            slotProps={{input: {ref: props.parentRef}}}
            placeholder={props.placeholder}
            startDecorator={{dollar: '$'}[currency]}
            type="number"
            endDecorator={
                <React.Fragment>
                    <Divider orientation="vertical"/>
                    <Select
                        variant="plain"
                        value={currency}
                        onChange={(_, value) => setCurrency(value!)}
                        sx={{mr: -1.5, '&:hover': {bgcolor: 'transparent'}}}
                    >
                        <Option value="dollar">US dollar</Option>

                    </Select>
                </React.Fragment>
            }
            sx={{width: 300}}
        />
    );
}
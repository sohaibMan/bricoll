import * as React from 'react';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import DoneIcon from '@mui/icons-material/Done';

export default function AcceptChip({actionHandler, label = "Accept"}: {
    actionHandler: () => void,
    label?: string
}) {
    return (
        <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>

            <Chip
                variant="soft"
                color="success"
                onClick={actionHandler}
                endDecorator={<DoneIcon color="disabled"/>}
            >
                {label}
            </Chip>

        </Box>
    );
}
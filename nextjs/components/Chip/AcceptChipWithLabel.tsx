import * as React from 'react';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import DoneIcon from '@mui/icons-material/Done';

export default function AcceptChipWithLabel({actionHandler}: { actionHandler: () => void }) {
    return (
        <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>

            <Chip
                variant="soft"
                color="success"
                onClick={actionHandler}
                endDecorator={<DoneIcon color="disabled"/>}
            >
                Accept
            </Chip>

        </Box>
    );
}
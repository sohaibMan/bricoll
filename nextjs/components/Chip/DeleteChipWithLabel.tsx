import * as React from 'react';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';

export default function DeleteChipWithLabel({actionHandler}: { actionHandler: () => void })
{
    return (
        <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>

            <Chip
                variant="soft"
                color="danger"
                endDecorator={<ChipDelete onDelete={actionHandler}/>}
            >
                Delete
            </Chip>

        </Box>
    );
}
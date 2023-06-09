import * as React from 'react';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';
import EditIcon from '@mui/icons-material/Edit';

export default function EditChip({clickHandler}: { clickHandler: () => void }) {
    return (
        <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>

            <Chip
                variant="soft"
                color="warning"
                endDecorator={<ChipDelete onDelete={clickHandler}><EditIcon fontSize="small"/></ChipDelete>}>
                Edit
            </Chip>

        </Box>
    );
}
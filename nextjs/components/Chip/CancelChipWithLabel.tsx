import * as React from 'react';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

export default function CancelChipWithLabel({actionHandler}: { actionHandler: () => void }) {
    return (
        <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>

            <Chip
                variant="soft"
                color="danger"
                onClick={actionHandler}
                endDecorator={<CancelOutlinedIcon color="disabled"/>}
            >
                Cancel
            </Chip>

        </Box>
    );
}
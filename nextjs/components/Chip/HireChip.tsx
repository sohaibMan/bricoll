import * as React from 'react';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import ApprovalIcon from '@mui/icons-material/Approval';

export default function HireChip({actionHandler}: { actionHandler: () => void }) {
    return (
        <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>

            <Chip
                variant="soft"
                color="primary"
                onClick={actionHandler}
                endDecorator={<ApprovalIcon color="disabled"/>}
            >
                Hire
            </Chip>

        </Box>
    );
}
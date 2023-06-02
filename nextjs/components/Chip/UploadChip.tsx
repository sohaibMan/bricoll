import * as React from 'react';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

export default function UploadChip({actionHandler, label = "Accept"}: {
    actionHandler: () => void,
    label?: string
}) {
    return (
        <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>

            <Chip
                variant="soft"
                color="success"
                onClick={actionHandler}
                endDecorator={<DriveFolderUploadIcon color="disabled"/>}
            >
                {label}
            </Chip>

        </Box>
    );
}
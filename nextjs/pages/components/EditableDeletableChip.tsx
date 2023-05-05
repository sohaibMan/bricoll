import * as React from 'react';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';
import CloseIcon from '@mui/icons-material/Close';

export default function EditableDeletableChip(props: {
    label: string,
    onDelete: (label: string) => void
}) {
    return (
        <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
            <Chip
                variant="soft"
                color="primary"
                endDecorator={
                    <ChipDelete
                        color="primary"
                        variant="plain"
                        onClick={() => props.onDelete(props.label)}
                    >
                        <CloseIcon/>

                    </ChipDelete>
                }
            >
                {props.label}
            </Chip>
        </Box>
    );
}
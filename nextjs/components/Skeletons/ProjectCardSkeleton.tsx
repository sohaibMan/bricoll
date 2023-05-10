import * as React from 'react';
import Card from '@mui/joy/Card';
import {Skeleton} from "@mui/material";


export default function ProjectItemCardSkeleton() {


    return (

        <Card
            variant="outlined"
            sx={(theme) => ({
                width: "70vw",
                gridColumn: 'span 2',
                flexDirection: 'row',
                flexWrap: 'wrap',
                overflow: 'hidden',
                minHeight: "90vh",
                m: 0,
                p: 0,
                transition: 'transform 0.3s, border 0.3s',
                '&:hover': {
                    borderColor: theme.vars.palette.primary.outlinedHoverBorder,
                    transform: 'translateY(-2px)',
                },
                '& > *': {minWidth: 'clamp(0px, (360px - 100%) * 999,100%)'},
            })}
        >
            <Skeleton variant="rectangular" width="100%" height="90vh"/>
        </Card>

    );
}
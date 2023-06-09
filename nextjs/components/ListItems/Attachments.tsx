import * as React from 'react';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import {Attachment} from "../../types/resolvers";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import Link from '@mui/material/Link';
import {Stack} from "@mui/joy";
import Typography from '@mui/joy/Typography';

interface AttachmentsProps {
    attachments: Array<Attachment>
}

export default function Attachments({attachments}: AttachmentsProps) {
    console.log(attachments)
    return (

        <List>
            {attachments.map((attachment, index) => (
                <ListItem key={index}>
                    <Link href={attachment.url} aria-label="Download" color="inherit" target="_blank" rel="noopener">
                        <Stack direction="row" spacing={1}>
                            {attachment.type.split("/")[0] === "image" ? <AddPhotoAlternateIcon/>
                                : attachment.type.split("/")[0] === "video" ? <VideoLibraryIcon/> :
                                    <DocumentScannerIcon/>}
                            <Typography component="h3">
                                {attachment.name}
                            </Typography>
                        </Stack>
                    </Link>
                </ListItem>

            ))}

        </List>

    );
}
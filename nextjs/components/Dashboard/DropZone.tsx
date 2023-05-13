/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import Box from "@mui/joy/Box";
import Card, {CardProps} from "@mui/joy/Card";
import Upload from "../Buttons/Upload";
import FileUploadIcon from '@mui/icons-material/FileUpload';

interface propsType extends CardProps {
    uploadHandler: React.Dispatch<React.SetStateAction<string>>
}

export default function DropZone({sx, ...props}: propsType) {
    // {...props}
    return (
        <Card
            variant="outlined"

            sx={[
                {
                    borderRadius: "sm",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    alignItems: "center",
                    px: 3,
                    flexGrow: 1,
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
        >
            <Box sx={{p: 1, bgcolor: "background.level1", borderRadius: "50%"}}>
                <Box
                    sx={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        bgcolor: "background.level2",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <FileUploadIcon/>
                </Box>
            </Box>
            {/*<Typography level="body2" textAlign="center">*/}
            <Upload uploadHandler={props.uploadHandler}/>
            {/* <Link component="button" overlay>
          Click to upload
        </Link>{' '}
        or drag and drop
        <br /> SVG, PNG, JPG or GIF (max. 800x400px) */}
            {/*</Typography>*/}
        </Card>
    );
}

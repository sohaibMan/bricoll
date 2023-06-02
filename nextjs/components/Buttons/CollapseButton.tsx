import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import {KeyboardArrowDown} from "@mui/icons-material";

export default function CollapseButton(props: { onClick: () => void, open: boolean }) {
    return <Box>
        <IconButton
            variant="plain"
            size="sm"
            color="neutral"
            onClick={props.onClick}
            sx={{padding: "7px"}}
        >
            <KeyboardArrowDown
                sx={{transform: props.open ? "initial" : "rotate(-90deg)"}}
            />
            Show details
        </IconButton>
    </Box>;
}
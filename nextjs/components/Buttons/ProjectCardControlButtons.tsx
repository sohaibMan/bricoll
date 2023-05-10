import {ReactionButton} from "./ReactionButton";
import {Reaction_Type, Reactions} from "../../types/resolvers";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltRoundedIcon from "@mui/icons-material/ThumbDownOffAltRounded";
import * as React from "react";

export function ProjectCardControlButtons(props: {
    projectId: string
    reactions: Array<Reactions>
}) {
    return <>
        <ReactionButton project_id={props.projectId} reactions={props.reactions}
                        reaction_type={Reaction_Type.Love}
                        active_icon={<FavoriteIcon color="primary"/>}
                        inactive_icon={<FavoriteBorderRoundedIcon color="primary"/>}
        />

        <ReactionButton project_id={props.projectId} reactions={props.reactions}
                        reaction_type={Reaction_Type.Dislike}
                        active_icon={<ThumbDownIcon color="primary"/>}
                        inactive_icon={<ThumbDownOffAltRoundedIcon color="primary"/>}
        />
    </>;
}
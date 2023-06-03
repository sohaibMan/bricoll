// import {ReactionButton} from "./ReactionButton";
import { Reaction_Type, Reactions } from "../../../types/resolvers";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltRoundedIcon from "@mui/icons-material/ThumbDownOffAltRounded";
import * as React from "react";
import { ReactionButton } from "../../Buttons/ReactionButton";
import { Box } from "@mui/material";

export function ProjectCardControlButtons(props: {
  projectId: string;
  reactions: Array<Reactions>;
}) {
  return (
    <>
      <Box
        sx={{
          marginLeft: "90%",
        //   marginRight: "3%",
        //   marginTop: "3%",
        }}
      >
        <ReactionButton
          project_id={props.projectId}
          reactions={props.reactions}
          reaction_type={Reaction_Type.Dislike}
          active_icon={<ThumbDownIcon color="success" />}
          inactive_icon={<ThumbDownOffAltRoundedIcon color="success" />}
        />

        <ReactionButton
          project_id={props.projectId}
          reactions={props.reactions}
          reaction_type={Reaction_Type.Love}
          active_icon={<FavoriteIcon color="success" />}
          inactive_icon={<FavoriteBorderRoundedIcon color="success" />}
        />

        
      </Box>
    </>
  );
}

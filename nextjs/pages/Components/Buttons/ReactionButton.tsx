import {Reaction_Type, Reactions} from "../../../types/resolvers";
import IconButton from "@mui/joy/IconButton";
import * as React from "react";
import {useState} from "react";
import {gql, useMutation} from "@apollo/client";
import {Badge} from "@mui/joy";
import {useSession} from "next-auth/react";

const REACT_PROJECT = gql`
    mutation ReactionMutation($project_id: ObjectID!, $reaction_type: reaction_type!) {
        reactToProject(id: $project_id, reaction_type: $reaction_type) {
            acknowledgement
        }
    }
`;

const UNDO_REACT_PROJECT = gql`
    mutation Mutation($project_id: ObjectID!, $reaction_type: reaction_type!) {
        undoReactToProject(id: $project_id, reaction_type: $reaction_type) {
            acknowledgement
        }
    }
`

export function ReactionButton(props: {
    reactions: Array<Reactions>,
    project_id: string,
    reaction_type: Reaction_Type
    active_icon: React.ReactNode
    inactive_icon: React.ReactNode
}) {
    const {data} = useSession();
    const [isActive, setIsActive] = useState(() => !!props.reactions.find(reaction => reaction.freelancer_id === data?.user?.id && reaction.reaction_type === props.reaction_type));
    const [reactionCount, setReactionCount] = useState(() => props.reactions.filter(reaction => reaction.reaction_type === props.reaction_type).length);
    const [reactProject] = useMutation(REACT_PROJECT, {
        variables: {
            project_id: props.project_id,
            reaction_type: props.reaction_type
        }
    });
    const [undoReactProject] = useMutation(UNDO_REACT_PROJECT,
        {
            variables: {
                project_id: props.project_id,
                reaction_type: props.reaction_type
            }
        });
    const onClickHandler = () => {
        setIsActive(prv => !prv);
        // isActive => the project is already reacted to
        isActive ? undoReactProject() : reactProject();
        isActive ? setReactionCount(prv => prv - 1) : setReactionCount(prv => prv + 1);
    }

    return <Badge
        badgeContent={reactionCount}>
        <IconButton
            disabled={!data} // if the user is not logged in ( he can't react to a project )
            size="sm"
            variant="plain"
            color="neutral"
            sx={{ml: "auto", alignSelf: "flex-start"}}
            onClick={onClickHandler}
        >
            {isActive ? props.active_icon : props.inactive_icon}
        </IconButton>
    </Badge>
}
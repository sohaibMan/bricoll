import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import {Chip, Divider, Stack} from '@mui/joy';
import {Proposal, Proposal_Status} from "../../types/resolvers";
import moment from "moment";
import CustomLink from "../CustomLinks/CustomLink";
import Attachments from "../ListItems/Attachments";
import Avatar from "@mui/joy/Avatar";


export default function ProposalItemCard({proposal, children}: {
    proposal: Proposal,
    children: React.ReactNode
}) {

    return (
        <Box sx={{minHeight: 150}}>
            <Card
                variant="outlined"
                sx={(theme) => ({
                    width: "100%",
                    gridColumn: 'span 2',
                    flexDirection: 'column',
                    gap: "1rem",
                    flexWrap: 'wrap',
                    overflow: 'hidden',
                    // gap: 'clamp(0px, (100% - 360px + 32px) * 999, 16px)',
                    transition: 'transform 0.3s, border 0.3s',
                    '&:hover': {
                        borderColor: theme.vars.palette.primary.outlinedHoverBorder,
                        transform: 'translateY(-2px)',
                    },
                    '& > *': {minWidth: 'clamp(0px, (360px - 100%) * 999,100%)'},
                })}
            >

                {/*<Box sx={{width: "80%"}}>*/}
                <Typography level="h1" sx={{fontSize: 'md', fontWeight: "bold", color: "#495057"}} mb={0.5}>

                    <CustomLink
                        href={`freelancers/${proposal.user._id}`}
                    >
                        <Stack direction="row"
                               spacing={2}
                               alignItems="center"
                            // justifyContent="space-around"
                        >
                            <Typography>
                                {proposal.description}
                            </Typography>

                            <Chip
                                color="neutral"
                                variant="outlined"
                                startDecorator={<Avatar alt={proposal.user.name} src={proposal.user.image}/>}
                            >
                                {proposal.user.name}
                            </Chip>
                        </Stack>
                    </CustomLink>

                </Typography>
                <Typography level="h6" sx={{fontSize: 'sm', fontWeight: "light", color: "#495057"}} mb={0.5}>
                    Est. Budget {proposal.price.toFixed(2)} $ | {" "}
                    Submitted {moment(proposal.created_at).fromNow()}
                </Typography>
                {/*{proposal.cover_letter}/*/}

                <Typography level="inherit" sx={{fontSize: 'sm', fontWeight: "medium"}} mb={0.5}>
                    {proposal.cover_letter}
                </Typography>

                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}

                >
                    {proposal.status === Proposal_Status.Approved &&
                        <Chip size="sm" color="success">{proposal.status.split("_").join(" ").toLowerCase()}</Chip>}
                    {proposal.status === Proposal_Status.Canceled &&
                        <Chip size="sm" color="warning">{proposal.status.split("_").join(" ").toLowerCase()}</Chip>}
                    {proposal.status === Proposal_Status.InProgress &&
                        <Chip size="sm" color="neutral">{proposal.status.split("_").join(" ").toLowerCase()}</Chip>}
                    {proposal.status === Proposal_Status.Completed &&
                        <Chip size="sm" color="info">{proposal.status.split("_").join(" ").toLowerCase()}</Chip>}
                    {proposal.status === Proposal_Status.Declined &&
                        <Chip size="sm" color="danger">{proposal.status.split("_").join(" ").toLowerCase()}</Chip>}

                </Stack>
                {proposal.attachments &&
                    <Box sx={{width: "100%"}}>
                        <Divider sx={{margin: "10px"}}/>

                        <Typography level="h1" sx={{fontSize: 'md', fontWeight: "bold", color: "#495057"}} mb={0.5}>
                            Attachments
                        </Typography>

                        {proposal.attachments.length > 0 ?
                            <Attachments attachments={proposal.attachments}/> : <Typography>No Attachments</Typography>
                        }
                    </Box>}


                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        maxWidth: 200,
                    }}
                >
                    {children &&
                        <Box sx={{display: 'flex', gap: 1}}>
                            {children}
                        </Box>}
                </Box>


            </Card>
        </Box>
    );
}
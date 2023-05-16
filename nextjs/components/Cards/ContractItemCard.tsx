import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import {Chip, Stack} from '@mui/joy';
import {Contract, Contract_Status} from "../../types/resolvers";
import moment from "moment";
import CustomLink from "../CustomLinks/CustomLink"


export default function ContractItemCard({contract, children}: {
    contract: Contract,
    children: React.ReactNode
}) {

    // @ts-ignore
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
                        href={`projects/${contract.project_id}`}
                    >
                        {/*{contract.terms.join("\n")}*/}
                        {/*{contract.}*/}
                        {/*<Stack  direction="row"*/}
                        {/*        spacing={2}*/}
                        {/*        alignItems="center"*/}
                        {/*    // justifyContent="space-around"*/}
                        {/*>*/}
                        {/*    <Typography>*/}
                        {/*        {contract.description}*/}
                        {/*    </Typography>*/}

                        {/*    <Chip*/}
                        {/*        color="neutral"*/}
                        {/*        variant="outlined"*/}
                        {/*        startDecorator={<Avatar alt={contract.freelancer.name} src={contract.freelancer.image}/>}*/}
                        {/*    >*/}
                        {/*        {contract.freelancer.name}*/}
                        {/*    </Chip>*/}
                        {/*</Stack>*/}
                    </CustomLink>

                </Typography>
                <Typography level="h6" sx={{fontSize: 'sm', fontWeight: "light", color: "#495057"}} mb={0.5}>
                    Price {contract.price.toFixed(2)} $ | {" "}
                    Fees {contract.fees.toFixed(2)} $ | {" "}
                    Submitted {moment(contract.created_at).fromNow()}
                </Typography>


                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}

                >
                    {contract.status === Contract_Status.Paid &&
                        <Chip size="sm" color="primary">{contract.status.split("_").join(" ").toLowerCase()}</Chip>}
                    {contract.status === Contract_Status.Accepted &&
                        <Chip size="sm" color="success">{contract.status.split("_").join(" ").toLowerCase()}</Chip>}
                    {contract.status === Contract_Status.CancelledByFreelancer &&
                        <Chip size="sm" color="warning">{contract.status.split("_").join(" ").toLowerCase()}</Chip>}
                    {contract.status === Contract_Status.Pending &&
                        <Chip size="sm" color="neutral">{contract.status.split("_").join(" ").toLowerCase()}</Chip>}
                    {contract.status === Contract_Status.Completed &&
                        <Chip size="sm" color="info">{contract.status.split("_").join(" ").toLowerCase()}</Chip>}
                    {contract.status === Contract_Status.CancelledByClient &&
                        <Chip size="sm" color="danger">{contract.status.split("_").join(" ").toLowerCase()}</Chip>}

                </Stack>


                <Stack>
                    <Typography level="h6" mb={0.5}>
                        Contract Terms
                    </Typography>
                    {contract.terms.length > 0 ? contract.terms.map((term, i) =>
                        <Typography key={i}>{i + 1} {term}</Typography>) : <Typography>No terms</Typography>}
                </Stack>


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
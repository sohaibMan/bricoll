import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import {User, UserRole} from "../../types/resolvers";
import Typography from "@mui/joy/Typography";
import LinkAccountButton from "../Buttons/LinkAccountButton";
import {useContext} from "react";


export default function BillingCard({user}: {
    user: User,
}) {
    console.log(user)
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
                    marginTop: "1rem",
                    transition: 'transform 0.3s, border 0.3s',
                    '&:hover': {
                        borderColor: theme.vars.palette.primary.outlinedHoverBorder,
                        transform: 'translateY(-2px)',
                    },
                    '& > *': {minWidth: 'clamp(0px, (360px - 100%) * 999,100%)'},
                })}
            >
                {user.userRole===UserRole.Freelancer && <LinkAccountButton/>}

                {user.payments.map(payment => <Typography textColor={payment.amount >= 0 ? `success.400` : 'error.400'}
                                                          key={payment.contract_id}
                                                          fontSize="xl3" fontWeight="xl"
                                                          my={1}>
                        {payment.currency === 'usd' ? "$" : payment.currency}{" "}{payment.amount}{' '}
                        <Typography fontSize="sm" textColor="text.secondary" fontWeight="md">
                            － {payment.description}
                        </Typography>
                    </Typography>
                )}
            </Card>
        </Box>
    );
}
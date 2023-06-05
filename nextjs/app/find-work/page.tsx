"use client";
import {SetStateAction, useState} from "react";
import {NavBar} from "../../components/FreelancerHome/NavBar";
import {useSession} from "next-auth/react";
import {Avatar, Box, Button, Divider, Stack, Typography,} from "@mui/material";
import Link from "next/link";

import {gql, useQuery} from "@apollo/client";
import {Project} from "../../types/resolvers";
import moment from "moment/moment";
import ProjectItemCard from "../../components/Cards/ProjectItemCard";
import {ProjectCardControlButtons} from "../../components/Cards/ProjectCardControlButtons";
import ProjectItemCardSkeleton from "../../components/Skeletons/ProjectItemCardSkeleton";
import {motion} from "framer-motion";
import { SearchForm } from "../../components/Forms/base/SearchForm";
// import "../../styles/globals.css"

const GET_PROJECTS = gql`
    query Project($query: String, $filter: filterOptionsInput) {
        Projects(query: $query, filter: $filter) {
            _id
            title
            description
            price
            skills
            created_at
            projectScope {
                estimated_duration_in_days
                level_of_expertise
                size_of_project
            }
            category
            reactions {
                freelancer_id
                reaction_type
            }
        }
    }
`;

const Page = () => {

    const {data: session} = useSession();

    console.log("session from find-work, ", session);



    function Projects() {
      "use client"
      
        const {loading, error, refetch, data} = useQuery<{ Projects: Project[] }>(
            GET_PROJECTS
        );

        const containerVariants = {
            visible: {
                opacity: 1,
                border: "2px solid #E3EAF6",
                borderRadius: "12px",
            },
        };

        if (loading)
            return (
                <motion.div
                    animate="visible"
                    variants={containerVariants}
                    transition={{duration: 0.5}}
                    style={{
                        border: "2px solid #E3EAF6",
                        borderRadius: "12px",
                        padding: 4,
                    }}
                >
                    <Stack spacing={4}>
                        <SearchForm onRefetch={refetch}/>
                        <Stack spacing={2}>
                            {[0, 1, 2, 4].map((_, i) => (
                                <ProjectItemCardSkeleton key={i}/>
                            ))}
                        </Stack>
                    </Stack>
                </motion.div>
            );

        if (error) return <Typography>Error : {error.message}</Typography>;
        if (!data) return <Typography>No projects</Typography>;

        return (
            <motion.div
                animate="visible"
                variants={containerVariants}
                transition={{duration: 0.5}}
                style={{
                    border: "2px solid #E3EAF6",
                    borderRadius: "12px",
                    padding: 4,
                }}
            >
                <SearchForm onRefetch={refetch}/>

                <Divider sx={{my: 4, mx: 6}}/>

                <Typography variant="h6" fontWeight="bold" mx={2} my={4}>
                    Jobs you might like
                </Typography>

                <Stack mx={2} spacing={2}>
                    {data.Projects.slice()
                        .sort((a, b) =>
                            moment(b.created_at).isAfter(a.created_at) ? 1 : -1
                        )
                        .map((project) => (
                            <ProjectItemCard key={project._id.toString()} project={project}>
                                <ProjectCardControlButtons
                                    projectId={project._id}
                                    reactions={project.reactions}
                                />
                            </ProjectItemCard>
                        ))}
                </Stack>
            </motion.div>
        );
    }

    return (
        <>
            <NavBar/>
            <Box component="section">
                <Box
                    sx={{
                        mx: "auto",
                        my: "5%",
                        display: "grid",
                        gap: 6,
                        gridTemplateColumns: "1fr",
                        md: "repeat(12, 1fr)",
                    }}
                >
                    {/* Left Sidebar */}
                    <Box
                        sx={{
                            marginLeft: "10%",
                            marginRight: "3%",
                            marginTop: "3%",
                            gridColumn: "1 / span 8",
                            bgcolor: "gray.200",
                            overflow: "hidden",
                            transition: "all 300ms",
                        }}
                    >
                        <Projects/>
                    </Box>

                    {/* Right Side */}
                    <Box
                        sx={{
                            marginTop: "10%",
                            marginRight: "0%",
                            gridColumn: "9 / span 8",
                            bgcolor: "gray.100",
                        }}
                    >
                        {/* User Card */}
                        <Box
                            sx={{
                                p: 2,
                                mx: 6,
                                bgcolor: "white",
                                border: "2px solid #E3EAF6",
                                borderRadius: "15px",
                                height: "64",
                                boxShadow: "lg",
                            }}
                        >
                            <Box
                                sx={{display: "flex", mx: 2, alignItems: "center", spaceX: 4}}
                            >
                                <Box
                                    mx={2}
                                    sx={{
                                        borderRadius: "full",
                                        overflow: "hidden",
                                        width: "12",
                                        height: "12",
                                    }}
                                >
                                    {session?.user.image && (
                                        <Avatar
                                            sx={{width: "50px", height: "50px"}}
                                            alt={session.user.username}
                                            src={session.user.image}
                                        />
                                    )}
                                </Box>
                                <Box>
                                    <Typography sx={{color: "gray.800", fontWeight: "bold"}}>
                                        {session?.user.username}
                                    </Typography>
                                    <Typography sx={{color: "gray.500"}}>
                                        {session?.user.jobTitle}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{p: 4, my: 6}}>
                                <Button
                                    variant="contained"
                                    color="success"
                                    sx={{
                                        display: "block",
                                        mx: "auto",
                                        textTransform: "none",
                                        width: "44",
                                        bgcolor: "success",
                                        // "&:hover": { bgcolor: "success" },
                                    }}
                                >
                                    <Link href="/dashboard">Dashboard</Link>
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            {/* <FooterSection /> */}
        </>
    );
};

export default Page;

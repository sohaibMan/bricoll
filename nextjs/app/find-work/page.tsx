"use client";
import { SetStateAction, useState } from "react";
import { NavBar } from "../../components/FreelancerHome/NavBar";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Avatar } from "@mui/material";
import Link from "next/link";
import { FooterSection } from "../../components/FreelancerHome/Footer";

import { gql, useQuery } from "@apollo/client";
import { Project } from "../../types/resolvers";
import { Stack } from "@mui/joy";
import moment from "moment/moment";
import ProjectItemCard from "../../components/FreelancerHome/Cards/ProjectItemCard";
import { ProjectCardControlButtons } from "../../components/FreelancerHome/Cards/ProjectCardControlButtons";
import ProjectItemCardSkeleton from "../../components/Skeletons/ProjectItemCardSkeleton";
import { SearchForm } from "../../components/FreelancerHome/Cards/SearchForm";
import { motion } from 'framer-motion';

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
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("bestMatches");
  const { data: session } = useSession();

  console.log("session from find-work, ", session);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleTabChange = (tab: SetStateAction<string>) => {
    setActiveTab(tab);
  };

 function Projects() {
    // the types are not specific to check the query if you have any problem

    const {loading, error, refetch, data} = useQuery<{ Projects: Project[] }>(GET_PROJECTS);

    if (loading) return <Stack spacing={4}>
        <SearchForm onRefetch={refetch}/>
        <Stack spacing={2}>
            {
                [0, 1, 2, 4].map((_, i) => <ProjectItemCardSkeleton key={i}/>)
            }
        </Stack>
    </Stack>


    if (error) return <p>Error : {error.message}</p>;
    if (!data) return <p>No projects</p>
    const containerVariants = {
    visible: { opacity: 1, border: '2px solid #E3EAF6', borderRadius: '12px' },
  };
  


    // return <Stack spacing={4}>
    //     <SearchForm onRefetch={refetch}/>
    //     <Stack
    //         spacing={2}>{data.Projects.slice().sort((a, b) => moment(b.created_at).isAfter(a.created_at) ? 1 : -1).map((project) =>
    //         <ProjectItemCard key={project._id.toString()} project={project}>
    //             <ProjectCardControlButtons projectId={project._id} reactions={project.reactions}/>
    //         </ProjectItemCard>
    //     )}</Stack>
    // </Stack>
    return (
      <motion.div
        animate="visible"
        variants={containerVariants}
        transition={{ duration: 0.5 }}
        className="border border-solid border-blue-200 rounded p-4"
      >
        <SearchForm onRefetch={refetch} />
  
        <hr className="border-t-2 border-newColor my-8" />

        <h2 className="font-semibold text-2xl mx-2 my-8 ">Jobs you might like</h2>
  
        <Stack spacing={2}>
          {data.Projects.slice()
            .sort((a, b) => moment(b.created_at).isAfter(a.created_at) ? 1 : -1)
            .map((project) => (
              <ProjectItemCard key={project._id.toString()} project={project}>
                <ProjectCardControlButtons projectId={project._id} reactions={project.reactions} />
              </ProjectItemCard>
            ))}
        </Stack>
      </motion.div>
    );
    
}

  return (
    <>
      <NavBar />
      <section>
        <div className="container mx-auto my-16 grid gap-6 grid-cols-1 md:grid-cols-12">
          {/* Left Sidebar */}
          <div
            style={{ marginLeft: "10%", marginRight: "10%", marginTop: "3%" }}
            className={`md:col-span-8 lg:col-span-9 bg-gray-200 overflow-hidden transition-all duration-300`}
          >
            <Projects />
          </div>

          {/* Right Side */}
          <div
            style={{ marginTop: "10%", marginRight: "10%" }}
            className="hidden md:block md:col-span-4 lg:col-span-3 bg-gray-100"
          >
            {/* User Card */}
            <div className="p-4 bg-white h-64 rounded-lg shadow-md">
              <div className="flex mx-14 items-center space-x-4">
                <div className="rounded-full overflow-hidden w-12 h-12">
                  {session?.user.image && (
                    <Avatar
                      style={{ width: "50px", height: "50px" }}
                      alt={session.user.username}
                      src={session.user.image}
                    />
                    // <Image
                    //   src={session?.user.image}
                    //   alt="User"
                    //   width={50}
                    //   height={50}
                    //   className="object-cover w-full h-full"
                    // />
                  )}
                </div>
                <div>
                  <p className="text-gray-800 font-semibold">
                    {session?.user.username}
                  </p>
                  <p className="text-gray-500">{session?.user.jobTitle}</p>
                </div>
              </div>
              <div className="p-4 my-6 ">
                <button className="block text-center text-white bg-primary_2 hover:bg-primary_3 py-2 rounded-md font-medium w-full">
                  <Link href="/dashboard">Dashboard</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FooterSection />
    </>
  );
};

export default Page;

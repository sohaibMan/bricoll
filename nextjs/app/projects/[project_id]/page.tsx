"use client";
import { useParams } from "next/navigation";
import { gql, useQuery } from "@apollo/client";
import { Project } from "../../../types/resolvers";
import ProjectCard from "../../../components/Cards/ProjectCard";
import * as React from "react";
import Typography from "@mui/joy/Typography";
import { NavBar } from "../../../components/FreelancerHome/NavBar";
import { LoadingDashboard } from "../../../components/Dashboard/LoadingDashboard";
import { useSession } from "next-auth/react";
import { Avatar } from "@mui/material";
import Link from "next/link";
import { FooterSection } from "../../../components/FreelancerHome/Footer";
import { Button, Modal, ModalClose, ModalDialog } from "@mui/joy";
import SubmitProposalForm from "../../../components/Forms/wrappers/SubmitProposalForm";
import { useState } from "react";

const GET_PROJECT = gql`
  query Project($projectId: ObjectID!) {
    Project(id: $projectId) {
      client_id
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
      attachments {
        url
        name
        type
      }
      category
      stats {
        declined_count
        completed_count
        approved_count
        in_progress_count
      }
      proposals {
        _id ##get the proposals of me as a freelancer to this project
      }
    }
  }
`;

export default function Project() {
  const params = useParams();
  if (!params) return <></>;
  const { project_id } = params;
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  if (!project_id) return <></>;

  const { loading, error, data } = useQuery<{ Project: Project }>(GET_PROJECT, {
    variables: {
      projectId: project_id,
    },
  });

  if (loading) return <LoadingDashboard />;
  if (error) return <h1>{error.message}</h1>;
  if (!data || !data.Project) return <h1>bobo</h1>;
  return (
    <>
      <NavBar />
      <section>
        <div className="container mx-auto my-16 grid gap-6 grid-cols-1 md:grid-cols-12">
          {/* Left Sidebar */}
          <div
            style={{ marginLeft: "10%", marginRight: "3%", marginTop: "3%" }}
            className={`md:col-span-8 lg:col-span-9 bg-gray-200 overflow-hidden transition-all duration-300`}
          >
            <ProjectCard project={data.Project} />
            {data.Project.proposals && data.Project.proposals.length > 0 ? (
              <Typography sx={{}} level="h6">
                You already submitted a proposal
              </Typography>
            ) : (
              //   <div className=" my-8 mx-96" onClick={() => setOpen(true)}>
              <Button onClick={() => setOpen(true)}>Submit a proposal</Button>
              //   </div>
            )}
          </div>
          {/* Right Side */}
          <div
            style={{ marginTop: "10%", marginRight: "13%" }}
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
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ minWidth: "50%", overflowY: "auto" }}
        >
          <ModalClose />
          <SubmitProposalForm project_id={project_id.toString()} />
        </ModalDialog>
      </Modal>
    </>
  );
}

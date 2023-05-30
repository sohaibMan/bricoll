"use client";
import { SetStateAction, useState } from "react";
import { NavBar } from "../../components/FreelancerHome/NavBar";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Projects from "../../components/FreelancerHome/projects";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Avatar } from "@mui/material";
import Link from "next/link";
import { FooterSection } from "../../components/FreelancerHome/Footer";

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

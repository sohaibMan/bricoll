"use client"
import { SetStateAction, useState } from "react";
import { NavBar } from "../../components/FreelancerHome/NavBar";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Projects from "../../components/FreelancerHome/projects";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("bestMatches");

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
        <div className="container mx-auto grid gap-6 grid-cols-1 md:grid-cols-12">
          {/* Left Sidebar */}
          <div
            className={`md:col-span-8 lg:col-span-9 bg-gray-200 overflow-hidden transition-all duration-300`}
          >

          <Projects/>



          </div>

          {/* Right Side */}
          <div className="hidden md:block md:col-span-4 lg:col-span-3 bg-gray-100">
            {/* User Card */}
            <div className="p-4 bg-white rounded-lg shadow-md">
              <div className="flex mx-14 items-center space-x-4">
                <div className="rounded-full overflow-hidden w-12 h-12">
                  <img
                    src="/man.jpg" // Replace with your image URL
                    alt="User"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="text-gray-800 font-semibold">John Doe</p>
                  <p className="text-gray-500">UI/UX Designer</p>
                </div>
              </div>
              <div className="p-4 my-6">
                <button className="block text-center text-white bg-primary_2 hover:bg-primary_3 py-2 rounded-md font-medium w-full">
                  Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;


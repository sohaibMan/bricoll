import { SetStateAction, useState } from "react";
import { NavBar } from "../components/FreelancerHome/NavBar";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

const FindWork = () => {
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
            {/* Search bar */}
            <div className="p-4">
              <TextField
                type="text"
                placeholder="Search for job"
                variant="outlined"
                fullWidth
                InputProps={{
                  endAdornment: <SearchIcon />,
                  classes: {
                    root: "bg-white",
                    notchedOutline: "border-gray-300",
                  },
                }}
              />
            </div>

            {/* Jobs you might like */}
            <div className="p-4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Jobs you might like</h2>

                {/* Filtering tabs */}
                <div className="flex justify-between mb-4">
                  <button
                    className={`text-primary_2 font-medium ${
                      activeTab === "bestMatches"
                        ? "text-primary_3"
                        : "hover:text-primary_3"
                    }`}
                    onClick={() => handleTabChange("bestMatches")}
                  >
                    Best Matches
                  </button>
                  <button
                    className={`text-gray-500 font-medium ${
                      activeTab === "mostRecent"
                        ? "text-primary_3"
                        : "hover:text-primary_3"
                    }`}
                    onClick={() => handleTabChange("mostRecent")}
                  >
                    Most Recent
                  </button>
                </div>

                {/* Project cards */}
                {/* Replace with your own project cards */}
                <div className="grid gap-4">
                  <div className="bg-white rounded-lg shadow-md p-4 transform transition duration-300 hover:scale-105 cursor-pointer">
                    <h3 className="text-lg font-bold">Project 1</h3>
                    <p className="text-gray-500 mb-2">Level: Intermediate</p>
                    <p className="text-gray-500">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-gray-500">$500</span>
                      <button className="bg-primary_2 hover:bg-primary_3 text-white font-medium py-2 px-4 rounded">
                        View Details
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-4 transform transition duration-300 hover:scale-105 cursor-pointer">
                    <h3 className="text-lg font-bold">Project 2</h3>
                    <p className="text-gray-500 mb-2">Level: Beginner</p>
                    <p className="text-gray-500">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-gray-500">$300</span>
                      <button className="bg-primary_2 hover:bg-primary_3 text-white font-medium py-2 px-4 rounded">
                        View Details
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-4 transform transition duration-300 hover:scale-105 cursor-pointer">
                    <h3 className="text-lg font-bold">Project 3</h3>
                    <p className="text-gray-500 mb-2">Level: Advanced</p>
                    <p className="text-gray-500">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-gray-500">$800</span>
                      <button className="bg-primary_2 hover:bg-primary_3 text-white font-medium py-2 px-4 rounded">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

export default FindWork;


"use client"
import React, {useContext, useState} from "react";
import {TextField} from "@mui/material";
import {multiStepContext, UserData} from "./stepContext";
import Chip from "@mui/material/Chip";
import {UserRole} from "../../../types/resolvers";
import Autocomplete from "@mui/joy/Autocomplete";
import {toast} from "react-hot-toast";

export default function FirstStep() {
    const {setStep, userData, userRole} = useContext(multiStepContext);

    const [skillCategories, setSkillCategories] = useState(
        userData.skillsCategories || [] as string[]
    );
    const [specificSkills, setSpecificSkills] = useState(
        userData.specificSkills || [] as string[]
    );

    const [skillLevel, setSkillsLevel] = useState(
        userData.skillsLevel || [] as string[]);


    const handleSpecificSkills = (skill: string) => {
        setSpecificSkills((prv) => [...prv, skill]);
        userData.specificSkills = specificSkills;
    };

    const handleSkillsLevel = (level: string) => {
        setSkillsLevel(prv => [...prv, level]);
        userData.skillsLevel = skillLevel
    };
    const handleskillsCategories = (categorie: string) => {
        setSkillCategories(prv => [...prv, categorie]);
        userData.skillsCategories = skillCategories
    };

    const popularSkillsCategories = [
        "Web Development",
        "Mobile Development",
        "Video Editor",
        "Graph Design",
        "Social Media",
        "Marketer",
    ];

    const popularSpecificSkills = [
        "Java",
        "Javascript/Typescript",
        "C/C++",
        "Rust",
        "Elixir",
        "Angular",
        "React",
        "HTML/CSS",
    ];

    const popularSkillsLevel = ["Beginner", "Intermediate", "Advanced", "Expert"];

    function handleSubmit() {
        const freelancerRequiredFields = ["jobTitle", "company", "educationLevel"];
        const clientRequiredFields = [
            "skillCategories",
            "specificSkills",
            "skillLevel",
        ];

        const requiredFields =
            userRole === UserRole.Freelancer
                ? freelancerRequiredFields
                : clientRequiredFields;

        // const missingFields = requiredFields.filter((field) => field in userData && !userData[field as keyof UserData]);
        const missingFields = requiredFields.filter((field) => !userData[field]);

        if (missingFields.length) {
            toast.error(
                `Please fill in the following fields: ${missingFields.join(", ")}`
            );
        } else {
            setStep(4);
        }
    }

    return (
        <div style={{width: "50%"}}>
            {userRole === UserRole.Freelancer ? (
                <>
                    <div>
                        <TextField
                            style={{width: "100%"}}
                            label="Job Title"
                            margin="normal"
                            variant="outlined"
                            color="primary"
                            name="jobTitle"
                            defaultValue={userData["jobTitle"]}
                            onChange={(e) =>
                                userData.jobTitle = e.target.value
                            }
                        />
                    </div>
                    <div>
                        <TextField
                            style={{width: "100%"}}
                            label="Company Name"
                            margin="normal"
                            variant="outlined"
                            color="primary"
                            name="company"
                            defaultValue={userData["company"]}
                            onChange={(e) =>
                                userData.company = e.target.value
                            }
                        />
                    </div>
                    <div>
                        <TextField
                            style={{width: "100%"}}
                            label="Education Level"
                            margin="normal"
                            variant="outlined"
                            color="primary"
                            name="educationLevel"
                            defaultValue={userData["educationLevel"]}
                            onChange={(e) =>
                                userData.educationLevel = e.target.value
                            }
                        />
                    </div>
                </>
            ) : (
                <>
                    <div style={{marginBottom: "10px"}}>
                        <Autocomplete
                            defaultValue={userData["skillCategories"]}
                            placeholder={"Choose desired categories"}
                            multiple
                            id="tags-filled"
                            style={{width: "100%", margin: "auto"}}
                            options={popularSkillsCategories}
                            freeSolo
                            onChange={(event, categorie) => {
                                handleskillsCategories(categorie as unknown as string);
                            }}
                            renderTags={(value: string[], getTagProps) =>
                                value.map((option: string, index: number) => (
                                    <Chip
                                        {...getTagProps({index})}
                                        variant="outlined"
                                        label={option}

                                    />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="filled"
                                    label="Category"
                                    placeholder="add a  Category..."
                                />
                            )}
                        />
                    </div>
                    <div style={{marginBottom: "10px"}}>
                        <Autocomplete
                            placeholder={"Enter some specific skills you search for"}
                            multiple
                            style={{width: "100%", margin: "auto"}}
                            id="tags-filled"
                            options={popularSpecificSkills}
                            defaultValue={specificSkills}
                            freeSolo
                            onChange={(event, newSkills: string) => {
                                handleSpecificSkills(newSkills);
                            }}
                            renderTags={(value: string[], getTagProps) =>
                                value.map((option: string, index: number) => (
                                    <Chip
                                        {...getTagProps({index})}
                                        variant="outlined"
                                        label={option}

                                    />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="filled"
                                    label="Specific Skills"
                                    placeholder="add more specific skill..."
                                />
                            )}
                        />
                    </div>
                    <div style={{marginBottom: "10px"}}>
                        <Autocomplete
                            placeholder={"Choose a skills level"}
                            multiple
                            id="tags-filled"
                            style={{width: "100%", margin: "auto"}}
                            options={popularSkillsLevel}
                            defaultValue={skillLevel}
                            freeSolo
                            onChange={(event, newSkills) => {
                                handleSkillsLevel(newSkills as unknown as string);
                            }}
                            renderTags={(value: string[], getTagProps) =>
                                value.map((option: string, index: number) => (
                                    <Chip
                                        {...getTagProps({index})}
                                        variant="outlined"
                                        label={option}

                                    />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="filled"
                                    label="Skills Level"
                                    placeholder="add skill level..."
                                />
                            )}
                        />
                    </div>

                </>
            )}
            <div>
                <div className={"flex flex-col gap-2"}>

                    <button
                        className="py-2 px-20 rounded-full font-medium text-base text-white bg-red-300"

                        onClick={() => setStep(2)}
                    >
                        Prev
                    </button>

                    <button
                        className="py-2 px-20 rounded-full font-medium text-base text-white bg-primary"
                        onClick={handleSubmit}
                    >
                        Next
                    </button>


                </div>
            </div>
        </div>
    );
}

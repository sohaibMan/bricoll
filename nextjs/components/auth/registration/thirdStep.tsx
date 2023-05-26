"use client"
import React, {useContext, useState} from "react";
import {Button, TextField} from "@mui/material";
import {multiStepContext} from "./stepContext";
import {toast} from "react-hot-toast";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import {UserRole} from "../../../types/resolvers";

export default function FirstStep() {
    const {setStep, userData, setUserData} = useContext(multiStepContext);
    const userRole = userData.userRole as UserRole;
    const [skillCategories, setSkillCategories] = useState<any>(
        userData.skillCategories || []
    );
    const [specificSkills, setSpecificSkills] = useState<any>(
        userData.specificSkills || []
    );

    const [skillLevel, setSkillsLevel] = useState<any>(
        userData.skillLevel || []
    );

    const handleSkillCategories = (newSkills: any) => {
        setSkillCategories(newSkills);
        setUserData({...userData, skillCategories: newSkills});
    };

    const handleSpecificSkills = (newSkills: any) => {
        setSpecificSkills(newSkills);
        setUserData({...userData, specificSkills: newSkills});
    };

    const handleSkillsLevel = (newSkills: any) => {
        setSkillsLevel(newSkills);
        setUserData({...userData, skillLevel: newSkills});
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
        <div>
            {userRole === UserRole.Freelancer ? (
                <>
                    <div>
                        <TextField
                            style={{width: "30%"}}
                            label="Job Title"
                            margin="normal"
                            variant="outlined"
                            color="primary"
                            name="jobTitle"
                            defaultValue={userData["jobTitle"]}
                            onChange={(e) =>
                                setUserData({...userData, jobTitle: e.target.value})
                            }
                        />
                    </div>
                    <div>
                        <TextField
                            style={{width: "30%"}}
                            label="Company Name"
                            margin="normal"
                            variant="outlined"
                            color="primary"
                            name="company"
                            defaultValue={userData["company"]}
                            onChange={(e) =>
                                setUserData({...userData, company: e.target.value})
                            }
                        />
                    </div>
                    <div>
                        <TextField
                            style={{width: "30%"}}
                            label="Education Level"
                            margin="normal"
                            variant="outlined"
                            color="primary"
                            name="educationLevel"
                            defaultValue={userData["educationLevel"]}
                            onChange={(e) =>
                                setUserData({...userData, educationLevel: e.target.value})
                            }
                        />
                    </div>
                </>
            ) : (
                <>
                    <div style={{marginBottom: "10px", marginTop: "20px"}}>
                        <Autocomplete
                            multiple
                            style={{width: "40%", margin: "auto"}}
                            id="tags-filled"
                            options={popularSkillsCategories}
                            defaultValue={skillCategories}
                            freeSolo
                            onChange={(event, newSkills) => {
                                handleSkillCategories(newSkills);
                            }}
                            renderTags={(value: string[], getTagProps) =>
                                value.map((option: string, index: number) => (
                                    <Chip
                                        variant="outlined"
                                        label={option}
                                        {...getTagProps({index})}
                                    />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="filled"
                                    label="Skills Categories"
                                    placeholder="add more skill categories..."
                                />
                            )}
                        />
                    </div>
                    {/* <SkillsAutocomplete skill={skill} setSkills={setSkills}/> */}
                    <div style={{marginBottom: "10px"}}>
                        <Autocomplete
                            multiple
                            style={{width: "40%", margin: "auto"}}
                            id="tags-filled"
                            options={popularSpecificSkills}
                            defaultValue={specificSkills}
                            freeSolo
                            onChange={(event, newSkills) => {
                                handleSpecificSkills(newSkills);
                            }}
                            renderTags={(value: string[], getTagProps) =>
                                value.map((option: string, index: number) => (
                                    <Chip
                                        variant="outlined"
                                        label={option}
                                        {...getTagProps({index})}
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
                            multiple
                            id="tags-filled"
                            style={{width: "40%", margin: "auto"}}
                            options={popularSkillsLevel}
                            defaultValue={skillLevel}
                            freeSolo
                            onChange={(event, newSkills) => {
                                handleSkillsLevel(newSkills);
                            }}
                            renderTags={(value: string[], getTagProps) =>
                                value.map((option: string, index: number) => (
                                    <Chip
                                        variant="outlined"
                                        label={option}
                                        {...getTagProps({index})}
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
                <Button
                    style={{marginRight: "80px", marginTop: "50px"}}
                    variant="contained"
                    color="primary"
                    onClick={() => setStep(2)}
                >
                    {" "}
                    Back{" "}
                </Button>{" "}
                <span></span>
                <Button
                    style={{marginTop: "50px"}}
                    variant="contained"
                    color="success"
                    type="submit"
                    onClick={handleSubmit}
                >
                    {" "}
                    Next{" "}
                </Button>
            </div>
        </div>
    );
}

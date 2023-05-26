"use client"
import React, {useContext, useState} from "react";
import {Button, TextField} from "@mui/material";
import {multiStepContext} from "./stepContext";
import {toast} from "react-hot-toast";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import {UserRole} from "../../../types/resolvers";

export default function SecondStep() {
    const {setStep, userData, setUserData} = useContext(multiStepContext);
    const [skills, setSkills] = useState(userData.skills || []);
    const userRole = userData.userRole as UserRole;

    const handleSkillsChange = (newSkills) => {
        setSkills(newSkills);
        setUserData({...userData, skills: newSkills});
    };

    const popularSkills = [
        "Web Development",
        "Mobile Development",
        "Video Editor",
        "Graph Design",
        "Social Media",
        "Marketer",
    ];

    function handleSubmit() {
        const freelancerRequiredFields = [
            "profileTitle",
            "experienceLevel",
            "category",
            "skills",
        ];
        const clientRequiredFields = [
            "companyName",
            "website",
            "industry",
            "yearFounded",
            "ownershipType",
        ];

        const requiredFields =
            userRole === "Freelancer"
                ? freelancerRequiredFields
                : clientRequiredFields;

        const missingFields = requiredFields.filter((field) => !userData[field]);

        if (missingFields.length) {
            toast.error(
                `Please fill in the following fields: ${missingFields.join(", ")}`
            );
        } else {
            setStep(3);
        }
    }

    return (
        <div>
            {userRole === "Freelancer" ? (
                <>
                    <div>
                        <TextField
                            style={{width: "30%"}}
                            label="Profile Title"
                            margin="normal"
                            variant="outlined"
                            color="primary"
                            name="profileTitle"
                            defaultValue={userData["profileTitle"]}
                            onChange={(e) =>
                                setUserData({...userData, profileTitle: e.target.value})
                            }
                        />
                    </div>
                    <div>
                        <TextField
                            style={{width: "30%"}}
                            label="Experience Level"
                            margin="normal"
                            variant="outlined"
                            color="primary"
                            name="experienceLevel"
                            defaultValue={userData["experienceLevel"]}
                            onChange={(e) =>
                                setUserData({...userData, experienceLevel: e.target.value})
                            }
                        />
                    </div>
                    <Autocomplete
                        multiple
                        id="tags-filled"
                        options={popularSkills}
                        defaultValue={skills}
                        freeSolo
                        onChange={(event, newSkills) => {
                            handleSkillsChange(newSkills);
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
                                label="Skills"
                                placeholder="add more skills..."
                            />
                        )}
                    />
                    <div>
                        <TextField
                            style={{width: "30%"}}
                            label="Category"
                            margin="normal"
                            variant="outlined"
                            color="primary"
                            name="category"
                            defaultValue={userData["category"]}
                            onChange={(e) =>
                                setUserData({...userData, category: e.target.value})
                            }
                        />
                    </div>
                </>
            ) : (
                <>
                    <div>
                        <TextField
                            style={{width: "30%"}}
                            label="Company Name"
                            margin="normal"
                            variant="outlined"
                            color="primary"
                            name="companyName"
                            defaultValue={userData["companyName"]}
                            onChange={(e) =>
                                setUserData({...userData, companyName: e.target.value})
                            }
                        />
                    </div>
                    <div>
                        <TextField
                            style={{width: "30%"}}
                            label="Website"
                            margin="normal"
                            variant="outlined"
                            color="primary"
                            name="website"
                            placeholder="https://www.yourcompanywebsite.com"
                            defaultValue={userData["website"]}
                            onChange={(e) =>
                                setUserData({...userData, website: e.target.value})
                            }
                        />
                    </div>
                    <div>
                        <TextField
                            style={{width: "30%"}}
                            label="Industry"
                            margin="normal"
                            variant="outlined"
                            color="primary"
                            name="industry"
                            defaultValue={userData["industry"]}
                            onChange={(e) =>
                                setUserData({...userData, industry: e.target.value})
                            }
                        />
                    </div>
                    <div>
                        <TextField
                            style={{width: "30%"}}
                            label="Year Founded"
                            margin="normal"
                            variant="outlined"
                            color="primary"
                            name="yearFounded"
                            defaultValue={userData["yearFounded"]}
                            onChange={(e) =>
                                setUserData({...userData, yearFounded: e.target.value})
                            }
                        />
                    </div>
                    <div>
                        <TextField
                            style={{width: "30%"}}
                            label="Ownership Type"
                            margin="normal"
                            variant="outlined"
                            color="primary"
                            name="ownershipType"
                            defaultValue={userData["ownershipType"]}
                            onChange={(e) =>
                                setUserData({...userData, ownershipType: e.target.value})
                            }
                        />
                    </div>
                </>
            )}
            <div>
                <Button
                    style={{marginRight: "80px", marginTop: "50px"}}
                    variant="contained"
                    color="primary"
                    onClick={() => setStep(1)}
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

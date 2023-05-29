"use client"
import React, {useContext} from "react";
import {TextField} from "@mui/material";
import {multiStepContext, UserData} from "./stepContext";
import {toast} from "react-hot-toast";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";

export default function SecondStep() {
    const {setStep, userData, userRole} = useContext(multiStepContext);


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

        const missingFields = requiredFields.filter((field) => field in userData && !userData[field as keyof UserData]);


        if (missingFields.length) {
            toast.error(
                `Please fill in the following fields: ${missingFields.join(", ")}`
            );
        } else {
            setStep(3);
        }
    }

    return (
        <div style={{width: "50%"}}>
            {userRole === "Freelancer" ? (
                <>
                    <div>
                        <TextField
                            style={{width: "100%"}}
                            label="Profile Title"
                            margin="normal"
                            variant="outlined"
                            color="primary"
                            name="profileTitle"
                            defaultValue={userData["profileTitle"]}
                            onChange={(e) =>
                                userData.profileTitle = e.target.value
                            }
                        />
                    </div>
                    <div>
                        <TextField
                            style={{width: "100%"}}
                            label="Experience Level"
                            margin="normal"
                            variant="outlined"
                            color="primary"
                            name="experienceLevel"
                            defaultValue={userData["experienceLevel"]}
                            onChange={(e) =>
                                userData.experienceLevel = e.target.value
                            }
                        />
                    </div>
                    <Autocomplete
                        multiple
                        id="tags-filled"
                        options={popularSkills}
                        // defaultValue={userData.skills}
                        freeSolo
                        onChange={(event, newSkill) => {
                            if (!userData.skills) {
                                userData.skills = []
                            }
                            userData.skills.push(newSkill as unknown as string)
                        }}
                        renderTags={(value: string[], getTagProps) =>
                            value.map((option: string, index: number) => (
                                <Chip
                                    {...getTagProps({index})}
                                    key={index}
                                    variant="outlined"
                                    label={option}
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
                            style={{width: "100%"}}
                            label="Category"
                            margin="normal"
                            variant="outlined"
                            color="primary"
                            name="category"
                            defaultValue={userData["category"]}
                            onChange={(e) =>
                                userData.category = e.target.value
                            }
                        />
                    </div>
                </>
            ) : (
                <>
                    <div>
                        <TextField
                            style={{width: "100%"}}
                            label="Company Name"
                            margin="normal"
                            variant="outlined"
                            color="primary"
                            name="companyName"
                            defaultValue={userData["companyName"]}
                            onChange={(e) =>
                                userData.companyName = e.target.value
                            }
                        />
                    </div>
                    <div>
                        <TextField
                            style={{width: "100%"}}
                            label="Website"
                            margin="normal"
                            variant="outlined"
                            color="primary"
                            name="website"
                            placeholder="https://www.yourcompanywebsite.com"
                            defaultValue={userData["website"]}
                            onChange={(e) =>
                                userData.website = e.target.value
                            }
                        />
                    </div>
                    <div>
                        <TextField
                            style={{width: "100%"}}
                            label="Industry"
                            margin="normal"
                            variant="outlined"
                            color="primary"
                            name="industry"
                            defaultValue={userData["industry"]}
                            onChange={(e) =>
                                userData.industry = e.target.value
                            }
                        />
                    </div>
                    <div>
                        <TextField
                            style={{width: "100%"}}
                            label="Year Founded"
                            margin="normal"
                            variant="outlined"
                            color="primary"
                            name="yearFounded"
                            // type={"date"}
                            defaultValue={userData.yearFounded || null}
                            onChange={(e) =>
                                userData.yearFounded = +e.target.value
                            }
                        />
                    </div>
                    <div>
                        <TextField
                            style={{width: "100%"}}
                            label="Ownership Type"
                            margin="normal"
                            variant="outlined"
                            color="primary"
                            name="ownershipType"
                            defaultValue={userData["ownershipType"]}
                            onChange={(e) =>
                                userData.ownershipType = e.target.value
                            }
                        />
                    </div>
                </>
            )}
            <div>

                <div className={"flex flex-col gap-2"}>

                    <button
                        className="py-2 px-20 rounded-full font-medium text-base text-white bg-red-300"

                        onClick={() => setStep(1)}
                    >
                        Prev
                    </button>

                    <button
                        className="py-2 px-20 rounded-full font-medium text-base text-white bg-primary"
                        onClick={() => handleSubmit()}
                    >
                        Next
                    </button>


                </div>
            </div>
        </div>
    );
}

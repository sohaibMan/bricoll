"use client"
import React, {ChangeEvent, useContext, useState} from "react";
import {TextField} from "@mui/material";
import {multiStepContext, UserData} from "./stepContext";
import {toast} from "react-hot-toast";
import DropZone from "../../Dashboard/DropZone";
import {useRouter} from "next/navigation";
import Avatar from "@mui/joy/Avatar";
import {Box, Stack} from "@mui/joy";

export default function FourthStep() {
    const router = useRouter();
    const {userData, setStep, userRole} = useContext(multiStepContext);
    const [imageLinkState, setImageLinkState] = useState(userData.image || "");


    async function profileHandling(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        const freelancerRequiredFields = ["portfolio", "image"];
        const clientRequiredFields = ["jobTitle", "educationLevel", "image"];

        const requiredFields =
            userRole === "Freelancer"
                ? freelancerRequiredFields
                : clientRequiredFields;

        const missingFields = requiredFields.filter((field) => field in userData && !userData[field as keyof UserData]);

        if (missingFields.length) {
            return toast.error(
                `Please fill in the following fields: ${missingFields.join(", ")}`
            );
        }


        await toast.promise(fetch(`/api/users/createProfile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        }).then((res) => {
            return res.json();
        }).then((data) => {
            if (data.status === "failed") {
                throw new Error(data.message);
            }
            return data;
        }), {
            loading: "Creating profile...",
            success: (data: { message: string }) => {
                if (userRole === "Freelancer") {
                    router.push("/find-work");
                } else {
                    router.push("/dashboard");
                }
                return data.message;
            },
            error: (err) => {
                return err.message;
            }

        }).catch(e => console.error(e));
    }

    return (
        <form onSubmit={profileHandling} style={{alignItems: "center", width: "50%"}}>
            {userRole === "Freelancer" ? (
                <>
                    <TextField
                        sx={{width: "100%"}}
                        label="Portfolio Link"
                        margin="normal"
                        variant="outlined"
                        color="primary"
                        name="portfolio"
                        defaultValue={userData["portfolio"]}
                        onChange={(e) =>
                            userData.portfolio = e.target.value
                        }
                    />

                    <DropZone
                        uploadHandler={(url) => userData.image = url}
                    />
                </>
            ) : (
                <>
                    <TextField
                        sx={{width: "100%"}}
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

                    <TextField
                        sx={{width: "100%"}}
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

                    <Stack sx={{alignItems: "center"}} spacing={4} direction={"column"}>
                        <Avatar
                            size="lg"
                            src={imageLinkState}
                            sx={{"--Avatar-size": "64px", marginTop: "1rem"}}
                        />
                        <Box sx={{width: "100%"}}>
                            <DropZone
                                uploadHandler={(url => {
                                    setImageLinkState(url);
                                    userData.image = url
                                })}
                            />
                        </Box>
                    </Stack>
                </>
            )}


            <div className={"flex gap-2 flex-col mt-4"}>

                <button
                    className="py-2 px-20 rounded-full font-medium text-base text-white bg-red-300"

                    onClick={() => setStep(3)}
                >
                    Prev
                </button>

                {
                    <button
                        type="submit"
                        className="py-2 px-20 rounded-full font-medium text-base text-white bg-primary"
                    >

                        Submit
                    </button>


                }

            </div>
        </form>
    );
}

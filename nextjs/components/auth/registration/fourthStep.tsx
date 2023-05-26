"use client"
import React, {ChangeEvent, useContext, useState} from "react";
import {Button, TextField} from "@mui/material";
import {multiStepContext} from "./stepContext";
import {toast} from "react-hot-toast";
import DropZone from "../../Dashboard/DropZone";
import {Stack} from "@mui/joy";
import {useRouter} from "next/router";
import {UserRole} from "../../../types/resolvers";

export default function FourthStep() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    // remove the any type !!!


    const {setStep, userData, setUserData, resetForm} = useContext(multiStepContext);
    const userRole = userData.userRole as UserRole;

    async function profileHandling(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        const freelancerRequiredFields = ["portfolio", "image"];
        const clientRequiredFields = ["jobTitle", "educationLevel", "image"];

        const requiredFields =
            userRole === "Freelancer"
                ? freelancerRequiredFields
                : clientRequiredFields;

        const missingFields = requiredFields.filter((field) => !userData[field]);

        if (missingFields.length) {
            return toast.error(
                `Please fill in the following fields: ${missingFields.join(", ")}`
            );
        }

        setLoading(true);

        const response = await fetch(`/api/users/createProfile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const res = await response.json();

        if (!response.ok) {
            return toast.error(res.message);
        }

        // alert(JSON.stringify(res));
        toast.success(res.message + " ✅");
        resetForm();
        router.push("/dashboard");
    }

    return (
        <Stack sx={{alignItems: "center", width: "100%"}}>
            <form onSubmit={profileHandling} style={{width: "50%"}}>
                {session?.user.userRole === "Freelancer" ? (
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
                                setUserData({...userData, portfolio: e.target.value})
                            }
                        />

                        <DropZone
                            uploadHandler={(url) => setUserData({...userData, image: url})}
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
                                setUserData({...userData, jobTitle: e.target.value})
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
                                setUserData({...userData, educationLevel: e.target.value})
                            }
                        />

                        <DropZone
                            uploadHandler={(url) => setUserData({...userData, image: url})}
                        />
                    </>
                )}

                <div>
                    <Button
                        style={{marginRight: "80px", marginTop: "50px"}}
                        variant="contained"
                        color="primary"
                        onClick={() => setStep(3)}
                    >
                        {" "}
                        Back{" "}
                    </Button>{" "}
                    {!loading && (
                        <Button
                            style={{marginTop: "50px"}}
                            variant="contained"
                            color="success"
                            type="submit"
                        >
                            {" "}
                            Next{" "}
                        </Button>
                    )}
                    {loading && <p>loading...</p>}
                </div>
            </form>
        </Stack>
    );
}

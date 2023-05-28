"use client"
import React, {ChangeEvent, useContext, useState} from "react";
import {TextField} from "@mui/material";
import {multiStepContext} from "./stepContext";
import {toast} from "react-hot-toast";
import DropZone from "../../Dashboard/DropZone";
import {useRouter} from "next/navigation";

export default function FourthStep() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);


    const {setStep, userData, userRole} = useContext(multiStepContext);


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
        await router.push("/dashboard");
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

                    <DropZone
                        uploadHandler={(url) => userData.image = url}
                    />
                </>
            )}


            <div className={"flex gap-2 flex-col mt-4"}>

                <button
                    className="py-2 px-20 rounded-full font-medium text-base text-white bg-red-300"

                    onClick={() => setStep(3)}
                >
                    Prev
                </button>

                {!loading && (
                    <button
                        type="submit"
                        className="py-2 px-20 rounded-full font-medium text-base text-white bg-primary"
                    >
                        Next
                    </button>


                )}
                {loading && <p>loading...</p>}
            </div>
        </form>
    );
}

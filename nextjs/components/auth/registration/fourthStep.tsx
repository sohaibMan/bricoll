import React, {ChangeEvent, useContext} from "react";
import {Button, TextField} from "@mui/material";
import {multiStepContext} from "./stepContext";
import {toast} from "react-hot-toast";
import DropZone from "../../Dashboard/DropZone";
import {Stack,FormLabel} from "@mui/joy";

export default function FourthStep() {
    const {setStep, userData, finalData, setUserData, submitData}: any =
        useContext(multiStepContext);

    // function handleSubmit() {
    //   const requiredFields = ["portfolio"];
    //   const missingFields = requiredFields.filter((field) => !userData[field]);

    //   if (missingFields.length) {
    //     toast.error(
    //       `Please fill in the following fields: ${missingFields.join(", ")}`
    //     );
    //   } else {
    //     submitData();
    //   }
    // }

    async function profileHandling(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        // const requiredFields = ["portfolio"];
        // const missingFields = requiredFields.filter((field) => !userData[field]);

        // if (missingFields.length) {
        //   toast.error(
        //     `Please fill in the following fields: ${missingFields.join(", ")}`
        //   );
        // }

        const [
            {
                bio,
                country,
                city,
                phone,
                language,
                address,
                photo,
                profileTitle,
                experienceLevel,
                category,
                job,
                company,
                educationLevel,
                portfolio,
            },
        ] = finalData;


        // const [{country}] = [...finalData]
        // console.log("bio ", bio);
        // console.log("language ", language);
        // console.log("portf ", portfolio);

        const response = await fetch(`/api/auth/createProfile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                bio: bio,
                country: country,
                city: city,
                phone: phone,
                language: language,
                address: address,
                photo: photo,
                profileTitle: profileTitle,
                experienceLevel: experienceLevel,
                category: category,
                jobTitle: job,
                company: company,
                educationLevel: educationLevel,
                portfolio: portfolio,
            }),
        });

        // const res = await response.json();
        // alert(JSON.stringify(res));
        toast.success("The profile is created successfuly ✅");
    }

    return (
        <Stack sx={{alignItems: "center", width: "100%"}}>
            <form onSubmit={profileHandling} style={{width: "50%"}}>
                <TextField
                    sx={{width: "100%"}}
                    label="Portfolio Link"
                    margin="normal"
                    variant="outlined"
                    color="primary"
                    name="portfolio"
                    value={userData["portfolio"]}
                    onChange={(e) =>
                        setUserData({...userData, portfolio: e.target.value})
                    }
                />
                <FormLabel>message</FormLabel>
                <DropZone uploadHandler={(url) => setUserData({...userData, image: url})}/>

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
                    <Button
                        style={{marginTop: "50px"}}
                        variant="contained"
                        color="success"
                        type="submit"
                        onClick={submitData}
                    >
                        {" "}
                        Next{" "}
                    </Button>
                </div>
            </form>
        </Stack>
    );
}

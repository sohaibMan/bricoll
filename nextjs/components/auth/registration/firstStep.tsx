import React, {useContext} from "react";
import {Button} from "@mui/material";
// import { multiStepContext } from "./stepContext";
import {toast} from "react-hot-toast";
import {multiStepContext} from "./stepContext";
import {Divider, Stack} from "@mui/joy";
import Textarea from "@mui/joy/Textarea";
import Input from "@mui/joy/Input";


export default function FirstStep() {
    const {setStep, userData, setUserData} = useContext(multiStepContext);

    function handleSubmit() {
        const requiredFields = [
            "bio",
            "country",
            "city",
            "phone",
            "language",
            "address",
        ];
        const missingFields = requiredFields.filter((field) => !userData[field]);

        if (missingFields.length) {
            toast.error(
                `Please fill in the following fields: ${missingFields.join(", ")}`
            );
        } else {
            setStep(2);
        }
    }


    return (
        <Stack spacing={2} sx={{width: "50%", margin: "auto"}}>
            {/*<Stack direction={"row"} spacing={2} sx={{paddingX: "10%"}}>*/}

            <Stack direction={"row"} spacing={1}>

                <Input
                    sx={{width: "100%"}}
                    placeholder="Phone"
                    defaultValue={userData["phone"]}
                    onChange={(e) => setUserData({...userData, phone: e.target.value})}
                />
                <Divider orientation="vertical"/>
                <Input
                    sx={{width: "100%"}}
                    placeholder="Language"
                    defaultValue={userData["language"]}
                    onChange={(e) => {
                        setUserData({...userData, language: e.target.value});
                    }}
                />
            </Stack>
            <Stack spacing={1} direction={"row"}>
                <Input
                    sx={{width: "100%"}}
                    placeholder="City"
                    defaultValue={userData["city"]}
                    onChange={(e) => setUserData({...userData, city: e.target.value})}
                />
                {/*<Divider orientation="vertical"/>*/}
                <Input
                    sx={{width: "100%"}}
                    placeholder="Country"
                    defaultValue={userData["country"]}
                    onChange={(e) =>
                        setUserData({...userData, country: e.target.value})
                    }
                />

                {/*<CountrySelector>*/}

            </Stack>


            <Input
                sx={{width: "100%"}}
                placeholder="Address"
                defaultValue={userData["address"]}
                onChange={(e) => {
                    setUserData({...userData, address: e.target.value});
                }}
            />


            <Textarea
                sx={{width: "100%"}}
                minRows={4}
                placeholder="bio"
                defaultValue={userData["bio"]}
                onChange={(e) => setUserData({...userData, bio: e.target.value})}
            />


            {/*</Stack>*/}
            <Button
                variant="contained"
                // color="success"
                type="submit"
                onClick={handleSubmit}
            >

                Next
            </Button>
        </Stack>
    )
        ;
}

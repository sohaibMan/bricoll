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
                    // margin="normal"
                    // variant="outlined"
                    // color="primary"
                    // name="phone"
                    value={userData["phone"]}
                    onChange={(e) => setUserData({...userData, phone: e.target.value})}
                />
                <Divider orientation="vertical"/>
                <Input
                    sx={{width: "100%"}}
                    placeholder="Language"
                    // margin="normal"
                    // variant="outlined"
                    // color="primary"
                    // name="language"
                    value={userData["language"]}
                    onChange={(e) => {
                        setUserData({...userData, language: e.target.value});
                    }}
                />
            </Stack>
            <Stack spacing={1} direction={"row"}>
                <Input
                    sx={{width: "100%"}}
                    placeholder="City"
                    // margin="normal"
                    // variant="outlined"
                    // color="primary"
                    // name="city"
                    value={userData["city"]}
                    onChange={(e) => setUserData({...userData, city: e.target.value})}
                />
                {/*<Divider orientation="vertical"/>*/}
                {/*<Input*/}
                {/*    sx={{width: "100%"}}*/}
                {/*    placeholder="Country"*/}
                {/*    // margin="normal"*/}
                {/*    // variant="outlined"*/}
                {/*    // color="primary"*/}
                {/*    // name="country"*/}
                {/*    value={userData["country"]}*/}
                {/*    onChange={(e) =>*/}
                {/*        setUserData({...userData, country: e.target.value})*/}
                {/*    }*/}
                {/*/>*/}

                {/*<CountrySelector onChange={(e) =>*/}
                {/*    console.log(e)*/}
                {/*}/>*/}
            </Stack>


            <Input
                sx={{width: "100%"}}
                placeholder="Address"
                // margin="normal"
                // variant="outlined"
                // color="primary"
                // name="address"
                value={userData["address"]}
                onChange={(e) => {
                    setUserData({...userData, address: e.target.value});
                }}
            />


            <Textarea
                // placeholder="Bio"
                // margin="normal"
                // variant="outlined"
                // color="primary"
                sx={{width: "100%"}}
                minRows={4}
                placeholder="bio"
                // value={userData["bio"]}
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

"use client"
import React, {useContext} from "react";
import {multiStepContext, UserData} from "./stepContext";
import {Divider, Stack} from "@mui/joy";
import Input from "@mui/joy/Input";
import CountrySelector from "../../AutoCompletes/CountrySelector";
import "react-tagsinput/react-tagsinput.css";
import 'react-quill/dist/quill.snow.css'
import "../../../styles/quill.css"
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import ReactQuill from "react-quill";
import {toast} from "react-hot-toast";
import dayjs from "dayjs";


// shared between forms
// const RichTextEditor = dynamic(import('react-quill'), {
//     ssr: false,
//     loading: () => <p>Loading ...</p>,
// })

export default function FirstStep() {
    const {setStep, userData} = useContext(multiStepContext);


    function handleSubmit() {


        const requiredFields = [
            "bio",
            "address",
            "country",
            "city",
            "postalCode",
            "phone",
            "language",
            "timeZone",
        ];

        // const missingFields = requiredFields.filter((field) => field in userData && !userData[field as keyof UserData]);
        const missingFields = requiredFields.filter((field) => !userData[field]);


        if (missingFields.length) return toast.error(
            `Please fill in the following fields: ${missingFields.join(", ")}`
        );
        else if (userData.bio.length < 100) return toast.error("Bio must be at least 100 characters")
        else setStep(2);

    }


    return (
        <Stack spacing={2} sx={{width: "50%", margin: "auto"}}>

            <Stack direction={"row"} spacing={1}>
                <Input
                    sx={{width: "100%"}}
                    type={"phone"}
                    placeholder="Phone"
                    defaultValue={userData["phone"]}
                    onChange={(e) =>
                        userData.phone = e.target.value
                    }
                />
                <Divider orientation="vertical"/>
                <Input
                    sx={{width: "100%"}}
                    type={"text"}
                    placeholder="Language"
                    defaultValue={userData["language"]}
                    onChange={(e) => {
                        userData.language = e.target.value
                    }}
                />
            </Stack>


            <CountrySelector/>

            <Stack direction={"row"} spacing={1}>
                <Input
                    sx={{width: "50%"}}
                    placeholder="City"
                    defaultValue={userData["city"]}
                    onChange={(e) =>
                        userData.city = e.target.value
                    }
                />
                <Divider orientation="vertical"/>

                <Input
                    sx={{width: "50%"}}
                    placeholder="ZIP/Postal Code"
                    defaultValue={userData["postalCode"]}
                    type={"number"}
                    onChange={(e) => {
                        userData.postalCode = +e.target.value
                    }}
                />

            </Stack>

            <Input
                sx={{width: "100%"}}
                placeholder="Address"
                defaultValue={userData.address}
                onChange={(e) => {
                    userData.address = e.target.value
                }}
            />
            <Stack direction={"row"} spacing={1}>

                <DatePicker sx={{width: "100%"}} views={['year', 'month', 'day']} label="Choose your birthday"
                            disableFuture
                            defaultValue={userData.birthday && dayjs(userData.birthday)}
                            onChange={(value: {
                                $d: Date | null
                            } | null) => {
                                if (value && value.$d) userData.birthday = value.$d
                            }}/>


                <Divider orientation="vertical"/>


                <Input
                    sx={{width: "100%"}}
                    placeholder="Time Zone"
                    defaultValue={userData.timeZone}
                    onChange={(e) => {
                        userData.timeZone = e.target.value
                    }}
                />

            </Stack>

            {/*<Textarea*/}
            {/*    sx={{width: "100%"}}*/}
            {/*    minRows={4}*/}
            {/*    placeholder="Bio"*/}
            {/*    defaultValue={userData["bio"]}*/}
            {/*    onChange={(e) => userData.bio = e.target.value}*/}
            {/*/>*/}


            <ReactQuill defaultValue={userData.bio}
                        placeholder={"Describe your self"}
                        onChange={(input) => userData.bio = input}
                        theme="snow"/>

            <button
                className="py-2 px-20 rounded-full font-medium text-base text-white bg-primary"
                onClick={handleSubmit}
            >
                Next
            </button>
        </Stack>
    );
}

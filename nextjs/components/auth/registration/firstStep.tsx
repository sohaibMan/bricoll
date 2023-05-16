
import React, {ChangeEvent, useContext, useState} from "react";
import {Button, TextField} from "@mui/material";
// import { multiStepContext } from "./stepContext";
import {toast} from "react-hot-toast";
import {multiStepContext} from "./stepContext";
import DropZone from "../../Dashboard/DropZone";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";


export default function FirstStep() {
    const {setStep, userData, setUserData}: any = useContext(multiStepContext);

    function handleSubmit() {
        const requiredFields = [
            "bio",
            "country",
            "city",
            "phone",
            "language",
            "address",
            "photo",
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

    // TODO: UPLOAD Image & selectorCountry API
    

  return (
    <div>
      <div>
        <TextField
          style={{ width: "30%" }}
          label="Bio"
          margin="normal"
          variant="outlined"
          color="primary"
          name="bio"
          value={userData["bio"]}
          onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
        />
      </div>
      <div>
        <TextField
          style={{ width: "30%" }}
          label="Country"
          margin="normal"
          variant="outlined"
          color="primary"
          name="country"
          value={userData["country"]}
          onChange={(e) =>
            setUserData({ ...userData, country: e.target.value })
          }
        />
      </div>

      {/* <div>
        <CountrySelector
          style={{marginLeft: "50px", marginRight: "50px"}}
          label="Country"
          name="country"
          value={userData["country"]}
          onChange={(e) =>
            setUserData({ ...userData, country: e.target.value })
          }
        />
      </div> */}

      <div>
        <TextField
          style={{ width: "30%" }}
          label="City"
          margin="normal"
          variant="outlined"
          color="primary"
          name="city"
          value={userData["city"]}
          onChange={(e) => setUserData({ ...userData, city: e.target.value })}
        />
      </div>
      <div>
        <TextField
          style={{ width: "30%" }}
          label="Phone"
          margin="normal"
          variant="outlined"
          color="primary"
          name="phone"
          value={userData["phone"]}
          onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
        />
      </div>
      <div>
        <TextField
          style={{ width: "30%" }}
          label="Language"
          margin="normal"
          variant="outlined"
          color="primary"
          name="language"
          value={userData["language"]}
          onChange={(e) => {
            setUserData({ ...userData, language: e.target.value });
          }}
        />
      </div>
      <div>
        <TextField
          style={{ width: "30%" }}
          label="Address"
          margin="normal"
          variant="outlined"
          color="primary"
          name="address"
          value={userData["address"]}
          onChange={(e) => {
            setUserData({ ...userData, address: e.target.value });
          }}
        />
      </div>
      <div>
        <TextField
          style={{ width: "30%" }}
          label="Photo"
          margin="normal"
          variant="outlined"
          color="primary"
          name="photo"
          value={userData["photo"]}
          onChange={(e) => setUserData({ ...userData, photo: e.target.value })}
        />
      </div>
      {/* <Box sx={{ justifyContent: "center", display: "flex", marginLeft: "50px"}}>
              <FormLabel>Your photo</FormLabel>
              
              <FormHelperText>
                This will be displayed on your profile.
              </FormHelperText>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: 2.5,
                justifyContent: "center"
              }}
            >
              {imageLinkState && (
                <Avatar
                  size="lg"
                  src={imageLinkState}
                  sx={{ "--Avatar-size": "64px" }}
                  // value={props.user.image}
                />
              )}
              {
              <DropZone onChange={(e: ChangeEvent<HTMLInputElement>) => setUserData({ ...userData, photo: e.target.value })} uploadHandler={function (value: React.SetStateAction<string>): void {
            throw new Error("Function not implemented.");
          } } /> 
}
              {/* <Upload onUpload={setImageLinkState} /> */}
            {/* </Box> */} 
      <div>
        <Button
          style={{ marginTop: "50px" }}
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

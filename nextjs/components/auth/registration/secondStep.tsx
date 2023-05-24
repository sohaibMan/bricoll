import React, { useContext } from "react";
import { Button, TextField } from "@mui/material";
import { multiStepContext } from "./stepContext";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function SecondStep() {
  const { setStep, userData, setUserData }: any = useContext(multiStepContext);
  const { data: session } = useSession();

  function handleSubmit() {
    const freelancerRequiredFields = [
      "profileTitle",
      "experienceLevel",
      "category",
    ];
    const clientRequiredFields = [
      "companyName",
      "website",
      "industry",
      "yearFounded",
      "ownershipType",
    ];

    const requiredFields =
      session?.user.userRole === "Freelancer"
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
      {session?.user.userRole === "Freelancer" ? (
        <>
          <div>
            <TextField
              style={{ width: "30%" }}
              label="Profile Title"
              margin="normal"
              variant="outlined"
              color="primary"
              name="profileTitle"
              defaultValue={userData["profileTitle"]}
              onChange={(e) =>
                setUserData({ ...userData, profileTitle: e.target.value })
              }
            />
          </div>
          <div>
            <TextField
              style={{ width: "30%" }}
              label="Experience Level"
              margin="normal"
              variant="outlined"
              color="primary"
              name="experienceLevel"
              defaultValue={userData["experienceLevel"]}
              onChange={(e) =>
                setUserData({ ...userData, experienceLevel: e.target.value })
              }
            />
          </div>
          <div>
            <TextField
              style={{ width: "30%" }}
              label="Category"
              margin="normal"
              variant="outlined"
              color="primary"
              name="category"
              defaultValue={userData["category"]}
              onChange={(e) =>
                setUserData({ ...userData, category: e.target.value })
              }
            />
          </div>
        </>
      ) : (
        <>
          <div>
            <TextField
              style={{ width: "30%" }}
              label="Company Name"
              margin="normal"
              variant="outlined"
              color="primary"
              name="companyName"
              defaultValue={userData["companyName"]}
              onChange={(e) =>
                setUserData({ ...userData, companyName: e.target.value })
              }
            />
          </div>
          <div>
            <TextField
              style={{ width: "30%" }}
              label="Website"
              margin="normal"
              variant="outlined"
              color="primary"
              name="website"
              placeholder="https://www.yourcompanywebsite.com"
              defaultValue={userData["website"]}
              onChange={(e) =>
                setUserData({ ...userData, website: e.target.value })
              }
            />
          </div>
          <div>
            <TextField
              style={{ width: "30%" }}
              label="Industry"
              margin="normal"
              variant="outlined"
              color="primary"
              name="industry"
              defaultValue={userData["industry"]}
              onChange={(e) =>
                setUserData({ ...userData, industry: e.target.value })
              }
            />
          </div>
          <div>
            <TextField
              style={{ width: "30%" }}
              label="Year Founded"
              margin="normal"
              variant="outlined"
              color="primary"
              name="yearFounded"
              defaultValue={userData["yearFounded"]}
              onChange={(e) =>
                setUserData({ ...userData, yearFounded: e.target.value })
              }
            />
          </div>
          <div>
            <TextField
              style={{ width: "30%" }}
              label="Ownership Type"
              margin="normal"
              variant="outlined"
              color="primary"
              name="ownershipType"
              defaultValue={userData["ownershipType"]}
              onChange={(e) =>
                setUserData({ ...userData, ownershipType: e.target.value })
              }
            />
          </div>
        </>
      )}
      <div>
        <Button
          style={{ marginRight: "80px", marginTop: "50px" }}
          variant="contained"
          color="primary"
          onClick={() => setStep(1)}
        >
          {" "}
          Back{" "}
        </Button>{" "}
        <span></span>
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

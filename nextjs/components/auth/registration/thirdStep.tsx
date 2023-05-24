import React, { useContext } from "react";
import { Button, TextField } from "@mui/material";
import { multiStepContext } from "./stepContext";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function FirstStep() {
  const { setStep, userData, setUserData }: any = useContext(multiStepContext);
  const { data: session } = useSession();

  function handleSubmit() {
    const freelancerRequiredFields = ["jobTitle", "company", "educationLevel"];
    const clientRequiredFields = [
      "skillsCategories",
      "specificSkills",
      "skillsLevel",
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
      setStep(4);
    }
  }

  return (
    <div>
      {session?.user.userRole === "Freelancer" ? (
        <>
          <div>
            <TextField
              style={{ width: "30%" }}
              label="Job Title"
              margin="normal"
              variant="outlined"
              color="primary"
              name="jobTitle"
              defaultValue={userData["jobTitle"]}
              onChange={(e) =>
                setUserData({ ...userData, jobTitle: e.target.value })
              }
            />
          </div>
          <div>
            <TextField
              style={{ width: "30%" }}
              label="Company Name"
              margin="normal"
              variant="outlined"
              color="primary"
              name="company"
              defaultValue={userData["company"]}
              onChange={(e) =>
                setUserData({ ...userData, company: e.target.value })
              }
            />
          </div>
          <div>
            <TextField
              style={{ width: "30%" }}
              label="Education Level"
              margin="normal"
              variant="outlined"
              color="primary"
              name="educationLevel"
              defaultValue={userData["educationLevel"]}
              onChange={(e) =>
                setUserData({ ...userData, educationLevel: e.target.value })
              }
            />
          </div>
        </>
      ) : (
        <>
        <div>
            <TextField
              style={{ width: "30%" }}
              label="Skills Categories"
              margin="normal"
              variant="outlined"
              color="primary"
              name="skillsCategories"
              defaultValue={userData["skillsCategories"]}
              onChange={(e) =>
                setUserData({ ...userData, skillsCategories: e.target.value })
              }
            />
          </div>
          <div>
            <TextField
              style={{ width: "30%" }}
              label="Specific Skills"
              margin="normal"
              variant="outlined"
              color="primary"
              name="specificSkills"
              defaultValue={userData["specificSkills"]}
              onChange={(e) =>
                setUserData({ ...userData, specificSkills: e.target.value })
              }
            />
          </div>
          <div>
            <TextField
              style={{ width: "30%" }}
              label="Skills Level"
              margin="normal"
              variant="outlined"
              color="primary"
              name="skillsLevel"
              defaultValue={userData["skillsLevel"]}
              onChange={(e) =>
                setUserData({ ...userData, skillsLevel: e.target.value })
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
          onClick={() => setStep(2)}
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

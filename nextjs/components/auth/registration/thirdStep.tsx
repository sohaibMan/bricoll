import React, { useContext, useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import { multiStepContext } from "./stepContext";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import SkillsAutocomplete from "../../AutoCompletes/SkillsAutocomplete";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";

export default function FirstStep() {
  const { setStep, userData, setUserData }: any = useContext(multiStepContext);
  const { data: session } = useSession();
  const [skillsCategories, setSkillsCategories] = useState<any>(
    userData.skillsCategories || []
  );
  const [specificSkills, setSpecificSkills] = useState<any>(
    userData.specificSkills || []
  );

  const [skillsLevel, setSkillsLevel] = useState<any>(
    userData.skillsLevel || []
  );

  const handleSkillsCategories = (newSkills: any) => {
    setSkillsCategories(newSkills);
    setUserData({ ...userData, skillsCategories: newSkills });
  };

  const handleSpecificSkills = (newSkills: any) => {
    setSpecificSkills(newSkills);
    setUserData({ ...userData, specificSkills: newSkills });
  };

  const handleSkillsLevel = (newSkills: any) => {
    setSkillsLevel(newSkills);
    setUserData({ ...userData, skillsLevel: newSkills });
  };

  const popularSkillsCategories = [
    "Web Development",
    "Mobile Development",
    "Video Editor",
    "Graph Design",
    "Social Media",
    "Marketer",
  ];

  const popularSpecificSkills = [
    "Java",
    "Javascript/Typescript",
    "C/C++",
    "Rust",
    "Elixir",
    "Angular",
    "React",
    "HTML/CSS",
  ];

  const popularSkillsLevel = ["Beginner", "Intermediate", "Advanced", "Expert"];

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
          <div style={{marginBottom: "10px", marginTop: "20px"}}>
            <Autocomplete
              multiple
              style={{ width: "40%", margin: "auto" }}
              id="tags-filled"
              options={popularSkillsCategories}
              defaultValue={skillsCategories}
              freeSolo
              onChange={(event, newSkills) => {
                handleSkillsCategories(newSkills);
              }}
              renderTags={(value: string[], getTagProps) =>
                value.map((option: string, index: number) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  label="Skills Categories"
                  placeholder="add more skills categories..."
                />
              )}
            />
          </div>
          {/* <SkillsAutocomplete skills={skills} setSkills={setSkills}/> */}
          <div style={{marginBottom: "10px"}}>
            <Autocomplete
              multiple
              style={{ width: "40%", margin: "auto" }}
              id="tags-filled"
              options={popularSpecificSkills}
              defaultValue={specificSkills}
              freeSolo
              onChange={(event, newSkills) => {
                handleSpecificSkills(newSkills);
              }}
              renderTags={(value: string[], getTagProps) =>
                value.map((option: string, index: number) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  label="Specific Skills"
                  placeholder="add more specific skills..."
                />
              )}
            />
          </div>
          <div style={{marginBottom: "10px"}}>
            <Autocomplete
              multiple
              id="tags-filled"
              style={{ width: "40%", margin: "auto" }}
              options={popularSkillsLevel}
              defaultValue={skillsLevel}
              freeSolo
              onChange={(event, newSkills) => {
                handleSkillsLevel(newSkills);
              }}
              renderTags={(value: string[], getTagProps) =>
                value.map((option: string, index: number) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  label="Skills Level"
                  placeholder="add skills level..."
                />
              )}
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

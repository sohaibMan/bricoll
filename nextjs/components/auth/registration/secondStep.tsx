// import React, { useContext, useState } from "react";
// import { Button, TextField } from "@mui/material";
// import { multiStepContext } from "./stepContext";

// export default function SecondStep() {
//   const { setStep, userData, setUserData }: any = useContext(multiStepContext);
//   const [emailError, setEmailError] = useState("");

//   const validateEmail = (email: string) => {
//     // email validation criteria
//     const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

//     if (!emailRegex.test(email)) {
//       setEmailError("Invalid email address");
//       return false;
//     }

//     setEmailError("");
//     return true;
//   };

//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const email = e.target.value;
//     validateEmail(email);
//     setUserData({ ...userData, email });
//   };

//   return (
//     <div>
//       <div>
//         <TextField
//           style={{ width: "30%" }}
//           label="Email"
//           margin="normal"
//           variant="outlined"
//           color="secondary"
//           value={userData.email}
//           onChange={handleEmailChange}
//           error={Boolean(emailError)}
//           helperText={emailError}
//         />
//       </div>
//       <div>
//         <TextField
//           style={{ width: "30%" }}
//           label="experienceLevel"
//           margin="normal"
//           variant="outlined"
//           color="secondary"
//           value={userData.experienceLevel}
//           onChange={(e) =>
//             setUserData({ ...userData, experienceLevel: e.target.value })
//           }
//         />
//       </div>
//       <div>
//         <TextField
//           style={{ width: "30%" }}
//           label="District"
//           margin="normal"
//           variant="outlined"
//           color="secondary"
//           value={userData.district}
//           onChange={(e) =>
//             setUserData({ ...userData, district: e.target.value })
//           }
//         />
//       </div>
//       <div>
//         <Button
//           style={{ marginRight: "80px", marginTop: "50px" }}
//           variant="contained"
//           color="secondary"
//           onClick={() => setStep(1)}
//         >
//           {" "}
//           Back{" "}
//         </Button>{" "}
//         <span></span>
//         <Button
//           style={{ marginLeft: "80px", marginTop: "50px" }}
//           variant="contained"
//           color="primary"
//           onClick={() => {
//             if (validateEmail(userData.email)) {
//               setStep(3);
//             }
//           }}
//         >
//           {" "}
//           Next{" "}
//         </Button>
//       </div>
//     </div>
//   );
// }

import React, { useContext } from "react";
import { Button, TextField } from "@mui/material";
import { multiStepContext } from "./stepContext";
import { toast } from "react-hot-toast";

export default function SecondStep() {
  const { setStep, userData, setUserData }: any = useContext(multiStepContext);

  // const formik = useFormik({
  //   initialValues: {
  //     profileTitle: userData.profileTitle,
  //     experienceLevel: userData.experienceLevel,
  //     category: userData.category,
  //   },
  //   validationSchema: yup.object({
  //     profileTitle: yup.string().required("Profile Title is required"),
  //     experienceLevel: yup.string().required("Level experience is required"),
  //     category: yup.string().required("Category name is required"),
  //   }),
  //   onSubmit: (values) => {
  //     setUserData(values);
  //     setStep(3);
  //   },
  // });

  function handleSubmit() {
    const requiredFields = ["profileTitle", "experienceLevel", "category"];
    const missingFields = requiredFields.filter(field => !userData[field]);
  
    if (missingFields.length) {
      toast.error(`Please fill in the following fields: ${missingFields.join(", ")}`);
    } else {
      setStep(3);
    }
  }

  return (
    <div>
      <div>
        <TextField
          style={{ width: "30%" }}
          label="Profile Title"
          margin="normal"
          variant="outlined"
          color="primary"
          name="profileTitle"
          value={userData["profileTitle"]}
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
          value={userData["experienceLevel"]}
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
          value={userData["category"]}
          onChange={(e) =>
            setUserData({ ...userData, category: e.target.value })
          }
        />
      </div>
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



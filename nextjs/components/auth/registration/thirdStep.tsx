// import React, { useContext } from "react";
// import { PayButton, TextField } from "@mui/material";
// import { multiStepContext } from "./stepContext";

// export default function ThirdStep() {
//   const { setStep, userData, setUserData, submitData }: any =
//     useContext(multiStepContext);

//   return (
//     <div>
//       <div>
//         <TextField
//           style={{ width: "30%" }}
//           label="City"
//           margin="normal"
//           variant="outlined"
//           color="secondary"
//           defaultValue={userData["city"]}
//           onChange={(e) => setUserData({ ...userData, city: e.target.value })}
//         />
//       </div>
//       <div>
//         <TextField
//           style={{ width: "30%" }}
//           label="LandMark"
//           margin="normal"
//           variant="outlined"
//           color="secondary"
//           defaultValue={userData["landmark"]}
//           onChange={(e) =>
//             setUserData({ ...userData, landmark: e.target.value })
//           }
//         />
//       </div>
//       <div>
//         <TextField
//           style={{ width: "30%" }}
//           label="Code Postal"
//           margin="normal"
//           variant="outlined"
//           color="secondary"
//           defaultValue={userData["codepostal"]}
//           onChange={(e) =>
//             setUserData({ ...userData, codepostal: e.target.value })
//           }
//         />
//       </div>
//       <div>
//         <PayButton
//           style={{ marginRight: "80px", marginTop: "50px" }}
//           variant="contained"
//           color="secondary"
//           onClick={() => setStep(2)}
//         >
//           {" "}
//           Back{" "}
//         </PayButton>{" "}
//         <span></span>
//         <PayButton
//           style={{ marginLeft: "80px", marginTop: "50px" }}
//           variant="contained"
//           color="primary"
//           onClick={submitData}
//         >
//           {" "}
//           Submit{" "}
//         </PayButton>
//       </div>
//     </div>
//   );
// }

// import React, { useContext } from "react";
// import { PayButton, TextField } from "@mui/material";
// import { multiStepContext } from "./stepContext";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { toast } from "react-hot-toast";

// export default function ThirdStep() {
//   const { setStep, userData, setUserData, submitData }: any =
//     useContext(multiStepContext);

//   const validationSchema = Yup.object({
//     city: Yup.string().required("City is required"),
//     landmark: Yup.string().required("Landmark is required"),
//     codepostal: Yup.string()
//       .required("Code Postal is required")
//       .matches(/^\d{5}$/, "Code Postal must be a valid 5-digit postal code"),
//   });

//   const formik = useFormik({
//     initialValues: userData,
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       setUserData(values);
//       submitData();
//       return toast.success("The account created successfuly ✅")
//     },
//   });

//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <div>
//         <TextField
//           style={{ width: "30%" }}
//           label="City"
//           margin="normal"
//           variant="outlined"
//           color="secondary"
//           name="city"
//           value={formik.values.city}
//           onChange={formik.handleChange}
//           error={formik.touched.city && Boolean(formik.errors.city)}
//           helperText={formik.touched.city && formik.errors.city}
//         />
//       </div>
//       <div>
//         <TextField
//           style={{ width: "30%" }}
//           label="LandMark"
//           margin="normal"
//           variant="outlined"
//           color="secondary"
//           name="landmark"
//           value={formik.values.landmark}
//           onChange={formik.handleChange}
//           error={formik.touched.landmark && Boolean(formik.errors.landmark)}
//           helperText={formik.touched.landmark && formik.errors.landmark}
//         />
//       </div>
//       <div>
//         <TextField
//           style={{ width: "30%" }}
//           label="Code Postal"
//           margin="normal"
//           variant="outlined"
//           color="secondary"
//           name="codepostal"
//           value={formik.values.codepostal}
//           onChange={formik.handleChange}
//           error={formik.touched.codepostal && Boolean(formik.errors.codepostal)}
//           helperText={formik.touched.codepostal && formik.errors.codepostal}
//         />
//       </div>
//       <div>
//         <PayButton
//           style={{ marginRight: "80px", marginTop: "50px" }}
//           variant="contained"
//           color="secondary"
//           onClick={() => setStep(2)}
//         >
//           {" "}
//           Back{" "}
//         </PayButton>{" "}
//         <span></span>
//         <PayButton
//           style={{ marginLeft: "80px", marginTop: "50px" }}
//           variant="contained"
//           color="primary"
//           type="submit"
//         >
//           {" "}
//           Submit{" "}
//         </PayButton>
//       </div>
//     </form>
//   );
// }

// import React, { useContext, useState } from "react";
// import { PayButton, TextField } from "@mui/material";
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
//           defaultValue={userData.email}
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
//           defaultValue={userData.experienceLevel}
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
//           defaultValue={userData.district}
//           onChange={(e) =>
//             setUserData({ ...userData, district: e.target.value })
//           }
//         />
//       </div>
//       <div>
//         <PayButton
//           style={{ marginRight: "80px", marginTop: "50px" }}
//           variant="contained"
//           color="secondary"
//           onClick={() => setStep(1)}
//         >
//           {" "}
//           Back{" "}
//         </PayButton>{" "}
//         <span></span>
//         <PayButton
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
//         </PayButton>
//       </div>
//     </div>
//   );
// }

import React, {useContext} from "react";
import {Button, TextField} from "@mui/material";
import {multiStepContext} from "./stepContext";
import {toast} from "react-hot-toast";

export default function FirstStep() {
    const {setStep, userData, setUserData}: any = useContext(multiStepContext);

    // const formik = useFormik({
    //   initialValues: {
    //     jobTitle: userData.jobTitle,
    //     company: userData.company,
    //     educationLevel: userData.educationLevel,
    //   },
    //   validationSchema: yup.object({
    //     jobTitle: yup.string().required("Job Title is required"),
    //     company: yup.string().required("Company is required"),
    //     educationLevel: yup.string().required("Education Level name is required"),
    //   }),
    //   onSubmit: (values) => {
    //     setUserData(values);
    //     setStep(4);
    //   },
    // });

    function handleSubmit() {
        const requiredFields = ["jobTitle", "company", "educationLevel"];
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
            <div>
                <TextField
                    style={{width: "30%"}}
                    label="Job Title"
                    margin="normal"
                    variant="outlined"
                    color="primary"
                    name="jobTitle"
                    defaultValue={userData["jobTitle"]}
                    onChange={(e) =>
                        setUserData({...userData, jobTitle: e.target.value})
                    }
                />
            </div>
            <div>
                <TextField
                    style={{width: "30%"}}
                    label="Company Name"
                    margin="normal"
                    variant="outlined"
                    color="primary"
                    name="company"
                    defaultValue={userData["company"]}
                    onChange={(e) =>
                        setUserData({...userData, company: e.target.value})
                    }
                />
            </div>
            <div>
                <TextField
                    style={{width: "30%"}}
                    label="Education Level"
                    margin="normal"
                    variant="outlined"
                    color="primary"
                    name="educationLevel"
                    defaultValue={userData["educationLevel"]}
                    onChange={(e) =>
                        setUserData({...userData, educationLevel: e.target.value})
                    }
                />
            </div>
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
                <span></span>
                <Button
                    style={{marginTop: "50px"}}
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

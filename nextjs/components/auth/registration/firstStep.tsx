// import React, { useContext } from "react";
// import { Button, TextField } from "@mui/material";
// import { multiStepContext } from "./stepContext";
// import { useField } from 'formik';

// export default function FirstStep() {
//   const { setStep, userData, setUserData }: any = useContext(multiStepContext);

//   return (
//     <div>
//       <div>
//         <TextField
//           style={{ width: "30%" }}
//           label="First Name"
//           margin="normal"
//           variant="outlined"
//           color="primary"
//           value={userData["firstname"]}
//           onChange={(e) =>
//             setUserData({ ...userData, firstname: e.target.value })
//           }
//         />
//       </div>
//       <div>
//         <TextField
//           style={{ width: "30%" }}
//           label="Last Name"
//           margin="normal"
//           variant="outlined"
//           color="primary"
//           value={userData["lastname"]}
//           onChange={(e) =>
//             setUserData({ ...userData, lastname: e.target.value })
//           }
//         />
//       </div>
//       <div>
//         <TextField
//           style={{ width: "30%" }}
//           label="Contact Name"
//           margin="normal"
//           variant="outlined"
//           color="primary"
//           value={userData["contact"]}
//           onChange={(e) =>
//             setUserData({ ...userData, contact: e.target.value })
//           }
//         />
//       </div>
//       <div>
//         <Button style={{marginTop: "50px"}} variant="contained" color="primary" onClick={() => setStep(2)}>
//           {" "}
//           Next{" "}
//         </Button>
//       </div>
//     </div>
//   );
// }

import React, {useContext} from "react";
import {Button, TextField} from "@mui/material";
// import { multiStepContext } from "./stepContext";
import {toast} from "react-hot-toast";
import {multiStepContext} from "./stepContext";


export default function FirstStep() {
    const {setStep, userData, setUserData}: any = useContext(multiStepContext);

    function handleSubmit() {
        const requiredFields = [
            "bio",
            "country",
            "city",
            "phone",
            "language",
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
          label="Photo"
          margin="normal"
          variant="outlined"
          color="primary"
          name="photo"
          value={userData["photo"]}
          onChange={(e) => setUserData({ ...userData, photo: e.target.value })}
        />
      </div>
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

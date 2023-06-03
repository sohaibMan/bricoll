"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import ResetPasswordForm from "../../components/auth/resetPassword";
import "../../styles/globals.css";


const resetPasswordPage = () => {
  // const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isResetPasswordSent, setIsResetPasswordSent] = useState(false);

  // const [email, setEmail] = useState("");

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  // const handleForgetPassword = async (formData: any) => {

  //   const response = await fetch(`/api/users/forgetPassword`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(formData),
  //   });

  //   const res = await response.json();

  //   if (!response.ok) {
  //     return toast.error(res.message);
  //   }

  //   console.log("formData, ", formData);

  //   // alert(JSON.stringify(res));
  //   toast.success(res.message + " ✅");
  //   setIsResetPasswordSent(true);
  // };

  return (
    <>
      <nav className="container mx-auto p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-primary font-bold text-2xl px-6">BRICOL</p>
          </div>
          <div className="md:hidden">
            <button
              className="text-gray-500 hover:text-gray-600 focus:outline-none"
              onClick={toggleNavbar}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <div className="flex flex-col items-center mt-8">
        
          <ResetPasswordForm />

      </div>
    </>
  );
};

export default resetPasswordPage;










// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import toast from "react-hot-toast";

// const ResetPasswordPage = () => {
//   const router = useRouter();
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const userId = router.query.userId as string;
//   const resetToken = router.query.resetToken as string;

//   useEffect(() => {
//     if (!userId || !resetToken) {
//       router.push("/forgetPassword");
//     }
//   }, [userId, resetToken]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     try {
//       const response = await fetch(`/api/users/updatePassword`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ userId, resetToken, password }),
//       });
//       toast.success("Password reset successful");
//       // router.push("/signin");
//     } catch (error) {
//       toast.error("Failed to reset password");
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h1>Reset Password</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="password">New Password</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="confirmPassword">Confirm Password</label>
//           <input
//             type="password"
//             id="confirmPassword"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//         </div>
//         <button type="submit">Reset Password</button>
//       </form>
//     </div>
//   );
// };

// export default ResetPasswordPage;

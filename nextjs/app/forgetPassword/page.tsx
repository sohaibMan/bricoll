"use client";
import { useState } from "react";
import ForgetPasswordForm from "../../components/auth/forgetPassword";
import ResetPasswordSent from "../../components/auth/forgetPassword/ResetPasswordSent";
import toast from "react-hot-toast";

const forgetPasswordPage = () => {
  // const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isResetPasswordSent, setIsResetPasswordSent] = useState(false);

  // const [email, setEmail] = useState("");

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleForgetPassword = async (formData: any) => {

    const response = await fetch(`/api/users/forgetPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const res = await response.json();

    if (!response.ok) {
      return toast.error(res.message);
    }

    console.log("formData, ", formData);

    // alert(JSON.stringify(res));
    toast.success(res.message + " ✅");
    setIsResetPasswordSent(true);
  };

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
        {isResetPasswordSent ? ( 
          <ResetPasswordSent />
        ) : (
          <ForgetPasswordForm onSubmit={handleForgetPassword} />
        )}
      </div>
    </>
  );
};

export default forgetPasswordPage;

import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import passwordIcon from "../../../public/tick.png";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from 'next/navigation';


type ForgetPasswordFormProps = {
  onSubmit: (formData: any) => void;
};

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const router = useRouter();
  
  const searchParams = useSearchParams();
  const userId = searchParams?.get('userId') as string;
  const resetToken = searchParams?.get('resetToken') as string;

  console.log("params, ", userId, " resetToken, ", resetToken);

    useEffect(() => {
    if (!userId || !resetToken) {
      router.push("/forgetPassword");
    }
  }, [userId, resetToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return toast.error("Passwords do not match");
      // return;
    }

    try {
      const response = await fetch(`/api/users/updatePassword`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, resetToken, password }),
      });

      // console.log("result, ", response);
      
      toast.success("Password reset successful");
      router.push("/signin");
    } catch (error) {
      toast.error("Failed to reset password");
      console.error(error);
    }
  };

  // const handleSubmit = (e: FormEvent) => {
  //   e.preventDefault();

  //   if (!password) {
  //     return toast.error(`Please fill the ${password} field!`);
  //   }

  //   if (!passwordConfirm) {
  //     return toast.error(`Please fill the ${passwordConfirm} field!`);
  //   }

  //   const formData = {
  //     password,
  //   };

  //   console.log("formData, ", formData);

  //   // onSubmit(formData);
  // };

  return (
    <div
      className="flex flex-col items-center rounded-lg border border-newColor"
      style={{ width: "650px", height: "400px" }}
    >
      
      <h2 className="text-3xl font-medium text-second my-6 py-4 mb-4">
        Update your password
      </h2>
      <form className="flex flex-col space-y-6 my-4" onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          style={{ width: "400px", margin: "auto", marginBottom: "30px" }}
          className="px-4 py-2 rounded border border-gray"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={passwordConfirm}
          onChange={(e) => {
            setPasswordConfirm(e.target.value);
          }}
          style={{ width: "400px", margin: "auto", marginBottom: "30px" }}
          className="px-4 py-2 rounded border border-gray"
        />
        <button
          type="submit"
          className="py-2 px-8 m-12 rounded-full font-medium text-base text-white bg-primary"
        >
          Submit Password
        </button>
        {/* </div> */}
      </form>
    </div>
  );
};

export default ResetPasswordForm;

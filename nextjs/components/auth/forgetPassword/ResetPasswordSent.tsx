import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import emailSent from "../../../public/reply.png";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";

const ResetPasswordSent = () => {
  return (
    <div
      className="flex flex-col items-center rounded-lg border border-newColor"
      style={{ width: "650px", height: "450px" }}
    >
      <Image
        src={emailSent}
        alt="google"
        width={90}
        height={90}
        className="mt-10 flex space-x-4"
        // style={{ width: "110px", height: "110px" }}
      />
      <h2 className="text-3xl font-semibold text-second my-2 py-4 mb-4">
        Email Sent!
      </h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            marginLeft: "80px",
            marginRight: "80px",
            maxWidth: "600px",
            textAlign: "center",
          }}
        >
          <p style={{color: "#4C4444"}}>
            We have sent an email to your registered email address. Please
            follow the instructions provided in the email to update your
            password. If you do not wish to change your password at the moment,
            you can simply choose to Log in.
          </p>
        </div>
      </div>

      <button
        type="submit"
        className="py-2 px-8 m-12 rounded-full font-medium text-base text-white bg-primary"
      >
        Log In
      </button>
    </div>
  );
};

export default ResetPasswordSent;

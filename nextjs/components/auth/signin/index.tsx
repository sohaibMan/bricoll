import {FormEvent, useState} from "react";
import {toast} from "react-hot-toast";
import google from "../../../public/google.png";
import facebook from "../../../public/facebook.png";
import Image from "next/image";
import Link from "next/link";
import {signIn} from "next-auth/react";


const SignupForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    // const router = useRouter()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();


        if (!email || !password) {
            return toast.error("Please fill in all fields");
        }
        // tmp callback

        signIn("credentials", {
            email, password, callbackUrl: "/dashboard"
        })

    };

    const validateEmail = (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setEmailError("Invalid email address");
        } else {
            setEmailError("");
        }
    };

    const validatePassword = (value: string) => {
        if (value.length < 8) {
            setPasswordError("Password must be at least 8 characters long");
        } else {
            setPasswordError("");
        }
    };

    return (
        <div
            className="flex flex-col items-center rounded-lg border border-newColor"
            style={{width: "780px", height: "630px"}}
        >
            <h2 className="text-3xl font-semibold text-second my-2 py-4 mb-4">
                Sign up to find work you love
            </h2>
            <div className="mt-4 flex space-x-4">
                <Image
                    src={google}
                    alt="google"
                    style={{width: "35px", height: "35px"}}
                />
                <button
                    onClick={() => signIn("google")}
                    className="w-full py-2 px-36 rounded-full font-medium text-base bg-blue-400 text-white"
                >Continue with Google
                </button>
            </div>
            <div className="mt-4 flex space-x-4">
                <Image
                    src={facebook}
                    alt="facebook"
                    style={{width: "35px", height: "35px"}}
                />
                <button
                    onClick={() => signIn("facebook")}
                    className="py-2 px-36 rounded-full font-medium text-base bg-blue-400 text-white"
                >
                    Continue with Facebook
                </button>
            </div>
            <p className="mx-4 my-2 text-gray-500 font-medium">Or</p>
            <form className="flex flex-col space-y-6 my-4" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        validateEmail(e.target.value);
                    }}
                    style={{width: "500px"}}
                    className={`px-4 py-2 rounded border border-gray ${
                        emailError ? "border-red-500" : ""
                    }`}
                />
                {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                <input
                    type="password"
                    placeholder="Password (8 or more characters)"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        validatePassword(e.target.value);
                    }}
                    className={`px-4 py-2 rounded border  border-gray ${
                        passwordError ? "border-red-500" : ""
                    }`}
                />
                {passwordError && (
                    <p className="text-red-500 text-sm">{passwordError}</p>
                )}
                <button
                    type="submit"
                    className="py-2 px-20 rounded-full font-medium text-base text-white bg-primary"
                >
                    Log in
                </button>
                <p className="font-normal my-2 mx-32 text-second">
                    Don't have an account ?{" "}
                    <Link href="/signup" className="text-primary">
                        Sign Up
                    </Link>
                </p>
                {/* </div> */}
            </form>
        </div>
    );
};

export default SignupForm;

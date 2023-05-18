import {FormEvent, useState} from "react";
import {toast} from "react-hot-toast";
import google from "../../../public/google.png";
import facebook from "../../../public/facebook.png";
import Image from "next/image";
import Link from "next/link";
import {signIn} from "next-auth/react";

type SignupFormProps = {
    profileType: string;
    onSubmit: (formData: any) => void;
};

const SignupForm = ({profileType, onSubmit}: SignupFormProps) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [acceptTerms, setAcceptTerms] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!acceptTerms) {
            return toast.error("Please accept our terms first")
        }

        if (!username || !email || !password || !passwordConfirm) {
            // console.log('Please fill in all fields');

            return toast.error("Please fill in all fields");
        }

        if (password !== passwordConfirm) {
            return toast.error("Password and password confirmation do not match");
        }

        const formData = {
            username,
            email,
            password,
            profileType,
        };

        onSubmit(formData);
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
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="px-4 py-2 rounded border border-gray"
                />
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
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    className="px-4 py-2 rounded border  border-gray"
                />
                <div className="flex space-x-2" style={{width: "500px"}}>
                    <input
                        type="checkbox"
                        id="termsCheckbox"
                        className="rounded border border-gray-300"
                        onClick={() => {
                            setAcceptTerms(prv => !prv)
                        }}
                    />
                    <label
                        htmlFor="termsCheckbox"
                        className="text-gray-500 font-normal text-sm"
                    >
                        Yes, I understand and agree to the{" "}
                        <Link href="/legalTerms" className="text-primary">
                            Bricol Terms of Service
                        </Link>
                        , including the User Agreement and Privacy Policy
                    </label>
                </div>
                {/* <div className="my-2"> */}
                <button
                    type="submit"
                    className="py-2 px-20 rounded-full font-medium text-base text-white bg-primary"
                >
                    Create my account
                </button>
                <p className="font-normal my-2 mx-32 text-second">
                    Already have an account ?{" "}
                    <Link href="/signin" className="text-primary">
                        Log In
                    </Link>
                </p>
                {/* </div> */}
            </form>
        </div>
    );
};

export default SignupForm;

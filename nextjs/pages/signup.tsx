import { useState } from 'react';
import { useRouter } from 'next/router';
import ProfileTypeStep from '../components/auth/signup/ProfileTypeStep';
import SignupForm from "../components/auth/signup/SignupForm"
import Link from "next/link";
import google from "../public/google.png";

const SignupPage = () => {
  const [profileType, setProfileType] = useState('');
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };


  const handleProfileTypeSelect = (type: string) => {
    setProfileType(type);
  };

  const handleSignup = (formData: any) => {
    console.log(formData);
    router.push('/');
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
      {profileType ? (
        <SignupForm profileType={profileType} onSubmit={handleSignup} />
      ) : (
        <ProfileTypeStep onSelect={handleProfileTypeSelect} />
      )}
    </div>
    </>
  );
};

export default SignupPage;





// "use client"
// import {FormEvent, useRef} from "react";
// import {useRouter} from "next/router";

// export default function () {

//     // let userRole;
//     const router = useRouter()
//     // useEffect(() => {
//     //     userRole = localStorage.getItem('userRole')
//     //     if (!userRole) {
//     //         router.push('/signup/chooseProfile')
//     //     }
//     // })

//     const emailRef = useRef<HTMLInputElement>(null);
//     const usernameRef = useRef<HTMLInputElement>(null);
//     const passwordRef = useRef<HTMLInputElement>(null);
//     const passwordConfirmRef = useRef<HTMLInputElement>(null);
//     const submitHandler = (e: FormEvent) => {
//         e.preventDefault();
//         const userRole = localStorage.getItem('userRole')
//         if (!userRole) {
//             router.push('/signup/chooseProfile')
//         }
//         const email = emailRef.current?.value;
//         const username = usernameRef.current?.value;
//         const password = passwordRef.current?.value;
//         const passwordConfirm = passwordConfirmRef.current?.value;
//         console.log(email, username, password);
//         // some validation
//         fetch('/api/users/signup', {
//                 method: 'POST',
//                 body: JSON.stringify({
//                     email,
//                     username,
//                     password,
//                     passwordConfirm,
//                     userRole
//                 })
//             }
//         ).then(r => r.json()).then(data => {
//                 console.log(data)
//                 router.push("api/auth/signin?callbackUrl=/register")
//             }
//         )
//     }


//     return (
//         <form onSubmit={submitHandler}>
//             <input ref={usernameRef} placeholder={"enter your username"} type={"text"}/>
//             <input ref={emailRef} placeholder={"enter your email"} type={"email"}/>
//             <input ref={passwordRef} placeholder={"enter your password"} type={"password"}/>
//             <input ref={passwordConfirmRef} placeholder={"enter your password again"} type={"password"}/>
//             <button type={"submit"}>Sign up</button>
//         </form>
//     );
// }





"use client"
import {FormEvent, useRef} from "react";
import {useRouter} from "next/router";

export default function () {

    // let userRole;
    const router = useRouter()
    // useEffect(() => {
    //     userRole = localStorage.getItem('userRole')
    //     if (!userRole) {
    //         router.push('/signup/chooseProfile')
    //     }
    // })

    const emailRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);
    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        const userRole = localStorage.getItem('userRole')
        if (!userRole) {
            router.push('/signup/chooseProfile')
        }
        const email = emailRef.current?.value;
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const passwordConfirm = passwordConfirmRef.current?.value;
        console.log(email, username, password);
        // some validation
        fetch('/api/users/signup', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    username,
                    password,
                    passwordConfirm,
                    userRole
                })
            }
        ).then(r => r.json()).then(data => {
                console.log(data)
                router.push("api/auth/signin?callbackUrl=/register")
            }
        )
    }


    return (
        <form onSubmit={submitHandler}>
            <input ref={usernameRef} placeholder={"enter your username"} type={"text"}/>
            <input ref={emailRef} placeholder={"enter your email"} type={"email"}/>
            <input ref={passwordRef} placeholder={"enter your password"} type={"password"}/>
            <input ref={passwordConfirmRef} placeholder={"enter your password again"} type={"password"}/>
            <button type={"submit"}>Sign up</button>
        </form>
    );
}
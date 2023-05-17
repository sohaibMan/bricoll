import {FormEvent, useState} from "react";
import {UserRole} from "../../../types/resolvers";
import {useRouter} from "next/router";

// tmp for testing
export default function Chooserole() {

    const [role, setrole] = useState('')
    const router = useRouter()


    function submitHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log('submitHandler')
        // fetch('/api/users/roleType', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //             userRole: role
        //         }
        //     )
        // }).then(r => r.json()).then(data => {
        //     console.log(data)
        //     router.push('/signup')
        // })
        localStorage.setItem('userRole', role) // instead of fetch
        router.push('/signup')

    }

    return (
        <form onSubmit={submitHandler}>
            Choose profile
            <input type={"text"} onChange={(e) => setrole(e.target.value)}/>
            {role === UserRole.Freelancer || role === UserRole.Client && <button type={"submit"}>Submit</button>}
        </form>
    )
}
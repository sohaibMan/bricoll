import Link from "next/link";


export default async function Page({params}: { params: { emailVerificationToken: string } }) {

    const emailVerificationToken = params?.emailVerificationToken?.toString();
    if (!emailVerificationToken) return {
        props: {status: "failed", message: "no token was provided"}
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/users/emailVerification/${emailVerificationToken}`);
    const {status, message}: { status: "success" | "failed", message: string } = await response.json();


    return <div className="bg-gray-100 h-screen">
        <div className="bg-white p-6  md:mx-auto">
            {status === "success" && <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                <path fill="currentColor"
                      d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                </path>
            </svg>}
            {status === "failed" && <svg fill="#000000" width="800px" height="800px" viewBox="0 -8 528 528"
                                         className="text-red-600 w-16 h-16 mx-auto my-6"
                                         xmlns="http://www.w3.org/2000/svg"><title>fail</title>
                <path fill="currentColor"
                      d="M264 456Q210 456 164 429 118 402 91 356 64 310 64 256 64 202 91 156 118 110 164 83 210 56 264 56 318 56 364 83 410 110 437 156 464 202 464 256 464 310 437 356 410 402 364 429 318 456 264 456ZM264 288L328 352 360 320 296 256 360 192 328 160 264 224 200 160 168 192 232 256 168 320 200 352 264 288Z"/>
            </svg>}

            <div className="text-center">
                <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Email
                    verification {status}!</h3>
                <p className="text-gray-600 my-2">{message}</p>
                <p> Have a great day! </p>
                <div className="py-10 text-center">
                    <Link href="/"
                          className={`px-12 ${status === "success" ? 'bg-green-600 hover:bg-green-400' : 'bg-red-600 hover:bg-red-400'}  text-white font-semi-bold py-3`}>
                        GO BACK
                    </Link>
                </div>
            </div>
        </div>
    </div>
}
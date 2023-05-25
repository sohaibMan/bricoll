"use client"
import {useState} from 'react';
import ProfileTypeStep from '../../components/auth/signup/ProfileTypeStep';
import SignupForm from "../../components/auth/signup";

const SignupPage = () => {
    const [profileType, setProfileType] = useState('');
    // const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };


    const handleProfileTypeSelect = (type: string) => {
        setProfileType(type);
    };

    const handleSignup = (formData: any) => {
        console.log(formData);
        // todo call our api with the data
        // router.push('/register');
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
                    <SignupForm profileType={profileType} onSubmit={handleSignup}/>
                ) : (
                    <ProfileTypeStep onSelect={handleProfileTypeSelect}/>
                )}
            </div>
        </>
    );
};

export default SignupPage;



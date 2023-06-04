import {useState} from "react";
import Link from "next/link";
import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import {Avatar} from "@mui/material";
import {signOut, useSession} from "next-auth/react";
import "../../styles/globals.css";


export function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const {data: session} = useSession();

    const toggleProfileMenu = () => {
        setIsProfileOpen((prev) => !prev);
    };

    return (
        <nav className="container mx-auto p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p><Link href="/" className="text-primary font-bold text-2xl px-6">BRICOL</Link></p>
                </div>
                <div className="md:hidden">
                    <button
                        className="text-gray-500 hover:text-gray-600 focus:outline-none"
                        onClick={() => setIsOpen((prev) => !prev)}
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
                <div
                    className={`md:flex space-x-6 px-6 ${
                        isOpen ? "block" : "hidden"
                    } md:block`}
                >
                    <div className="hidden md:flex mx-72 space-x-6 py-2">
                        <Link
                            href="/"
                            passHref
                            className="text-lg font-sans text-primary_2 hover:text-primary"
                        >
                            Find Talent
                        </Link>
                        <Link
                            href="/home/sohaib/Desktop/Bricoll/nextjs/about"
                            passHref
                            className="text-lg font-sans text-primary_2 hover:text-primary"
                        >
                            Find Work
                        </Link>
                        <Link
                            href="/home/sohaib/Desktop/Bricoll/nextjs/contact"
                            passHref
                            className="text-lg font-sans text-primary_2 hover:text-primary"
                        >
                            Why Bricol
                        </Link>
                        <Link
                            href="/home/sohaib/Desktop/Bricoll/nextjs/services"
                            passHref
                            className="text-lg font-sans text-primary_2 hover:text-primary"
                        >
                            About Us
                        </Link>
                    </div>
                    <div
                        style={{marginRight: "20px"}}
                        className="flex items-center space-x-4"
                    >
                        <button
                            className="text-gray-500 hover:text-gray-600 focus:outline-none"
                            title="Help and Support"
                        >
                            <QuestionMarkOutlinedIcon/>
                        </button>
                        <button
                            className="text-gray-500 hover:text-gray-600 focus:outline-none relative"
                            title="Notifications"
                        >
                            <NotificationsNoneOutlinedIcon/>
                        </button>
                        <div className="relative">
                            <button
                                className="flex items-center focus:outline-none"
                                title="Profile"
                                onClick={toggleProfileMenu}
                            >
                                <div className="rounded-full overflow-hidden">
                                    {session?.user.image && (
                                        <Avatar
                                            style={{width: "35px", height: "35px"}}
                                            alt={session.user.username}
                                            src={session.user.image}
                                        />
                                        // <Image
                                        //   src={session?.user.image}
                                        //   alt="User"
                                        //   width={50}
                                        //   height={50}
                                        //   className="object-cover w-full h-full"
                                        // />
                                    )}
                                    {/* <Image src={man} alt="user" width={32} height={32} /> */}
                                </div>
                            </button>
                            {isProfileOpen && (
                                <div
                                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                    <div
                                        className="py-1"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="user-menu"
                                    >
                                        <button
                                            className="block px-4 py-2 text-sm space-x-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                                            role="menuitem"
                                            onClick={toggleProfileMenu}
                                        >
                                            <SettingsOutlinedIcon/>
                                            <Link href="/dashboard" className="mx-4">
                                                Settings
                                            </Link>
                                        </button>
                                        <button
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                            role="menuitem"
                                            onClick={toggleProfileMenu}
                                        >
                                            <LogoutIcon/>
                                            <span
                                                onClick={() => {
                                                    signOut();
                                                }}
                                                className="mx-2"
                                            >
                        Log Out
                      </span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

import Link from "next/link";
import Image from "next/image";
import heroImage from "../public/heroImage.jpg";
import google from "../public/google.png";
import fst from "../public/fst.png";
import microsoft from "../public/microsoft.png";
import {NavBar} from "../components/home/NavBar";


const Home = () => {


    return (
        <>
            <NavBar/>
            <section id="hero">
                <div className="container mx-auto px-10 py-4 space-x-10 flex flex-col-reverse md:flex-row">
                    <div
                        className="md:w-1/2 flex flex-col justify-center py-8 text-center md:text-left mx-8 space-y-7 ">
                        <div className="flex md:flex my-4 space-x-9">
                            <p className="my-3 rounded-full w-2 h-2 bg-gray"></p>
                            <p className="my-1 rounded-full w-6 h-6 bg-second"></p>
                            <p className="rounded-full w-8 h-8 bg-primary"></p>
                            <p></p>
                            <p></p>
                        </div>
                        <p className=" md:font-bold text-base text-gray">It’s Time to</p>
                        <h1 className="font-bold text-4xl md:text-6xl text-primary">
                            Unlock the Power of Freelance Expertise
                        </h1>
                        <h2 className="font-semibold text-lg md:text-3xl text-second">
                            Elevate Your Business with Professional Freelancers
                        </h2>
                        <Link
                            href="/app/signup/page"
                            passHref
                            className="py-2 px-5 rounded-full self-center md:self-start font-medium text-xl  text-white bg-primary hover:text-second"
                        >
                            Get Started
                        </Link>
                        <div>
                            <p className="text-lg py-6 font-bold">Trusted by</p>
                            <div className="flex h-7 space-x-2">
                                <Image
                                    className=""
                                    src={google}
                                    alt="Google"
                                    width="30"
                                    height="30"
                                />
                                <Image
                                    className="my-0 h-9"
                                    src={fst}
                                    alt="fst"
                                    width="90"
                                    height="90"
                                />
                                <Image
                                    className=""
                                    src={microsoft}
                                    alt="microsoft"
                                    width="128"
                                    height="27"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <Image
                            className="py-5 rounded-s-full"
                            src={heroImage}
                            alt="heroImage"
                            width={611}
                            height={530}
                        />
                    </div>
                </div>
            </section>
        </>
    );
};
export default Home;


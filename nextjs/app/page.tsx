"use client";
import Link from "next/link";
import Image from "next/image";
import heroImage from "../public/heroImage.jpg";
import google from "../public/google.png";
import fst from "../public/fst.png";
import devImage from "../public/dev.jpg";
// import graphicImage from "../public/graphic.jpg";
import socialImage from "../public/social.jpg";
import thumb from "../public/thumb.png";
import accept from "../public/accept.png";
import men from "../public/man.jpg";
import women from "../public/women.jpg";
import quality from "../public/quality.png";
import security from "../public/security.png";
import trust from "../public/trust.png";
import job from "../public/job.png";
import microsoft from "../public/microsoft.png";
import { NavBar } from "../components/home/NavBar";
import ExpertiseCard from "../components/ExpertiseCard";
import { useState } from "react";

const Home = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <NavBar />
      <section id="hero">
        <div className="container mx-auto px-10 py-4 space-x-10 flex flex-col-reverse md:flex-row">
          <div className="md:w-1/2 flex flex-col justify-center py-8 text-center md:text-left mx-8 space-y-7 ">
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
      <section className="my-12" id="expertise">
        <h1 className="font-bold mx-auto text-4xl text-center md:text-5xl text-second">
          Our Expertise
        </h1>
        <div className="container mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <ExpertiseCard
            title="Development & IT"
            description="We specialize in creating stunning and user-friendly websites tailored to your business needs. From responsive design to seamless functionality, we ensure an exceptional online presence for your brand."
            imageSrc={devImage}
          />
          <ExpertiseCard
            title="Graphic Design"
            description="We create bespoke designs that help businesses & individuals communicate effectively. From logos to brand identity, we create designs that stand out & reflect your unique style."
            imageSrc={devImage}
          />
          <ExpertiseCard
            title="Social Media"
            description="Connect with your audience and build a strong online presence with our social media services. We offer a range of solutions to help you succeed."
            imageSrc={socialImage}
          />
        </div>
      </section>
      <section className="my-2 bg-white" id="why">
        <div className="container mx-auto py-4 space-x-10 flex flex-col-reverse md:flex-row">
          <div className="p-4 w-3/3 md:w-2/3">
            <h2 className="text-5xl text-second mx-16 my-20 font-semibold mb-2">
              Why <span className="text-primary">BRICOL</span> Is the Best Place
              to Build Your Freelance Career
            </h2>
            <p className="text-second my-8 mx-16 text-xl font-normal">
              At BRICOL, we pride ourselves on providing a platform that offers
              the best experience for freelancers looking to build a successful
              career. Here are just a few reasons why we're the best and most
              popular platform for freelancers
            </p>
            <div className="container my-10 mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 md:mx-16">
              <div className="p-4 cursor-pointer bg-white transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl hover:bg-gray-100 rounded-lg flex items-center">
                <div className="mr-4">
                  <Image
                    src={quality}
                    className="h-6 w-6 text-primary"
                    alt="quality"
                  />
                </div>
                <h3 className="text-xl font-medium">Quality Job</h3>
              </div>
              <div className="p-4 cursor-pointer bg-white transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl hover:bg-gray-100 rounded-lg flex items-center">
                <div className="mr-4">
                  <Image src={job} className="h-6 w-6 text-primary" alt="job" />
                </div>
                <h3 className="text-xl font-medium">International Job</h3>
              </div>
              <div className="p-4 cursor-pointer bg-white transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl hover:bg-gray-100 rounded-lg flex items-center">
                <div className="mr-4">
                  <Image
                    src={trust}
                    className="h-6 w-6 text-primary"
                    alt="trust"
                  />
                </div>
                <h3 className="text-xl font-medium">Trust and Reliability</h3>
              </div>
              <div className="p-4 cursor-pointer bg-white transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl hover:bg-gray-100 rounded-lg flex items-center">
                <div className="mr-4">
                  <Image
                    src={security}
                    className="h-6 w-6 text-primary"
                    alt="security"
                  />
                </div>
                <h3 className="text-xl font-medium">Security</h3>
              </div>
            </div>
          </div>
          <Image
            src={accept}
            alt="accept"
            className="my-24"
            style={{ width: "120px", height: "120px", marginLeft: "180px" }}
          />
        </div>
      </section>
      
    </>
  );
};
export default Home;

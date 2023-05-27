"use client";
import Image from "next/image";
import men from "../../public/man.jpg";
import women from "../../public/woman.jpg";
import { useState } from "react";

export function CommentsSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="my-12 bg-white" id="comments">
      <h1 className="font-bold mx-auto text-4xl text-center md:text-5xl text-second">
        Client’s Comments
      </h1>
      <p className="text-second my-8 mx-20 text-2xl font-normal">
        At <span className="text-primary">BRICOL</span>, we pride ourselves on
        providing a platform that connects freelancers with clients in a way
        that is safe, secure, and reliable. But don't just take our word for it
        - here's what some of our satisfied clients have to say
      </p>
      <div className="container mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2">
        <div
          className={`bg-white mx-16 my-16 rounded-lg md:mx-36 md:my-24 shadow-md transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-xl ${
            isHovered ? "scale-105" : ""
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex justify-center">
            <Image
              className="w-20 h-20 rounded-full object-cover"
              src={men}
              alt="Person 1"
            />
          </div>
          <p className="text-center my-4">
            `Working with freelancers on BRICOL was a game changer for our
            business. We were able to find top talent for our projects and get
            the work done quickly and efficiently. The platform is easy to use
            and the support team is responsive and helpful`
          </p>
          <p className="text-center font-semibold">- Sohaib</p>
        </div>
        <div
          className={`bg-white mx-16 my-16 rounded-lg md:mx-36 md:my-24 shadow-md transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-xl ${
            isHovered ? "scale-105" : ""
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex justify-center">
            <Image
              className="w-20 h-20 rounded-full object-cover"
              src={women}
              alt="Person 2"
            />
          </div>
          <p className="text-center my-4">
            `I was hesitant to try freelancing, but BRICOL made it easy. The
            platform gave me access to a wide range of talented freelancers, and
            I was able to find the perfect person for my project. I was
            impressed with the quality of work and the professionalism of the
            freelancers I worked with.`
          </p>
          <p className="text-center font-semibold">- Sara</p>
        </div>
      </div>
    </section>
  );
}

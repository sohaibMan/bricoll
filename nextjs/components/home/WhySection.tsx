import Image from "next/image";
import quality from "../../public/quality.png";
import security from "../../public/security.png";
import trust from "../../public/trust.png";
import job from "../../public/job.png";
import accept from "../../public/accept.png";

export function WhySection() {
  return (
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
  );
}

"use client"
import ExpertiseCard from "../ExpertiseCard";
import devImage from "../../public/dev.jpg";
import graphicImage from "../../public/graphic.jpg";
import socialImage from "../../public/social.jpg";

export function ExpertiseSection() {

  return (
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
            imageSrc={graphicImage}
          />
          <ExpertiseCard
            title="Social Media"
            description="Connect with your audience and build a strong online presence with our social media services. We offer a range of solutions to help you succeed."
            imageSrc={socialImage}
          />
        </div>
      </section>
  )
}
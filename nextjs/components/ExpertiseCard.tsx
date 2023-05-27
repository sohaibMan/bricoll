"use client"
import { useState } from "react";
import Image from "next/image";

const ExpertiseCard = ({ title, description, imageSrc }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-white mx-16 my-16 rounded-lg shadow-md transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-xl ${
        isHovered ? "scale-105" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image src={imageSrc} alt={title} className="rounded-t-lg" />
      <div className="p-4">
        <h2 className="text-2xl text-center font-medium mb-2">{title}</h2>
        <p className="text-second text-justify">{description}</p>
      </div>
    </div>
  );
};

export default ExpertiseCard;

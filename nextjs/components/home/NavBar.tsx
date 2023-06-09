"use client";
import { useState } from "react";
import Link from "next/link";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="container mx-auto p-6">
      <div className="flex items-center justify-between">
        <div>
          <p>
            <Link href="/" className="text-primary font-bold text-2xl px-6">
              BRICOL
            </Link>
          </p>
        </div>
        <div className="md:hidden">
          <button
            className="text-gray-500 hover:text-gray-600 focus:outline-none"
            onClick={() => setIsOpen((prv) => !prv)}
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
          {/* <div className="hidden md:flex mx-72 space-x-6 py-2">
            <Link
              href="#hero"
              passHref
              className="text-lg font-sans text-primary_2 hover:text-primary"
            >
              Home
            </Link>
            <Link
              href="#expertise"
              passHref
              className="text-lg font-sans text-primary_2 hover:text-primary"
            >
              Services
            </Link>
            <Link
              href="#why"
              passHref
              className="text-lg font-sans text-primary_2 hover:text-primary"
            >
              Why Bricol
            </Link>
            <Link
              href="#guids"
              passHref
              className="text-lg font-sans text-primary_2 hover:text-primary"
            >
              Guides
            </Link>
          </div> */}
          <div className="hidden md:flex mx-72 space-x-6 py-2">
            <ScrollLink
              to="hero"
              smooth={true}
              duration={500}
              className="text-lg font-sans text-primary_2 hover:text-primary cursor-pointer"
            >
              Home
            </ScrollLink>
            <ScrollLink
              to="expertise"
              smooth={true}
              duration={500}
              className="text-lg font-sans text-primary_2 hover:text-primary cursor-pointer"
            >
              Services
            </ScrollLink>
            <ScrollLink
              to="why"
              smooth={true}
              duration={500}
              className="text-lg font-sans text-primary_2 hover:text-primary cursor-pointer"
            >
              Why Bricol
            </ScrollLink>
            <ScrollLink
              to="guids"
              smooth={true}
              duration={500}
              className="text-lg font-sans text-primary_2 hover:text-primary cursor-pointer"
            >
              Guides
            </ScrollLink>
          </div>
          <div className="hidden mx-72 md:flex px-4">
            <Link
              href="/signin"
              passHref
              className="py-2 text-lg font-sans px-6 text-primary_2 hover:text-primary"
            >
              Login
            </Link>
            <Link
              href="/signup"
              passHref
              className="py-2 px-5 rounded-full font-medium text-lg text-white bg-primary"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

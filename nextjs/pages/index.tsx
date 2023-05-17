
import Link from 'next/link';
import { useState } from 'react';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
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
        <div
          className={`md:flex space-x-6 px-6 ${
            isOpen ? 'block' : 'hidden'
          } md:block`}
        >
          <div className="hidden md:flex mx-72 space-x-6 py-2">
              <Link href="/" passHref className="text-base font-sans text-primary_2 hover:text-primary">
                Find Talent
              </Link>
              <Link href="/about" passHref className="text-base font-sans text-primary_2 hover:text-primary">
                Find Work
              </Link>
              <Link href="/contact" passHref className="text-base font-sans text-primary_2 hover:text-primary">
                Why Bricol
              </Link>
              <Link href="/services" passHref className="text-base font-sans text-primary_2 hover:text-primary">
                About Us
              </Link>
          </div>
          <div className="hidden mx-72 md:flex px-4">
              <Link href="/services" passHref className="py-2 text-base font-sans px-6 text-primary_2 hover:text-primary">
                Login
              </Link>
              <Link href="/services" passHref className="py-2 px-5 rounded-full text-white bg-primary hover:text-primary_2">
                Signup
              </Link>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
        }
export default Home;


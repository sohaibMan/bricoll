"use client";

export function FooterSection() {

  return (
    <footer>
        <footer className="bg-primary py-10">
          <div className="container mx-auto text-center">
            <h3 className="text-white text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-white text-lg mb-6">
              We'd love to hear from you!
            </p>
            <div className="flex justify-center">
              <a
                href="tel:+1234567890"
                className="mr-4 text-white hover:text-second"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 inline-block"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                +212 72 567-8930
              </a>
              <a
                href="mailto:info@bricol.com"
                className="text-white hover:text-second"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 inline-block"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                info@bricol.com
              </a>
            </div>
            <div className="mt-8">
              <ul className="flex justify-center space-x-6">
                <li>
                  <a href="#" className="text-white hover:text-second">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-second">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-second">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-second">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </footer>
  )
}
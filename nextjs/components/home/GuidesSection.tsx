import Image from "next/image";
import thumb from "../../public/thumb.jpg";

export function GuidesSection() {
  return (
    <section className="my-12 bg-newColor" id="guids">
        <div className="container mx-auto grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2">
          <div className="p-4">
            <h2 className="text-5xl text-second mx-16 my-20 font-medium mb-2">
              There are good talents here that will help you solve your problems{" "}
            </h2>
            <p className="text-second my-8 mx-16 text-xl font-normal">
              There Are Many Talents That You Can Find. Of Course. In All Fields
              In The World Of Work.
            </p>
          </div>
          <div className="p-4 my-20">
            <p className="bg-primary py-1 rounded-full w-5/6"></p>
            <div className="container my-2 mx-auto grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2">
              <div className="p-4 w-64">
                <h2 className="text-5xl text-black my-2 font-semibold mb-2">
                  4.9/5
                </h2>
                <p className="text-second my-8 text-xl font-normal">
                  Average rating of talent from 2M+ reviews
                </p>
              </div>
              <div className="p-4 w-64">
                <h2 className="text-5xl text-black my-2 font-semibold mb-2">
                  8K+
                </h2>
                <p className="text-second my-8 text-xl font-normal">
                  Skills represented by talent on Borongan
                </p>
              </div>
            </div>
          </div>
        </div>
        <Image
          className="py-5 mx-auto"
          src={thumb}
          alt="thumb"
          width={428}
          height={321}
        />
      </section>
  )
}
import { servicesData } from "@/data";
import { Button } from "./ui/MovingBorders";

const Services = () => {
  return (
    <div id="services" className="py-20">
      <h1 className="heading">
        The
        <span className="text-purple"> services</span> I provide
      </h1>
      <div className="w-full mt-12 grid xl:grid-cols-8 md:grid-cols-4 grid-cols-1 gap-10">
        {servicesData.map((card) => (
          <Button
            key={card.id}
            duration={Math.floor(Math.random() * 5000) + 5000}
            borderRadius="1.75rem"
            className="flex-1 text-white border-neutral-200 dark:border-slate-800"
          >
            <div className="flex flex-col py-6 gap-2 p-10 lg:p-3">
              <div className="p-5 flex items-center justify-center h-48">
                <img
                  src={card.thumbnail}
                  alt={card.thumbnail}
                  className="w-24"
                />
              </div>
              <div className="flex flex-col lg:ms-5 text-start min-h-[35vh]">
                <h1 className="text-start text-xl font-bold">{card.title}</h1>

                <p className="text-start text-white-100 mt-3 font-semibold">
                  {card.description}
                </p>

                <ul className="mt-4 space-y-2 text-start">
                  {card.features.map((feature) => (
                    <li
                      key={card.id + feature}
                      className="flex items-center gap-2"
                    >
                      <svg
                        className="w-4 h-4 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 flex items-center justify-center">
                <a
                  className="mt-5 inline-flex h-12 animate-shimmer items-center justify-center border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 text-slate-400 transition-colors w-[16rem] md:w-[12rem] font-bold text-lg rounded-2xl"
                  href="#contact"
                >
                  Request Now!
                </a>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Services;

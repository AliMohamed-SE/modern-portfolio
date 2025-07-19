"use client";
import { servicesData } from "@/data";
import Service from "./Service";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./dialog";
import { useState } from "react";

const ServicesList = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
      {servicesData.map((service, index) => (
        <Dialog
          key={service.id}
          open={openIndex === index}
          onOpenChange={(open) => setOpenIndex(open ? index : null)}
        >
          <DialogTrigger asChild>
            <div className="cursor-pointer">
              <Service
                title={service.title}
                description={service.description}
                icon={service.thumbnail}
                index={index}
              />
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <img
                  src={
                    service.thumbnail.startsWith("/")
                      ? service.thumbnail
                      : "/" + service.thumbnail
                  }
                  alt={service.title}
                  className="w-8 h-8 object-contain"
                />
                {service.title}
              </DialogTitle>
              <DialogDescription className="pt-2 text-base text-neutral-600 dark:text-neutral-300">
                {service.description}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-neutral-800 dark:text-neutral-200">
                Key Features:
              </h3>
              <ul className="list-disc space-y-1">
                {service.features.map((feature: string) => (
                  <li key={feature} className="flex items-center gap-2">
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
            <div className="mt-6 flex justify-end">
              <a
                href="#contact"
                className="inline-flex h-10 items-center justify-center border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 text-slate-400 transition-colors font-bold text-base rounded-xl hover:text-white"
                onClick={() => setOpenIndex(null)}
              >
                Request Now!
              </a>
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

export default ServicesList;

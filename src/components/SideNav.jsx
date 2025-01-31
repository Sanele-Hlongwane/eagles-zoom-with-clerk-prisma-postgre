'use client';
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { tabs } from "../constants/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const Tab = ({ label, route, icon, onClick }) => {
  const pathname = usePathname();

  let isActive = pathname === route;
  const isMeetingPage = pathname.startsWith("/meeting");
  if (isMeetingPage) {
    return null; // Ensure no rendering on meeting pages
  }

  return (
    <div
      className={cn(
        "px-4 pl-6 py-3 my-3 mx-2 text-white flex justify-start items-center rounded-xl transition-all duration-300",
        {
          "bg-primary": isActive,
          "hover:bg-gray-700": !isActive,
        }
      )}
      onClick={onClick}
    >
      <Link href={route} className="flex gap-3 lg:gap-4 items-center w-full">
        <Image
          src={icon}
          width={30}
          height={30}
          alt={label}
          className="w-5 md:w-6 lg:w-8 h-auto"
        />
        <p className="text-sm md:text-base lg:text-lg font-medium lg:font-semibold">
          {label}
        </p>
      </Link>
    </div>
  );
};

const SideNav = () => {
  const pathname = usePathname();
  const isMeetingPage = pathname.startsWith("/meeting");
  const [isOpen, setIsOpen] = useState(false);

  if (isMeetingPage) {
    return null; // Ensure no rendering on meeting pages
  }

  const toggleSideNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        id="sideNav"
        className={cn(
          "fixed top-0 left-0 h-full bg-gray-900 text-white pt-5 select-none transition-transform duration-300 z-40",
          {
            "w-[185px] md:w-[210px] lg:w-[250px] xl:w-[260px] translate-x-0": isOpen,
            "w-0 md:w-0 lg:w-0 xl:w-0 -translate-x-full": !isOpen,
          }
        )}
      >
        <div className="flex justify-between items-center px-4 py-2">
          {isOpen ? (
            <h2 className="text-lg font-semibold">Options</h2>
          ) : (
            <button
              className="text-gray-400 hover:text-white transition-colors"
              onClick={toggleSideNav}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>
        <div className={cn("mt-4", { "hidden": !isOpen })}>
          {tabs.map(({ label, icon, route }, index) => (
            <Tab
              key={index}
              label={label}
              route={route}
              icon={icon}
              onClick={toggleSideNav}
            />
          ))}
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-30"
          onClick={toggleSideNav}
        ></div>
      )}
      <button
        className={cn(
          "fixed top-1/2 left-0 transform -translate-y-1/2 z-50 transition-opacity duration-300",
          {
            "opacity-100": !isOpen,
            "opacity-0": isOpen,
          }
        )}
        onClick={toggleSideNav}
      >
        <div className="w-8 h-8 flex items-center justify-center bg-gray-900 text-white rounded-full shadow-lg">
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </div>
      </button>
    </>
  );
};

export default SideNav;

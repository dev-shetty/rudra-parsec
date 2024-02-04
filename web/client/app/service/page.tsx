"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import React from "react";

const CardData = [
  {
    id: 1,
    link: "/pot",
    title: "Pots",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="60"
        height="60"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M11 5v3h2V5zM4.91 7.5L3.5 8.91l1.77 1.77l1.41-1.41zm14.18 0l-1.77 1.77l1.41 1.41l1.77-1.77zM4 12c0 2.86 1.5 5.5 4 6.93s5.5 1.43 8 0s4-4.07 4-6.93z"
        />
      </svg>
    ),
    content:
      "Collaborative Money Pots for Seamless and Shared Financial Goals.",
  },
  {
    id: 2,
    link: "/news",
    title: "News",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="60"
        height="60"
        viewBox="0 0 16 16"
      >
        <path
          fill="currentColor"
          d="M3.5 5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5zM4 9V8h1v1zm3.5-2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM1 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2a2 2 0 0 1 2 2v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 10.5zm11.5 6.5a.5.5 0 0 1-.5-.5V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v6.5A1.5 1.5 0 0 0 3.5 12h9a1.5 1.5 0 0 0 1.5-1.5V6a1 1 0 0 0-1-1v5a.5.5 0 0 1-.5.5"
        />
      </svg>
    ),
    content: "Stay updated on financial developments through NLP powered news.",
  },

  {
    id: 3,
    link: "/educate",
    title: "Education",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="60"
        height="60"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9zm6.82 6L12 12.72L5.18 9L12 5.28zM17 16l-5 2.72L7 16v-3.73L12 15l5-2.73z"
        />
      </svg>
    ),
    content:
      "Gain financial knowledge through our comprehensive financial education offerings.",
  },

  {
    id: 4,
    link: "/news",
    title: "Global News",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        className="mb-1"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M9.206 3.182A9.254 9.254 0 0 0 2.78 11.25h4.48c.033-1.096.135-2.176.305-3.2c.207-1.254.515-2.41.91-3.4a9.3 9.3 0 0 1 .731-1.468M12 1.25a10.75 10.75 0 1 0 0 21.5a10.75 10.75 0 0 0 0-21.5m0 1.5c-.261 0-.599.126-.991.532c-.396.41-.791 1.051-1.141 1.925c-.347.869-.63 1.917-.824 3.089c-.155.94-.25 1.937-.282 2.954h6.476a22.452 22.452 0 0 0-.282-2.954c-.194-1.172-.477-2.22-.824-3.089c-.35-.874-.745-1.515-1.14-1.925c-.393-.406-.73-.532-.992-.532m4.74 8.5a23.96 23.96 0 0 0-.305-3.2c-.207-1.254-.515-2.41-.91-3.4a9.292 9.292 0 0 0-.732-1.468a9.238 9.238 0 0 1 3.748 2.277a9.25 9.25 0 0 1 2.678 5.791zm-1.502 1.5H8.762c.031 1.017.127 2.014.282 2.954c.194 1.172.477 2.22.824 3.089c.35.874.745 1.515 1.14 1.925c.393.406.73.532.992.532c.261 0 .599-.126.991-.532c.396-.41.791-1.051 1.141-1.925c.347-.869.63-1.917.824-3.089c.155-.94.25-1.937.282-2.954m-.444 8.068c.27-.434.515-.929.73-1.468c.396-.99.704-2.146.911-3.4a23.96 23.96 0 0 0 .304-3.2h4.48a9.25 9.25 0 0 1-6.426 8.068m-5.588 0a9.3 9.3 0 0 1-.73-1.468c-.396-.99-.704-2.146-.911-3.4a23.961 23.961 0 0 1-.304-3.2H2.78a9.25 9.25 0 0 0 6.425 8.068"
          clipRule="evenodd"
        />
      </svg>
    ),
    content: "Stay abreast of worldwide financial updates.",
  },

  {
    id: 5,
    link: "/contracts",
    title: "Contracts",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="60"
        height="60"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M28.916 8.01L15.953 1.887a.92.92 0 0 0-1.288.638c-.003.01-1.04 4.83-2.58 9.635c-.525 1.647-1.113 3.275-1.727 4.705l1.665.786c2-4.642 3.584-11.05 4.18-13.613L27.47 9.353c-.346 1.513-1.233 5.223-2.42 8.927c-.767 2.4-1.665 4.797-2.585 6.532c-.89 1.79-1.958 2.67-2.197 2.552c-1.42.03-2.418-1.262-3.09-2.918a13.7 13.7 0 0 1-.657-2.246c-.128-.618-.167-1.006-.17-1.006a.906.906 0 0 0-.52-.73l-12.96-6.12a.924.924 0 0 0-.926.08a.92.92 0 0 0-.38.847c.008.046.195 1.85.947 3.737c.522 1.32 1.407 2.818 2.846 3.575l12.956 6.13l.006-.012c.562.295 1.2.487 1.947.496c1.797-.117 2.777-1.668 3.818-3.525c3-5.69 5.32-16.6 5.338-16.64a.91.91 0 0 0-.504-1.02z"
        />
      </svg>
    ),
    content: "Transforming Text into Tailored Legal Agreements with Ease.",
  },
];

const Cards = () => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    e.currentTarget.style.background = `radial-gradient(circle at ${x}px ${y}px, #ffffff18, transparent)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.background = "#d1f2f900";
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Navbar />
      <div className="lg:mt-16 pt-5 mt-24">
        <div className="font-semibold text-4xl text-center mb-10">
          Our Services
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-10 gap-5 max-w-7xl p-5">
          {CardData.map((card) => (
            <Link
              href={card.link}
              key={card.id}
              className="relative w-80 h-64 overflow-hidden"
            >
              <div className="absolute h-full inset-0 bg-input rounded-3xl p-0.5 z-5 transition bg-gradient-to-br hover:from-blue-500 hover:via-[#f6cbc5] hover:to-[#df8175]">
                <div className="bg-black w-full rounded-3xl h-full">
                  <div
                    className="rounded-2xl flex flex-col justify-center items-center p-5 h-full"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="flex items-center flex-col gap-1 mb-2">
                      {card.icon}
                      <div className="text-xl font-bold">{card.title}</div>
                    </div>
                    <div className="text-lg mb-3 text-center">
                      {card.content}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;

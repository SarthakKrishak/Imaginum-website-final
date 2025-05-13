import React from "react";
import right from "/right.svg";
import toast from "react-hot-toast";
import image2 from "/image64.jpg";
interface CardProps {
  image: string;
  name: string;
  subtitle: string;
  description: string;
  tags: string[];
  liveUrl: string;
  buttonText?: string;
  imagePosition?: "left" | "right";
  statuss: string;
}

const Card: React.FC<CardProps> = ({
  image,
  name,
  subtitle,
  description,
  tags,
  liveUrl,
  buttonText = "View Website",
  imagePosition = "left",
  statuss,
}) => {
  const layoutDirection =
    imagePosition === "right" ? "md:flex-row-reverse" : "md:flex-row";

  return (
    <div
      className={`rounded-xl 
      border-t-2 border-t-zinc-500/50 
      shadow-[0_-4px_12px_rgba(100,149,255,0.3)] 
      p-5 flex flex-col ${layoutDirection} justify-center items-center
      gap-6 lg:w-[90vw] w-[90vw] md:w-[86vw] mx-auto md:mt-20 mt-12 text-white origin-top-left
      bg-gradient-to-l from-blue-900 to-black backdrop-blur-[10px]`}
    >
      {image ? (
        <img
          src={image}
          alt="project"
          loading="lazy"
          className="w-full lg:w-[42%] md:w-[40%] lg:h-full rounded-lg object-cover"
        />
      ) : (
        <img
          src={image2}
          alt="project"
          loading="lazy"
          className="w-full lg:w-[42%] md:w-[40%] lg:h-full rounded-lg object-cover"
        />
      )}

      {/* Right Section */}
      <div className="flex flex-col items-start justify-center w-full h-full">
        {/* Title and subtitle */}
        <div className="md:text-xl lg:text-5xl text-3xl font-semibold font-['Figtree'] md:pl-7 pl-3 lg:pt-5 flex flex-col gap-2">
          <h2>{name}</h2>
          <span className="text-[#6683C1] font-normal">{subtitle}</span>
        </div>

        {/* Description */}
        <p className="md:text-base lg:text-xl text-white font-light lg:mt-6 mt-4 tracking-wide pl-3 md:pl-7 font-['Geist']">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-3 md:mt-3 lg:mt-10 mt-6 md:pl-7 pl-3 shrink-0">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-6 lg:px-5 lg:py-[0.8vh] py-[0.5vh] lg:text-sm text-base md:text-sm rounded-2xl outline outline-[0.58px] outline-offset-[-0.58px] outline-blue-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Button and Status */}
        <div className="md:mt-4 mt-6 lg:mt-8 flex items-center gap-4 md:pl-7 pl-3">
          <a
            href={liveUrl}
            onClick={(e) => {
              if (!liveUrl) {
                e.preventDefault();
                toast("Coming Soon...");
              }
            }}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[linear-gradient(180deg,_rgba(0,0,0,0)_-40.91%,_#002094_132.95%)] px-6 py-3 md:px-4 md:py-2 lg:px-6 lg:py-3 font-sans rounded-lg text-sm md:text-xs lg:text-sm font-medium transition border-[#ffffff] border-opacity-20 border-2 shadow-[inset_0px_14.04px_42.12px_0px_#497BFFB2,_0px_14.04px_56.16px_0px_#3F4AAF80] 
            backdrop-blur-[28.07938575744629px] hover:scale-105 duration-500 ease-in-out"
          >
            <div className="flex justify-center items-center gap-2">
              {buttonText}
              <img src={right} alt="image" className="h-4" />
            </div>
          </a>
          <span className="text-white text-base">
            <span className="text-[#D4FA00] text-xl md:text-base lg:text-xl">
              ●
            </span>{" "}
            {statuss}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;

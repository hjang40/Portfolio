import React from "react";
import { NavLink } from "react-router-dom";
import exitImg from "../assets/images/exit.png";

const About = () => {
  return (
    <div className="w-full h-screen bg-[#88c0d0] flex items-center justify-center">
      {/* Main dialogue box */}
      <div className="relative w-[70%] h-[70%] bg-[#cce7ff] rounded-lg border-4 border-[#333] p-6 flex flex-col justify-between shadow-lg">

        {/* Title bar */}
        <div className="w-full h-20 bg-[#0055aa] rounded-t-lg flex items-center justify-center">
          <h1 className="font-pokemon text-yellow-300 text-2xl drop-shadow-md">
            ABOUT
          </h1>
        </div>

        {/* Main content */}
        <div className="flex flex-1 mt-4 gap-4 p-4 rounded-lg border-4 border-[#333] overflow-y-auto">
          {/* Text content */}
          <div className="flex-1 text-black font-pokemon text-sm drop-shadow break-words space-y-3">
            <p>
              Hi! I’m Hyun, a double major in Computer Science and Neuroscience at
              the University of Maryland. I’m passionate about exploring the
              intersection of technology and the human body, building innovative
              projects, and solving complex problems.
            </p>
            <p>
              Beyond academics, I enjoy staying active with sports like soccer and
              volleyball, which keep me energized and grounded. I’m also a big fan
              of puzzles, escape rooms, and problem-solving challenges that push me
              to think creatively.
            </p>
            <p>
              In my free time, I love reading for hours on end, diving into new
              stories, ideas, and perspectives. Gaming is another hobby of mine,
              especially games by Riot, where I admire the creativity and systems
              thinking behind their designs.
            </p>
            <p>
              This website showcases my projects, research, and interests. Click
              the buttons below to explore my work or get in touch—I’d love to
              connect!
            </p>
          </div>
        </div>

        {/* Buttons / Navigation */}
        <div className="flex justify-center mt-4 gap-6">
          {[
            { label: "Projects", to: "/projects" },
            { label: "Contact", to: "/contact" },
          ].map((btn) => (
            <NavLink key={btn.to} to={btn.to}>
              <div
                className="w-32 h-12 bg-[#ee2222] rounded-md flex items-center justify-center font-pokemon text-white text-lg drop-shadow-md 
                           transition duration-200 ease-in-out hover:brightness-110 hover:scale-105 cursor-pointer"
              >
                {btn.label}
              </div>
            </NavLink>
          ))}
        </div>

        {/* Exit button */}
        <button
          className="absolute top-2 right-2 w-10 h-10 hover:brightness-110 transition"
          onClick={() => window.history.back()}
        >
          <img src={exitImg} alt="Exit" className="w-full h-full" />
        </button>
      </div>
    </div>
  );
};

export default About;

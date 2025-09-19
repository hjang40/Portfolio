import React, { useState, useEffect, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { FaCaretDown } from "react-icons/fa";

import Temple from "../models/Temple";
import textBg from "../assets/images/text.png";

const About = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useRef();

  // Your sections data remains the same
  const sections = [
    {
      id: "intro",
      title: "Hyun Seo Jang",
      subtitle: "About Me!",
      content:
        "Hello! My name is Hyun Jang, and I'm currently a Senior majoring in Computer Science with a minor in Neuroscience at the University of Maryland, College Park.",
      floatingObjects: ["💻", "🧠", "🎓"],
      textColor: "text-blue-300",
      glowColor: "shadow-blue-500/50",
    },
    {
      id: "passion",
      title: "DUAL SPECIALIST",
      subtitle: "Technology × Neuroscience",
      content:
        "My passion is driven by fascination with technology and the human brain. Why not pursue both and explore how far they can go together?",
      floatingObjects: ["⚡", "🔬", "🤖"],
      textColor: "text-purple-300",
      glowColor: "shadow-purple-500/50",
    },
    {
      id: "hobbies",
      title: "HOBBIES",
      subtitle: "Multi Interests",
      content:
        "Soccer, volleyball, reading, gaming, escape rooms, and puzzles. I spend hours daily reading and love challenging my mind with complex problems.",
      floatingObjects: ["🏐", "📚", "🎮", "🧩"],
      textColor: "text-green-300",
      glowColor: "shadow-green-500/50",
    },
    {
      id: "projects",
      title: "STATUS",
      subtitle: "Perfection in Progress",
      content:
        "My portfolio showcases projects reflecting diverse skills and my approach to problem-solving at the intersection of technology and neuroscience.",
      floatingObjects: ["🚀", "💼", "🔥"],
      textColor: "text-orange-300",
      glowColor: "shadow-orange-500/50",
    },
    {
      id: "connect",
      title: "CHAMPION MODE",
      subtitle: "Ready for Adventure",
      content:
        "The journey continues. Ready to explore my projects and connect?",
      floatingObjects: ["✨", "🌟", "💫"],
      textColor: "text-yellow-300",
      glowColor: "shadow-yellow-500/50",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollPosition = containerRef.current.scrollTop;
        setScrollY(scrollPosition);

        const sectionHeight = window.innerHeight * 0.8;
        const sectionIndex = Math.floor(scrollPosition / sectionHeight);
        setCurrentSection(Math.min(sectionIndex, sections.length - 1));
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [sections.length]);

  // Calculate progress for the CURRENT section
  const sectionHeight = window.innerHeight * 0.8;
  const progress = Math.max(
    0,
    Math.min(1, (scrollY - currentSection * sectionHeight) / sectionHeight)
  );

  // Fairy lights positions (randomized fixed percentages)
  const fairyLights = [
    { left: "5%", top: "10%" }, { left: "15%", top: "25%" },
    { left: "25%", top: "40%" }, { left: "40%", top: "15%" },
    { left: "55%", top: "35%" }, { left: "70%", top: "20%" },
    { left: "80%", top: "45%" }, { left: "90%", top: "30%" },
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Fixed stable background */}
      <div
        className="fixed inset-0 w-full h-full"
        style={{
          background: "linear-gradient(to bottom, #312e81, #581c87, #000000)",
          zIndex: -1,
        }}
      />
      
      {/* 1. SINGLE, PERSISTENT CANVAS */}
      <div className="fixed inset-0 z-20 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 1000 }}
          gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            <directionalLight position={[-5, -5, -5]} intensity={0.6} />
            <pointLight position={[0, 0, 10]} intensity={0.8} />

            {/* 2. RENDER THE SINGLE TEMPLE MODEL WITH DYNAMIC PROPS */}
            <Temple
              position={[
                (progress - 0.5) * 4, // Increased range for more movement
                Math.sin(progress * Math.PI) * 1, // Increased height
                0
              ]}
              rotation={[
                Math.sin(scrollY * 0.001) * 0.2,
                progress * Math.PI * 2,
                Math.cos(scrollY * 0.001) * 0.1
              ]}
              scale={[
                1.2 + Math.sin(progress * Math.PI) * 0.3,
                1.2 + Math.sin(progress * Math.PI) * 0.3,
                1.2 + Math.sin(progress * Math.PI) * 0.3
              ]}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Scrollable content */}
      <div
        ref={containerRef}
        className="relative h-full overflow-y-scroll scrollbar-hide"
        style={{ scrollBehavior: "smooth", zIndex: 10 }}
      >
        {sections.map((section, index) => {
          const isActive = Math.abs(currentSection - index) <= 1;
          const sectionProgress = Math.max(0,Math.min(1,(scrollY - index * sectionHeight) / sectionHeight));

          return (
            <div
              key={section.id}
              className="relative min-h-screen flex items-center justify-center px-8 py-20"
              style={{
                opacity: isActive ? 1 : 0.3,
                transition: 'opacity 0.5s ease-out'
              }}
            >
              {/* NOTE: MainIconRenderer has been removed from here */}

              {/* Floating objects around main icon */}
              {section.floatingObjects.map((obj, i) => (
                <div
                  key={i}
                  className="fixed z-30"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 2) * 40}%`,
                    transform: `translateY(${Math.sin(scrollY * 0.003 + i) * 25
                      }px) translateX(${Math.cos(scrollY * 0.002 + i) * 15
                      }px) rotateZ(${scrollY * 0.02 + i * 45}deg) scale(${0.8 + Math.sin(scrollY * 0.001 + i) * 0.2
                      })`,
                    opacity: isActive ? 0.8 : 0.3,
                    filter: `drop-shadow(0 0 20px ${section.glowColor.includes("blue")
                        ? "#3b82f6"
                        : section.glowColor.includes("purple")
                          ? "#a855f7"
                          : section.glowColor.includes("green")
                            ? "#22c55e"
                            : section.glowColor.includes("orange")
                              ? "#f97316"
                              : "#eab308"
                      })`,
                    transition:
                      "transform 0.4s ease-out, opacity 0.5s ease-out",
                  }}
                >
                  <div className="text-5xl">{obj}</div>
                </div>
              ))}

              {/* Floating text content */}
              <div
                className="fixed right-1/4 top-1/2 transform translate-x-1/2 -translate-y-1/2 z-40 max-w-md flex flex-col items-center"
                style={{
                  transform: `translateX(${50 - sectionProgress * 100}px) translateY(${Math.cos(sectionProgress * Math.PI) * 50
                    }px) rotateX(${Math.sin(sectionProgress * Math.PI) * 10}deg)`,
                  opacity: isActive ? 1 : 0.5,
                  transition: 'opacity 0.5s ease-out, transform 0.4s ease-out'
                }}
              >
                <div
                  className={`text-4xl font-bold mb-4 ${section.textColor} drop-shadow-2xl`}
                  style={{
                    textShadow: `0 0 20px ${section.glowColor.includes("blue")
                        ? "#3b82f6" : section.glowColor.includes("purple")
                          ? "#a855f7" : section.glowColor.includes("green")
                            ? "#22c55e" : section.glowColor.includes("orange")
                              ? "#f97316" : "#eab308"
                      }`,
                    transform: `translateY(${Math.sin(scrollY * 0.002 + index) * 5
                      }px)`,
                    transition: "transform 0.3s ease-out",
                  }}
                >
                  {section.title}
                </div>
                <div
                  className="text-xl text-gray-300 mb-6 font-medium"
                  style={{
                    transform: `translateY(${Math.sin(scrollY * 0.0025 + index) * 4
                      }px)`,
                    textShadow: "0 0 10px rgba(255,255,255,0.3)",
                    transition: "transform 0.3s ease-out",
                  }}
                >
                  {section.subtitle}
                </div>
                <div
                  className="opacity-70 font-pokemon relative w-[700px] h-32 px-4 py-2 rounded-lg flex items-center justify-center cursor-pointer"
                  style={{
                    backgroundImage: `url(${textBg})`,
                    backgroundColor: "white",
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    boxShadow: `0 0 30px ${section.glowColor.includes("blue")
                        ? "rgba(59, 130, 246, 0.4)" : section.glowColor.includes("purple")
                          ? "rgba(168, 85, 247, 0.4)" : section.glowColor.includes("green")
                            ? "rgba(34, 197, 94, 0.4)" : section.glowColor.includes("orange")
                              ? "rgba(249, 115, 22, 0.4)" : "rgba(234, 179, 8, 0.4)"
                      }`,
                    transform: `translateY(${Math.sin(scrollY * 0.0015 + index) * 3
                      }px)`,
                    transition: "transform 0.4s ease-out",
                  }}
                >
                  <div className="relative w-full h-full flex items-center">
                    <div className="text-black text-sm break-words flex-1 px-4">
                      {section.content}
                    </div>
                    <button
                      className="absolute bottom-2 right-2 text-black text-xl animate-bounce"
                      aria-label="Next instruction"
                    >
                      <FaCaretDown />
                    </button>
                  </div>
                </div>
              </div>

              {/* Progress dots */}
              <div
                className="fixed bottom-8 left-1/2 flex gap-3 z-50"
                style={{
                  transform: `translateY(${Math.sin(scrollY * 0.002) * 5}px)`,
                  transition: "transform 0.3s ease-out",
                }}
              >
                {sections.map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all duration-500 ${i === currentSection
                        ? `${sections[currentSection].textColor} scale-150 shadow-lg`
                        : "bg-gray-500"
                      }`}
                    style={{
                      boxShadow:
                        i === currentSection
                          ? `0 0 20px ${sections[currentSection].glowColor.includes("blue")
                            ? "#3b82f6" : sections[currentSection].glowColor.includes("purple")
                              ? "#a855f7" : sections[currentSection].glowColor.includes("green")
                                ? "#22c55e" : sections[currentSection].glowColor.includes("orange")
                                  ? "#f97316" : "#eab308"
                          }`
                          : "none",
                    }}
                  />
                ))}
              </div>

              {/* Final navigation for last section */}
              {index === sections.length - 1 && (
                <div
                  className="fixed bottom-20 left-1/2 -translate-x-1/2 flex flex-col sm:flex-row gap-6 z-50"
                >
                  <button
                    onClick={() => (window.location.href = "/projects")}
                    className="group relative overflow-hidden bg-gradient-to-r from-blue-600/80 to-purple-600/80 backdrop-blur-sm text-white px-8 py-4 rounded-full text-xl font-bold transform hover:scale-110 transition-all duration-300 border border-white/20"
                    style={{
                      boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
                      filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))",
                    }}
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      🚀 <span>Explore Projects</span>
                    </span>
                  </button>
                  <button
                    onClick={() => (window.location.href = "/contact")}
                    className="group relative overflow-hidden bg-gradient-to-r from-green-600/80 to-teal-600/80 backdrop-blur-sm text-white px-8 py-4 rounded-full text-xl font-bold transform hover:scale-110 transition-all duration-300 border border-white/20"
                    style={{
                      boxShadow: "0 0 30px rgba(34, 197, 94, 0.3)",
                      filter: "drop-shadow(0 0 20px rgba(34, 197, 94, 0.5))",
                    }}
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      🔬 <span>Connect</span>
                    </span>
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {/* Extra scroll space for smooth ending */}
        <div className="h-screen" />
      </div>

      {/* Fairy lights and other UI elements remain the same */}
      {fairyLights.map((pos, i) => (
        <div
          key={i}
          className="fixed rounded-full bg-white/80 opacity-70"
          style={{
            left: pos.left,
            top: pos.top,
            width: 8,
            height: 8,
            filter: "drop-shadow(0 0 8px rgba(255,255,255,0.8))",
            transform: `translateX(${Math.cos(scrollY * 0.005 + i) * 30
              }px) translateY(${Math.sin(scrollY * 0.007 + i) * 25}px) rotate(${scrollY * 0.01 + i * 20
              }deg)`,
            transition: "transform 0.1s linear",
            pointerEvents: "none",
            zIndex: 15,
          }}
        />
      ))}
      <button
        onClick={() =>
          containerRef.current?.scrollTo({ top: 0, behavior: "smooth" })
        }
        className="fixed top-8 right-8 z-50 bg-white/10 backdrop-blur-sm text-white/80 p-3 rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20"
      >
        ⬆️
      </button>
      <button
        className="fixed top-8 left-8 z-50 bg-red-600/80 backdrop-blur-sm hover:bg-red-600 text-white p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-200 border border-white/20"
        onClick={() => window.history.back()}
      >
        ❌
      </button>
    </div>
  );
};

export default About;
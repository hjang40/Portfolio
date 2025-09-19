import { useState } from "react";

const MAX_SLOTS = 30;

import pokedex from "../assets/images/pokedex/pokedex.png";
import pokedexTitle from "../assets/images/pokedex/pokedexTitle.png";

const projectData = [
  {
    id: 1,
    name: "Portfolio Website",
    description: "My 3D Pokémon-inspired portfolio built with React Three Fiber.",
    category: "Web Application",
    timeFrame: "2025",
    skills: ["React", "Three.js", "TailwindCSS", "Blender"],
    status: "Completed",
    images: [
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png",
    ],
    link: "https://your-portfolio-link.com",
  },
  {
    id: 2,
    name: "Stock Prediction Model",
    description: "Exploring neural networks and brain-computer interaction.",
    category: "Machine Learning",
    timeFrame: "2023",
    skills: ["Python", "TensorFlow", "Neuroscience"],
    status: "Completed",
    images: [
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png",
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/150.png",
    ],
    link: "https://your-research-link.com",
  },
];

export default function Projects() {
  const [selected, setSelected] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);
  const [showSkillsModal, setShowSkillsModal] = useState(false);

  const openProject = (project) => {
    setSelected(project);
    setImgIndex(0);
    setShowSkillsModal(false);
  };

  const closeProject = () => {
    setSelected(null);
    setShowSkillsModal(false);
  };

  const nextImage = () => {
    if (!selected) return;
    setImgIndex((prev) => (prev + 1) % selected.images.length);
  };

  const prevImage = () => {
    if (!selected) return;
    setImgIndex((prev) => (prev - 1 + selected.images.length) % selected.images.length);
  };

  const openSkillsModal = () => setShowSkillsModal(true);
  const closeSkillsModal = () => setShowSkillsModal(false);

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-red-600">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-4 text-white">📦 My Projects Box</h1>

      {/* PC Box Grid */}
      <div className="grid grid-cols-6 gap-4 border-4 border-gray-600 p-4 rounded-lg bg-green-100">
        {Array.from({ length: MAX_SLOTS }).map((_, index) => {
          const project = projectData[index];
          return (
            <div
              key={index}
              onClick={() => project && openProject(project)}
              className={`w-24 h-24 flex flex-col items-center justify-center border-2 rounded-lg shadow cursor-pointer transition-colors
                ${project ? "bg-white hover:bg-yellow-100" : "bg-gray-200"}`}
            >
              {project ? (
                <>
                  <img
                    src={project.images[0]}
                    alt={project.name}
                    className="w-12 h-12"
                    style={{ imageRendering: 'pixelated' }}
                  />
                  <p className="text-xs mt-1 font-bold text-center truncate w-full px-1">
                    {project.name}
                  </p>
                </>
              ) : (
                <p className="text-gray-400 text-xs">Empty</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Pokédex-style Popup */}
      {selected && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div
            className="relative border-4 border-black rounded-xl shadow-2xl w-full max-w-5xl"
            style={{
              aspectRatio: '4/3',
              backgroundImage: `url(${pokedex})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* Close button */}
            <button
              onClick={closeProject}
              className="absolute top-4 right-4 z-20 bg-red-700 hover:bg-red-800 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg shadow-lg transition-colors"
            >
              ×
            </button>

            {/* Main content overlays */}
            <div className="relative z-10 flex h-full w-full p-8">
              {/* Left side - Image Viewer */}
              <div className="w-2/5 flex flex-col items-center justify-center pr-6">
                <div className="relative">
                  {selected.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold transition-colors shadow-lg"
                        aria-label="Previous image"
                      >
                        ◀
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold transition-colors shadow-lg"
                        aria-label="Next image"
                      >
                        ▶
                      </button>
                    </>
                  )}
                  <img
                    src={selected.images[imgIndex]}
                    alt={`${selected.name} ${imgIndex + 1}`}
                    className="w-40 h-40 bg-white/10 rounded shadow-lg"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>

                {selected.images.length > 1 && (
                  <div className="flex gap-2 mt-4">
                    {selected.images.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-3 h-3 rounded-full border-2 ${
                          idx === imgIndex
                            ? 'bg-yellow-400 border-yellow-600'
                            : 'bg-gray-400 border-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Right side - Project Details */}
              <div className="w-3/5 flex flex-col pl-6 pt-8">
                {/* Project title with pokedexTitle background */}
                <div
                  className="mb-4 rounded overflow-hidden relative"
                  style={{
                    height: '60px',
                    backgroundImage: `url(${pokedexTitle})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="text-white text-xl font-bold drop-shadow-lg">
                      {selected.name}
                    </h2>
                  </div>
                </div>

                {/* Data rows grid */}
                <div className="mb-4 grid grid-cols-2 gap-0 border-4 border-gray-600 rounded-lg overflow-hidden shadow-lg">
                  {/* Left column */}
                  <div className="bg-gray-300">
                    <div className="p-3 border-b border-gray-500">
                      <span className="text-sm font-mono font-bold text-gray-800">TIME FRAME:</span>
                    </div>
                    <div className="p-3 border-b border-gray-500">
                      <span className="text-sm font-mono font-bold text-gray-800">CATEGORY:</span>
                    </div>
                    <div className="p-3 border-b border-gray-500">
                      <span className="text-sm font-mono font-bold text-gray-800">SKILLS:</span>
                    </div>
                    <div className="p-3">
                      <span className="text-sm font-mono font-bold text-gray-800">STATUS:</span>
                    </div>
                  </div>

                  {/* Right column */}
                  <div className="bg-white">
                    <div className="p-3 border-b border-gray-400">
                      <span className="text-sm font-mono text-gray-900">
                        {selected.timeFrame?.toUpperCase()}
                      </span>
                    </div>
                    <div className="p-3 border-b border-gray-400">
                      <span className="text-sm font-mono text-gray-900">
                        {selected.category?.toUpperCase()}
                      </span>
                    </div>

                    {/* SKILLS row: show only first 3, then +X */}
                    <div className="p-3 border-b border-gray-400">
                      <div className="flex flex-wrap gap-2">
                        {selected.skills.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-mono border border-blue-300"
                          >
                            {skill}
                          </span>
                        ))}

                        {selected.skills.length > 3 && (
                          <button
                            onClick={openSkillsModal}
                            className="bg-black text-white px-2 py-0.5 rounded text-xs font-mono border border-gray-800 ml-1"
                            aria-label={`Show ${selected.skills.length - 3} more skills`}
                          >
                            +{selected.skills.length - 3}
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="p-3">
                      <span className={`text-sm font-mono font-bold ${
                        selected.status?.toLowerCase() === "completed"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}>
                        {selected.status?.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description and link */}
                <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-lg p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{selected.name}</h3>
                    <p className="text-gray-700 leading-relaxed text-sm">{selected.description}</p>
                  </div>

                  <div className="pt-2">
                    <a
                      href={selected.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-bold text-sm transition-colors border-2 border-red-700 shadow"
                    >
                      VIEW PROJECT →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Modal (full list) */}
            {showSkillsModal && (
              <div className="absolute inset-0 z-30 flex items-center justify-center p-6">
                <div className="absolute inset-0 bg-black/60" onClick={closeSkillsModal} />

                <div className="relative bg-white border-4 border-black rounded-lg p-6 w-[520px] max-w-full z-40">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">All Skills</h3>
                    <button
                      onClick={closeSkillsModal}
                      className="bg-red-700 hover:bg-red-800 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold"
                      aria-label="Close skills modal"
                    >
                      ×
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {selected.skills.map((skill, idx) => (
                      <div key={idx} className="p-2 border rounded bg-gray-100 flex items-center">
                        <span className="text-sm font-mono text-gray-800">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

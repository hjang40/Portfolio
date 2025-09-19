import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Sky from "../models/Sky";
import PokeballSelector from "../components/PokeballSelector";
import CameraFlyIn from "../components/CameraFlyIn";
import CameraIntro from "../components/CameraIntro";
import textBg from "../assets/images/text.png";
import { FaArrowAltCircleDown, FaArrowDown, FaCaretDown } from "react-icons/fa";
import Temple from "../models/Temple";

const Home = () => {
  const [flyTarget, setFlyTarget] = useState(null);
  const [fadeOpacity, setFadeOpacity] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showDestination, setShowDestination] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [introComplete, setIntroComplete] = useState(false);
  const navigate = useNavigate();

  const adjustPokeballForScreenSize = () => {
    const scale = window.innerWidth > 768 ? [0.01 , 0.01, 0.01] : [.01, .01, 0.01];
    const position = [0, -.5, -3]
    const rotation = [0.1, 4.7, 0];
    return [scale, position, rotation];
  };

  const [scale, position, rotation] = adjustPokeballForScreenSize();

  const handlePokeballClick = (pos, index) => {
    setFlyTarget(pos);
    setShowDestination(false);

    let startTime = null;
    const duration = 3000;
    const delay = 1500;

    const animateFade = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      if (elapsed < delay) {
        requestAnimationFrame(animateFade);
        return;
      }
      const progress = Math.min((elapsed - delay) / duration, 1);
      const ease =
        progress < 0.5
          ? 4 * progress ** 3
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      setFadeOpacity(ease);

      if (progress >= 1) {
        if (index === 0) navigate("/about");
        else if (index === 1) navigate("/projects");
        else if (index === 2) navigate("/contact");
      } else {
        requestAnimationFrame(animateFade);
      }
    };
    requestAnimationFrame(animateFade);
  };

  const destinations = ["About", "Projects", "Contact"];

  return (
    <section className="w-full h-screen relative font-pokemon">
      <Canvas
        className="w-full h-screen bg-transparent"
        camera={{
          position: [0, 0, 1],
          near: 0.001,
          far: 20000,
          rotation: [-.4, 0, 0],
        }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[-2, 2, 1]} intensity={2} />
          <ambientLight intensity={2} />
          <hemisphereLight
            skyColor="#b1e1ff"
            groundColor="#000000"
            intensity={1}
          />

          <Sky />
          <Temple position={[0, -8, 0]} rotation={[0, 0, Math.PI / 2]} scale={[100, 100, 100]} />

          {/* Initial camera zoom-in animation */}
          {!introComplete && (
            <CameraIntro
              startPosition={[0, 130, 200]}
              endPosition={[0, -.3, -2]}
              startRotation={[-.6, 0, 0]}
              endRotation={[-.4, 0, 0]}
              duration={3}
              onComplete={() => setIntroComplete(true)}
            />
          )}

          {/* Camera fly-in for navigation */}
          {flyTarget && (
            <CameraFlyIn
              target={flyTarget}
              duration={3}
              delay={1.5}
              offset={10}
              onFinish={() => setFlyTarget(null)}
            />
          )}

          <PokeballSelector
            scale={scale}
            basePosition={position}
            rotation={rotation}
            onPokeballClick={handlePokeballClick}
            onSelectionChange={(index) => setSelectedIndex(index)}
          />
        </Suspense>
      </Canvas>

      {/* Fade overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          pointerEvents: "none",
          opacity: fadeOpacity,
        }}
      />

      {/* Instructions - only show after intro is complete */}
      {showInstructions && introComplete && (
        <div
          className="opacity-70 font-pokemon absolute top-20 left-1/2 transform -translate-x-1/2 w-[700px] h-32 px-4 py-2 rounded-lg flex items-center justify-center"
          style={{
            backgroundImage: `url(${textBg})`,
            backgroundColor: "white",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="relative w-full h-full flex items-center">
            <div className="text-black text-sm break-words flex-1 px-4">
              Use Arrow Keys or Drag to rotate pokeballs. Click the front
              pokeball to navigate to their page.
            </div>
            <button
              onClick={() => setShowInstructions(false)}
              className="absolute bottom-2 right-2 text-black text-xl animate-bounce"
            >
              <FaCaretDown />
            </button>
          </div>
        </div>
      )}

      {/* Destination label - only show after intro is complete */}
      {showDestination && introComplete && (
        <div className="absolute top-80 left-1/2 transform -translate-x-1/2 text-lg font-bold text-white drop-shadow-[0_0_5px_black]">
          {destinations[selectedIndex]}
        </div>
      )}
    </section>
  );
};

export default Home;
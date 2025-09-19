import { useState, useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import Pokeball1 from "../models/Pokeball1";
import Pokeball2 from "../models/Pokeball2";
import Pokeball3 from "../models/Pokeball3";

const PokeballSelector = ({
  scale,
  basePosition,
  rotation,
  onPokeballClick,
  onSelectionChange,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHoveringPokeball, setIsHoveringPokeball] = useState(false);
  const [carouselRotation, setCarouselRotation] = useState(0);
  const pokeballRefs = useRef([]);
  const lastMouseX = useRef(0);
  const { gl } = useThree();

  const pokeballs = [Pokeball1, Pokeball2, Pokeball3];
  const radius = 0.5;

  const getFrontPokeballPosition = () => {
    let closestIndex = 0;
    let maxZ = -Infinity;

    pokeballs.forEach((_, index) => {
      const angle = (index / pokeballs.length) * Math.PI * 2 + carouselRotation;
      const pos = [Math.sin(angle) * radius, 0, Math.cos(angle) * radius];
      if (pos[2] > maxZ) {
        maxZ = pos[2];
        closestIndex = index;
      }
    });

    const angle = (closestIndex / pokeballs.length) * Math.PI * 2 + carouselRotation;
    const pos = [Math.sin(angle) * radius, 0, Math.cos(angle) * radius];

    return [
      pos[0] + basePosition[0],
      pos[1] + basePosition[1],
      pos[2] + basePosition[2],
    ];
  };

  const animateToRotation = (startRotation, targetRotation, duration = 300) => {
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentRotation =
        startRotation + (targetRotation - startRotation) * easeOut;
      setCarouselRotation(currentRotation);
      if (progress < 1) requestAnimationFrame(animate);
      else setCarouselRotation(targetRotation);
    };
    requestAnimationFrame(animate);
  };

  const getPokeballPosition = (index, totalCount) => {
    const angle = (index / totalCount) * Math.PI * 2;
    return [Math.sin(angle) * radius, 0, Math.cos(angle) * radius];
  };

  const handlePointerDown = (event) => {
    event.stopPropagation();
    setIsDragging(true);
    lastMouseX.current = event.clientX;
    gl.domElement.style.cursor = "grabbing";
  };

  const handlePointerMove = (event) => {
    if (!isDragging) return;
    const deltaX = event.clientX - lastMouseX.current;
    const rotationSpeed = 0.01;
    setCarouselRotation((prev) => prev + deltaX * rotationSpeed);
    lastMouseX.current = event.clientX;
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    let closestIndex = 0;
    let maxZ = -Infinity;

    pokeballs.forEach((_, index) => {
      const angle = (index / pokeballs.length) * Math.PI * 2 + carouselRotation;
      const pos = [Math.sin(angle) * radius, 0, Math.cos(angle) * radius];
      if (pos[2] > maxZ) {
        maxZ = pos[2];
        closestIndex = index;
      }
    });

    const segmentSize = (Math.PI * 2) / pokeballs.length;
    const baseTargetRotation = -closestIndex * segmentSize;

    let bestRotation = baseTargetRotation;
    let minDistance = Math.abs(carouselRotation - baseTargetRotation);

    for (let offset = -3; offset <= 3; offset++) {
      const candidateRotation = baseTargetRotation + offset * Math.PI * 2;
      const distance = Math.abs(carouselRotation - candidateRotation);
      if (distance < minDistance) {
        minDistance = distance;
        bestRotation = candidateRotation;
      }
    }

    animateToRotation(carouselRotation, bestRotation);
    setSelectedIndex(closestIndex);
    if (onSelectionChange) onSelectionChange(closestIndex);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        const segmentSize = (Math.PI * 2) / pokeballs.length;
        const newRotation = carouselRotation + segmentSize;
        const newIndex =
          (selectedIndex + pokeballs.length - 1) % pokeballs.length;
        animateToRotation(carouselRotation, newRotation);
        setSelectedIndex(newIndex);
        if (onSelectionChange) onSelectionChange(newIndex);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        const segmentSize = (Math.PI * 2) / pokeballs.length;
        const newRotation = carouselRotation - segmentSize;
        const newIndex = (selectedIndex + 1) % pokeballs.length;
        animateToRotation(carouselRotation, newRotation);
        setSelectedIndex(newIndex);
        if (onSelectionChange) onSelectionChange(newIndex);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, carouselRotation]);

  useEffect(() => {
    const handleGlobalPointerMove = (event) => handlePointerMove(event);
    const handleGlobalPointerUp = () => handlePointerUp();

    if (isDragging) {
      document.addEventListener("pointermove", handleGlobalPointerMove);
      document.addEventListener("pointerup", handleGlobalPointerUp);
    }

    return () => {
      document.removeEventListener("pointermove", handleGlobalPointerMove);
      document.removeEventListener("pointerup", handleGlobalPointerUp);
    };
  }, [isDragging, carouselRotation]);

  useEffect(() => {
    if (isDragging) {
      gl.domElement.style.cursor = "grabbing";
    } else if (isHoveringPokeball) {
      gl.domElement.style.cursor = "grab";
    } else {
      gl.domElement.style.cursor = "default";
    }
  }, [isDragging, isHoveringPokeball]);

  const handlePokeballClick = (index, event) => {
    event.stopPropagation();
    if (index === selectedIndex) {
      const pokeballRef = pokeballRefs.current[index];
      if (pokeballRef && pokeballRef.triggerAnimation) {
        pokeballRef.triggerAnimation();
      }
      const worldPos = getFrontPokeballPosition();
      if (onPokeballClick) onPokeballClick(worldPos, index);
    }
  };

  return (
    <group position={basePosition}>
      <group onPointerDown={handlePointerDown}>
        {pokeballs.map((PokeballComponent, index) => {
          const basePos = getPokeballPosition(index, pokeballs.length);
          const angle =
            (index / pokeballs.length) * Math.PI * 2 + carouselRotation;
          const rotatedPosition = [
            Math.sin(angle) * radius,
            basePos[1],
            Math.cos(angle) * radius,
          ];

          return (
            <PokeballComponent
              key={index}
              ref={(el) => (pokeballRefs.current[index] = el)}
              position={rotatedPosition}
              scale={scale}
              rotation={rotation}
              onClick={(event) => handlePokeballClick(index, event)}
              onPointerOver={() => setIsHoveringPokeball(true)}
              onPointerOut={() => setIsHoveringPokeball(false)}
            />
          );
        })}
      </group>
    </group>
  );
};

export default PokeballSelector;

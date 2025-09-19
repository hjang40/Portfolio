import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";

const CameraFlyIn = ({ target, duration = 2, delay = 0, offset = 0, onFinish }) => {
  const { camera } = useThree();
  const start = useRef([...camera.position]);
  const startTime = useRef(null);

  useFrame(() => {
    if (!target) return;
    if (!startTime.current) startTime.current = Date.now();

    const elapsed = (Date.now() - startTime.current) / 1000;
    if (elapsed < delay) return;

    const progress = Math.min((elapsed - delay) / duration, 1);
    const easeInOut =
      progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;

    const dir = [
      target[0] - start.current[0],
      target[1] - start.current[1],
      target[2] - start.current[2],
    ];
    const len = Math.sqrt(dir[0] ** 2 + dir[1] ** 2 + dir[2] ** 2);
    const norm = dir.map((v) => v / len);

    const adjustedTarget = [
      target[0] - norm[0] * offset,
      target[1] - norm[1] * offset,
      target[2] - norm[2] * offset,
    ];

    camera.position.lerp(
      {
        x: start.current[0] + (adjustedTarget[0] - start.current[0]) * easeInOut,
        y: start.current[1] + (adjustedTarget[1] - start.current[1]) * easeInOut,
        z: start.current[2] + (adjustedTarget[2] - start.current[2]) * easeInOut,
      },
      1
    );

    camera.lookAt(target[0], target[1], target[2]);

    if (progress === 1 && onFinish) onFinish();
  });

  return null;
};

export default CameraFlyIn;

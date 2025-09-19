import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./MenuBW.css";
import { menuRoutes } from "./routes"; // import your route labels

const GRID_SIZE = 8; // 4x2 or 2x4 grid — match your design

const MenuBW = ({ isOpen, onClose }) => {
  const [selected, setSelected] = useState(0);

  // Fill the remaining slots with nulls
  const paddedMenuItems = [...menuRoutes];
  while (paddedMenuItems.length < GRID_SIZE) {
    paddedMenuItems.push(null);
  }

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      switch (e.key) {
        case "ArrowRight":
          setSelected((s) => (s + 1) % GRID_SIZE);
          break;
        case "ArrowLeft":
          setSelected((s) => (s - 1 + GRID_SIZE) % GRID_SIZE);
          break;
        case "ArrowDown":
          setSelected((s) => (s + 2) % GRID_SIZE);
          break;
        case "ArrowUp":
          setSelected((s) => (s - 2 + GRID_SIZE) % GRID_SIZE);
          break;
        case "Enter":
        case " ":
          document
            .querySelector(`[data-menu-index="${selected}"] a`)
            ?.click();
          break;
        case "Escape":
          onClose();
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, selected]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="menu-bw-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="menu-bw-panel"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="menu-bw-grid">
              {paddedMenuItems.map((item, idx) => (
                <div
                  className={`menu-bw-item ${
                    selected === idx ? "selected" : ""
                  } ${!item ? "empty" : ""}`}
                  data-menu-index={idx}
                  key={idx}
                >
                  {item ? (
                    <NavLink
                      to={item.path}
                      onClick={onClose}
                      className="menu-link"
                    >
                      <img
                        src={`/icons/${item.label.toLowerCase()}.png`}
                        alt={item.label}
                        className="icon"
                      />
                      <div className="label">{item.label}</div>
                    </NavLink>
                  ) : (
                    <div className="icon placeholder"></div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuBW;

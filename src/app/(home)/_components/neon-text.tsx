import React from "react";
import neons from "@/styles/NeonSign.module.css";
import noFlickers from "@/styles/NeonNoFlicker.module.css";

const NeonText = () => {
  return (
    <div>
      <span className={neons.text}>YM Light</span>

      <div className={noFlickers.container}>
        <span className={noFlickers.neon}>
          YM Lights are always made by experts with over 30 years of experience
        </span>
      </div>
    </div>
  );
};

export default NeonText;

import React from "react";
import neons from "@/styles/NeonSign.module.css";
import noFlickers from "@/styles/NeonNoFlicker.module.css";

const NeonText = () => {
  return (
    <div className="flex flex-col gap-y-8">
      <div className={neons.text}>YM Light</div>

      <div className={noFlickers.container}>
        <span className={noFlickers.neon}>
          YM Lights are always made by experts with over 30 years of experience
        </span>
      </div>
    </div>
  );
};

export default NeonText;

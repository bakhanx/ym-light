"use client";

import React, { useState } from "react";
import styles from "@/styles/Bulb.module.css";
import { cls } from "@/libs/utils";

const Bulb = () => {
  const [isOn, setIsOn] = useState(true);
  return (
    <div>
      <div className={styles.bulb_container}>
        <div className={styles.wire}></div>
        <div className={styles.connector}>
          <div className={styles.grove}></div>
          <div className={styles.grove}></div>
          <div className={styles.grove}></div>
        </div>
        <button
          onClick={() => setIsOn(!isOn)}
          className={cls(isOn ? `${styles.bulb_on}` : "", `${styles.bulb}`)}
        >
          <div className={styles.metal_wire}></div>
          <div className={styles.metal_wire}></div>
          <div className={styles.metal_wire}></div>
        </button>
      </div>
    </div>
  );
};

export default Bulb;

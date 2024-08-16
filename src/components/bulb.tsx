import React from "react";
import styles from "@/styles/Bulb.module.css";

const Bulb = () => {
  return (
    <div>
      <div className={styles.bulb_container}>
        <div className={styles.wire}></div>
        <div className={styles.connector}>
          <div className={styles.grove}></div>
          <div className={styles.grove}></div>
          <div className={styles.grove}></div>
        </div>
        <div className={styles.bulb}>
            <div className={styles.metal_wire}></div>
            <div className={styles.metal_wire}></div>
            <div className={styles.metal_wire}></div>
        </div>
      </div>
    </div>
  );
};

export default Bulb;

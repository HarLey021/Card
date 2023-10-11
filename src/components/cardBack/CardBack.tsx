import React, { FC } from "react";
import styles from "./cardBack.module.css";
import { dataObjectType } from "../../interfaces";

export const CardBack: FC<dataObjectType> = ({ data }) => {
  return (
    <>
      <div className={styles.container}>
        <p className={styles.cvcNumber}>{data.cvc}</p>
      </div>
    </>
  );
};

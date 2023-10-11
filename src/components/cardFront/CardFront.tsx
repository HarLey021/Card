import React, { FC } from "react";
import styles from "./cardFront.module.css";
import cardLogo from "../../assets/card-logo.svg";
import { dataObjectType } from "../../interfaces";

export const CardFront: FC<dataObjectType> = ({ data }) => {
  return (
    <div className={styles.container}>
      <img className={styles.cardLogo} src={cardLogo} />
      <p className={styles.cardNumber}>{data.cardNumber}</p>
      <div className={styles.holderAndExp}>
        <p className={styles.cardHolderName}>{data.name}</p>
        <p className={styles.expDate}>
          {data.expMonth}/{data.expYear}
        </p>
      </div>
    </div>
  );
};

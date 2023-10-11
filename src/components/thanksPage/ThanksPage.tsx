import styles from "./thanksPage.module.css";
import React, { FC } from "react";
import completeLogo from "../../assets/icon-complete.svg";
import { stateTypes } from "../../interfaces";

const ThanksPage: FC<stateTypes> = ({
  data,
  setData,
  setShowCardInfo,
  setShowThanksPage,
}) => {
  const handleContinueClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const defaultData = {
      name: "JANE APPLESEED",
      cardNumber: "0000 0000 0000 0000",
      expMonth: "00",
      expYear: "00",
      cvc: "000",
    };
    setData(defaultData);
    setShowThanksPage(false);
    setShowCardInfo(true);
  };

  return (
    <div className={styles.completeContainer}>
      <img className={styles.completeLogo} src={completeLogo} />
      <h1 className={styles.thanksH1}>THANK YOU!</h1>
      <p className={styles.thanksP}>We’ve added your card details</p>
      <button
        onClick={(event) => {
          handleContinueClick(event);
        }}
        className={styles.continueBtn}
      >
        Continue
      </button>
    </div>
  );
};

export default ThanksPage;

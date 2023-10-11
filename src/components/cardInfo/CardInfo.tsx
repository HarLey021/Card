import react, { ChangeEvent, FC, useState, useEffect } from "react";
import styles from "./cardInfo.module.css";
import { dataTypes, stateTypes, errorTypes } from "../../interfaces";

export const CardInfo: FC<stateTypes> = ({
  data,
  setData,
  setShowCardInfo,
  setShowThanksPage,
}) => {
  const [localData, setLocalData] = useState<dataTypes>({ ...data });
  const [cardHolderError, setCardHolderError] = useState(false);
  const [cardNumberError, setCardNumberError] = useState(false);
  const [expMonthError, setExpMonthError] = useState(false);
  const [expYearError, setExpYearError] = useState(false);
  const [cvcError, setCvcError] = useState(false);
  const [fillError, setFillError] = useState(false);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    field: keyof dataTypes
  ) => {
    if (field === "name") {
      setCardHolderError(false);
    } else if (field === "cardNumber") {
      setCardNumberError(false);
    } else if (field === "expMonth") {
      setExpMonthError(false);
    } else if (field === "expYear") {
      setExpYearError(false);
    } else if (field === "cvc") {
      setCvcError(false);
    }

    let value = event.target.value;
    if (field === "cardNumber") {
      if (event.target.value.length === 4) {
        event.target.value += " ";
      } else if (event.target.value.length === 9) {
        event.target.value += " ";
      } else if (event.target.value.length === 14) {
        event.target.value += " ";
      }
    }
    setLocalData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleErrors = () => {
    const cardHolderName = localData.name;
    const cardNumberValue = localData.cardNumber;
    const monthValue = localData.expMonth;
    const yearValue = localData.expYear;
    const cvcValue = localData.cvc;

    if (cardHolderName === "JANE APPLESEED") {
      setCardHolderError(true);
      setFillError(true);
    }
    if (/[^0-9 ]/.test(cardNumberValue)) {
      setCardNumberError(true);
    } else if (cardNumberValue === "0000 0000 0000 0000") {
      setCardNumberError(false);
      setFillError(true);
    } else if (
      /[^0-9 ]/.test(cardNumberValue) &&
      cardNumberValue === "0000 0000 0000 0000" &&
      cardNumberValue.length !== 19
    ) {
      setCardNumberError(false);
      setFillError(true);
    }

    if (monthValue === "00") {
      setExpMonthError(true);
    } else if (monthValue !== "00" && monthValue.length !== 2) {
      setExpMonthError(false);
      setFillError(true);
    }

    if (yearValue === "00") {
      setExpYearError(true);
    } else if (yearValue !== "00" && yearValue.length !== 2) {
      setExpYearError(false);
      setFillError(true);
    }

    if (cvcValue === "000") {
      setCvcError(true);
    } else if (cvcValue !== "000" && cvcValue.length !== 2) {
      setCvcError(false);
      setFillError(true);
    }
  };

  const handleConfirmClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleErrors();
    const hasNonDigitCharacters =
      /[^0-9]/.test(localData.expMonth) ||
      /[^0-9]/.test(localData.expYear) ||
      /[^0-9]/.test(localData.cvc);

    if (
      !cardHolderError &&
      !cardNumberError &&
      !expMonthError &&
      !expYearError &&
      !cvcError &&
      localData.name !== "JANE APPLESEED" &&
      localData.cardNumber !== "0000 0000 0000 0000" &&
      localData.expMonth !== "00" &&
      localData.expYear !== "00" &&
      localData.cvc !== "000" &&
      localData.cardNumber.length === 19 &&
      localData.expMonth.length === 2 &&
      localData.expYear.length === 2 &&
      localData.cvc.length === 3 &&
      !hasNonDigitCharacters
    ) {
      setData(localData);
      setShowCardInfo(false);
      setShowThanksPage(true);
    } else {
      setFillError(true);
    }

    if (localData.name.trim() === "") {
      setCardHolderError(true);
    }

    // Check if cardNumber is empty
    if (localData.cardNumber === "0000 0000 0000 0000") {
      setCardNumberError(true);
    }
  };

  return (
    <div className={styles.infoContainer}>
      {fillError && (
        <p className={`${styles.errorStyles} ${styles.fillError}`}>
          Fill all fields properly
        </p>
      )}
      <div className={styles.cardHolderCont}>
        <h3>Cardholder Name</h3>
        <input
          onChange={(event) => handleInputChange(event, "name")}
          className={`${styles.nameInput} ${
            cardHolderError ? styles.wrongInput : ""
          }`}
          placeholder="e.g. Jane Appleseed"
          type="text"
        />
      </div>

      <div className={styles.cardNumberCont}>
        <h3>Card Number</h3>
        <input
          onChange={(event) => {
            handleInputChange(event, "cardNumber");
          }}
          className={`${styles.cardNumberInput} ${
            cardNumberError || localData.cardNumber.length !== 19
              ? styles.wrongInput
              : ""
          }`}
          placeholder="e.g. 1234 5678 9123 0000"
          maxLength={19}
        />
        {cardNumberError && localData.cardNumber !== "0000 0000 0000 0000" && (
          <p className={styles.errorStyles}>Wrong format, numbers only</p>
        )}
      </div>

      <div className={styles.expAndCvcCont}>
        <div className={styles.expContainer}>
          <h3>Exp. Date (MM/YY)</h3>
          <div>
            <input
              onChange={(event) => handleInputChange(event, "expMonth")}
              className={`${styles.monthInput} ${
                expMonthError ||
                /[^0-9]/.test(localData.expMonth) ||
                localData.expMonth.length !== 2
                  ? styles.wrongInput
                  : ""
              }`}
              placeholder="MM"
              maxLength={2}
            />
            <input
              onChange={(event) => handleInputChange(event, "expYear")}
              className={`${styles.yearInput} ${
                expYearError ||
                /[^0-9]/.test(localData.expYear) ||
                localData.expYear.length !== 2
                  ? styles.wrongInput
                  : ""
              }`}
              placeholder="YY"
              maxLength={2}
            />
            {(expMonthError || expYearError) && (
              <p className={styles.errorStyles}>Can’t be blank</p>
            )}
          </div>
        </div>
        <div className={styles.cvcContainer}>
          <h3>CVC</h3>
          <input
            onChange={(event) => handleInputChange(event, "cvc")}
            className={`${styles.cvcInput} ${
              cvcError ||
              /[^0-9]/.test(localData.cvc) ||
              localData.cvc.length !== 3
                ? styles.wrongInput
                : ""
            }`}
            placeholder="e.g. 123"
            maxLength={3}
          />
          {cvcError && <p className={styles.errorStyles}>Can’t be blank</p>}
        </div>
      </div>
      <button
        onClick={(event) => {
          handleConfirmClick(event);
        }}
        className={styles.confirmBtn}
      >
        Confirm
      </button>
    </div>
  );
};

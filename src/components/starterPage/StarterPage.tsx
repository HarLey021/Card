import styles from "./starterPage.module.css";
import React, { FC, useState } from "react";
import { CardFront } from "../cardFront/CardFront";
import { CardBack } from "../cardBack/CardBack";
import { CardInfo } from "../cardInfo/CardInfo";
import ThanksPage from "../thanksPage/ThanksPage";

const StarterPage: FC = () => {
  const [showCardInfo, setShowCardInfo] = useState(true);
  const [showThanksPage, setShowThanksPage] = useState(false);
  const [data, setData] = useState({
    name: "JANE APPLESEED",
    cardNumber: "0000 0000 0000 0000",
    expMonth: "00",
    expYear: "00",
    cvc: "000",
  });

  return (
    <>
      <div className={styles.body}>
        <div className={styles.topBackgroundCont}>
          <div className={styles.cardContainer}>
            <CardBack data={data} />
            <CardFront data={data} />
          </div>
        </div>
        <div>
          {showCardInfo && (
            <div className={styles.infoAndConfirm}>
              <CardInfo
                setShowCardInfo={setShowCardInfo}
                setShowThanksPage={setShowThanksPage}
                data={data}
                setData={setData}
              />
            </div>
          )}
          {showThanksPage && (
            <ThanksPage
              data={data}
              setData={setData}
              setShowCardInfo={setShowCardInfo}
              setShowThanksPage={setShowThanksPage}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default StarterPage;

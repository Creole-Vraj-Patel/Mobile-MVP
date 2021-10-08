import React, { useEffect, useRef } from "react";
import { Modal } from "react-bootstrap";
import Cross from "../../assets/Cross Gray.svg";
import { Bar } from "react-chartjs-2";
import { MarketType } from "../../types";
import M1I1 from "../../assets/market1_img1.jpg";
import M1I2 from "../../assets/market1_img2.jpg";
import M1I3 from "../../assets/market1_img3.jpg";
import M1I4 from "../../assets/market1_img4.jpg";
import M2I1 from "../../assets/market2_img1.jpg";
import M2I2 from "../../assets/market2_img2.jpg";
import M2I3 from "../../assets/market2_img3.jpg";
import M4I1 from "../../assets/market4_img1.jpg";

type Props = {
  surveyData: MarketType[];
  showInfoPopup: boolean;
  setShowInfoPopup: React.Dispatch<React.SetStateAction<boolean>>;
  infoID: number;
};

const InfoModal: React.FC<Props> = ({ surveyData, showInfoPopup, setShowInfoPopup, infoID }) => {
  const modelRef = useRef();

  useEffect(() => {
    document.getElementById("infoModal")?.focus();
    document.getElementById("infoModal")?.click();
    // document.getElementsByClassName('modal-backdrop').
  }, []);

  const market1 = () => {
    return (
      <div className="d-flex flex-column ">
        <p>
          Kodiak (NYSE ticker: KDKN) is a leading manufacturer of high-protein foods, most notably Power Cakes -
          high-protein flapjack and waffle mix and variants. Kodiak has an expanded product set that also includes
          high-protein frozen waffles and syrups. Which of the concepts proposes would sell the most in terms of volume
          of packages?
        </p>
        <br />
        <b>Bacon, Egg and Cheese Biscuit Protein Breakfast Sandwich</b>
        <p>
          Located in the frozen foods aisle in grocery stores, the highlight of these premium breakfast sandwiches is
          the high-protein, power biscuit that sandwiches thick-cut smoky bacon, free range egg and sharp aged cheddar.
          $9.95 for a box of 5.
        </p>
        <img src={M1I1} width="100%" />
        <br />
        <b>Kids Chocolate Blueberry Power Waffle</b>
        <p>
          For parents who want their kids to start the day out right. These children-focused waffles maintain mature
          packaging, uncompromising on protein, taste and fluffiness.
        </p>
        <img src={M1I2} width="100%" />
        <br />
        <b>Protein Power To-Go Bars</b>
        <p>
          These bars are found in the aisle with other bars and boast 10g of protein per bar. Flavors include peanut
          butter, chocolate chip and sunflower seed raisin. $4.95 for a box of 5 bars.
        </p>
        <img src={M1I3} width="100%" />
        <br />
        <b>High Protein Multi-Purpose Flour</b>
        <p>
          Located along side other Kodiak Cake mixes, the new blend is specifically formulated for baking for those
          DIYers and bloggers.
        </p>
        <img src={M1I4} width="100%" />
      </div>
    );
  };

  const market2 = () => {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <p>
          Jeopardy! is a gameshow in its 27th season on CBS. After the passing of the longtime host Alex Trebec in 2020,
          Jeopardy! began a public search for a new host that included several guest hosts. Associate Producer Mike
          Richards was announced as the permanent host starting in the 2021, but departed the show following attention
          on racial comments he had made in the past. The show has yet to announce his replacement. Who will it be?
        </p>
        <br />
        <p>Ken Jennings is acknowledged as the greatest participant of Jeopardy! winning 74 consecutive games.</p>
        <img src={M2I1} width="100%" />
        <br />
        <p>Aaron Rodgers is former quarterback MVP for the Green Bay Packers and frequent sports commentator.</p>
        <img src={M2I2} width="100%" />
        <br />
        <p>LaVar Burton is a famed actor from Star Trek and Reading Rainbow.</p>
        <img src={M2I3} width="100%" />
        <br />
      </div>
    );
  };

  const market3 = () => {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <p>
          BYU is in its 6th year with head coach Kalani Sitake. BYU has gone 11-1, 7-6, 7-6, 4-9, and 9-4 in the past 5
          years respectively. How many games will they win in the 2021 season?
        </p>
      </div>
    );
  };

  const market4 = () => {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <p>
          “No Time To Die” is the 25th installment of the James Bond film franchise. After filming and release delays
          due to COVID, an October theater release date has been announced. Star actor Daniel Craig, who will star in
          his 5th Bond movie, said this will be his final Bond film. Will critics and viewers like this film?
        </p>
        <img src={M4I1} width="100%" />
      </div>
    );
  };

  return (
    <Modal
      id="infoModal"
      className="infoModal"
      tabIndex={0}
      onBlur={() => setShowInfoPopup(!showInfoPopup)}
      show={showInfoPopup}
      fullscreen={true}
      centered
      onShow={() => {
        document.getElementById("infoModal")?.focus();
      }}
      >
      <div className="infoModal_main">
        <div style={{ width: "100%", textAlign: "right" }}>
          <img
            src={Cross}
            alt="Cancle Button"
            height="13.5px"
            width="13.5px"
            style={{
              marginLeft: "auto",
              marginBottom: "20px",
              cursor: "pointer",
              position: "sticky",
            }}
            onClick={() => setShowInfoPopup(!showInfoPopup)}
          />
        </div>
        {infoID === 1 ? (
          market1()
        ) : infoID === 2 ? (
          market2()
        ) : infoID === 3 ? (
          market3()
        ) : infoID === 4 ? (
          market4()
        ) : (
          <div />
        )}
      </div>
    </Modal>
  );
};

export default InfoModal;

import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Warning from "../../assets/Warning.svg";
import Cross from "../../assets/Cross Gray.svg";
import AlertSound from "../../assets/sounds/Alert.mp3";
import { Howl, Howler } from "howler";
import ReactAudioPlayer from "react-audio-player";

type Props = {
  timer: number;
  type: string;
  showWarning: boolean;
  setShowWarning: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSidebar: boolean;
  setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const AlertModal: React.FC<Props> = ({ timer, showWarning, setShowWarning, type, toggleSidebar, setToggleSidebar }) => {
  useEffect(() => {
    document.getElementById("alertModal")?.focus();
    document.getElementById("alertModal")?.click();
  }, []);

  useEffect(() => {
    if (showWarning) {
      playNotification();
    }
  }, [showWarning]);

  const playNotification = () => {
    Howler.volume(1.0);
    const sound = new Howl({
      src: [AlertSound],
    });
    sound.play();
  };

  const viewCart = () => {
    setShowWarning(false);
    setToggleSidebar(!toggleSidebar);
  };

  const continuePopup = () => {
    setShowWarning(false);
  };

  return (
    <>
      <Modal
        id="alertModal"
        className="alertModal"
        size="sm"
        centered
        show={showWarning}
        style={{
          display: type === "time" ? "block" : "inline",
        }}
        autoFocus
        onShow={() => {
          document.getElementById("alertModal")?.focus();
        }}
        tabIndex={0}
        onBlur={() => setShowWarning(!showWarning)}
      >
        <div className="alertModal_main p-4" >
          <img
            src={Cross}
            alt="Cross Button"
            height="13.5px"
            width="13.5px"
            style={{
              marginBottom: "10px",
              marginLeft: "auto",
              cursor: "pointer",
            }}
            onClick={() => setShowWarning(false)}
          />
          <img
            src={Warning}
            alt="Warning"
            height="36px"
            width="36px"
            className="mx-auto"
            style={{ marginBottom: "22px" }}
          />
          <p className="text-center">
            {type === "balance"
              ? "You do not have enough balance to select more shares."
              : "You have 2 minutes remaining to purchase shares."}
          </p>
          <br />
          <p className="text-center">
            {type === "balance"
              ? "Please remove some shares from cart to continue."
              : "Please complete your purchases and checkout from the cart."}
          </p>
          <br />
          <button
            className="alertModal_button text-uppercase"
            onClick={() => (type === "balance" ? viewCart() : continuePopup())}
          >
            {type === "balance" ? "view cart" : "continue"}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default AlertModal;

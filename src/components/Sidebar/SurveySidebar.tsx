import axios from "axios";
import React from "react";
import { MarketOptiontype, MarketType } from "../../types";
import SidebarData from "./SidebarData";
import SidebarHeader from "./SidebarHeader";
import SidebarTotal from "./SidebarTotal";

type Props = {
  totalShares: number | undefined;
  totalPurchase: number | undefined;
  toggleSidebar: boolean;
  setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  surveyData: MarketType[];
  setSurveyData: React.Dispatch<React.SetStateAction<[] | MarketType[]>>;
  cartData: MarketType[] | [];
  setCartData: React.Dispatch<React.SetStateAction<[] | MarketType[]>>;
  setShowThankyouPage: React.Dispatch<React.SetStateAction<boolean>>;
  submitData: () => void;
};

const SurveySidebar: React.FC<Props> = ({
  totalShares,
  toggleSidebar,
  setToggleSidebar,
  surveyData,
  setSurveyData,
  cartData,
  setCartData,
  totalPurchase,
  submitData,
}) => {
  const removeFromCart = () => {
    let localDefaultData = localStorage.getItem("default_data");
    if (localDefaultData) {
      setCartData([]);
      setToggleSidebar(!toggleSidebar);
      setSurveyData([...JSON.parse(localDefaultData)]);
    }
  };

  return (
    <div
      className="survey_sidebar"
      style={{ marginRight: !toggleSidebar ? "-500px" : "0" }}
    >
      <SidebarHeader
        totalShares={totalShares}
        toggleSidebar={toggleSidebar}
        setToggleSidebar={setToggleSidebar}
      />
      <div className="survey_sidebar_remove">
        <p style={{ fontWeight: 400, fontSize: "12px" }}>
          <em>Tap to remove individual shares</em>
        </p>
        <p
          className="text-uppercase"
          style={{
            color: "#EF514F",
            fontWeight: 600,
            fontSize: "14px",
            cursor: "pointer",
          }}
          onClick={removeFromCart}
        >
          Remove All
        </p>
      </div>
      {cartData.map((market, marketIndex) => (
        <SidebarData
          key={market.id}
          market={market}
          marketIndex={marketIndex}
          surveyData={surveyData}
          setSurveyData={setSurveyData}
          cartData={cartData}
          setCartData={setCartData}
        />
      ))}
      <SidebarTotal totalPurchase={totalPurchase} submitData={submitData} cartData={cartData}/>
    </div>
  );
};

export default SurveySidebar;

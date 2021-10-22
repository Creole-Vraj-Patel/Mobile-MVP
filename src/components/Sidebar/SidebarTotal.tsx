import React from "react";
import { Button } from "react-bootstrap";
import { MarketType } from "../../types";

type Props = {
  totalPurchase: number | undefined;
  submitData: () => void;
  cartData: MarketType[] | [];
};

const SidebarTotal: React.FC<Props> = ({
  submitData,
  totalPurchase,
  cartData,
}) => {
  return (
    <div className="sidebar_total">
      <div className="sidebar_total_left">
        <p className="text-uppercase" style={{ fontSize: "14px" }}>
          total :
        </p>
        <p style={{ fontSize: "18px", fontWeight: "bold" }}>
          ${totalPurchase?.toFixed(2)}
        </p>
      </div>
      <Button
        className="sidebar_total_submit"
        onClick={submitData}
        disabled={cartData.length === 0 ? true : false}
      >
        Submit
      </Button>
    </div>
  );
};

export default SidebarTotal;

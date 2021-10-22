import React from "react";
import CrossIcon from "../../assets/Cross.svg";

type Props = {
  totalShares: number | undefined;
  toggleSidebar: boolean;
  setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  timer: number;
};

const SidebarHeader: React.FC<Props> = ({
  toggleSidebar,
  setToggleSidebar,
  totalShares,
  timer,
}) => {
  return (
    <div className="survey_sidebar_header">
      <div className="survey_sidebar_headerUp">
        <div
          className="text-uppercase"
          style={{ fontSize: "12px", fontWeight: 400 }}
        >
          my shares  {' '}
          <div>
            Time Remaining: 
            <b>{' '}{' '}{` ${parseInt(((600 - timer) / 60).toString())}:${
              (600 - timer) % 60
            }`}</b>
          </div>
        </div>
        <img
          src={CrossIcon}
          alt="cancle icon"
          height="13px"
          width="13px"
          style={{ cursor: "pointer" }}
          onClick={() => setToggleSidebar(!toggleSidebar)}
        />
      </div>
      <div
        className="survey_sidebar_headerDown"
        style={{ fontSize: "16px", fontWeight: 600, marginTop: '0px' }}
      >
        Total shares selected: {totalShares}
      </div>
    </div>
  );
};

export default SidebarHeader;

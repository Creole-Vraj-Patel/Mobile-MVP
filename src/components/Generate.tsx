import React from "react";
import { nanoid } from "nanoid";
import { Redirect } from "react-router-dom";

const Generate = () => {
  const userID = localStorage.getItem("userId");
  const url = userID ? `/?RID=${userID}` : `/?RID=${nanoid()}`;

  if (userID === null) {
    localStorage.removeItem("thank_you_page");
  }

  return (
    <div>
      <Redirect
        to={{
          pathname: url,
        }}
      />
    </div>
  );
};

export default Generate;

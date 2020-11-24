import React from "react";

const Waiting = (props) => {
  return (
    <div
      style={{ ...props.custom }}
      className="w-100 text-center" 
      role="status"
    >
      <span className="spinner-border text-dark"></span><br/>
      <span className="">Loading...</span>
    </div>
  );
};

export default Waiting;

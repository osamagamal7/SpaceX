import React, { useState } from "react";
import "./input.css"
import "../../normalize.css"
type InputProps = {
  getLaunchById: (id: string) => void;
}

export const CustomInput: React.FC<InputProps> = ({ getLaunchById }) => {
  const [id, setId] = useState("");

  return (
    <div className="formGrid">
      <input
        className="inputForm"
        placeholder="SearchBar"
        onChange={(e) => setId(e.target.value)}
        value={id}
      />
      <button
        className="submitButton"
        style={{ margin: "0px 20px" }}
        disabled={id.length < 24}
        onClick={(e) => {
          e.preventDefault();
          getLaunchById(id);
          setId("");
        }}
      >
        Submit
      </button>
    </div>
  );
}

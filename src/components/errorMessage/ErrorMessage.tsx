import React from "react";
import "./ErrorMessage.css"
type ErrorMessageProps = {
  error: string
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return (
    <div>
      <h4 style={{ color: "#ff0033" }}>{error}</h4>
    </div>
  );
}

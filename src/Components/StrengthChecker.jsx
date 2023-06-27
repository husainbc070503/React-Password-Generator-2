import React from "react";

const StrengthChecker = ({ len, password }) => {
  console.log(len);
  const checkStrength = () => {
    if (len < 1) return 0;
    else if (len >= 1 && len < 4) return 1;
    else if (len >= 4 && len < 8) return 2;
    else if (len >= 8 && len < 12) return 3;
    else if (len >= 12 && len < 16) return 4;
    else return 5;
  };

  const strengths = ["Very Poor", "Poor", "Good", "Strong", "Very Strong"];

  return (
    len > 0 &&
    password && (
      <div className="strength-container">
        <p>Strength: </p>
        <span className={`badge_${checkStrength()}`}>
          {strengths[checkStrength() - 1]}
        </span>
      </div>
    )
  );
};

export default StrengthChecker;

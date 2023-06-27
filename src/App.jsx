import React, { useState } from "react";
import CheckBoxes from "./Components/CheckBoxes";
import useGeneratePassword from "./Hooks/GeneratePassword";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StrengthChecker from "./Components/StrengthChecker";

const App = () => {
  const [len, setLen] = useState(0);
  const [checkBoxData, setCheckBoxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ]);
  const [copied, setCopied] = useState(false);

  const updateCheckBoxData = (i) => {
    checkBoxData[i].state = !checkBoxData[i].state;
    setCheckBoxData(checkBoxData);
  };

  const { generatePassword, password } = useGeneratePassword();

  const notify = (title, type) => {
    if (type) {
      toast.success(title, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.error(title, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleClick = () => {
    const res = generatePassword(len, checkBoxData);
    if (!res) {
      notify(
        "Atleast one option should be selected or Length must not be zero",
        false
      );
      return;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="App">
      <div className="container">
        <h2>Password Generator</h2>
        <div className="generator__card">
          {password && (
            <div className="pass-field">
              <h3>{password}</h3>
              <button type="button" className="copy__btn" onClick={handleCopy}>
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          )}

          <div className="input-range">
            <div className="show">
              <h4>Character Length</h4>
              <span>{len}</span>
            </div>

            <input
              type="range"
              min={0}
              max={26}
              value={len}
              onChange={(e) => setLen(e.target.value)}
              className="input"
            />
          </div>

          <div className="input-boxes">
            {checkBoxData.map((item, index) => {
              return (
                <CheckBoxes
                  key={index}
                  state={item.state}
                  setState={() => updateCheckBoxData(index)}
                  title={item.title}
                />
              );
            })}
          </div>

          <StrengthChecker len={len} password={password} />

          <button type="button" className="gen__btn" onClick={handleClick}>
            Generate Password
          </button>
        </div>
      </div>
      <ToastContainer transition={Zoom} />
    </div>
  );
};

export default App;

import { useState } from "react";
import {
  lowerCaseAlphabets,
  numbers,
  symbols,
  upperCaseAlphabets,
} from "../Utils/Constants";

const useGeneratePassword = () => {
  const [password, setPassword] = useState("");

  const generatePassword = (len, checkBoxData) => {
    let charset = "",
      generatedPass = "";

    const selectedOptions = checkBoxData.filter((item) => item.state);

    if (selectedOptions.length === 0) {
      setPassword("");
      return false;
    }

    for (const option of selectedOptions) {
      switch (option.title) {
        case "Include Uppercase Letters":
          charset += upperCaseAlphabets;
          break;

        case "Include Lowercase Letters":
          charset += lowerCaseAlphabets;
          break;

        case "Include Numbers":
          charset += numbers;
          break;

        case "Include Symbols":
          charset += symbols;
          break;

        default:
          break;
      }
    }

    const n = charset.length;
    for (let i = 0; i < len; i++) {
      const ind = Math.floor(Math.random() * n);
      generatedPass += charset[ind];
    }

    setPassword(generatedPass);
    return true;
  };

  return { generatePassword, password };
};

export default useGeneratePassword;

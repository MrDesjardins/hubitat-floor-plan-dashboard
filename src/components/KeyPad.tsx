import React, { useState } from "react";
import "./keypad.css";
import { AlarmAction } from "../models/alarm";
export interface KeyPadProps {
  goodCodes: string[]
  disarm: () => void;
  rollback: () => void;
  alarmState: AlarmAction;
}
export const KeyPad = (props: KeyPadProps) => {
  const [code, setCode] = useState("");
  return <div className="keypad" onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const val = (e.target as any).innerText;
    const classButton = (e.target as any).classList[0];
    const valNumber = Number(val);
    if (classButton === "keypad-button-enter") {
      if (props.goodCodes.indexOf(code) >= 0) {
        props.disarm();
      }
      setCode("");
    }
    else if (classButton === "keypad-button-erase") {
      if (code.length > 0) {
        setCode(code.substr(0, code.length - 1));
      }
    }
    else if (classButton === "keypad-button-cancel") {
      props.rollback();
    }
    else if (classButton === "keypad-entered-numbers") {


    }
    else if (!isNaN(valNumber)) {
      setCode(code + val);
    }
  }
  } >
    <div className="keypad-entered-numbers">{code}</div>
    <div className="keypad-button-1">1</div>
    <div className="keypad-button-2">2</div>
    <div className="keypad-button-3">3</div>
    <div className="keypad-button-4">4</div>
    <div className="keypad-button-5">5</div>
    <div className="keypad-button-6">6</div>
    <div className="keypad-button-7">7</div>
    <div className="keypad-button-8">8</div>
    <div className="keypad-button-9">9</div>
    <div className="keypad-button-erase">Erase</div>
    <div className="keypad-button-0">0</div>
    <div className="keypad-button-enter">Enter</div>
    <div className="keypad-button-cancel">Cancel</div>
  </div >;
};

// 1) Set the menu and temperature opacity to 15%
// 2) Cancel need to set back the previous state
// 3) Test that we are changing state properly on the backend
// 4) Create Hubitat app rule to adjust the HSM depending on the VirtualKeyPad changed value
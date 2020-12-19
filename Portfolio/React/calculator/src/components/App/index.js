import React, { useEffect, useState } from "react";
import menu from "../../assets/menu.png";
import Button from "../Button";
import commafy from "../utils/commafy";
import "./App.css";

const App = () => {
    const [time, setTime] = useState(new Date());
    const [value, setValue] = useState("0");
    const [memory, setMemory] = useState(null);
    const [operator, setOperator] = useState(null);
    const minitues = new Date().getMinutes();
    // let nums = /(\d|\.){1}/;
    // const [preOperator, setPreOperator] = useState(false);

  useEffect(() => {
    setTime(new Date());
  }, [minitues]);
    const operators = ["+", "-", "×", "÷"];
    
    function update(res) {
        setMemory(res);
        setValue(res + "");
    }
    
    function calculation(content) {
        if (operator !== null) {
            let res;
            if (operator === "+") {
              res = memory + parseFloat(value);
            } else if (operator === "−") {
                res = memory - parseFloat(value);
            } else if (operator === "×") {
                res = memory * parseFloat(value);
            } else if (operator === "÷") {
                res = memory / parseFloat(value);
            }
            update(res);
        }
        else {
            setMemory(parseFloat(value));
        }
        // Not so perfectc
        setValue("0");
        setOperator(content);
    }
  const handleButtonPress = content => () => {
    const num = parseFloat(value);

    if (content === "AC") {
      setValue("0");
      setMemory(null);
      setOperator(null);
      return;
    }

    if (content === "±") {
      setValue((num * -1).toString());
      return;
    }

    if (content === "%") {
      setValue((num / 100).toString());
	  setMemory(null);
      setOperator(null);
      return;
    }

    if (content === ".") {
      if (value.includes(".")) return;

      setValue(value + ".");
      return;
    }

      if (operators.includes(content)) {
        //   setOperator(true);
          calculation(content);
          return;
      }
      
    if (content === "=") {
      if (!operator) return;

      if (operator === "+") {
        setValue((memory + parseFloat(value)).toString());
      } else if (operator === "−") {
        setValue((memory - parseFloat(value)).toString());
      } else if (operator === "×") {
        setValue((memory * parseFloat(value)).toString());
      } else if (operator === "÷") {
        setValue((memory / parseFloat(value)).toString());
      }
      setMemory(null);
      setOperator(null);
      return;
    }   
    //   console.log(nums.test(content) , preOperator);
    //   if (nums.test(content) && preOperator === true) {
    //       setValue(content);
    //       return;
    //   }
    //   console.log(2);
    //   setPreOperator(false);
        if (value[value.length - 1] === ".") {
            setValue(value + content);
        } else {
            setValue(parseFloat(num + content).toString());
        } 
  };

  return (
    <div className="App">
      <div className="top">
        <div className="time">
          {time
            .getHours()
            .toString()
            .padStart(2, "0")}
          :
          {time
            .getMinutes()
            .toString()
            .padStart(2, "0")}
        </div>
        <div className="menu">
          <img src={menu} alt="menu" />
        </div>
      </div>
      <div className="display">{commafy(value)}</div>
      <div className="buttons">
        <Button
          onButtonClick={handleButtonPress}
          content="AC"
          type="function"
        />
        <Button onButtonClick={handleButtonPress} content="±" type="function" />
        <Button onButtonClick={handleButtonPress} content="%" type="function" />
        <Button onButtonClick={handleButtonPress} content="÷" type="operator" />
        <Button onButtonClick={handleButtonPress} content="7" />
        <Button onButtonClick={handleButtonPress} content="8" />
        <Button onButtonClick={handleButtonPress} content="9" />
        <Button onButtonClick={handleButtonPress} content="×" type="operator" />
        <Button onButtonClick={handleButtonPress} content="4" />
        <Button onButtonClick={handleButtonPress} content="5" />
        <Button onButtonClick={handleButtonPress} content="6" />
        <Button onButtonClick={handleButtonPress} content="−" type="operator" />
        <Button onButtonClick={handleButtonPress} content="1" />
        <Button onButtonClick={handleButtonPress} content="2" />
        <Button onButtonClick={handleButtonPress} content="3" />
        <Button onButtonClick={handleButtonPress} content="+" type="operator" />
        <Button onButtonClick={handleButtonPress} content="0" />
        <Button onButtonClick={handleButtonPress} content="." />
        <Button onButtonClick={handleButtonPress} content="=" type="operator" />
      </div>
      <div className="bottom" />
    </div>
  );
};

export default App;

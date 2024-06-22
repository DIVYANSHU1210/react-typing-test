import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import { generate } from "random-words";
import UpperMenu from "./UpperMenu";
import { useTestMode } from "../context/TestModeContext";
import TestResults from "./TestResults";

const txt = generate(20).join(" ");
function TypingBox() {
  const [wordsArr, setwordsArr] = useState(() => {
    return generate(50);
  });

  const inputRef = useRef(null);
  const [currWordIdx, setCurrWordIdx] = useState(0);
  const [currCharIdx, setCurrCharIdx] = useState(0);
  const {testMode, setTestMode} = useTestMode();
  const [countDown, setCountDown] = useState(15);
  const [testStart, setTestStart] = useState(false);
  const [testEnd, setTestEnd] = useState(false);
  const [intervalId, setIntervalId] = useState("");
  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [extraChars, setExtraChars] = useState(0);
  const [missedChars, setMissedChars] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);


  const handleCountDown = () => {
    const intervalId = setInterval(timer, 1000);
    setIntervalId(intervalId);

    function timer() {
      setCountDown((prevCountDown) => {
        if (prevCountDown === 1) {
          clearInterval(intervalId);
          setTestEnd(true);
        }
        return prevCountDown - 1;
      });
    }
  };

  const handleUserInput = (e) => {
    if (!testStart) {
      handleCountDown();
      setTestStart(true);
    }
    const currWordChars = spanRefArr[currWordIdx].current.childNodes;

    // for backspace
    if (e.keyCode === 8) {
      if (currCharIdx !== 0) {
        if (currCharIdx === currWordChars.length) {
          if (currWordChars[currCharIdx - 1].className.includes("extra")) {
            currWordChars[currCharIdx - 1].remove();
            currWordChars[currCharIdx - 2].className += " current-letter-right";
          } else {
            currWordChars[currCharIdx - 1].className = "";
            currWordChars[currCharIdx - 1].className = "current-letter";
          }
        } else {
          currWordChars[currCharIdx].className = "";
          currWordChars[currCharIdx - 1].className = "current-letter";
        }
        setCurrCharIdx(currCharIdx - 1);
      } else {
        if (currWordIdx > 0) {
          currWordChars[currCharIdx].className = "";
          const prevWordChars = spanRefArr[currWordIdx - 1].current.childNodes;
          prevWordChars[prevWordChars.length - 1].className +=
            " current-letter-right";
          setCurrWordIdx(currWordIdx - 1);
          setCurrCharIdx(prevWordChars.length);
        }
      }
      return;
    }

    // for space
    if (e.keyCode === 32) {
      setMissedChars(missedChars + (currWordChars.length - currCharIdx));
      if(currCharIdx === currWordChars.length){
        const correctCharsInWord = spanRefArr[currWordIdx].current.querySelectorAll(".correct").length;
        if(correctCharsInWord === currWordChars.length){
          setCorrectWords(correctWords + 1);
        }
      }
      if (currCharIdx >= currWordChars.length) {
        currWordChars[currCharIdx - 1].classList.remove("current-letter-right");
      } else {
        currWordChars[currCharIdx].classList.remove("current-letter");
      }

      setCurrWordIdx(currWordIdx + 1);
      setCurrCharIdx(0);
      spanRefArr[currWordIdx + 1].current.childNodes[0].className =
        "current-letter";
      return;
    }

    // for extra letters
    if (currCharIdx === currWordChars.length) {
      const newSpan = document.createElement("span");
      newSpan.innerText = e.key;
      newSpan.className = "incorrect extra current-letter-right";
      if (currCharIdx < currWordChars.length) {
        currWordChars[currCharIdx].classList.remove("current-letter");
      } else {
        currWordChars[currCharIdx - 1].classList.remove("current-letter-right");
      }

      spanRefArr[currWordIdx].current.append(newSpan);
      setCurrCharIdx(currCharIdx + 1);
      setExtraChars(extraChars + 1);
      return;
    }


    // for correct incorrect letters
    if (e.key === currWordChars[currCharIdx].innerText) {
      currWordChars[currCharIdx].className = "correct";
      setCorrectChars(correctChars + 1);
    } else {
      currWordChars[currCharIdx].className = "incorrect";
      setIncorrectChars(incorrectChars + 1);
    }

    if (currCharIdx === currWordChars.length - 1) {
      currWordChars[currCharIdx].className += " current-letter-right";
    } else if (currCharIdx <= currWordChars.length - 1) {
      currWordChars[currCharIdx + 1].className = "current-letter";
    }

    setCurrCharIdx(currCharIdx + 1);
  };


  const calculateWPM = ()=>{
    return Math.round((correctChars/5)/(testMode/60));
  }
  
  const calculateAccuracy = ()=>{
    return Math.round((correctWords/currWordIdx)*100);
  }

  const focusInput = () => {
    inputRef.current.focus();
  };

  const spanRefArr = useMemo(() => {
    return Array(wordsArr.length)
      .fill(0)
      .map((i) => createRef(null));
  }, [wordsArr]);


  // useEffect(() => {
  //   focusInput();
  //   spanRefArr[0].current.childNodes[0].className = "current-letter";
  // }, []);

  useEffect(()=>{
    resetTest();
    focusInput();
  }, [testMode])

  const resetTest = ()=>{
    if(!testEnd){
      setCountDown(testMode);
      setCurrWordIdx(0);
      setCurrCharIdx(0);
      setwordsArr(generate(50));
      setTestStart(false);
      setTestEnd(false);
      clearInterval(intervalId);
      resetSpanRefClassName();
    }
   
  }

  const resetSpanRefClassName =()=>{
    spanRefArr.map((word)=>{
      // console.log(Array.from(word.current.childNodes));
      Array.from(word.current.childNodes).map((letter)=>{
        letter.className = "";
      })
      spanRefArr[0].current.childNodes[0].className = "current-letter";
    })
  }

  return (
    <div>
      <UpperMenu countDown={countDown} setCountDown={setCountDown} focusInput={focusInput}/>
      {testEnd===true ? 
      (<TestResults
        wpm = {calculateWPM()}
        accuracy = {calculateAccuracy()}
        correctChars = {correctChars}
        incorrectChars = {incorrectChars}
        extraChars = {extraChars}
      />) :
        (<div className="typingBox" onClick={focusInput}>
          <div className="words">
            {wordsArr.map((word, index) => (
              <span className="word" ref={spanRefArr[index]}>
                {word.split("").map((letter) => (
                  <span>{letter}</span>
                ))}
              </span>
            ))}
          </div>
        </div>)}
        <input
          type="text"
          className="hidden-input"
          onKeyDown={handleUserInput}
          ref={inputRef}
        />
      
    </div>
  );
}

export default TypingBox;

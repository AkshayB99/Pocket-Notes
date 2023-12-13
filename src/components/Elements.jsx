import React, { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import ele from "./Elements.module.css";
import submitBtn from "../assets/SubmitBtn.png";
import backBtn from "../assets/BackArrow.png";

function Data({ setShowHeaders }) {
  const { state } = useLocation();
  const [displayData, setDisplayData] = useState(null);
  const data = state ? state.data : null;
  const [firstLetters, setFirstLetters] = useState("");
  const [submitBtnOpacity, setSubmitBtnOpacity] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("yourDataKey"));

    // Check if state and storedData exist before using the data
    if (state && storedData) {
      const matchingElement = storedData.find(
        (element) => element.id === data.id
      );

      if (matchingElement) {
        setDisplayData(matchingElement);
      }
    }
  }, [state, data]);

  // Initialize firstLetters inside the useEffect to avoid potential issues
  useEffect(() => {
    // Check if displayData and displayData.group exist before accessing groupName
    if (displayData && displayData.group) {
      let groupName = displayData.group.groupName;
      const words = groupName.split(" ");
      let firstLetter;
      if (words.length === 1) {
        firstLetter = words[0].substring(0, 2).toUpperCase();
      } else if (words.length === 2) {
        firstLetter = words
          .slice(0, 2)
          .map((word) => word.charAt(0).toUpperCase())
          .join("");
      } else {
        firstLetter = "";
      }
      setFirstLetters(firstLetter);
    }
  }, [displayData]);

  const handleSubmitBtn = () => {
    if (submitBtnOpacity === false) {
      alert("Please enter some text to submit");
      return;
    }

    const currentDate = new Date();
    const formattedTime = currentDate.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    const formattedDate = currentDate.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    // Create an object with text, date, and time information
    const textValue = textAreaValue || "";
    const submissionData = {
      text: textValue,
      date: formattedDate,
      time: formattedTime,
    };

    // Check if displayData and displayData.group exist
    if (displayData && displayData.group) {
      // Update the groupData with the new submissionData
      displayData.group.groupData.push(submissionData);

      // Save the updated displayData to LocalStorage
      const storedData = JSON.parse(localStorage.getItem("yourDataKey")) || [];
      const updatedStoredData = storedData.map((item) =>
        item.id === displayData.id ? displayData : item
      );

      localStorage.setItem("yourDataKey", JSON.stringify(updatedStoredData));
    }

    // to clear the textarea
    setTextAreaValue("");
    setSubmitBtnOpacity(false);
  };

  let noteTextdata = displayData?.group?.groupData;

  return (
    <div>
      {displayData && (
        <div className={ele.mainContainer}>
          <div className={ele.header}>
            <div
              className={ele.backBtn}
              onClick={() => {
                navigate("/");
                if (window.innerWidth <= 600) {
                  setShowHeaders(false);
                }
              }}
            >
              <img src={backBtn} className={ele.backBtnImg} />
            </div>
            <div
              style={{ backgroundColor: displayData.group.selectedColor }}
              className={ele.colorBox}
            >
              {firstLetters}
            </div>
            <div className={ele.colorBoxText}>
              {displayData.group && displayData.group.groupName}
            </div>
          </div>
          <div className={ele.middleContsiner}>
            {noteTextdata.map((item) => (
              <div key={item.time} className={ele.noteContainer}>
                <div className={ele.noteText}>{item.text}</div>
                <div className={ele.noteDate}>
                  {item.date} . {item.time}
                </div>
              </div>
            ))}
          </div>
          <div className={ele.footer}>
            <div className={ele.textAreaContainer}>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                className={ele.notesText}
                placeholder="Enter your text here..........."
                onChange={(e) => {
                  setTextAreaValue(e.target.value);
                  const textValue = e.target.value;
                  setSubmitBtnOpacity(textValue.trim().length > 0);
                }}
                value={textAreaValue}
              ></textarea>
            </div>
            <div
              className={ele.submitBtn}
              style={{
                opacity: submitBtnOpacity ? 1 : 0.5,
                cursor: submitBtnOpacity ? "pointer" : "default",
              }}
              onClick={handleSubmitBtn}
            >
              <img src={submitBtn} alt="" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Data;

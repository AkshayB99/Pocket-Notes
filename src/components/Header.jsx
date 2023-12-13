import React, { useState, useEffect } from "react";
import head from "./Header.module.css";
import AlertBox from "./AlertBox";
import { useNavigate } from "react-router-dom";

function Header({setShowHeaders}) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [storedData, setStoredData] = useState(
    JSON.parse(localStorage.getItem("yourDataKey")) || []
  );
  const [firstLetters, setFirstLetters] = useState("");
  const [clickedIndex, setClickedIndex] = useState(null);
  const navigate = useNavigate();

  const toggleAlert = () => setIsAlertOpen(!isAlertOpen);

  const updateStoredData = (newData) => setStoredData([...storedData, newData]);

  useEffect(() => {
    const updatedFirstLetters = storedData.map((data) => {
      const groupName = data.group.groupName;
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
      return firstLetter;
    });

    setFirstLetters(updatedFirstLetters);
    localStorage.setItem("yourDataKey", JSON.stringify(storedData));
  }, [storedData]);

  const handleDataNavigate = (items, index) => {
    if (window.innerWidth <= 600) {
      setShowHeaders(true);
    }
    // Use the navigate function to redirect to '/data' and pass data as state
    navigate("/data", { state: { data: items } });
    setClickedIndex(index); // Set the clicked index
  };

  return (
    <div className={head.mainBox}>
      <div className={head.heading}>Pocket Notes</div>
      <div className={head.subBox}>
        <div className={head.subBoxContent}>
          {storedData.map((items, index) => (
            <div
              key={items.id}
              className={head.groupName}
              style={{
                backgroundColor: clickedIndex === index ? "#e1e1e1" : "#fff",
              }}
              onClick={() => handleDataNavigate(items, index)}
            >
              <div
                style={{ backgroundColor: items.group.selectedColor }}
                className={head.colorBox}
              >
                {firstLetters[index]}
              </div>
              <div className={head.colorBoxText}>{items.group.groupName}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={head.addBtn} onClick={toggleAlert}>
        +
      </div>
      <AlertBox
        isAlertOpen={isAlertOpen}
        toggleAlert={toggleAlert}
        updateStoredData={updateStoredData}
      />
    </div>
  );
}

export default Header;

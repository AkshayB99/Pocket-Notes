import React, { useState, useEffect } from "react";
import ale from "./AlertBox.module.css";

const colors = [
  "#B38BFA",
  "#FF79F2",
  "#43E6FC",
  "#F19576",
  "#0047FF",
  "#6691FF",
];

function AlertBox({ isAlertOpen, toggleAlert, updateStoredData }) {
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const handleColorClick = (color) => setSelectedColor(color);

  const handleCreateButtonClick = () => {
    if (groupName.trim() === "") {
      alert("Please enter a group name.");
      return;
    } else if (selectedColor === "") {
      alert("Please select a color.");
      return;
    }

    const newGroup = {
      id: Date.now(),
      group: { groupName, groupData: [], selectedColor },
    };

    // Pass the new group data to the header component
    updateStoredData(newGroup);

    // to close the alert box we call this func..
    toggleAlert();
  };

  useEffect(() => {
    // to clear input fields
    if (isAlertOpen) {
      setGroupName("");
      setSelectedColor("");
    }
  }, [isAlertOpen]);

  if (!isAlertOpen) return null;

  return (
    <div className={ale.mainAlert}>
      <div className={ale.middleBox}>
        <h1 className={ale.Heading}>Create New group</h1>
        <div className={ale.groupName}>
          <label htmlFor="group" className={ale.groupNameLabel}>
            Group Name
          </label>
          <input
            type="text"
            id="group"
            className={ale.groupNameInput}
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
        <div className={ale.colorGroup}>
          <p className={ale.colorHeading}>Choose Color</p>
          <div className={ale.subColorGrp}>
            {colors.map((color) => (
              <div
                key={color}
                className={ale.colors}
                style={{ backgroundColor: color }}
                onClick={() => handleColorClick(color)}
              />
            ))}
          </div>
        </div>
        <button onClick={handleCreateButtonClick} className={ale.alertBtn}>
          Create
        </button>
      </div>
    </div>
  );
}

export default AlertBox;

import React from "react";
import { useNavigate } from "react-router-dom";
import img from "../assets/HomePageImg.png";
import home from "./Home.module.css";
import lockImg from "../assets/CopyrightLock.png";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div className={home.mainContent}>
        <div className={home.img}>
          <img src={img} alt="" />
        </div>
        <div className={home.heading}>
          <p>Pocket Notes</p>
        </div>
        <div className={home.description}>
          <p>
            Send and receive messages without keeping your phone online. Use
            Pocket Notes on up to 4 linked devices and 1 mobile phone
          </p>
        </div>
        <div className={home.copyRight}>
          <img src={lockImg} alt="" className={home.copyRightImg}/>
          <p>end-to-end encrypted</p>
        </div>
      </div>
    </>
  );
}

export default Home;

import React from "react";
import "../styles/Welcome.css";
import Lottie from "lottie-react";
import cryptoAnimation from "../assets/crypto.json";
const Welcome = () => {
  return (
    <div className="welcome">
      <div className="welcome-left">
        <h2 className="headline">
          Stay up to date with everything crypto related
        </h2>
        <p className="statement">
          CoinHub is the best place to keep up with crypto news regarding
          Bitcoin, Ethereum, Dogecoin, and much more.
        </p>
      </div>
      <Lottie className="lottie" animationData={cryptoAnimation} loop />
    </div>
  );
};

export default Welcome;

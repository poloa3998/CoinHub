import React from "react";
import Welcome from "../components/Welcome";
import Cryptos from "../components/Cryptos";
import "../styles/Home.css";
import News from "./News";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <section className="home">
      <Welcome />
      <section className="cryptoSection">
        <div className="cryptoSection-left">
          <h3>Explore and learn about the latest cryptocurrencies.</h3>
          <Link to="/cryptocurrencies" className="home-btn">
            Learn more
          </Link>
        </div>
        <Cryptos simple={true} />
      </section>
      <section className="newsSection">
        <div className="newsSection-left">
          <h3 className="news-header">View the latest news regarding crypto</h3>
        </div>
        <News simple={true} />
        <Link to="/news" className="home-btn news-btn">
          Learn more
        </Link>
      </section>
    </section>
  );
};

export default Home;

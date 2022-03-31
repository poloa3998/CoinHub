import React, { useEffect } from "react";
import Cryptos from "../components/Cryptos";
import "../styles/Cryptocurrencies.css";
const Cryptocurrencies = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="cryptocurrenciesPage">
      <div className="cryptocurrencies">
        <h2> Cryptocurrencies </h2>
        <Cryptos simple={false} />
      </div>
    </section>
  );
};

export default Cryptocurrencies;

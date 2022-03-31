import React, { useState, useEffect } from "react";
import "../styles/Cryptos.css";
import { Link } from "react-router-dom";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { TailSpin } from "react-loader-spinner";
interface Props {
  simple: boolean;
}
const Cryptos = ({ simple }: Props) => {
  const count: number = simple ? 6 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const formatMoney: Intl.NumberFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const priceLowerThanZero = (data: string) => {
    let decimals =
      data.length - parseInt(data.replace(/^0./, "")).toString().length;
    return parseFloat(data).toFixed(decimals);
  };
  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);
    const filter = cryptosList?.data?.coins.filter((crypto: any) => {
      return crypto.name.toLowerCase().includes(searchTerm.toLocaleLowerCase());
    });
    setCryptos(filter);
  }, [cryptosList, searchTerm]);

  if (isFetching && !simple) {
    return (
      <div className="loader">
        <TailSpin width={150} height={150} color="#2688f8" />
      </div>
    );
  } else if (isFetching) {
    return null;
  }
  return (
    <>
      {!simple ? (
        <input
          type="text"
          className="searchBar"
          placeholder="Search Cryptos"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      ) : null}
      <div className="cryptos">
        {cryptos?.map((crypto: any) => {
          return (
            <div className="crypto" key={crypto.uuid}>
              <Link to={`/crypto/${crypto.uuid}`}>
                <div className="crypto-wrapper">
                  <img
                    className="cryptoImg"
                    src={crypto.iconUrl}
                    alt={crypto.name}
                  />
                  <p className="cryptoName">{crypto.name}</p>
                  <p className="cryptoPrice">
                    {crypto?.price < 0.1
                      ? `$${priceLowerThanZero(crypto.price)}`
                      : formatMoney.format(
                          Math.round(crypto?.price * 100) / 100
                        )}
                  </p>
                  <div className="cryptoChange-wrapper">
                    {parseFloat(crypto.change) < 0 ? (
                      <AiOutlineArrowDown className="arrow decreasing" />
                    ) : (
                      <AiOutlineArrowUp className="arrow increasing" />
                    )}
                    <p
                      className={
                        parseFloat(crypto.change) < 0
                          ? "decreasing"
                          : "increasing"
                      }
                    >
                      {Math.abs(parseFloat(crypto.change))}%
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Cryptos;

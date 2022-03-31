import React, { useEffect, useState } from "react";
import "../styles/CryptoDetails.css";
import { TailSpin } from "react-loader-spinner";
import { useParams } from "react-router";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import {
  AiOutlineDollar,
  AiOutlineTrophy,
  AiOutlineExclamationCircle,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";
import millify from "millify";
import { BsLightning, BsGraphUp } from "react-icons/bs";
import { RiExchangeBoxLine } from "react-icons/ri";
import HTMLReactParser from "html-react-parser";
import LineChart from "../components/LineChart";
const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState<string>("7d");
  const [timeUnit, setTimeUnit] = useState<string>("day");
  const [buttonActive, setButtonActive] = useState<string>("1w");
  const { data: coin, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });
  const formatMoney: Intl.NumberFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const cryptoDetails = coin?.data?.coin;

  const priceLowerThanZero = () => {
    let decimals =
      cryptoDetails?.price.length -
      parseInt(cryptoDetails?.price.replace(/^0./, "")).toString().length;
    return parseFloat(cryptoDetails?.price).toFixed(decimals);
  };
  const time = ["3h", "1d", "1w", "1m", "3m", "1y", "3y", "5y"];
  const stats = [
    {
      title: "Price to USD",
      value: ` ${
        cryptoDetails?.price && cryptoDetails?.price < 0.1
          ? priceLowerThanZero()
          : formatMoney.format(Math.round(cryptoDetails?.price * 100) / 100)
      }`,
      icon: <AiOutlineDollar />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <AiOutlineDollar /> },
    {
      title: "24h Volume",
      value: cryptoDetails
        ? `$ ${
            cryptoDetails["24hVolume"] && millify(cryptoDetails["24hVolume"])
          }`
        : undefined,
      icon: <BsLightning />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <AiOutlineDollar />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <AiOutlineTrophy />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value:
        cryptoDetails?.numberOfMarkets &&
        millify(cryptoDetails?.numberOfMarkets),
      icon: <BsGraphUp />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <RiExchangeBoxLine />,
    },
    {
      title: "Approved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <AiOutlineCheck />
      ) : (
        <AiOutlineClose />
      ),
      icon: <AiOutlineExclamationCircle />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <AiOutlineExclamationCircle />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <AiOutlineExclamationCircle />,
    },
  ];

  if (isFetching) {
    <div className="loader">
      <TailSpin width={150} height={150} color="#2688f8" />
    </div>;
  }

  const handleTime = (date: string) => {
    switch (date) {
      case "3h":
        setTimeUnit("hour");
        setTimePeriod(date);
        break;
      case "1d":
        setTimeUnit("hour");
        setTimePeriod("24h");
        break;
      case "1w":
        setTimeUnit("day");
        setTimePeriod("7d");
        break;
      case "1m":
        setTimeUnit("day");
        setTimePeriod("30d");
        break;
      case "3m" || "1y":
        setTimeUnit("month");
        setTimePeriod(date);
        break;
      default:
        setTimeUnit("year");
        setTimePeriod(date);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (isFetching)
    return (
      <div className="loader">
        <TailSpin width={150} height={150} color="#2688f8" />
      </div>
    );
  return (
    <div className="cryptoDetails">
      <div className="cryptoHeader">
        <img src={cryptoDetails?.iconUrl} alt={cryptoDetails?.name} />
        <h1 className="title">
          {cryptoDetails?.name} ({cryptoDetails?.symbol})
        </h1>
      </div>
      <div className="graph">
        <div className="graph-wrapper">
          <LineChart
            coinHistory={coinHistory}
            currentPrice={
              cryptoDetails?.price < 0.1
                ? `$${priceLowerThanZero()}`
                : formatMoney.format(
                    Math.round(cryptoDetails?.price * 100) / 100
                  )
            }
            coinName={cryptoDetails?.name}
            timeUnit={timeUnit}
          />
          <div className="timePeriod-buttons">
            {time.map((date) => {
              return (
                <button
                  className={
                    buttonActive === date
                      ? "period-button active"
                      : "period-button"
                  }
                  key={date}
                  onClick={() => {
                    handleTime(date);
                    setButtonActive(date);
                  }}
                >
                  {date}
                </button>
              );
            })}
          </div>
        </div>

        <div className="statistics">
          <div>
            <div>
              <h3>{cryptoDetails?.name} Value Statistics</h3>
              <p>An overview showing the states of {cryptoDetails?.name}</p>
            </div>
            {stats.map(({ title, icon, value }) => {
              return (
                <div key={title} className="stat">
                  <div className="stat-left">
                    <p>{icon}</p>
                    <p>{title}</p>
                  </div>
                  <p>{value}</p>
                </div>
              );
            })}
          </div>
          <div>
            <div>
              <h3>Other Statistics</h3>
              <p>An overview showing the states of all cryptocurrencies</p>
            </div>
            {genericStats.map(({ title, icon, value }) => {
              return (
                <div key={title} className="stat">
                  <div className="stat-left">
                    <p>{icon}</p>
                    <p>{title}</p>
                  </div>
                  <p>{value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="cryptoDescription">
        <h2>What is {cryptoDetails?.name}?</h2>
        {HTMLReactParser(cryptoDetails?.description || "loading")}
      </div>
      <section className="links-section">
        <div className="cryptoLinks">
          <h2>{cryptoDetails?.name} Links</h2>
          {cryptoDetails?.links.map((link: any, i: number) => {
            return (
              <div className="cryptoLink" key={link.name + `${i}`}>
                <p>{link.type} </p>

                <a
                  key={link.url}
                  target="_blank"
                  href={link.url}
                  rel="noreferrer"
                >
                  {link.name}
                </a>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default CryptoDetails;

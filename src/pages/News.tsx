import React, { useEffect, useRef, useState } from "react";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { AiOutlineSearch, AiOutlineDown } from "react-icons/ai";
import ReactTimeAgo from "react-time-ago";
import "../styles/News.css";
import doge from "../assets/doge.png";
// @ts-ignore
import Slider from "react-slick";
import { useGetCryptosQuery } from "../services/cryptoApi";
interface Props {
  simple: boolean;
}

const News = ({ simple }: Props) => {
  const searchBar = useRef<any>(null);
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [cryptos, setCryptos] = useState([]);
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simple ? 10 : 20,
  });
  const { data: cryptosList } = useGetCryptosQuery(100);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.addEventListener("focusout", handleClickOutside, false);
    document.addEventListener("click", handleClickOutside, false);
    setCryptos(cryptosList?.data?.coins);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
      document.removeEventListener("focusout", handleClickOutside, false);
    };
  }, [cryptosList]);

  const handleClickOutside = (event: any) => {
    if (searchBar.current && !searchBar.current.contains(event.target)) {
      setSearchActive(false);
    }
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleFilter = (e: any) => {
    setSearchFilter(e.target.value);
    const filter = cryptosList?.data?.coins.filter((crypto: any) => {
      return crypto.name
        .toLowerCase()
        .includes(e.target.value.toLocaleLowerCase());
    });
    setCryptos(filter);
  };

  return (
    <>
      {simple ? (
        <Slider {...settings}>
          {cryptoNews?.value.map((news: any, i: number) => {
            return (
              <div className="newsCard slider" key={i}>
                <a target="_blank" href={news.url} rel="noreferrer">
                  <div>
                    <img
                      className="newsImg slider"
                      src={news?.image?.contentUrl || doge}
                      alt="news"
                    />
                    <h4 className="newsName">{news.name}</h4>
                  </div>
                  <p className="description slider">
                    {news.description > 1
                      ? `${news.description.substring(0, 1)}... `
                      : news.description}
                  </p>
                  <div>
                    <div className="sourceProvider slider">
                      <img
                        className="sourceImg"
                        src={
                          news.provider[0]?.image?.thumbnail?.contentUrl || doge
                        }
                        alt="news"
                      />
                      <p> {news.provider[0]?.name}</p>
                    </div>
                    <ReactTimeAgo
                      date={new Date(news.datePublished)}
                      locale="en"
                    />
                  </div>
                </a>
              </div>
            );
          })}
        </Slider>
      ) : (
        <div className="news">
          <div
            className="search-wrapper"
            ref={searchBar}
            onClick={() => {
              setSearchActive(true);
              searchBar.current.focus();
            }}
            onFocus={() => {
              setSearchActive(true);
            }}
          >
            <input
              type="text"
              className="newsSearchBar"
              placeholder="Search News"
              value={searchFilter}
              onChange={handleFilter}
            />
            {searchActive ? (
              <AiOutlineSearch className="icon" />
            ) : (
              <AiOutlineDown className="icon" />
            )}
            {searchActive ? (
              <div className="option-wrapper">
                {cryptos?.map((crypto: any) => {
                  return (
                    <button
                      key={crypto.uuid}
                      onClick={() => {
                        setSearchFilter(crypto.name);
                        setNewsCategory(crypto.name);
                      }}
                    >
                      {crypto.name}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>

          <div className="news-wrapper">
            {cryptoNews?.value.length === 0 ? (
              <p className="no-results">No results</p>
            ) : (
              <div className="newsCards">
                {cryptoNews?.value.map((news: any, i: number) => {
                  return (
                    <div className="newsCard" key={i}>
                      <a target="_blank" href={news.url} rel="noreferrer">
                        <div>
                          <img
                            className="newsImg"
                            src={news?.image?.contentUrl || doge}
                            alt="news"
                          />
                          <h4 className="newsName">{news.name}</h4>
                        </div>
                        <p className="description">
                          {news.description > 1
                            ? `${news.description.substring(0, 1)}... `
                            : news.description}
                        </p>
                        <div>
                          <div className="sourceProvider">
                            <img
                              className="sourceImg"
                              src={
                                news.provider[0]?.image?.thumbnail
                                  ?.contentUrl || doge
                              }
                              alt="news"
                            />
                            <p> {news.provider[0]?.name}</p>
                            <ReactTimeAgo
                              date={new Date(news.datePublished)}
                              locale="en"
                            />
                          </div>
                        </div>
                      </a>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default News;

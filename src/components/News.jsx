import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({ pageSize = 10, category = "general", ...props }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeWord = (string = "") => {
    return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
  };

  const updateNews = async () => {
    props.updateProcess(10);
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${props.apiKey}&page=${page}&pageSize=${pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.updateProcess(30);
    let parsedData = await data.json();
    console.log(parsedData);
    props.updateProcess(60);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.updateProcess(100);
  };

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${
      props.apiKey
    }&page=${page + 1}&pageSize=${pageSize}`;
    setPage((prevPage) => prevPage + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles((prevArticles) => prevArticles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  useEffect(() => {
    updateNews();
    document.title = `${capitalizeWord(category)} - News Monk`;
  }, []);

  return (
    <>
      <h2 className="d-flex justify-content-center my-4 text-center">
        <b>NewsMonk - Top {capitalizeWord(category)} Headlines</b>
      </h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}>
        <div className="container">
          <div className="row">
            {articles.map((element, idx) => {
              return (
                <div className="col-md-4" key={idx}>
                  <NewsCard
                    title={
                      element.title ? element.title : <i>No Title Available</i>
                    }
                    description={
                      element.description ? (
                        element.description
                      ) : (
                        <i>No Description Available</i>
                      )
                    }
                    author={element.author ? element.author : "Unknown"}
                    published={element.publishedAt}
                    source={
                      element.source.name ? element.source.name : "Unknown"
                    }
                    imgUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                    }
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.propTypes = {
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;

import React, { Component } from "react";
import NewsCard from "./NewsCard";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeWord(this.props.category)} - News Monk`;
  }

  static defaultProps = {
    pageSize: 10,
    category: "general",
  };
  static propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeWord = (string) => {
    return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
  };

  async updateNews() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    console.log(parsedData);
    this.props.setProgress(60);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  fetchMoreData = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };

  handlePrev = async () => {
    this.setState({
      page: this.state.page - 1,
    });
    this.updateNews();
  };

  handleNext = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    this.updateNews();
  };

  async componentDidMount() {
    this.updateNews();
  }
  render() {
    return (
      <>
        <h2 className="d-flex justify-content-center my-4 text-center">
          <b>
            NewsMonk - Top {this.capitalizeWord(this.props.category)} Headlines
          </b>
        </h2>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner />}>
          <div className="container">
            <div className="row">
              {this.state.articles.map((element, idx) => {
                return (
                  <div className="col-md-4" key={idx}>
                    <NewsCard
                      title={
                        element.title ? (
                          element.title
                        ) : (
                          <i>No Title Available</i>
                        )
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
  }
}

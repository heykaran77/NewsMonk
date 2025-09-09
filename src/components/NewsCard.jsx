import React, { Component } from "react";

export default class NewsCard extends Component {
  render() {
    let { title, author, newsUrl, description, imgUrl, published, source } =
      this.props;
    return (
      <div className="my-3 d-flex justify-content-center">
        <div className="card" style={{ width: "24rem" }}>
          <img src={imgUrl} className="card-img-top fixed-img" alt="..." />
          <div className="card-body">
            <h5 className="card-title ">{title}</h5>
            <span className="badge rounded-pill text-bg-primary mb-2">
              {source}
            </span>
            <p className="card-text">{description}</p>
            <p>
              <small className="text-body-secondary">
                By {author} on {new Date(published).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              className="btn btn-primary btn-sm">
              read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { Route, Router, Routes } from "react-router-dom";
import About from "./pages/About";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  apiKey = import.meta.env.VITE_NEWS_API_KEY;

  state = {
    progress: 0,
  };

  setProgress = (progress) => {
    this.setState({
      progress: progress,
    });
  };
  render() {
    return (
      <div>
        <Navbar />
        <LoadingBar color="#f11946" progress={this.state.progress} height={3} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <News
                setProgress={this.setProgress}
                apiKey={this.apiKey}
                key="general"
                pageSize={10}
                category={"general"}
              />
            }
          />
          <Route exact path="/about" element={<About />} />
          <Route
            exact
            path="/business"
            element={
              <News
                setProgress={this.setProgress}
                apiKey={this.apiKey}
                key="business"
                category={"business"}
              />
            }
          />
          <Route
            exact
            path="/entertainment"
            element={
              <News
                setProgress={this.setProgress}
                apiKey={this.apiKey}
                key="entertainment"
                category={"entertainment"}
              />
            }
          />
          <Route
            exact
            path="/health"
            element={
              <News
                setProgress={this.setProgress}
                apiKey={this.apiKey}
                key="health"
                category={"health"}
              />
            }
          />
          <Route
            exact
            path="/science"
            element={
              <News
                setProgress={this.setProgress}
                apiKey={this.apiKey}
                key="science"
                category={"science"}
              />
            }
          />
          <Route
            exact
            path="/sports"
            element={
              <News
                setProgress={this.setProgress}
                apiKey={this.apiKey}
                key="sports"
                category={"sports"}
              />
            }
          />
          <Route
            exact
            path="/technology"
            element={
              <News
                setProgress={this.setProgress}
                apiKey={this.apiKey}
                key="technology"
                category={"technology"}
              />
            }
          />
        </Routes>
      </div>
    );
  }
}

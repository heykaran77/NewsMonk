import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { Route, Router, Routes } from "react-router-dom";
import About from "./pages/About";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;

  const [progress, setProgress] = useState(0);

  const updateProcess = (progress) => {
    setProgress(progress);
  };

  return (
    <div>
      <Navbar />
      <LoadingBar color="#f11946" progress={progress} height={3} />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <News
              updateProcess={updateProcess}
              apiKey={apiKey}
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
              updateProcess={updateProcess}
              apiKey={apiKey}
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
              updateProcess={updateProcess}
              apiKey={apiKey}
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
              updateProcess={updateProcess}
              apiKey={apiKey}
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
              updateProcess={updateProcess}
              apiKey={apiKey}
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
              updateProcess={updateProcess}
              apiKey={apiKey}
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
              updateProcess={updateProcess}
              apiKey={apiKey}
              key="technology"
              category={"technology"}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import flagsmith from "flagsmith";
import Posts from "./components/main/Posts/Posts";
import Photos from "./components/main/Photos/Photos";

function App() {
  const [showPhotos, setShowPhotos] = useState<boolean>(false);

  useEffect(() => {
    flagsmith.init({
      environmentID: "T7iTDkWNodMdaosxRbjeSR",
      onChange: (oldFlags, params) => {
        setShowPhotos(flagsmith.hasFeature("show_photos"));
      },
    });
  }, []);

  return (
    <Router>
      <div className="main-container">
        <Switch>
          {showPhotos && (
            <Route path="/photos">
              <Photos />
            </Route>
          )}

          <Route path="/">
            <Posts />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

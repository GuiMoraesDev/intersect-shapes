import React from "react";
import Map from "./components/Map";
import {ZONES, CONFLICTING_ZONES} from "./components/Map/constants";

function App() {
  return (
    <>
      <header className="App-header">
        <h1>Map</h1>
      </header>

      <Map zones={ZONES} conflictingZones={CONFLICTING_ZONES} />
    </>
  );
}

export default App;

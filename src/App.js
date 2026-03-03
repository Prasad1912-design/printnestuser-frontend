import React from "react";
import { BrowserRouter } from "react-router-dom";
import Approutes from "./Approutes/Approutes";
import CreateContext from "./Context/CreateContext";
import interceptor from "./utility/interceptor"; // The line where you written this the code inside the file is running

function App() {
  return (
    <BrowserRouter basename="/PrintNest">
      <CreateContext>
        <Approutes />
      </CreateContext>
    </BrowserRouter>
  );
}

export default App;

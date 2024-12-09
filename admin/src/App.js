import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import dotenv from "dotenv";

import "./App.css";
import MainRoutes from "./components/MainRoutes";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <MainRoutes />
      </div>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import Footer from "./components/Footer";
import MainRouter from "./components/MainRouter";
import Navbar from "./components/Navbar";
import LoginPopup from "./components/LoginPopup";
import { fetchFoodList, getCartItems } from "./redux/Food/action";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const { token } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getCartItems(token, dispatch);
    fetchFoodList(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <ToastContainer />
      <div className="App">
        <Navbar setShowLogin={setShowLogin} />
        <MainRouter />
      </div>
      <Footer />
    </>
  );
}

export default App;

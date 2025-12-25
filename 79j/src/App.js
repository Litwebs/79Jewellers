import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router";
import Home from "./Components/Home/Home";
import Featured from "./Components/Featured/Featured";
import ItemsPage from "./Components/ItemsPage/ItemsPage";
import RingsLong from "./Imgs/ring-long.png";
import NeckLong from "./Imgs/longOne.jpeg";
import BraLong from "./Imgs/bra-long.png";
import { IoLogoWhatsapp } from "react-icons/io";
import ScrollToTop from "./Components/ScrollToTop";
import { useEffect, useState } from "react";
import Error from "./Components/Error";
import axios from "axios";

function App() {
  const [isLive, setIsLive] = useState(true);
  const [checking, setChecking] = useState(true);

  const checkStatus = async () => {
    try {
      const res = await axios.post(
        "https://admin.litwebs.co.uk/api/websites/status",
        { url: "https://79jewellers.com" }
      );
      return res.data?.data?.status === "live";
    } catch (e) {
      return false; // or true if you want fail-open
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      const live = await checkStatus();
      if (mounted) {
        setIsLive(live);
        setChecking(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    // <Router>
    //   <ScrollToTop />
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/featured" element={<Featured />} />
    //     <Route
    //       path="/rings"
    //       element={<ItemsPage title="Rings" Img={RingsLong} />}
    //     />
    //     <Route
    //       path="/necklaces"
    //       element={<ItemsPage title="Necklaces" Img={NeckLong} />}
    //     />
    //     <Route
    //       path="/bracelets"
    //       element={<ItemsPage title="Bracelets" Img={BraLong} />}
    //     />
    //     <Route
    //       path="/bangles"
    //       element={<ItemsPage title="Bangles" Img={BraLong} />}
    //     />
    //   </Routes>
    //   <div className="whats-app">
    //     <a
    //       href="https://api.whatsapp.com/send?phone=447833960991"
    //       target="_blank"
    //       rel="noreferrer"
    //     >
    //       <IoLogoWhatsapp size={70} className="whats-app-icon" />
    //     </a>
    //   </div>
    // </Router>

    <Router>
      <ScrollToTop />

      {checking ? null : (
        <>
          {isLive ? (
            <>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/featured" element={<Featured />} />
                <Route
                  path="/rings"
                  element={<ItemsPage title="Rings" Img={RingsLong} />}
                />
                <Route
                  path="/necklaces"
                  element={<ItemsPage title="Necklaces" Img={NeckLong} />}
                />
                <Route
                  path="/bracelets"
                  element={<ItemsPage title="Bracelets" Img={BraLong} />}
                />
                <Route
                  path="/bangles"
                  element={<ItemsPage title="Bangles" Img={BraLong} />}
                />
              </Routes>
              <div className="whats-app">
                <a
                  href="https://api.whatsapp.com/send?phone=447833960991"
                  target="_blank"
                  rel="noreferrer"
                >
                  <IoLogoWhatsapp size={70} className="whats-app-icon" />
                </a>
              </div>
            </>
          ) : (
            <Routes>
              {/* show paused for ANY route */}
              <Route path="*" element={<Error />} />
            </Routes>
          )}
        </>
      )}
    </Router>
  );
}

export default App;

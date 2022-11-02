import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Router from "./router/routes";
import { CredentialsContext } from "./store/context";
import "./App.css";

function App() {
  const [session, setSession] = useState<string>("Admin");

  useEffect(() => {
    const getSession = async () => {
      const url = process.env.REACT_APP_API_URL;
      const apiKey = process.env.REACT_APP_API_KEY;

      await fetch(`${url}/authentication/guest_session/new?api_key=${apiKey}`)
        .then(async (res) => {
          const item = await res.json();
          setSession(item.guest_session_id);
        })
        .catch((err) => {
          console.log("err", err);
        });
    };

    getSession();
  }, []);

  return (
    <div className="App" style={{ width: "100%" }}>
      <BrowserRouter>
        <Layout>
          <CredentialsContext.Provider value={{ session, setSession }}>
            <Router />
          </CredentialsContext.Provider>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Layout } from "./components";
import Router from "./router/routes";
import { useDispatch } from "react-redux";
import { setSession } from "./store/slices/credentialsStore";
import { getSession } from "./utils/getSession";
import styles from "./App.module.scss";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getSessionData = async () => {
      const session = await getSession();
      dispatch(setSession(session));
    };

    getSessionData();
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <BrowserRouter>
        <Layout>
          <Router />
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;

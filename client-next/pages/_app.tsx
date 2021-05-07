import { Provider } from "react-redux";
import store from "../redux";
import "antd/dist/antd.css";
import GlobalStyle from "../GlobalStyle";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Component {...pageProps} />;
    </Provider>
  );
}

export default MyApp;

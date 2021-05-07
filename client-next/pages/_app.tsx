import { Provider } from "react-redux";
import store from "../redux";
import "../styles/antd.less";
import GlobalStyle from "../styles/GlobalStyle";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Component {...pageProps} />;
    </Provider>
  );
}

export default MyApp;

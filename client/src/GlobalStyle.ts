import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap");

@import url("https://fonts.googleapis.com/css2?family=Cedarville+Cursive&display=swap");

:root {
  font-size: 16px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  --scrollbarBG: #cfd8dc;
  --thumbBG: #90a4ae;
}

body {
  width: 100%;
  margin: 0 auto;
  font-family: "Inter", sans-serif;
  background-color: #f2f2f2;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
  font-weight: 700;
}

a {
  color: #333;
  text-decoration: none;
}

a:hover {
  color: #ff5a5f;
}

.ant-table-header.ant-table-sticky-header > table > thead > tr > th {
  background-color: #f2f2f2;
}

.ant-table-thead > tr > th {
  color: #333;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 12px;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}
`;

export default GlobalStyle;

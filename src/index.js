import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {MoralisProvider} from "react-moralis"

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider
      appId="Y3Yod9lWu77Xw8y9STtAViGveXbIQphhR6t420Cu"
      serverUrl="https://zete9krq17np.usemoralis.com:2053/server"
    >
      <App />
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

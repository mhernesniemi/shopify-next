import "../styles/globals.css";
import type { AppProps } from "next/app";

function PrintStore({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default PrintStore;

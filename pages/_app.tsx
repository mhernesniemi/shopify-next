import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Permanent_Marker } from "@next/font/google";
const marker = Permanent_Marker({ weight: "400", subsets: ["latin"] });

function PrintStore({ Component, pageProps }: AppProps) {
  return (
    <div className={marker.className}>
      <Component {...pageProps} />
    </div>
  );
}

export default PrintStore;

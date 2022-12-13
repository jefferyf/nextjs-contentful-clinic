import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import SearchProvider from "../context/searchContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SearchProvider>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </SearchProvider>
    </>
  );
}

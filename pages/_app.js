import StoreProvider from "../store/store-context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <StoreProvider>
        <Component {...pageProps} />
        <footer>
          <p>© 2021 Ankita</p>
        </footer>
      </StoreProvider>
    </>
  );
}

export default MyApp;

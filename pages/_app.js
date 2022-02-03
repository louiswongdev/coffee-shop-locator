import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <footer>
        <p>© 2021 Ankita</p>
      </footer>
    </>
  );
}

export default MyApp;

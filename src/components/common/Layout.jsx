import Head from "next/head";
import Navbar from "./Navbar";

const Layout = ({ children }) => (
  <>
    <Head>
      <title>BNCC Movies</title>
      <meta name="description" content="BNCC Movies" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Navbar />
    {children}
  </>
);

export default Layout;

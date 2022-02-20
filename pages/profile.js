import Head from "next/head";
import Navbar from "../src/components/Navbar";
import ProfileBlock from "../src/components/ProfileBlock";
import WatchList from "../src/components/WatchList";

const Profile = () => {
    return (
        <>
            <Head>
                <title>BNCC Movies</title>
                <meta name="description" content="BNCC Movies" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar/>
            <ProfileBlock/>
            <WatchList/>
        </>
        
    );
};

export default Profile;
import Head from "next/head";
import Navbar from "../src/components/Navbar";
import ProfileBlock from "../src/components/ProfileBlock";
import WatchList from "../src/components/WatchList";
import { useSelector } from "react-redux";
import router from "next/router";
import { useEffect } from "react";

const Profile = () => {
    const { session_id, data } = useSelector((state) => state.user);
    
    useEffect(() => {
        if(!session_id) router.push("/login");
    }, []);
    
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
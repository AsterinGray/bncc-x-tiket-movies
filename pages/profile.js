import Navbar from "../src/components/common/Navbar";
import ProfileBlock from "../src/components/ProfileBlock";
import WatchList from "../src/components/WatchList";
import { useSelector } from "react-redux";
import router from "next/router";
import { useEffect } from "react";
import Layout from "../src/components/common/Layout";

const Profile = () => {
  const { session_id } = useSelector((state) => state.user);

  useEffect(() => {
    if (!session_id) router.push("/login");
  }, []);

  return (
    <Layout>
      <ProfileBlock />
      <WatchList />
    </Layout>
  );
};

export default Profile;

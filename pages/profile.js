import router from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Layout from "../src/components/common/Layout";
import ProfileBlock from "../src/components/pages/profile/ProfileBlock";
import WatchList from "../src/components/pages/profile/WatchList";

const Profile = () => {
  const { session_id } = useSelector((state) => state.user);

  useEffect(() => {
    if (!session_id) router.push("/login");
  }, [session_id]);

  return (
    <Layout>
      <ProfileBlock />
      <WatchList />
    </Layout>
  );
};

export default Profile;

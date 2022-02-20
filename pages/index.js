import api from "../src/api";
import Layout from "../src/components/common/Layout";
import PopularMovies from "../src/components/pages/home/PopularMovies";
import SearchMovie from "../src/components/pages/home/SearchMovie";

export const getServerSideProps = async () => {
  const { data } = await api.get("/movie/popular");
  return {
    props: { movies: data.results },
  };
};

const Home = ({ movies }) => {
  return (
    <Layout>
      <PopularMovies movies={movies} />
      <SearchMovie />
    </Layout>
  );
};

export default Home;

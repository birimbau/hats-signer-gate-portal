import type { NextPage } from 'next';
import MainContent from '../components/MainContent/MainContent';
import Layout from './layout';

const Home: NextPage = () => {
  return (
    <Layout>
      <MainContent />
    </Layout>
  );
};

export default Home;

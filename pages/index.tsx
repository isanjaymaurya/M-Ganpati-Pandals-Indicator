import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';

interface HomeProps {}

const Home: NextPage<HomeProps> = () => {
  return (
    <div>
      <Head>
        <title>My Next.js SSG App</title>
        <meta name="description" content="A Next.js application using Static Site Generation" />
      </Head>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold">Welcome to My Next.js SSG App</h1>
        <p className="mt-4">Here is some data fetched at build time:</p>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {

  return {
    props: {},
  };
};

export default Home;
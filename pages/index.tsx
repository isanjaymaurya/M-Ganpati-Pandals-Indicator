import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';

interface HomeProps {
  data: any;
}

const Home: NextPage<HomeProps> = ({ data }) => {
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
        <pre className="mt-4 bg-gray-100 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetch('https://api.example.com/data').then(res => res.json());

  return {
    props: {
      data,
    },
  };
};

export default Home;
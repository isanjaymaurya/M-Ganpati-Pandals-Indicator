import { GetStaticProps } from 'next';
import Papa from 'papaparse';
import axios from 'axios';
import https from 'https';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import type { IGanpatiPandal } from '../types/global';

const GanpatiPandalsMap = dynamic(
  () => import('../components/Map/Map'),{
    ssr: false
  }
);

const agent = new https.Agent({
  rejectUnauthorized: false,
});

type Props = {
  ganpatiPandals: IGanpatiPandal[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const csvUrl =
    'https://docs.google.com/spreadsheets/d/1Z7Dsgv8f0eGSysC6JkOATyBDJODeNd2p8IOiLvPJXlY/export?format=csv';

  // Use axios to fetch the CSV as text
  const response = await axios.get(csvUrl, {
    httpsAgent: agent,
    responseType: 'text',
  });

  const csvText = response.data as string;

  const parsed = Papa.parse<IGanpatiPandal>(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  return {
    props: {
      ganpatiPandals: parsed.data,
    }
  };
};

export default function Home({ ganpatiPandals }: Props) {
  return (
    <>
      <Head>
        <title>M-Ganpati Pandals Indicator</title>
      </Head>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-lg font-bold mb-4 text-center">Ganpati Pandals in Mumbai</h1>
        <GanpatiPandalsMap ganpatiPandals={ganpatiPandals} />
      </main>
    </>
  );
}

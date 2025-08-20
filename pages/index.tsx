import React from 'react';
import { GetStaticProps } from 'next';
import Papa from 'papaparse';
import axios from 'axios';
import https from 'https';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import type { IGanpatiPandal } from '../types/global';
import useIsDesktop from '@/hooks/useIsDesktop';

const PandalsVirutalList = dynamic(() => import('@/components/PandalsVirutalList/PandalsVirutalList'), {
  ssr: false,
  loading: () => null,
});

const PandalHorizontalList = dynamic(
  () => import('@/components/PandalHorizontalList/PandalHorizontalList'),{
    ssr: false
  }
);

const GanpatiPandalsMap = dynamic(
  () => import('../components/GanpatiPandalsMap/GanpatiPandalsMap'),{
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
  const isDesktop = useIsDesktop();
  const [selectedPandal, setSelectedPandal] = React.useState<IGanpatiPandal | null>(null);
  return (
    <>
      <Head>
        <title>M-Ganpati Pandals Indicator</title>
      </Head>
      <main className="container mx-auto px-4 py-3 sm:py-12">
        <div className='flex gap-3 sm:gap-4 flex-col md:flex-row'>
          <div className='md:w-1/2 lg:w-2/3 w-full'>
            <GanpatiPandalsMap ganpatiPandals={ganpatiPandals} selectedPandal={selectedPandal} />
          </div>
          <div className='md:w-1/2 lg:w-1/3 w-full'>
            {isDesktop ? (
              <PandalsVirutalList ganpatiPandals={ganpatiPandals} onSelectPandal={setSelectedPandal} />
            ) : (
              <PandalHorizontalList ganpatiPandals={ganpatiPandals} selectedPandal={selectedPandal} onSelectPandal={setSelectedPandal} />
            )}
          </div>
        </div>
      </main>
    </>
  );
}

import { GetStaticProps } from 'next';
import Papa from 'papaparse';
import axios from 'axios';
import https from 'https';

const agent = new https.Agent({
  rejectUnauthorized: false,
});

type IGanpatiPandal = {
  name: string;
  latitude: string;
  longitude: string;
  address: string;
  pincode: string;
  google_link: string;
};

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
    },
    revalidate: 86400, // Revalidate once a day
  };
};

export default function Home({ ganpatiPandals }: Props) {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Ganpati Pandals in Mumbai</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Address</th>
              <th className="border px-2 py-1">Pincode</th>
              <th className="border px-2 py-1">Google Link</th>
            </tr>
          </thead>
          <tbody>
            {ganpatiPandals.map((pandal, idx) => (
              <tr key={idx}>
                <td className="border px-2 py-1">{pandal.name}</td>
                <td className="border px-2 py-1">{pandal.address}</td>
                <td className="border px-2 py-1">{pandal.pincode}</td>
                <td className="border px-2 py-1">
                  <a
                    href={pandal.google_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Map
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

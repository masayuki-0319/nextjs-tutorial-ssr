import type { GetStaticProps, NextPage } from 'next';
import fs from 'fs/promises';
import path from 'path';

type Product = {
  id: string;
  title: string;
};

type Props = {
  products: Product[];
};

const Home: NextPage<Props> = (props) => {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => {
        return <li key={product.id}>{product.title}</li>;
      })}
    </ul>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());

  return {
    props: {
      products: data.products,
    },
  };
};

export default Home;

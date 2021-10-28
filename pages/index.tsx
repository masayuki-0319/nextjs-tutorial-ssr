import type { InferGetStaticPropsType, NextPage } from 'next';
import Link from 'next/link';

import fs from 'fs/promises';
import path from 'path';

import { Product } from '../types';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<Props> = (props) => {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => {
        return (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>{product.title}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export const getStaticProps = async () => {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString()) as {
    products: Product[];
  };

  return {
    props: {
      products: data.products,
    },
  };
};

export default Home;

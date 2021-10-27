import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from 'next';
import fs from 'fs/promises';
import path from 'path';

import { Product } from '../types';

type Props = {
  loadedProduct: Product;
};

export const ProductDetailPage: NextPage<Props> = (props) => {
  const { loadedProduct } = props;

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
};

export default ProductDetailPage;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { params } = context;

  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString()) as { products: Product[] };

  const productId = params!.pid;
  const product = data.products.find((product) => product.id === productId);

  return {
    props: {
      loadedProduct: product,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { pid: 'p1' } },
      { params: { pid: 'p2' } },
      { params: { pid: 'p3' } },
    ],
    fallback: false,
  };
};

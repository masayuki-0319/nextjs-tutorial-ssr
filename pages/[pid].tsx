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

  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

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

  const data = await getData();

  const productId = params!.pid;
  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
};

const getData = async () => {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString()) as { products: Product[] };

  return data;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getData();

  const ids = data.products.map((product) => product.id);

  const params = ids.map((id) => {
    return { params: { pid: id } };
  });

  return {
    paths: params,
    fallback: true,
  };
};

import type { GetStaticProps, NextPage } from 'next';

type Product = {
  id: string;
  title: string;
  description: string;
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
  const products: Product[] = [
    {
      id: 'p1',
      title: 'Product 1',
      description: 'Description 1',
    },
    {
      id: 'p2',
      title: 'Product 2',
      description: 'Description 2',
    },
  ];

  return {
    props: {
      products: products,
    },
  };
};

export default Home;

import { NextPage } from 'next';

type Props = {};

export const UserProfilePage: NextPage<Props> = (props) => {
  const {} = props;

  return (
    <>
      <h1>Max</h1>
    </>
  );
};

export default UserProfilePage;

export const getServerSideProps = async () => {
  return {
    props: {
      username: 'Max',
    },
  };
};

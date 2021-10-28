import { GetServerSidePropsContext, NextPage } from 'next';

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

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { params, req, res } = context;


  return {
    props: {
      username: 'Max',
    },
  };
};

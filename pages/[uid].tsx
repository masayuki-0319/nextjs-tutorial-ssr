import {
  NextPage,
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
} from 'next';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export const UserIdPage: NextPage<Props> = (props) => {
  const { id } = props;

  return (
    <>
      <h1>{id}</h1>
    </>
  );
};

export default UserIdPage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { params } = context;

  const userId = params!.uid;

  return {
    props: {
      id: 'userid-' + userId,
    },
  };
};

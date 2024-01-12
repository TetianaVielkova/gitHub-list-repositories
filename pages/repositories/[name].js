import Head from "next/head";
import { useRouter } from 'next/router';
import { ref, onValue } from 'firebase/database';
import database from './../../firebaseConfig';
import client from "../../utils/apolloClient";
import USER_QUERY from "../../utils/graphqlQuery";
import { siteTitle } from "../../components/Layout/layout";
import RepositoryLayout from "../../components/RepositoryLayout/RepositoryLayout";
import Repository from "../../components/Repository/Repository";
import BackHomeBtn from "../../components/BackHomeBtn/BackHomeBtn";
import { Loader } from "../../components/Loader/Loader";

export async function getServerSideProps({ params }) {
  const repositoryName = params?.name || '';
  let repository = null;

  const repositoriesRef = ref(database, 'repositories');

  onValue(repositoriesRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const repo = childSnapshot.val().node;

      if (repo.name === repositoryName) {
        repository = repo;
        return;
      }
    });
  });

  const { data } = await client.query({
    query: USER_QUERY,
    variables: { login: process.env.LOGIN, count: 100, repositoryName }, 
  });

  if (!repository) {
    repository = data.user.repositories.edges.find((edge) => edge.node.name === repositoryName)?.node;
  }

  return {
    props: {
      data,
      repository,
    },
  };
}

export default function RepositoryPage({data, repository }) {
  const router = useRouter();
  if (router.isFallback || !repository) {
    return <Loader />;
  }
  const pageTitle = `${siteTitle} - ${repository.name}`;

  return (
    <RepositoryLayout data={data}>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <BackHomeBtn />
      <Repository repository={repository} />
    </RepositoryLayout>
  );
}

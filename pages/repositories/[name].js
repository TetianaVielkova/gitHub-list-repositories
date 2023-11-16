import Head from "next/head";
import { useRouter } from 'next/router';
import client from "../../utils/apolloClient";
import USER_QUERY from "../../utils/graphqlQuery";
import { siteTitle } from "../../components/Layout/layout";
import RepositoryLayout from "../../components/RepositoryLayout/RepositoryLayout";
import Repository from "../../components/Repository/Repository";
import BackHomeBtn from "../../components/BackHomeBtn/BackHomeBtn";
import { Loader } from "../../components/Loader/Loader";

export async function getStaticPaths() {
  const repositories = []; 

  const paths = repositories.map((repository) => ({
    params: { name: repository.name },
  }));

  return {
    paths,
    fallback: false 
  };
}

export async function getStaticProps({ params }) {
  const repositoryName = params.name;
  const { data } = await client.query({
    query: USER_QUERY,
    variables: { login: process.env.LOGIN, count: 50, repositoryName }, 
  });

  return {
    props: {
      data,
      repository: data.user.repositories.edges.find((edge) => edge.node.name === repositoryName)?.node,
    },
  };
}

export default function RepositoryPage({repository, data}) {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />; 
}

    return (
      <RepositoryLayout data={data}>
        <Head>
          <title>{siteTitle} - {repository.name}</title>
        </Head>
        <BackHomeBtn/>
        <Repository repository={repository}/>
      </RepositoryLayout>
    );
}





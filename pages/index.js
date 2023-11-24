import Head from 'next/head';
import 'normalize.css/normalize.css';
import USER_QUERY from './../utils/graphqlQuery';
import client from '../utils/apolloClient';
import { siteTitle } from '../components/Layout/layout';
import LayoutSite from '../components/Layout/layout';
import CardRepos from '../components/CardRepos/CardRepos';

export async function getStaticProps() {
  const { data } = await client.query({
    query: USER_QUERY,
    variables: { login: process.env.LOGIN, count: 50 },
  });

  return {
    props: {
      data,
    },
  };
}

export default function Home({ data }) {

  return (
    <LayoutSite data={data}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <CardRepos data={data} />
    </LayoutSite>
  );
}

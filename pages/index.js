import React, { useState } from 'react';
import Head from 'next/head';

import 'normalize.css/normalize.css';

import USER_QUERY from './../utils/graphqlQuery';
import client from '../utils/apolloClient';

import { siteTitle } from '../components/Layout/layout';
import LayoutSite from '../components/Layout/layout';
import CardRepos from '../components/CardRepos/CardRepos';
import ButtonLoadMore from '../components/Button/button';

export async function getStaticProps() {
    const { data } = await client.query({
      query: USER_QUERY,
      variables: { login: "TetianaVielkova", count: 9},
    });

  return {
    props: {
      data,
    },
    };
} 

export default function Home({ data }) {
  const [cursor, setCursor] = useState(data.user.repositories.pageInfo.endCursor);
  const [hasNextPage, setHasNextPage] = useState(data.user.repositories.pageInfo.hasNextPage);
  const [updatedData, setData] = useState(data);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    if (hasNextPage) {
      setLoading(true);
      const { data: newData } = await client.query({
        query: USER_QUERY,
        variables: {
          login: "TetianaVielkova",
          count: 9,
          cursor: cursor,
        }
      });
      setLoading(false);

      const newEdges = newData.user.repositories.edges;
      setCursor(newData.user.repositories.pageInfo.endCursor);
      setHasNextPage(newData.user.repositories.pageInfo.hasNextPage);
      const combinedEdges = [...data.user.repositories.edges, ...newEdges];
      const updatedData = { ...data };
      updatedData.user.repositories.edges = combinedEdges;
      setData(updatedData);
    }
  };

  return (
    <LayoutSite data={data}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
        <CardRepos data={data} />
        <ButtonLoadMore loadMore={loadMore} hasNextPage={hasNextPage} loading={loading} />
      </LayoutSite>
  );
}
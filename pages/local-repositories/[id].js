import { useRouter } from 'next/router';
import { useEffect } from 'react';
import RepositoryLayout from '../../components/RepositoryLayout/RepositoryLayout';
import Head from 'next/head';
import BackHomeBtn from '../../components/BackHomeBtn/BackHomeBtn';
import RepositoryLocal from '../../components/RepositoryLocal/RepositoryLocal';
import { siteTitle } from '../../components/Layout/layout';
import USER_QUERY from '../../utils/graphqlQuery';
import client from '../../utils/apolloClient';

export async function getServerSideProps(context) {
    const { data } = await client.query({
        query: USER_QUERY,
        variables: { login: process.env.LOGIN, count: 100 },
    });
    const { query } = context;

    return {
        props: {
            data,
        },
    };
}

export default function LocalRepositoryDetailsPage({ data, query }) {

    // if (!repositoryData) {
    //     return <div>Loading...</div>;
    // }

    // const pageTitle = `${siteTitle} - ${repositoryData.id}`;

    return (
        <RepositoryLayout data={data}>
            <Head>
                {/* <title>{pageTitle}</title> */}
            </Head>
            <BackHomeBtn />
            {/* <RepositoryLocal repositoryData={repositoryData} /> */}
        </RepositoryLayout>
    );
}
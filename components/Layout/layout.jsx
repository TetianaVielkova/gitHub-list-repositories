import Head from 'next/head';
import InfoUser from '../InfoUser/InfoUser';
import FooterSite from '../Footer/footer';
import HeaderSite from '../Header/header';
import { Layout } from 'antd';
import { contentStyle, layoutStyle } from './layout.style';
import { Suspense } from 'react';
import { Loader } from '../Loader/Loader';

const { Content } = Layout;

export const siteTitle = 'GitHub repositories';

export default function LayoutSite({children, data}) {

  return (
    <Layout>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <Layout style={layoutStyle} >
      <HeaderSite/>
      <Layout  hasSider>
        <InfoUser data={data}/>
        <Suspense fallback={<Loader/>}>
          <Content style={contentStyle} data={data}>{children}</Content>
        </Suspense>
      </Layout>
      <FooterSite/>
    </Layout>
    </Layout>
  );
}
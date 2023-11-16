import { Layout } from 'antd';
import { contentStyle, layoutStyle } from './RepositoryLayout.style';
import InfoUser from '../InfoUser/InfoUser';
import HeaderSite from '../Header/header';
import FooterSite from '../Footer/footer';

const { Content } = Layout;

export default function RepositoryLayout({ children, data}) {

  return (
    <Layout style={layoutStyle}>
    <HeaderSite/>
      <Layout hasSider>
        <InfoUser data={data}/>
        <Content style={contentStyle}>{children}</Content>
      </Layout>
      <FooterSite/>
    </Layout>
  );
}
import ButtonAddRepos from '../ButtonAddRepos/ButtonAddRepos';
import { siteTitle } from '../Layout/layout';

import { headerStyle, logoBoxStyle, logoStyle, textStyle } from './header.style';
import { Typography, Layout, Image } from 'antd';

const { Header } = Layout;
const { Text} = Typography;

export default function HeaderSite() {
    return (
        <Header style={headerStyle}>
            <div style={logoBoxStyle}>
                <div><Image style={logoStyle} width={40} src="/images/github.png" alt="Logo" /></div>
                <div><Text style={textStyle}>{siteTitle}</Text></div>
            </div>
            <ButtonAddRepos/>
        </Header>
    );
}
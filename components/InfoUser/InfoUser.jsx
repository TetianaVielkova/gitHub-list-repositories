// import Link from "next/link";

import { Avatar, Typography, Layout } from "antd";
import { linkStyle, siderStyle, textStyle, titleStyle } from "./InfoUser.style";

const { Sider} = Layout;
const { Title, Text, Link } = Typography;

export default function InfoUser({ data }){
    const user = data.user;

    return (
        <Sider style={siderStyle}>
            <Avatar src={user.avatarUrl} alt={`${user.name}'s Avatar`} priority="true"  size={168}  style={{ borderRadius: '50%' }}/>
            <Link style={linkStyle} href={user.url} target="_blank">{user.name}</Link>
            <Text style={textStyle}>Followers: {user.followers.totalCount}</Text>
            <Text style={textStyle}>Following: {user.following.totalCount}</Text>
            <Text style={textStyle}>Total Repositories: {user.repositories.totalCount}</Text>
        </Sider>
    )
}
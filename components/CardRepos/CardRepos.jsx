import Link from "next/link";
import Date from "../Date/date";
import { Col,  Row } from "antd";
import { colStyle, linkStyle, rowStyle } from "./CardRepos.style";


export default function CardRepos({ data }) {
    const repositories = data.user.repositories;

    return (
        <div>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }} style={rowStyle}>
            {repositories.edges.map(({ node }) => (
                <Col xs={24} sm={12} md={11} lg={8} xl={7} key={node.id} style={colStyle}>
                    <Link style={linkStyle} href={node.url} target="_blank" >
                    {node.name}
                    <div style={{ fontSize: '18px' }}>{node.primaryLanguage ? node.primaryLanguage.name : 'JAVASCRIPT'}</div>
                    <Date dateString={node.updatedAt}/>
                    </Link>
                </Col>
            ))}
        </Row>
        </div>
    );
}
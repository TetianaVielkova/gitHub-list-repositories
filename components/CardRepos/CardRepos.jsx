import Link from "next/link";
import Date from "../Date/date";
import { Col,  Row } from "antd";
import { colStyle, langStyle, linkStyle, rowStyle } from "./CardRepos.style";


export default function CardRepos({ data }) {
    const repositories = data.user.repositories;

    function truncateName(name, maxLength) {
        if (name.length > maxLength) {
          return name.slice(0, maxLength - 3) + "...";
        }
        return name;
      }

    return (
        <div>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }} style={rowStyle}>
            {repositories.edges.map(({ node }) => (
                <Col xs={24} sm={12} md={11} lg={8} xl={7} key={node.id} style={colStyle}>
                    <Link style={linkStyle} href={node.url} target="_blank" >
                    {truncateName(node.name, 19)}
                    <div style={langStyle}>{node.primaryLanguage ? node.primaryLanguage.name : ''}</div>
                    <Date dateString={node.updatedAt}/>
                    </Link>
                </Col>
            ))}
        </Row>
        </div>
    );
}
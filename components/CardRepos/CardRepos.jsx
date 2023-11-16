import Link from "next/link";
import Date from "../Date/date";
import { Col,  Row } from "antd";
import { colStyle, langStyle, linkStyle, rowStyle } from "./CardRepos.style";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Loader } from '../Loader/Loader';

export default function CardRepos({ data }) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
  
    const handleRepoClick = (name) => {
      setIsLoading(true);
      router.push(`/repositories/${name}`);
    };
  
    useEffect(() => {
      setIsLoading(false);
      return () => setIsLoading(false);
    }, []);
  
    return (
      <div>
        {isLoading && <Loader />}
        <Row gutter={{ xs: 8, sm: 16, md: 24 }} style={rowStyle}>
          {data.user.repositories.edges.map(({ node }) => (
            <Col xs={24} sm={12} md={11} lg={8} xl={7} key={node.id} style={colStyle}>
              <Link href={`/repositories/${node.name}`}>
              <div onClick={() => handleRepoClick(node.name)} style={linkStyle}>
                {node.name}
                <div style={langStyle}>{node.primaryLanguage ? node.primaryLanguage.name : ''}</div>
                <Date dateString={node.updatedAt} />
              </div>
            </Link>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
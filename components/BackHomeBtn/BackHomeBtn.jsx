import Link from "next/link";
import { Button } from "antd";
import { LeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { useState } from "react";

export default function BackHomeBtn() {
    const [isLoading, setIsLoading] = useState(false);

    const handleButtonClick = () => {
        setIsLoading(true); 
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    };

    return (
        <div>
            <Link href="/">
                <Button type="default" size="large" shape="round" onClick={handleButtonClick} icon={isLoading ? <LoadingOutlined /> : <LeftOutlined />} loading={isLoading}>
                    Back to Home
                </Button>
            </Link>
        </div>
    );
}
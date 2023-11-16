
import { loaderStyle, textStyle } from "./Loader.style";
import { LoadingOutlined } from '@ant-design/icons';

export const Loader = () => {
    return (
        <div style={loaderStyle}>
            <div style={textStyle}><LoadingOutlined />  Loading ... </div>
        </div>
    );
};
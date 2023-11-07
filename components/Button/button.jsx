import { Button} from 'antd';
import { buttonStyle } from './button.style';
import { LoadingOutlined } from '@ant-design/icons';

import React from 'react';

function ButtonLoadMore({ loadMore, hasNextPage, loading }) {
  return (
    <>
      {hasNextPage && (<Button style={buttonStyle} type="default" size="large"  onClick={loadMore} loading={loading}>
      {loading ? (
          <span>
            <LoadingOutlined /> Loading...
          </span>
        ) : (
          'LOAD MORE'
        )}
      </Button>)}
      </>
  );
}

export default ButtonLoadMore;
import { Button} from 'antd';
import { buttonStyle } from './button.style';

import React from 'react';

function ButtonLoadMore({ loadMore,  loading }) {
  return (
    <>
      <Button style={buttonStyle} type="default" size="large"  onClick={loadMore} loading={loading}>
      {loading ? (
          <span>
            Loading...
          </span>
        ) : (
          'LOAD MORE'
        )}
      </Button>
      </>
  );
}

export default ButtonLoadMore;
import React from "react";
import { Button } from 'antd';

const NewsItem = ({ title, onButtonClick }) => {
  return (
    <div>
      <Button type="text" onClick={onButtonClick}>
        {title}
      </Button>
    </div>
  );
};

export default NewsItem;
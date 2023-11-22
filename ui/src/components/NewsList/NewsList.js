import React from "react";
import { List } from 'antd';
import './NewsList.css';
import NewsItem from "../NewsItem/NewsItem";

const NewsList = ({ news, openUrl }) => {
  return (
    <div className="newsList">
      <List
        header={<div>Notícias</div>}
        bordered
        dataSource={news}
        renderItem={({ title, url }) => (
          <List.Item>
            <NewsItem key={url} title={title} onButtonClick={() => openUrl(url)} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default NewsList;
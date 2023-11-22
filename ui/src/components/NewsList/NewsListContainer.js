import React, {useContext} from "react";
import newsContext from "../../context/NewsContext";
import modalContext from "../../context/ModalContext";
import NewsList from "./NewsList";

const NewsListContainer = () => {
  const news = useContext(newsContext);
  const { setIsModalOpened, setModalUrl } = useContext(modalContext);

  const openUrl = (url) => {
    setIsModalOpened(true);
    setModalUrl(url);
  }

  return <NewsList news={news} openUrl={openUrl} />;
};

export default NewsListContainer;
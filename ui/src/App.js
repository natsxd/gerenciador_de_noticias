import {useEffect, useState} from 'react';
import './App.css';
import Spinner from './components/Spinner/Spinner';
import newsContext from './context/NewsContext';
import modalContext from './context/ModalContext';
import NewsListContainer from "./components/NewsList/NewsListContainer";
import IFrameModal from "./components/IFrameModal/IFrameModal";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState(null);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [modalUrl, setModalUrl] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/news/`)
      .then((res) => res.json())
      .then((news) => {
        setNews(news);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (<Spinner />);
  }
  return (
    <div className="App">
      <newsContext.Provider value={news}>
        <modalContext.Provider value={{isModalOpened, setIsModalOpened, modalUrl, setModalUrl}}>
          <NewsListContainer />
          <IFrameModal
            isModalOpened={isModalOpened}
            setIsModalOpened={setIsModalOpened}
            iFrameUrl={modalUrl}
          />
        </modalContext.Provider>
      </newsContext.Provider>
    </div>
  );
}

export default App;

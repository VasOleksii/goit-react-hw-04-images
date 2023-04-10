// для повторного деплоя
import React, { useEffect, useState } from 'react';
import Searchbar from 'components/Searchbar/SearchBar';
import Button from 'components/Button';
import Modal from 'components/Modal';
import ImageGallery from 'components/ImageGallery';
import MagnifyingGlass from 'components/Loader/Loader';
import axios from 'axios';
import css from './App.module.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState('1');
  const [totalPages, setTotalPages] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState('');

  useEffect(() => {
    const completeRequest = () => {
      if (page > totalPages && page !== 1) {
        return;
      }
      const PER_PAGE = 12;
      const API_KEY = '33797356-50ef8f6f691cb32ae634945b3';
      const searchUrl = `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`;

      setIsLoading(true);
      axios.get(searchUrl).then(response => {
        const totalPages = Math.round(response.data.totalHits / PER_PAGE);
        updateState(response.data.hits, totalPages, true);
        setIsLoading(false);
      });
    };
    completeRequest();
  }, [query, page]);

  const handleSearch = searchValue => {
    if (searchValue !== '') {
      if (searchValue !== query) {
        setQuery(searchValue);
        setPage(1);
        setImages([]);
      } else {
        setQuery(searchValue);
      }
    }
  };

  const updateState = (images, totalPages, add = false) => {
    if (add) {
      setTotalPages(totalPages);
      setImages(prevImages => [...prevImages, ...images]);
    } else {
      setTotalPages(totalPages);
      setImages(images);
    }
  };

  const handleImageClick = largeImageUrl => {
    setLargeImageUrl(largeImageUrl);
    setIsModalOpen(true);
  };

  const handleModalClickClose = e => {
    if (e.target.id === 'modal' && isModalOpen) {
      setIsModalOpen(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const fetchMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSearch} />
      <ImageGallery images={images} onModalOpen={handleImageClick} />
      {isModalOpen && (
        <Modal
          largeImageUrl={largeImageUrl}
          onClose={handleModalClose}
          onClickClose={handleModalClickClose}
          id={images.id}
        />
      )}
      <div className={css.Loader}>{isLoading && <MagnifyingGlass />}</div>
      {totalPages > 1 && page < totalPages && (
        <>
          <Button getMoreImage={fetchMoreImages} />

          <div className={css.Info}>
            page {page} of {totalPages}
          </div>
        </>
      )}
    </div>
  );
};

export default App;

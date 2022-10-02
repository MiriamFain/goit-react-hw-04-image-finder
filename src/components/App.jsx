import React, { useState, useEffect } from 'react';

import { api } from '../services/API';

import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Button from './Button/Button';

import s from './App.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Status = Object.freeze({
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
});

export function App() {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);

  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(null);

  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  const handleFormSubmit = search => {
    setSearch(search);
    setImages([]);
    setPage(1);
  };

  useEffect(() => {
    if (!search) {
      return;
    }

    setStatus(Status.PENDING);

    api
      .fetchImages(search, page)
      .then(({ data }) => {
        if (data.hits <= 0) {
          toast.info(`Wtf, Idn what "${search}" is`);
          setError('not found');
          setStatus(Status.REJECTED);
          return;
        } else if (page === 1) {
          toast.info(`Im search "${data.total}" images`);
        }

        setImages(state => (page > 1 ? [...state, ...data.hits] : data.hits));
        setTotalImages(data.total);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error.message);
        setStatus(Status.REJECTED);
      });
  }, [page, search]);

  const handleLoadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  return (
    <div className={s.App}>
      <Searchbar onSubmit={handleFormSubmit} />
      {images.length > 0 && <ImageGallery images={images} />}

      {status === 'pending' && <Loader />}

      {status === 'resolved' && (page * 12 < totalImages ? true : false) && (
        <Button onClick={handleLoadMoreClick} />
      )}

      {status === 'rejected' && (
        <>
          <img src="https://ibb.co/V2q4xsY" alt="not found images" />
          <p className={s.error}>
            Error message: <span className={s.errorMessage}>{error}</span>
          </p>
        </>
      )}
      <ToastContainer autoClose={3000} theme="colored" />
    </div>
  );
}

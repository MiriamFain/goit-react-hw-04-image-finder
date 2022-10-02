import React, { useState } from 'react';
import PropTypes from 'prop-types';

import s from './ImageGalleryItem.module.css';
import Modal from 'components/Modal/Modal';

export function ImageGalleryItem({ webformatURL, largeImageURL, tags }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  return (
    <li className={s.ImageGalleryItem}>
      <img
        onClick={handleToggleModal}
        className={s.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
      />

      {isModalOpen && (
        <Modal onCloseModal={handleToggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

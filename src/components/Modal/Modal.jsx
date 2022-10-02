import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modalRoot');

export default function Modal({ onCloseModal, children }) {
  useEffect(() => {
    const handleKeydownModal = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeydownModal);

    return () => window.removeEventListener('keydown', handleKeydownModal);
  }, [onCloseModal]);

  const handleCloseModal = e => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={handleCloseModal}>
      <div className={s.Modal}>{children}</div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

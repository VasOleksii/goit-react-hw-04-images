import { Component } from 'react';
import { PropTypes } from 'prop-types';
import css from './Modal.module.css';
import { useEffect } from 'react';

const Modal = props => {
  const handleKeyPress = event => {
    if (event.code === 'Escape') {
      props.onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {};
  }, []);

  return (
    <div id="modal" onClick={props.onClickClose} className={css.Overlay}>
      <div className={css.Modal}>
        <img
          className={css.LargeImg}
          src={props.largeImageUrl}
          alt={props.id}
        />
      </div>
    </div>
  );
};
Modal.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  largeImageUrl: PropTypes.string.isRequired,
};

export default Modal;

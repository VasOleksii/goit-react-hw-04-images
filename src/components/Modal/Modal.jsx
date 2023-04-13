import { PropTypes } from 'prop-types';
import css from './Modal.module.css';
import { useEffect } from 'react';

const Modal = ({ onClose, onClickClose, largeImageUrl, id }) => {
  useEffect(() => {
    const handleKeyPress = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClickClose, onClose]);

  return (
    <div id="modal" onClick={onClickClose} className={css.Overlay}>
      <div className={css.Modal}>
        <img className={css.LargeImg} src={largeImageUrl} alt={id} />
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

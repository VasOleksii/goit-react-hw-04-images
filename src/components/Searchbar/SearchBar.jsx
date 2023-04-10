import { useState } from 'react';
import { PropTypes } from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css';
import { ImSearch } from 'react-icons/im';

const Searchbar = props => {
  const [searchValue, setSearchValue] = useState('');
  const [searchedValue, setSearchedValue] = useState('');

  const handleChange = event => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (event.target.elements[1].value === '') {
      toast.info('Please enter your request!');
    } else if (searchValue === searchedValue) {
      toast.info('You entered the same query!');
    } else {
      props.onSubmit(searchValue);
      setSearchedValue(searchValue);
    }
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <ImSearch style={{ width: 24, height: 24, color: 'blue' }} />
          <span className={css.SearchFormButtonLabel}></span>
        </button>
        <input
          name="search"
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchValue}
          onChange={handleChange}
        />
      </form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;

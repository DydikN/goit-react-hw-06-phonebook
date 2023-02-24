import PropTypes from 'prop-types';

const Filter = ({ changeFilter, value }) => {
  return (
    <>
      <p>Find contacts by name</p>
      <input
        type="text"
        name="filter"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        onChange={changeFilter}
        value={value}
      />
    </>
  );
};

export default Filter;
Filter.prototype = {
  changeFilter: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

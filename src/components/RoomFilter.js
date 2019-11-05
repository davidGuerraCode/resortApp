import React, { useContext } from 'react';
import { RoomContext } from '../context';
import Title from '../components/Title';

const getUniqueValues = (items, value) => {
  return [...new Set(items.map(item => item[value]))];
};

const RoomsFilter = props => {
  const { rooms } = props;
  const context = useContext(RoomContext);
  const {
    handleChange,
    type,
    capacity,
    price,
    maxPrice,
    minPrice,
    minSize,
    maxSize,
    breakfast,
    pets
  } = context;

  let types = getUniqueValues(rooms, 'type');
  types = ['all', ...types];
  const selectOptions = types.map((option, index) => (
    <option key={index} value={option}>
      {option}
    </option>
  ));

  return (
    <section className="filter-container">
      <Title title="Search rooms"></Title>
      <form className="filter-form">
        {/* Select type */}
        <div className="form-group">
          <label htmlFor="type">room type</label>
          <select
            name="type"
            id="type"
            value={type}
            className="form-control"
            onChange={handleChange}
          >
            {selectOptions}
          </select>
        </div>
        {/* End select type */}
      </form>
    </section>
  );
};

export default RoomsFilter;

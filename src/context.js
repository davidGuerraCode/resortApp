import React, { useState, useEffect } from 'react';
import items from './data';

const RoomContext = React.createContext();

const formatData = data => {
  const tempItems = data.map(item => {
    const id = item.sys.id;
    const images = item.fields.images.map(image => image.fields.file.url);
    const room = { ...item.fields, images, id };

    return room;
  });

  return tempItems;
};

const RoomProvider = props => {
  const { children } = props;
  const [roomsData, setRoomsData] = useState({
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: 'all',
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPice: 0,
    minSize: 0,
    maxSize: 0,
    breakFast: false,
    pets: false
  });

  const getRoom = slug => {
    const tempRooms = [...roomsData.rooms];
    const room = tempRooms.find(room => room.slug === slug);

    return room;
  };

  const handleChange = event => {
    const target = event.target;
    const value = event.type === 'checkbox' ? target.checked : target.value;
    const name = event.target.name;

    // setRoomsData(prevState => ({ ...prevState, [name]: value }));
    filterRooms(name, value);
  };

  const filterRooms = (name, value) => {
    const {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakFast,
      pets
    } = roomsData;

    let tempRooms = [...rooms];

    if (value !== 'all') {
      tempRooms = tempRooms.filter(room => room.type === value);
    }

    setRoomsData(prevState => ({ ...prevState, [name]: value }));
    setRoomsData(prevState => ({ ...prevState, sortedRooms: tempRooms }));
  };

  useEffect(() => {
    const rooms = formatData(items);
    const featuredRooms = rooms.filter(room => room.featured === true);
    const maxPrice = Math.max(...rooms.map(item => item.price));
    const maxSize = Math.max(...rooms.map(item => item.size));
    setRoomsData(prevState => ({
      ...prevState,
      rooms,
      featuredRooms,
      sortedRooms: rooms,
      loading: false,
      price: maxPrice,
      maxPrice,
      maxSize
    }));
  }, []);

  return (
    <RoomContext.Provider value={{ ...roomsData, getRoom, handleChange }}>
      {children}
    </RoomContext.Provider>
  );
};

export { RoomProvider, RoomContext };

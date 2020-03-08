import React, { useState, useEffect, useRef } from 'react';
// import items from './data';
import Client from './Contentful';

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
    breakfast: false,
    pets: false
  });

  const getData = async () => {
    try {
      let response = await Client.getEntries({
        content_type: 'beachResortRoom',
        order: 'fields.price'
      });

      const rooms = formatData(response.items);
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
    } catch (error) {
      console.log(error);
    }
  };

  const prevState = usePrevious(roomsData);
  const getRoom = slug => {
    const tempRooms = [...roomsData.rooms];
    const room = tempRooms.find(room => room.slug === slug);

    return room;
  };

  const handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = event.target.name;
    setRoomsData(prevState => ({ ...prevState, [name]: value }));
  };

  const filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets
    } = roomsData;

    let tempRooms = [...rooms];

    capacity = parseInt(capacity);
    price = parseInt(price);

    if (type !== 'all') {
      tempRooms = tempRooms.filter(room => room.type === type);
    }

    if (capacity !== 1) {
      tempRooms = tempRooms.filter(room => room.capacity >= capacity);
    }

    tempRooms = tempRooms.filter(room => room.price <= price);

    tempRooms = tempRooms.filter(
      room => room.size >= minSize && room.size <= maxSize
    );

    if (breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast === true);
    }

    if (pets) {
      tempRooms = tempRooms.filter(room => room.pets === true);
    }

    return tempRooms;
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (roomsData !== prevState) {
      const roomsFiltered = filterRooms();
      setRoomsData(prevState => ({ ...prevState, sortedRooms: roomsFiltered }));
    }
  }, [
    roomsData.type,
    roomsData.capacity,
    roomsData.price,
    roomsData.breakfast,
    roomsData.pets
  ]);

  return (
    <RoomContext.Provider value={{ ...roomsData, getRoom, handleChange }}>
      {children}
    </RoomContext.Provider>
  );
};

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

export { RoomProvider, RoomContext };

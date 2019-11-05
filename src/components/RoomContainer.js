import React, { useContext } from 'react';
import RoomsFilter from './RoomFilter';
import RoomsList from './RoomList';
import { RoomContext } from '../context';
import Loading from '../components/Loading';

const RoomsContainer = () => {
  const context = useContext(RoomContext);
  const { loading, sortedRooms, rooms } = context;

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <>
      <RoomsFilter rooms={rooms}></RoomsFilter>
      <RoomsList rooms={sortedRooms}></RoomsList>
    </>
  );
};

export default RoomsContainer;

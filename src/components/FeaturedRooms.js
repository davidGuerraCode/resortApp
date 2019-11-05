import React, { useContext } from 'react';
import { RoomContext } from '../context';
import Title from './Title';
import Loading from './Loading';
import Room from './Room';

const FeaturedRooms = () => {
  const { loading, featuredRooms } = useContext(RoomContext);
  const rooms = featuredRooms.map(room => (
    <Room key={room.id} currentRoom={room}></Room>
  ));

  return (
    <section className="featured-rooms">
      <Title title="Featured Rooms"></Title>
      <div className="featured-rooms-center">
        {loading ? <Loading /> : rooms}
      </div>
    </section>
  );
};

export default FeaturedRooms;

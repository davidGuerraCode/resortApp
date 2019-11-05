import React from 'react';
import Room from './Room';

const RoomsList = props => {
  const { rooms } = props;

  if (rooms.length === 0) {
    return (
      <div className="empty-search">
        <h3>Unfortunately no rooms marched your search parameters</h3>
      </div>
    );
  }

  return (
    <section className="roomslist">
      <div className="roomslist-center">
        {rooms.map(item => (
          <Room key={item.id} currentRoom={item}></Room>
        ))}
      </div>
    </section>
  );
};

export default RoomsList;

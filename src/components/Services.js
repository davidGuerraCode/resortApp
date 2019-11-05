import React, { useState } from 'react';
import Title from './Title';
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from 'react-icons/fa';

const Services = () => {
  const initialValue = () => [
    {
      icon: <FaCocktail />,
      title: 'Free cocktails',
      info: 'lorem  ipsum dolor amet consectetur adiposincing elit'
    },
    {
      icon: <FaHiking />,
      title: 'Free Hiking',
      info: 'lorem  ipsum dolor amet consectetur adiposincing elit'
    },
    {
      icon: <FaShuttleVan />,
      title: 'Free Shuttle',
      info: 'lorem  ipsum dolor amet consectetur adiposincing elit'
    },
    {
      icon: <FaBeer />,
      title: 'Strongest Beer',
      info: 'lorem  ipsum dolor amet consectetur adiposincing elit'
    }
  ];
  const [services, setServices] = useState(initialValue());

  return (
    <section className="services">
      <Title title="services"></Title>
      <div className="services-center">
        {services.map((item, index) => {
          return (
            <article key={index} className="service">
              <span>{item.icon}</span>
              <h6>{item.title}</h6>
              <p>{item.info}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Services;

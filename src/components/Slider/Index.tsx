import React from "react"
import type { RootState } from '../../store/store'
import { useSelector } from 'react-redux'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import './Style.scss'

export default function Slider() {
  const id = useSelector((state: RootState) => state.counter.value)

  // No API to get data from, so just define it in this array
  const eventsArray: { date: number, events: string }[][] = [
      [
        { date: 2013, events: 'OutRun by Kavinsky' },
        { date: 2015, events: 'Trilogy by Carpenter Brut' },
        { date: 2017, events: 'EP II by Turboslash' },
        { date: 2020, events: '\'Shorten the Longing\',  by \'Biting Elbows\', was released' },
        { date: 2022, events: 'Dawn FM by the Weeknd' },
      ],
      [
        { date: 2000, events: 'The C# programming language was designed' },
        { date: 2002, events: 'The Tor Project' },
        { date: 2003, events: 'Android founded' },
        { date: 2005, events: 'YouTube Created' },
        { date: 2008, events: 'Universal Serial Bus 3.0 (USB 3.0) Released' },
      ],
      [
        { date: 1987, events: 'Predator' },
        { date: 1989, events: 'Back to the future 2' },
        { date: 1990, events: 'Goodfellas' },
        { date: 1994, events: 'The Shawshank Redemption ' },
        { date: 1999, events: 'Fight Club ' },
      ]
  ];
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={4}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {eventsArray[id].map((event, index) => (
        <SwiperSlide key={index}>
          <div className="event">
            <h3>{event.date}</h3>
            <p>{event.events}</p>
          </div>
        </SwiperSlide>
      ))}
  </Swiper>
  );
};

import React from "react"
import type { RootState } from '../../store/store'
import { useSelector } from 'react-redux'

import './Style.scss'


export default function DateSpan() {
  const id = useSelector((state: RootState) => state.counter.value)

  const dateSpan: { dateStart: number, dateEnd: number}[] = [
    {dateStart: 2013, dateEnd: 2022},
    {dateStart: 2000, dateEnd: 2008},
    {dateStart: 1987, dateEnd: 1999},
  ];

  return (
    <div className="date_span">
      <span className="date_start">
        {dateSpan[id].dateStart}
      </span>
      <span className="date_end">
        {dateSpan[id].dateEnd}
      </span>
    </div>
  )
}

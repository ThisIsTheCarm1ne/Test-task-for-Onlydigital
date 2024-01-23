import React from "react"
import "./Style.scss"

import type { RootState } from '../../store/store'
import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux';
import { set } from '../../store/idSlice';

export default function ChangeTimeFrameBtns(){
  const dispatch = useDispatch();
  const id = useSelector((state: RootState) => state.counter.value)

  return (
    <>
      <p>0{id+1}/03</p>
      <div className="buttons">
        <button
          disabled={id <= 0 ? true : false }
          onClick={() => {dispatch(set(id-1));}}
        >
          &lt;
        </button>
        <button
          disabled={id >= 2 ? true : false }
          onClick={() => {dispatch(set(id+1));}}
        >
          &gt;
        </button>
      </div>
    </>
  )
}

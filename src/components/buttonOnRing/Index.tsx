import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';

import { useDispatch } from 'react-redux';
import { set } from '../../store/idSlice';
import type { RootState } from '../../store/store'
import { useSelector } from 'react-redux'

gsap.registerPlugin(CSSPlugin);

//When hovering turn the 0 id button to these - 130px, -150px from (199px, -1px)
export default function buttonOnRing({index}) {
  const dispatch = useDispatch();
  const id = useSelector((state: RootState) => state.counter.value)

  const numButtons = 3; // Adjust the number of buttons
  const radius = 200; // Adjust the radius of the ring

  const animationDuration = 0.2;

  const buttonTexts = ['Music', 'TV Series', 'Movies'];

  useEffect(() => {
    // Update selected button when id changes
    if (id !== null) {
      // Deselect the previously selected button
      gsap.to(`#button-${id}`, {
        scale: 1,
        backgroundColor: '#808080',
        borderColor: 'transparent',
        duration: animationDuration,
      });

      // Select the new button
      gsap.to(`#button-${id}`, {
        scale: 2,
        backgroundColor: '#FFFFFF',
        borderColor: '#808080',
        duration: animationDuration,
      });
    }
  }, [id]);

  const handleHover = (index: number) => {
    gsap.to(`#button-${index}`, { scale: 2, backgroundColor: '#FFFFFF', borderColor: '#808080', duration: animationDuration });
  };


  const handleLeave = (index: number) => {
    if (id !== index) {
      gsap.to(`#button-${index}`, { scale: 1, backgroundColor: '#808080', borderColor: 'transparent', duration: animationDuration });
    }
  };

  const handleClick = (index: number) => {
    if (id !== null) {
      // Deselect the previously selected button
      gsap.to(`#button-${id}`, { scale: 1, backgroundColor: '#808080', borderColor: 'transparent', duration: animationDuration });
    }

    if (id !== index) {
      // Select the new button
      dispatch(set(index));
      gsap.to(`#button-${index}`, { scale: 2, backgroundColor: '#FFFFFF', borderColor: '#808080', duration: animationDuration });
    } else {
      // Deselect the current button if it's clicked again
      dispatch(set(-1));
    }

    dispatch(set(index));
  };

  const angle = (360 / numButtons) * index;
  const radians = (angle * Math.PI) / 180;
  const diameterOfButtons = 20;

  const buttonStyle: React.CSSProperties = {
    position: 'absolute',
    width: `${diameterOfButtons}px`,
    height: `${diameterOfButtons}px`,
    backgroundColor: '#808080',
    border: '1px solid transparent',
    borderRadius: '50%',
    cursor: 'pointer',
    margin: 'auto',
    transform: `translate(-50%, -50%) translate(${Math.cos(radians) * radius + (diameterOfButtons / 2)}px, ${Math.sin(radians) * radius + (diameterOfButtons / 2)}px)`,
  };

  return (
    <div
      key={index}
      id={`button-${index}`}
      style={buttonStyle}
      className="button-number"
      onMouseEnter={() => handleHover(index)}
      onMouseLeave={() => handleLeave(index)}
      onClick={() => handleClick(index)}
    >
      {id === index && (
        <div id="button-number" className="button_number">
          {index + 1}
        </div>
      )}
      {id === index && (
        <div>
          {buttonTexts[index]}
        </div>
      )}
    </div>
  );
};

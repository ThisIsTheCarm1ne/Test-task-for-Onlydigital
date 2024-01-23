import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';

import { useDispatch } from 'react-redux';
import { set } from '../store/idSlice';
import type { RootState } from '../store/store'
import { useSelector } from 'react-redux'

import './Ring.scss';

gsap.registerPlugin(CSSPlugin);

//When hovering turn the 0 id button to these - 130px, -150px from (199px, -1px)
export default function Ring() {
  const dispatch = useDispatch();
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const id = useSelector((state: RootState) => state.counter.value)
  const ringRef = useRef<HTMLDivElement>(null);

  let radius = 250;
  useEffect(() => {
    if (ringRef.current) {
      radius = ringRef.current.getBoundingClientRect().width / 2;
    }
    console.log(radius);
  }, []);

  const numButtons = 3; // Adjust the number of buttons

  const animationDuration = 0.2;

  const buttonTexts = ['Music', 'Tech', 'Movies'];

  useEffect(() => {
    // Update selected button when id changes
    if (id !== null) {
      // Deselect the previously selected button
      if (selectedButton !== null) {
        gsap.to(`#button-${selectedButton}`, {
          scale: 1,
          backgroundColor: 'var(--borderColor)',
          borderColor: 'transparent',
          duration: animationDuration,
        });
      }

      // Select the new button
      setSelectedButton(id);
      gsap.to(`#button-${id}`, {
        scale: 2,
        backgroundColor: '#FFFFFF',
        borderColor: 'var(--borderColor)',
        duration: animationDuration,
      });
    }
  }, [id, selectedButton]);

  const handleHover = (index: number) => {
    gsap.to(`#button-${index}`, { scale: 2, backgroundColor: '#FFFFFF', borderColor: 'var(--borderColor)', duration: animationDuration });
  };


  const handleLeave = (index: number) => {
    if (selectedButton !== index) {
      gsap.to(`#button-${index}`, { scale: 1, backgroundColor: 'var(--borderColor)', borderColor: 'transparent', duration: animationDuration });
    }
  };

  const handleClick = (index: number) => {
    if (selectedButton !== null) {
      // Deselect the previously selected button
      gsap.to(`#button-${selectedButton}`, { scale: 1, backgroundColor: 'var(--borderColor)', borderColor: 'transparent', duration: animationDuration });
    }

    if (selectedButton !== index) {
      // Select the new button
      setSelectedButton(index);
      gsap.to(`#button-${index}`, { scale: 2, backgroundColor: '#FFFFFF', borderColor: 'var(--borderColor)', duration: animationDuration });
    } else {
      // Deselect the current button if it's clicked again
      setSelectedButton(null);
    }

    dispatch(set(index));
  };

  const buttonElements = Array.from({ length: numButtons }, (_, index) => {
    const angle = (360 / numButtons) * index;
    const radians = (angle * Math.PI) / 180;
    const diameterOfButtons = 20;

    const buttonStyle: React.CSSProperties = {
      position: 'absolute',
      width: `${diameterOfButtons}px`,
      height: `${diameterOfButtons}px`,
      backgroundColor: 'var(--borderColor)',
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
        {selectedButton === index && (
          <div id="button-number" className="button_number">
            {index + 1}
          </div>
        )}
        {selectedButton === index && (
          <div>
            {buttonTexts[index]}
          </div>
        )}
      </div>
    );
  });
  return (
    <div className="ring" ref={ringRef}>
      {buttonElements}
    </div>
  );
};

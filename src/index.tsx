import React from "react";
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container!);

import { store } from './store/store'
import { Provider } from 'react-redux'

import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import './style.scss';

let persistor = persistStore(store);

import Ring from './components/Ring'
import DateSpan from './components/DateSpan/Index'
import Slider from './components/Slider/Index'
import ChangeTimeFrameBtns from './components/changeTimeFrameBtns/Index'
import Background from './components/Background/Index'

const App = () => (
  <>
    <div className="background">
      <div className="box"></div>
      <div className="box"></div>
      <div className="box"></div>
      <div className="box"></div>
      <div className="ring_container">
        <Ring />
      </div>
      <div className="datespan_container">
        <DateSpan />
      </div>
      <div className="timeframe_btns_container">
        <ChangeTimeFrameBtns />
      </div>
      <div className="slider_container">
        <Slider />
      </div>
    </div>
  </>
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);

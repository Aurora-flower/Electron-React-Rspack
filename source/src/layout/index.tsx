import { Outlet } from 'react-router-dom';
import reactLogo from '@/src/static/assets/svgs/react.svg';
// import React, { useEffect, useRef, useState } from 'react';

import '@/src/layout/style';

function Layout(prop: { date: Date }) {
  return (
    <>
      <div className='layout'>
        <div
          data-date={new Date()}
          className='date text-red-500'>
          {prop.date.toLocaleString()}
        </div>
        <div className='trapezoid size-20'>
          <a
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'>
            <img
              src={reactLogo}
              className='logo react'
              alt='React logo'
            />
          </a>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;

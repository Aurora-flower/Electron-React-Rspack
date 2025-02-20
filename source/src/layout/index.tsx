import { Outlet } from 'react-router-dom';
import reactLogo from '@/src/static/assets/svgs/react.svg';
// import React, { useEffect, useRef, useState } from 'react';

function Layout(prop: { date: Date }) {
  return (
    <>
      <div data-date={new Date()}>
        {prop.date.toLocaleString()}
      </div>
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
      <Outlet />
    </>
  );
}

export default Layout;

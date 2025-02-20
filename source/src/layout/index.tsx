import { Outlet } from 'react-router-dom';
// import React, { useEffect, useRef, useState } from 'react';

function Layout(prop: { date: Date }) {
  return (
    <>
      <div data-date={new Date()}>
        {prop.date.toLocaleString()}
      </div>
      <Outlet />
    </>
  );
}

export default Layout;

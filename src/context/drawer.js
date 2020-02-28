import React, { useState } from 'react';

export const DrawerContext = React.createContext();

export function DrawerProvider(props){
  const [isDrawer, setDrawer] = useState(false);
  const openDrawer = () => {
    setDrawer(true)
  }
  const closeDrawer = () => {
    setDrawer(false)
  }
  return(
    <DrawerContext.Provider
      value={{
        isDrawer: isDrawer,
        openDrawer: openDrawer,
        closeDrawer:closeDrawer
      }}>
        {props.children}
    </DrawerContext.Provider>
  )
}
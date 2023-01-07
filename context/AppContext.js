import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const AppContext = React.createContext();

function AppContextProvider({ children }) {
  const [bottomPanelSelectedItem, setBottomPanelSelectedItem] = useState(0);
  const [addPhotoURI, setAddPhotoURI] = useState(null);
  const [addPhotoModalVisible, setAddPhotoModalVisible] = useState(false);

  const value = useMemo(
    () => ({
      bottomPanelSelectedItem,
      setBottomPanelSelectedItem,
      addPhotoURI,
      setAddPhotoURI,
      addPhotoModalVisible,
      setAddPhotoModalVisible,
    }),
    [
      bottomPanelSelectedItem,
      setBottomPanelSelectedItem,
      addPhotoURI,
      setAddPhotoURI,
      addPhotoModalVisible,
      setAddPhotoModalVisible,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContextProvider;

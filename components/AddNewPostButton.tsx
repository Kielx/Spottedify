import { Fab, AddIcon } from 'native-base';
import React from 'react';

type Props = {};

const AddNewPostButton = (props: Props) => {
  return <Fab shadow={2} size="sm" label="Dodaj ogłoszenie" />;
};

export default AddNewPostButton;

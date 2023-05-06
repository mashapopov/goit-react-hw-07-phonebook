import React from 'react';
import { Label, Input } from './Filter.styled';
import { changeFilter } from '../../redux/filterSlice';
import { useDispatch } from 'react-redux';

export const Filter = () => {
  const dispatch = useDispatch();
  return (
    <Label>
      Фильтр по имени
      <Input
        type="text"
        onChange={e => dispatch(changeFilter(e.target.value))}
      />
    </Label>
  );
};

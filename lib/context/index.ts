import React from 'react';
import { IAction, IState } from '../types';

export interface ContextProps {
  state?: IState;
  dispatch?: React.Dispatch<IAction>;
  maxPrice?: number;
  minPrice?: number;
}

export const Context = React.createContext<ContextProps>({});

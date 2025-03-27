import React, {FC} from 'react';
import Svg, {Path} from 'react-native-svg';
import {IconProps} from './types';

const IconProducts: FC<IconProps> = ({color = 'black'}) => {
  return (
    <Svg viewBox="0 0 24 24" width={24} height={24} fill={color}>
      <Path d="M21 6h-3A6 6 0 006 6H3a3 3 0 00-3 3v10a5.006 5.006 0 005 5h14a5.006 5.006 0 005-5V9a3 3 0 00-3-3zm-9-4a4 4 0 014 4H8a4 4 0 014-4zm10 17a3 3 0 01-3 3H5a3 3 0 01-3-3V9a1 1 0 011-1h3v2a1 1 0 002 0V8h8v2a1 1 0 002 0V8h3a1 1 0 011 1z" />
    </Svg>
  );
};

export default IconProducts;

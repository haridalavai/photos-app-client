import React from 'react';
import { IconButton, Tooltip, useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const ThemeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Tooltip label='Switch theme' placement='left' colorScheme='blue'>
      <IconButton
        colorScheme='teal'
        aria-label='Call Segun'
        size='lg'
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        bottom='5'
        right='5'
        position='fixed'
        onClick={toggleColorMode}
        borderRadius='100'
      />
    </Tooltip>
  );
};

export default ThemeSwitch;

import { HStack, useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import MobileNav from './MobileNav';
import SidebarWithHeader from './navbar';

const DashboardLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* <MobileNav onOpen={onOpen} /> */}
      <SidebarWithHeader>
        <Outlet />
      </SidebarWithHeader>
    </>
  );
};

export default DashboardLayout;

import React, { useState } from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'

export default function UserSideSnippet() {
    const { isOpen:isUserDrawerOpen, onOpen:onUserDrawerOpen, onClose:onUserDrawerClose } = useDisclosure()
    const btnRef = React.useRef()
  
    return (
      <>
        <Button ref={btnRef} colorScheme='purple' onClick={onUserDrawerOpen}>
          Open
        </Button>
        <Drawer
          isOpen={isUserDrawerOpen}
          placement='right'
          onClose={onUserDrawerClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Your Account Details</DrawerHeader>
  
            <DrawerBody>
              <Box>
                  <Text>
                      Wallet Number : terra0209asdxxxpas2
                  </Text>
                  <Text>
                      Project Backed : 9
                  </Text>
                  <Text>
                      Amount Contributed : 20000
                  </Text>
              </Box>
              <Box>
                <Text>Earn WFD and other Bonuses for Referring a Backer. Your Link is</Text>
                <Text color={'blue.400'}>Link</Text>
              </Box>
            </DrawerBody>
  
            <DrawerFooter>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='blue'>Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }
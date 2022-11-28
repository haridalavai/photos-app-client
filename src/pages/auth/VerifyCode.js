import {
  Center,
  FormErrorMessage,
  Heading,
  useToast,
  VStack,
} from '@chakra-ui/react';
import {
  Button,
  FormControl,
  Flex,
  Input,
  Stack,
  useColorModeValue,
  Text,
  HStack,
} from '@chakra-ui/react';
import { PinInput, PinInputField } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { confirmSignUp } from '../../api/cognito';
import { validateEmail, validatePin } from '../../validation/validation';

export default function VerifyEmailForm() {
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const handleChange = (value) => {
    setPin(value);
  };

  let { email } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = async () => {
    setLoading(true);
    let e = validatePin(pin);
    if (e !== '') {
      console.log(e);
      setError(e);
      setLoading(false);
    } else {
      setError('');
      console.log(pin);
      try {
        const a = await confirmSignUp(email, pin);
        console.log(a);
        toast({
          title: 'Account verified',
          description: 'You have successfully verified your account',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate('/auth/login');
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
      }
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'sm'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={10}
      >
        <Center>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Verify your Email
          </Heading>
        </Center>
        <Center
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}
        >
          We have sent code to your email
        </Center>
        <Center
          fontSize={{ base: 'sm', sm: 'md' }}
          fontWeight='bold'
          color={useColorModeValue('gray.800', 'gray.400')}
        >
          {email}
        </Center>
        <FormControl>
          <VStack>
            <Center>
              <HStack>
                <PinInput onChange={handleChange}>
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
            </Center>
            <Text color='red.300'>{error}</Text>
          </VStack>
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
            onClick={onSubmit}
          >
            Verify
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}

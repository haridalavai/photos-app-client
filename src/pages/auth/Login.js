import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  useColorModeValue,
  Box,
  Text,
  FormErrorMessage,
  useToast,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { Formik, useFormik, Form, Field } from 'formik';
import { validateEmail, validatePassword } from '../../validation/validation';
import useAuth from '../../hooks/useAuth';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const a = await login(values.email, values.password);
      console.log(a);
      toast({
        title: 'Login Successful',
        description: 'You have successfully logged in',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      if (error.message === 'User is not confirmed.') {
        toast({
          title: 'User is not confirmed',
          description: 'Please verify your email',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });

        navigate(`/auth/verify/`);

        setLoading(false);
      } else {
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
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex flex={1}>
        <Image
          display={{ sm: 'none', md: 'block' }}
          alt={'Login Image'}
          objectFit={'cover'}
          src={'/composition-3.svg'}
        />
      </Flex>
      <Flex flex={0.5} minH={'100vh'} align={'center'} justify={'center'}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} fontWeight={'700'}>
              Sign in to your account
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              Don't have an account?
              <Link color={'blue.400'} href={'/auth/register'}>
                {' '}
                Sign up
              </Link>
              ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              <Form>
                <Stack spacing={4}>
                  <Field name='email' validate={validateEmail}>
                    {({ field, form }) => (
                      <FormControl
                        id='email'
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <FormLabel>Email address</FormLabel>
                        <Input {...field} type='email' />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name='password' validate={validatePassword}>
                    {({ field, form }) => (
                      <FormControl
                        id='password'
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                      >
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            {...field}
                          />
                          <InputRightElement h={'full'}>
                            <Button
                              variant={'ghost'}
                              onClick={() =>
                                setShowPassword((showPassword) => !showPassword)
                              }
                            >
                              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: 'column', sm: 'row' }}
                      align={'start'}
                      justify={'space-between'}
                    >
                      <Link color={'blue.400'}>Forgot password?</Link>
                    </Stack>
                    <Button
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}
                      type='submit'
                      isLoading={loading}
                    >
                      Sign in
                    </Button>
                  </Stack>
                </Stack>
              </Form>
            </Formik>
          </Box>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default Login;

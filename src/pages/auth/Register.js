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
  HStack,
  InputGroup,
  InputRightElement,
  useToast,
  FormErrorMessage,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import useAuth from '../../hooks/useAuth';
import { Field, Form, Formik } from 'formik';
import { validateEmail, validatePassword } from '../../validation/validation';
import { signUp } from '../../api/cognito';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      console.log(values);
      const a = await signUp(values.email, values.password);

      console.log(a);
      toast({
        title: 'Login Successful',
        description: 'You have successfully logged in',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate(`/auth/verify/${values.email}`);
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
  };

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          display={{ sm: 'none', md: 'block' }}
          objectFit={'cover'}
          src={'/composition-20.svg'}
        />
      </Flex>
      <Flex flex={0.5} minH={'100vh'} align={'center'} justify={'center'}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
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
                        isRequired
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
                  <Stack spacing={10} pt={2}>
                    <Button
                      loadingText='Submitting'
                      size='lg'
                      variant={'solid'}
                      colorScheme={'blue'}
                      isLoading={loading}
                      type='submit'
                    >
                      Sign up
                    </Button>
                  </Stack>
                  <Stack pt={6}>
                    <Text align={'center'}>
                      Already a user?{' '}
                      <Link color={'blue.400'} href={'/auth/login'}>
                        Login
                      </Link>
                    </Text>
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

export default Register;

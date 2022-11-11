import React, { useEffect } from 'react';
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
} from '@chakra-ui/react';
import { Formik, useFormik, Form, Field } from 'formik';
import { validateEmail, validatePassword } from '../../validation/validation';
import useAuth from '../../hooks/useAuth';

const Login = () => {
  const { login } = useAuth();

  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = async (values) => {
    try {
      await login(values.email, values.password);
    } catch (error) {
      console.log(error.message);
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
                        <Input {...field} type='password' />
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

import {
  Center,
  FormErrorMessage,
  FormLabel,
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
import { resendConfirmationCode } from '../../api/cognito';
import { validateEmail, validatePin } from '../../validation/validation';

export default function VerifyEmail() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = async (values) => {
    console.log(values);
    try {
      setLoading(true);
      const a = await resendConfirmationCode(values.email);
      console.log(a);
      toast({
        title: 'Code resent',
        description: 'A new code has been sent to your email',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      navigate(`/auth/verify/${values.email}`);
    } catch (error) {
      console.log(error.message);
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const initialValues = {
    email: '',
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      direction={'column'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Text fontSize='lg' as='b'>
        Verify Email address
      </Text>
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
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form>
            <Stack spacing={4}>
              <Field name='email' validate={validateEmail}>
                {({ field, form }) => (
                  <FormControl
                    id='email'
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <Text>Enter Email address to verify</Text>
                    <Input {...field} type='email' />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                type='submit'
              >
                Send Verification Code
              </Button>
            </Stack>
          </Form>
        </Formik>
      </Stack>
    </Flex>
  );
}

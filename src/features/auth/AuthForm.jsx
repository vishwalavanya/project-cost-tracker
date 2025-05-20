// src/features/auth/AuthForm.jsx
import React, { useState } from 'react';
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from './authSlice';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const toast = useToast();
  const dispatch = useDispatch();
  const auth = getAuth();

  const handleSubmit = async () => {
    try {
      let res;
      if (isLogin) {
        res = await signInWithEmailAndPassword(auth, email, password);
        toast({ title: 'Logged in successfully', status: 'success' });
      } else {
        res = await createUserWithEmailAndPassword(auth, email, password);
        toast({ title: 'Account created successfully', status: 'success' });
      }

      dispatch(setUser(res.user));
    } catch (error) {
      toast({ title: 'Error', description: error.message, status: 'error' });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={5} shadow="md" borderWidth="1px">
      <Heading mb={4}>{isLogin ? 'Login' : 'Sign Up'}</Heading>
      <FormControl mb={3}>
        <FormLabel>Email</FormLabel>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Password</FormLabel>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormControl>
      <Button colorScheme="teal" onClick={handleSubmit} mb={3} width="100%">
        {isLogin ? 'Login' : 'Sign Up'}
      </Button>
      <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
      </Button>
    </Box>
  );
};

export default AuthForm;

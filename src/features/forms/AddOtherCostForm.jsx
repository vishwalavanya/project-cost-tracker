import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { addOtherCost } from '../otherCosts/otherCostsSlice';

const AddOtherCostForm = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch();
  const toast = useToast();
  const user = useSelector((state) => state.auth.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description || !amount || isNaN(amount)) {
      toast({ title: 'Invalid input', status: 'error' });
      return;
    }
    dispatch(addOtherCost({ userId: user.uid, cost: { description, amount: Number(amount) } }));
    toast({ title: 'Other cost added', status: 'success' });
    setDescription('');
    setAmount('');
  };

  return (
    <Box mb={6}>
      <form onSubmit={handleSubmit}>
        <FormControl mb={3}>
          <FormLabel>Description</FormLabel>
          <Input
            placeholder="e.g. Shipping"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <FormControl mb={3}>
          <FormLabel>Amount (₹)</FormLabel>
          <Input
            type="number"
            placeholder="e.g. 500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="blue" type="submit" width="full">
          Add Other Cost
        </Button>
      </form>
    </Box>
  );
};

export default AddOtherCostForm;
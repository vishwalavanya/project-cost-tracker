// src/pages/Dashboard.jsx

import React, { useEffect } from 'react';
import {
  Box, Heading, Text, Button, VStack, HStack, Divider, useToast,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItems, deleteItem } from '../features/items/itemsSlice';
import { fetchOtherCosts, deleteOtherCost } from '../features/otherCosts/otherCostsSlice';
import AddItemForm from '../features/forms/AddItemForm';
import AddOtherCostForm from '../features/forms/AddOtherCostForm';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const items = useSelector((state) => state.items);
  const otherCosts = useSelector((state) => state.otherCosts);
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    if (user) {
      dispatch(fetchItems(user.uid));
      dispatch(fetchOtherCosts(user.uid));
    }
  }, [user, dispatch]);

  const handleDeleteItem = (id) => {
    dispatch(deleteItem({ userId: user.uid, id }));
    toast({ title: 'Item deleted', status: 'info' });
  };

  const handleDeleteCost = (id) => {
    dispatch(deleteOtherCost({ userId: user.uid, id }));
    toast({ title: 'Other cost deleted', status: 'info' });
  };

  const totalItemsCost = items.reduce((acc, item) => acc + Number(item.cost), 0);
  const totalOtherCosts = otherCosts.reduce((acc, cost) => acc + Number(cost.amount), 0);
  const total = totalItemsCost + totalOtherCosts;

  return (
    <Box p={5}>
      <Heading mb={4}>📊 Project Cost Tracker</Heading>
      <Text fontSize="xl" fontWeight="bold">Total Cost: ₹{total}</Text>
      <Divider my={5} />

      <AddItemForm />
      <AddOtherCostForm />

      <Heading size="md" mt={6}>Items</Heading>
      <VStack align="start" spacing={2} mt={3}>
        {items.map(item => (
          <HStack key={item.id} w="100%" justify="space-between">
            <Text>{item.name} - ₹{item.cost}</Text>
            <Button size="sm" colorScheme="red" onClick={() => handleDeleteItem(item.id)}>Delete</Button>
          </HStack>
        ))}
      </VStack>

      <Divider my={5} />
      <Heading size="md">Other Costs</Heading>
      <VStack align="start" spacing={2} mt={3}>
        {otherCosts.map(cost => (
          <HStack key={cost.id} w="100%" justify="space-between">
            <Text>{cost.description} - ₹{cost.amount}</Text>
            <Button size="sm" colorScheme="red" onClick={() => handleDeleteCost(cost.id)}>Delete</Button>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default Dashboard;

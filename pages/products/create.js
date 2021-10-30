import { Box, Stack } from "@chakra-ui/layout";
import { Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import axios from "axios";
import { useRouter } from "next/router";

function CreateProduct() {
  const [formInput, setFormInput] = useState({
    name: '',
    price: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const changeInputHandler = (e) => {
    setFormInput((prevState) => ({...prevState, [e.target.name]: e.target.value}));
  }

  const submitDataHandler = async () => {
    setIsLoading(true);
    await axios.post('http://localhost:8080/products', formInput)
      .then(res => {
        console.log(res);
      })

    await router.push('/products')
    setIsLoading(false);
  }

  return (
    <Box p={5}>
      <PageHeader title="Create a new product" />

      <Stack spacing={4}>
        <Input name="name" onChange={changeInputHandler} value={formInput.name} placeholder="Name" />

        <Input type="number" name="price" onChange={changeInputHandler}  value={formInput.price} placeholder="Price" />

        <Button isLoading={isLoading} onClick={submitDataHandler} colorScheme="green">Save Product</Button>
      </Stack>
    </Box>
  )
}

export default CreateProduct;
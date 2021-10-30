import { Box, Stack } from "@chakra-ui/layout";
import { Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import PageHeader from "../../../components/PageHeader";
import axios from "axios";
import { useRouter } from "next/router";

export async function getServerSideProps({ params }) {
  const res = await axios('http://localhost:8080/products')
  const product = res.data.find(product => product._id === params.id )

  return {
    props: {
      product: product,
      id: params.id
    },
  }
}

function EditProduct({product, id}) {
  const [formInput, setFormInput] = useState({
    name: product.name,
    price: product.price,
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const changeInputHandler = (e) => {
    setFormInput((prevState) => ({...prevState, [e.target.name]: e.target.value}));
  }

  const uppdateDataHandler = async () => {
    setIsLoading(true);
    await axios.patch(`http://localhost:8080/products/${id}`, formInput)
      .then(res => {
        console.log(res);
      })

    await router.push('/products')
    setIsLoading(false);
  }


  return (
    <Box p={5}>
      <PageHeader title={`Edit ${product.name}`} />

      <Stack spacing={4}>
        <Input name="name" onChange={changeInputHandler} value={formInput.name} placeholder="Name" />

        <Input type="number" name="price" onChange={changeInputHandler}  value={formInput.price} placeholder="Price" />

        <Button isLoading={isLoading} onClick={uppdateDataHandler} colorScheme="green">Edit Product</Button>
      </Stack>
    </Box>
  )
}

export default EditProduct;
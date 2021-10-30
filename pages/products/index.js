import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/table";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useToast } from "@chakra-ui/react"
import PageHeader from "../../components/PageHeader";

export async function getServerSideProps() {
  const res = await axios('http://localhost:8080/products')

  return {
    props: {
      products: res.data,
    },
  }
}

function Products({ products }) {
  const router = useRouter();
  const toast = useToast();

  const deleteProductHandler = async (id) => {
    await axios.delete(`http://localhost:8080/products/${id}`)
      .then(res => {
        console.log(res.data)
      });
    await router.reload();
    toast({
      title: "Product deleted sucessfully",
      status: "success",
      duration: 9000,
      isClosable: true,
    })
  }

  return (
    <Box p={5}>
      <PageHeader title="Product List" />

      <Button onClick={() => router.push('/products/create')}  colorScheme="green" my={5}>Create new products</Button>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>
              No.
            </Th>
            <Th>
              Name
            </Th>
            <Th>
              Price
            </Th>
            <Th>
              Actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map(({_id : id, name, price}, index) => (
            <Tr key={id}>
              <Td>
                {index + 1}
              </Td>
              <Td>
                {name}
              </Td>
              <Td>
                {price}
              </Td>
              <Td>
                <Button onClick={() => router.push(`/products/edit/${id}`)} mr="3">
                  Edit
                </Button>
                <Button onClick={() => deleteProductHandler(id)} colorScheme="red">
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default Products;
import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/table";
import axios from "axios";
import { useRouter } from "next/router";
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
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product, index) => (
            <Tr key={product._id}>
              <Td>
                {index + 1}
              </Td>
              <Td>
                {product.name}
              </Td>
              <Td>
                {product.price}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default Products;
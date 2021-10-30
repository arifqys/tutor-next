import { Heading } from '@chakra-ui/layout';

function PageHeader({title}) {
  return <Heading as="h1" size="xl" mb="5">{title}</Heading>
}

export default PageHeader;
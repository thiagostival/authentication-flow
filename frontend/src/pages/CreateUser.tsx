import { useNavigate } from "react-router-dom";

// STYLES
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";

// COMPONENTS
import { Input } from "../components/form/Input";

export function CreateUser() {
  const navigate = useNavigate();

  return (
    <Box flex="1" borderRadius={8} bg="gray.800" p="8">
      <Heading size="lg" fontWeight="normal">
        Create user
      </Heading>

      <Divider my="6" borderColor="gray.700" />

      <VStack spacing="8">
        <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
          <Input name="name" label="Full Name" />
          <Input name="email" type="email" label="E-mail" />
        </SimpleGrid>

        <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
          <Input name="password" type="password" label="Password" />
          <Input
            name="password_confirmation"
            type="password"
            label="Confirm your Password"
          />
        </SimpleGrid>
      </VStack>

      <Flex mt="8" justify="flex-end">
        <HStack spacing="4">
          <Button colorScheme="whiteAlpha" onClick={() => navigate("/users")}>
            Cancel
          </Button>
          <Button colorScheme="pink" onClick={() => navigate("/users")}>
            Save
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}

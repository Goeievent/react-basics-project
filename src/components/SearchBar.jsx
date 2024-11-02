import { Input, InputGroup, InputLeftElement, Flex } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <Flex justify="center" align="center" width="100%">
      <InputGroup w="50%">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="white.300" />
        </InputLeftElement>
        <Input
          bgColor="white"
          type="text"
          placeholder="Search for recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </InputGroup>
    </Flex>
  );
};

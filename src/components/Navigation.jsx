import { Link } from "react-router-dom";
import { Flex, Button } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Flex>
            <Link to="/">
              <Button colorScheme="blue" size="sm" bgColor="blue.500">
                Home
              </Button>
            </Link>
          </Flex>
        </li>
      </ul>
    </nav>
  );
};

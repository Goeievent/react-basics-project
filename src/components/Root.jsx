import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box, Center } from "@chakra-ui/react";

export const Root = () => {
  return (
    <Center
      gap={8}
      h="full"
      bgColor="blue.100"
      flexWrap="wrap"
      display="left"
      justify="space-between"
      marginY={1}
    >
      <Box>
        <Navigation />
        <Outlet />
      </Box>
    </Center>
  );
};

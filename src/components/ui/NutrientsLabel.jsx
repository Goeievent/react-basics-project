import { Flex, Text } from "@chakra-ui/react";

export const NutriLabel = ({ label, quantity, unit }) => {
  return (
    <>
      <Flex flexDir="column">
        <Text
          fontSize={13}
          fontWeight={600}
          color="GrayText"
          textTransform="uppercase"
        ></Text>
        <Text fontSize={12}>
          {quantity}
          {unit}
        </Text>

        {label}
      </Flex>
    </>
  );
};

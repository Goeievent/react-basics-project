import { Radio, RadioGroup, Stack, Flex } from "@chakra-ui/react";

export const FilterEvents = ({
  selectedCategory,
  setSelectedCategory,
  categories,
}) => {
  return (
    <Flex justify="center" align="center" width="100%" mt={5} p={[2, 4]}>
      <RadioGroup
        value={selectedCategory}
        onChange={(value) => setSelectedCategory(value)}
      >
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={5}
          align="center"
        >
          <Radio value="">All</Radio>
          {categories.map((category) => (
            <Radio key={category.id} value={String(category.id)}>
              {category.name}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    </Flex>
  );
};

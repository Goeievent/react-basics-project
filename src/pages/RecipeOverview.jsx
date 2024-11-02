import { useState } from "react";
import {
  Center,
  Heading,
  Text,
  Image,
  Card,
  CardBody,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { SearchBar } from "../components/SearchBar";
import { Tag } from "../components/ui/PortfolioItemPage";
import { HealthLabels } from "../components/VegLabel";

export const RecipeOverview = ({ recipes, onRecipeClick }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Center
      gap={8}
      h="full"
      bgColor="blue.100"
      flexWrap="wrap"
      display="flex"
      justify="space-between"
      marginY={1}
    >
      <Heading mb={6}>Recipe Overview</Heading>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {filteredRecipes.map((recipe, index) => (
        <Card
          key={index}
          borderRadius="xl"
          w="sm"
          h="37rem"
          cursor="pointer"
          onClick={() => onRecipeClick(recipe)}
          _hover={{ transform: "scale(1.01)" }}
        >
          <CardBody>
            <Image h={64} w="100%" src={recipe.image} borderRadius="xl" />
            <Stack mt="6" spacing="3" align="center">
              <Text
                color="gray"
                textTransform="uppercase"
                fontWeight={500}
                fontSize="xs"
              >
                {recipe.mealType}
              </Text>
              <Heading size="md">{recipe.label}</Heading>

              <HealthLabels
                spaddingTop="3"
                recipe={recipe}
                flexWrap="wrap"
                justify={{ base: "center", md: "normal" }}
                mb={4}
              ></HealthLabels>

              <Flex gap={2} wrap="wrap">
                {recipe.dietLabels?.map((label, index) => (
                  <Tag bgColor="green.500" key={index}>
                    {label}
                  </Tag>
                ))}
              </Flex>

              <Text
                color="gray"
                textTransform="uppercase"
                fontWeight={500}
                fontSize="md"
              >
                {recipe.dishType}
              </Text>

              <Text fontWeight="500">
                {recipe.cautions.length > 0 ? "Cautions:" : null}
              </Text>
              <Flex gap={2} wrap="wrap">
                {recipe.cautions?.map((caution, index) => (
                  <Tag bgColor="red.500" key={index}>
                    {caution}
                  </Tag>
                ))}
              </Flex>
            </Stack>
          </CardBody>
        </Card>
      ))}
    </Center>
  );
};

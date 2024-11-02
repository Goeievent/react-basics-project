import {
  Center,
  Image,
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Flex,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { Tag } from "../components/ui/PortfolioItemPage";
import { NutriLabels } from "../components/Nutrients";

export const RecipeDetails = ({ recipe, onBackClick }) => {
  if (!recipe) return null;

  return (
    <Center bgColor="blue.100" h="full" flexWrap="wrap" display="flex">
      <Card borderRadius="xl" w="3xl" h="fit-content">
        <CardBody>
          <Button w="fit-content" onClick={onBackClick} mb={4}>
            ←
          </Button>
          <Image h="20rem" w="100%" src={recipe.image} borderRadius="xl" />
          <Stack mt="6" spacing="3">
            <Grid templateColumns="repeat(2, 1fr)" gap="6">
              <GridItem>
                <Text
                  color="gray"
                  textTransform="uppercase"
                  fontWeight={100}
                  fontSize="xs"
                >
                  {recipe.mealType}
                </Text>
                <Heading size="md">{recipe.label}</Heading>
                <Text color="gray" fontWeight="600" paddingTop="3">
                  Total cooking time: {recipe.totalTime} minutes
                </Text>
                <Text color="gray" fontWeight="600" paddingTop="3">
                  Servings: {recipe.yield}
                </Text>

                <Text fontWeight="700" paddingTop="3">
                  Ingredients:
                </Text>
                <Text paddingTop="3">
                  {recipe.ingredientLines.map((ingredient, index) => (
                    <Text fontWeight="400" key={index}>
                      {ingredient}
                      {"\n"}
                    </Text>
                  ))}
                </Text>
                <Image
                  paddingTop="6"
                  h="15rem"
                  w="100%"
                  src={recipe.ingredients[0].image}
                />
              </GridItem>
              <GridItem>
                <Text fontWeight="500" paddingTop="3">
                  Health labels:
                </Text>
                <Flex paddingTop="3" gap={2} wrap="wrap" column="right">
                  {recipe.healthLabels?.map((label, index) => (
                    <Tag key={index}>{label}</Tag>
                  ))}
                </Flex>
                <Text fontWeight="500" paddingTop="3">
                  {recipe.dietLabels.length > 0 ? "Diet:" : null}
                </Text>
                <Flex paddingTop="3" gap={2} wrap="wrap">
                  {recipe.dietLabels?.map((label, index) => (
                    <Tag bgColor="green.500" key={index}>
                      {label}
                    </Tag>
                  ))}
                </Flex>
                <Text fontWeight="500" paddingTop="3">
                  {recipe.cautions.length > 0 ? "Cautions:" : null}
                </Text>
                <Flex paddingTop="3" gap={2} wrap="wrap">
                  {recipe.cautions?.map((caution, index) => (
                    <Tag bgColor="red.500" key={index}>
                      {caution}
                    </Tag>
                  ))}
                </Flex>

                <NutriLabels
                  paddingTop="3"
                  recipe={recipe}
                  flexWrap="wrap"
                  justify={{ base: "center", md: "normal" }}
                  mb={4}
                />
              </GridItem>
            </Grid>
          </Stack>
        </CardBody>
      </Card>
    </Center>
  );
};

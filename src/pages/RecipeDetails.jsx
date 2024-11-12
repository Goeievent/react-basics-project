import {
  Center,
  Box,
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
    <Center bgColor="blue.100" h="full" flexWrap="wrap" display="flex" p={4}>
      <Card borderRadius="xl" maxW="3xl" w="full" h="fit-content" p={[4, 6]}>
        <CardBody>
          <Button
            w="fit-content"
            onClick={onBackClick}
            mb={4}
            fontSize={["sm", "md"]}
          >
            ← Back
          </Button>
          <Image
            h={["15rem", "20rem"]}
            w="100%"
            src={recipe.image}
            borderRadius="xl"
            objectFit="cover"
          />
          <Stack mt="6" spacing="3">
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
              {/* Left Column */}
              <GridItem>
                <Text
                  color="gray"
                  textTransform="uppercase"
                  fontWeight="100"
                  fontSize="xs"
                >
                  {recipe.mealType}
                </Text>
                <Heading size="lg">{recipe.label}</Heading>
                <Text color="gray" fontWeight="600" pt={3}>
                  Total cooking time: {recipe.totalTime} minutes
                </Text>
                <Text color="gray" fontWeight="600" pt={3}>
                  Servings: {recipe.yield}
                </Text>

                <Text fontWeight="700" pt={3}>
                  Ingredients:
                </Text>
                <Box pt={3}>
                  {recipe.ingredientLines.map((ingredient, index) => (
                    <Text fontWeight="400" key={index}>
                      {ingredient}
                    </Text>
                  ))}
                </Box>
              </GridItem>

              {/* Right Column */}
              <GridItem>
                <Text fontWeight="500" pt={3}>
                  Health labels:
                </Text>
                <Flex pt={3} gap={2} wrap="wrap">
                  {recipe.healthLabels?.map((label, index) => (
                    <Tag key={index}>{label}</Tag>
                  ))}
                </Flex>

                {recipe.dietLabels.length > 0 && (
                  <Text fontWeight="500" pt={3}>
                    Diet:
                  </Text>
                )}
                <Flex pt={3} gap={2} wrap="wrap">
                  {recipe.dietLabels?.map((label, index) => (
                    <Tag bgColor="green.500" key={index}>
                      {label}
                    </Tag>
                  ))}
                </Flex>

                {recipe.cautions.length > 0 && (
                  <Text fontWeight="500" pt={3}>
                    Cautions:
                  </Text>
                )}
                <Flex pt={3} gap={2} wrap="wrap">
                  {recipe.cautions?.map((caution, index) => (
                    <Tag bgColor="red.500" key={index}>
                      {caution}
                    </Tag>
                  ))}
                </Flex>

                <NutriLabels
                  pt={3}
                  recipe={recipe}
                  flexWrap="wrap"
                  justify={{ base: "center", md: "flex-start" }}
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

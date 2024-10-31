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
} from "@chakra-ui/react";
import { Tag } from "../components/ui/PortfolioItemPage";

export const RecipeDetails = ({ recipe, onBackClick }) => {
  if (!recipe) return null;

  return (
    <Center bgColor="blue.100" h="100vh" flexDirection="column">
      <Card borderRadius="xl" w="3xl" h="3xl">
        <Button w="fit-content" onClick={onBackClick} mb={4}>
          ← Back to Overview
        </Button>
        <CardBody>
          <Image h="md" w="100%" src={recipe.image} borderRadius="xl" />
          <Stack mt="6" spacing="3">
            <Heading size="md">{recipe.label}</Heading>
            <Text>{recipe.description}</Text>
            <Flex gap={2} wrap="wrap">
              {recipe.dietLabels?.map((label, index) => (
                <Tag key={index}>{label}</Tag>
              ))}
            </Flex>
          </Stack>
        </CardBody>
      </Card>
    </Center>
  );
};

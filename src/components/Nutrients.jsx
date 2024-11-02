import { Flex, Text } from "@chakra-ui/react";
import { NutriLabel } from "./ui/NutrientsLabel";

export const NutriLabels = ({ recipe, ...props }) => {
  const calories = recipe.totalNutrients.ENERC_KCAL;
  const fat = recipe.totalNutrients.FAT;
  const carbs = recipe.totalNutrients.CHOCDF;
  const protein = recipe.totalNutrients.PROCNT;
  const cholesterol = recipe.totalNutrients.CHOLE;
  const sodium = recipe.totalNutrients.NA;

  const neededNutrients = [calories, fat, carbs, protein, cholesterol, sodium];

  return (
    <>
      <Text fontWeight="700" paddingTop="3">
        Nutrients:
      </Text>
      <Flex gap={4} {...props}>
        {neededNutrients.map((nutrient) => (
          <NutriLabel
            key={self.crypto.randomUUID()}
            label={nutrient.label}
            quantity={Math.round(nutrient.quantity)}
            unit={nutrient.unit}
          />
        ))}
      </Flex>
    </>
  );
};

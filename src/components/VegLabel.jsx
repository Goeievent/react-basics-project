import { Flex } from "@chakra-ui/react";
import { Tag } from "./ui/PortfolioItemPage";

export const HealthLabels = ({ recipe, ...props }) => {
  // Filter out "Vegetarian" and "Vegan"
  const vegLabels =
    recipe.healthLabels?.filter(
      (label) =>
        label.toLowerCase() === "vegetarian" || label.toLowerCase() === "vegan"
    ) || [];

  return (
    <Flex gap={2} {...props}>
      {vegLabels.map((label, index) => (
        <Tag key={`${label}-${index}`}>{label}</Tag>
      ))}
    </Flex>
  );
};

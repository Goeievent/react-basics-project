import { useState } from "react";
import { Center } from "@chakra-ui/react";
import { RecipeOverview } from "./pages/RecipeOverview";
import { RecipeDetails } from "./pages/RecipeDetails";
import { data } from "./utils/data";

export const App = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const showRecipeDetails = (recipe) => {
    setSelectedRecipe(recipe);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Go back to the overview screen
  const showOverview = () => {
    setSelectedRecipe(null);
  };

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
      {selectedRecipe === null ? (
        <RecipeOverview
          recipes={data.hits.map((hit) => hit.recipe)}
          onRecipeClick={showRecipeDetails}
        />
      ) : (
        <RecipeDetails recipe={selectedRecipe} onBackClick={showOverview} />
      )}
    </Center>
  );
};

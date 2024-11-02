import { useState } from "react";
import { Center } from "@chakra-ui/react";
import { RecipeOverview } from "./pages/RecipeOverview";
import { RecipeDetails } from "./pages/RecipeDetails";
import { data } from "./Utils/data";

export const App = () => {
  const [view, setView] = useState("overview"); // "overview" or "details"
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Handle view change and set the selected recipe
  const showRecipeDetails = (recipe) => {
    setSelectedRecipe(recipe);
    setView("details");
  };

  // Go back to the overview screen
  const showOverview = () => {
    setSelectedRecipe(null);
    setView("overview");
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
      {view === "overview" ? (
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

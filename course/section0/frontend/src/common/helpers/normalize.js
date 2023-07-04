import doughTypes from "@/common/data/dough.json";
import ingredients from "@/common/data/ingredients.json";
import sauces from "@/common/data/sauces.json";
import sizes from "@/common/data/sizes.json";

export const normalizeDough = (dough) => {
  return {
    ...dough,
    value: doughTypes[dough.id],
  };
};

export const normalizeSize = (size) => {
  return {
    ...size,
    value: sizes[size.id],
  };
};

export const normalizeIngredients = (ingredient) => {
  return {
    ...ingredient,
    value: ingredients[ingredient.id],
  };
};

export const normalizeSauces = (sauce) => {
  return {
    ...sauce,
    value: sauces[sauce.id],
  };
};

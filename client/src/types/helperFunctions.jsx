import React from "react";
import CoffeeUtilities from "../../JsonFiles/Coffee.json";

export const searchAndDestroy = (string, items, placeholder) => {
  console.log(items)
  const promise = new Promise((resolve, reject) => {
    const createRegex = CoffeeUtilities[items].map(
      (placeholder) => new RegExp((`\\b${placeholder}\\b`, "i")),
    );
    console.log(createRegex)
  });
};

const sliceInombolo = (string) => {
  const split = string.split(" ");
  const inombolo = split[split.length - 1];
  setInombolo(inombolo);
};

// const IsmaZol = (string) => {
//   const name = string.split(" ")[0];
//   return setPerson(name);
// };

const IsmJabana = (string) => {
  const regexPatterns = CoffeeUtilities.coffees.map(
    (coffeeName) => new RegExp(`\\b${coffeeName}\\b`, "i"),
  );
  const findMatches = (str) => {
    const matches = regexPatterns
      .map((pattern) => str.match(pattern))
      .filter(Boolean);
    return matches.length > 0 ? matches[0][0] : null;
  };
  return setCoffee(findMatches(string) || "Maafih Jabana");
};

const ShayLaban = (string) => {
  const regexPatterns = CoffeeUtilities.milks.map(
    (milkName) => new RegExp(`\\b${milkName}\\b`, "i"),
  );
  const findMatches = (str) => {
    const matches = regexPatterns
      .map((pattern) => str.match(pattern))
      .filter(Boolean);
    return matches.length > 0 ? matches[0][0] : null;
  };
  return setMilk(findMatches(string) || "Maafih Laban");
};

const ShaySize = (string) => {
  const regexPatterns = CoffeeUtilities.sizes.map(
    (sizeName) => new RegExp(`\\b${sizeName}\\b`, "i"),
  );

  const findMatches = (str) => {
    const matches = regexPatterns
      .map((pattern) => str.match(pattern))
      .filter(Boolean);
    return matches.length > 0 ? matches[0][0] : null;
  };

  return setSize(findMatches(string) || "Maafih Size");
};


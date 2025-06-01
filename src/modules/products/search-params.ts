import { parseAsArrayOf,createLoader,parseAsString, parseAsStringLiteral } from "nuqs/server"

export const sortValues = ["curated", "trending", "Hyped"] as const;


const params={
  
  // sort: parseAsStringLiteral(sortValues).withDefault("curated"),

  minPrice: parseAsString
    .withOptions({
      clearOnDefault: true,
    })
    .withDefault(""),
    maxPrice: parseAsString
    .withOptions({
      clearOnDefault: true,
    })
    .withDefault(""),
    tags:parseAsArrayOf(parseAsString)
    .withOptions({
      clearOnDefault: true,
    })
    .withDefault([]),
    
  
}

export const loadProductsFilters =createLoader(params)
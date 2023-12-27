import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const categoryInput = {
  name: z.string(),
  picture: z.any().optional(),
  parent_id: z.number().optional(),
};

const categoryGenerated = {
  id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
};

const createCategorySchema = z.object({
  ...categoryInput,
});

const categoryResponseSchema = z.object({
  ...categoryInput,
  ...categoryGenerated,
  products_count: z.number().optional(),
});

const CategoriesResponseSchema = z.array(categoryResponseSchema);

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;

export const { schemas: categorySchemas, $ref } = buildJsonSchemas(
  {
    createCategorySchema,
    categoryResponseSchema,
    CategoriesResponseSchema,
  },
  { $id: "categorySchema" }
);

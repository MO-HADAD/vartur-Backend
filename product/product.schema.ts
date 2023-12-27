import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const productInput = {
  name: z.string(),
  category_id: z.number(),

  picture: z.any(),
};

const productGenerated = {
  id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
};

const createProductSchema = z.object({
  ...productInput,
});

const productResponseSchema = z.object({
  ...productInput,
  ...productGenerated,
});

const ProductsResponseSchema = z.array(productResponseSchema);

export type CreateProductInput = z.infer<typeof createProductSchema>;

export const { schemas: productSchemas, $ref } = buildJsonSchemas(
  {
    createProductSchema,
    productResponseSchema,

    ProductsResponseSchema,
  },
  { $id: "productSchema" }
);

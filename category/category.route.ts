import { FastifyInstance } from "fastify";
import {
  createCategoryHandler,
  deleteCategoryHandler,
  getCategoriesHandler,
  getCategoriesWithProductsCountHandler,
  getCategoryHandler,
  updateCategoryHandler,
} from "./category.controller";
import { $ref } from "./category.schema";

export default async function categoryRoutes(fastify: FastifyInstance) {
  fastify.register(require("@fastify/multipart"));

  fastify.post(
    "/categories",
    {
      schema: {
        body: $ref("createCategorySchema"),
        response: {
          201: $ref("categoryResponseSchema"),
        },
      },
    },
    createCategoryHandler
  );

  fastify.get(
    "/categories",
    {
      schema: {
        response: {
          200: $ref("CategoriesResponseSchema"),
        },
      },
    },
    getCategoriesWithProductsCountHandler
  );

  fastify.get(
    "/categories/:id",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "integer" },
          },
        },
        response: {
          200: $ref("categoryResponseSchema"),
        },
      },
    },
    getCategoryHandler
  );

  fastify.patch(
    "/categories/:id",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "integer" },
          },
        },
        body: $ref("createCategorySchema"),
        response: {
          200: $ref("categoryResponseSchema"),
        },
      },
    },
    updateCategoryHandler
  );

  fastify.delete(
    "/categories/:id",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "integer" },
          },
        },
      },
    },
    deleteCategoryHandler
  );
}

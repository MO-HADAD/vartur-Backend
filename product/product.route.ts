import { FastifyInstance } from "fastify";
import { Prisma, PrismaClient } from "@prisma/client";
import { Readable } from "stream";
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  getProductsHandler,
  updateProductHandler,
} from "./product.controller";
import { $ref } from "./product.schema";
const prisma = new PrismaClient();

export default async function productRoutes(fastify: FastifyInstance) {
  fastify.register(require("@fastify/multipart"));

  // Get all products
  fastify.get(
    "/product",
    {
      schema: {
        response: {
          200: $ref("ProductsResponseSchema"),
        },
      },
    },
    getProductsHandler
  );

  fastify.get(
    "/product/:id",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "integer" },
          },
        },
        response: {
          200: $ref("productResponseSchema"),
        },
      },
    },
    getProductHandler
  );

  fastify.post(
    "/product",
    {
      schema: {
        body: $ref("createProductSchema"),
        response: { 201: $ref("productResponseSchema") },
      },
    },
    createProductHandler
  );

  fastify.patch(
    "/product/:id",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "integer" },
          },
        },
        body: $ref("createProductSchema"),
        response: {
          200: $ref("productResponseSchema"),
        },
      },
    },
    updateProductHandler
  );

  fastify.delete(
    "/product/:id",
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
    deleteProductHandler
  );
}

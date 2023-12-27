import { FastifyReply, FastifyRequest } from "fastify";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "./product.service";
import { CreateProductInput } from "./product.schema";
import { Readable } from "stream";

export async function createProductHandler(
  req: FastifyRequest<{ Body: CreateProductInput }>,
  reply: FastifyReply
) {
  try {
    console.log(req.body);
    const product = await createProduct({
      ...req.body,
    });
    reply.code(201).send(product);
  } catch (error) {
    console.error(error);
    reply.code(500).send({ error: "Internal Server Error" });
  }
}

export async function getProductsHandler(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const products = await getProducts();

  return products;
}

export async function getProductHandler(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const productId = parseInt(req.params.id, 10);
    const product = await getProduct(productId);
    if (!product) {
      reply.code(404).send({ error: "Product not found" });
      return;
    }
    reply.code(200).send(product);
  } catch (error) {
    console.error(error);
    reply.code(500).send({ error: "Internal Server Error" });
  }
}

export async function updateProductHandler(
  req: FastifyRequest<{ Params: { id: string }; Body: CreateProductInput }>,
  reply: FastifyReply
) {
  try {
    const productId = parseInt(req.params.id, 10);
    const updatedProduct = await updateProduct(productId, { ...req.body });
    reply.code(200).send(updatedProduct);
  } catch (error) {
    console.error(error);
    reply.code(500).send({ error: "Internal Server Error" });
  }
}

export async function deleteProductHandler(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const productId = parseInt(req.params.id, 10);
    await deleteProduct(productId);
    reply.code(204).send("product deleted successfully");
  } catch (error) {
    console.error(error);
    reply.code(500).send({ error: "Internal Server Error" });
  }
}

import { FastifyReply, FastifyRequest } from "fastify";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoriesWithProductsCount,
  getCategory,
  updateCategory,
} from "./category.service";
import { CreateCategoryInput } from "./category.schema";

export async function createCategoryHandler(
  req: FastifyRequest<{ Body: CreateCategoryInput }>,
  reply: FastifyReply
) {
  try {
    const category = await createCategory({
      ...req.body,
    });
    reply.code(201).send(category);
  } catch (error) {
    console.error(error);
    reply.code(500).send({ error: "Internal Server Error" });
  }
}

export async function getCategoriesHandler(
  _: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const categories = await getCategories();
    reply.code(200).send(categories);
  } catch (error) {
    console.error(error);
    reply.code(500).send({ error: "Internal Server Error" });
  }
}

export async function getCategoriesWithProductsCountHandler(
  _: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const categories = await getCategoriesWithProductsCount();
    reply.code(200).send(categories);
  } catch (error) {
    console.error(error);
    reply.code(500).send({ error: "Internal Server Error" });
  }
}

export async function getCategoryHandler(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const categoryId = parseInt(req.params.id, 10);
    const category = await getCategory(categoryId);
    if (!category) {
      reply.code(404).send({ error: "Category not found" });
      return;
    }
    reply.code(200).send(category);
  } catch (error) {
    console.error(error);
    reply.code(500).send({ error: "Internal Server Error" });
  }
}

export async function updateCategoryHandler(
  req: FastifyRequest<{ Params: { id: string }; Body: CreateCategoryInput }>,
  reply: FastifyReply
) {
  try {
    const categoryId = parseInt(req.params.id, 10);
    const updatedCategory = await updateCategory(categoryId, { ...req.body });
    reply.code(200).send(updatedCategory);
  } catch (error) {
    console.error(error);
    reply.code(500).send({ error: "Internal Server Error" });
  }
}

export async function deleteCategoryHandler(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const categoryId = parseInt(req.params.id, 10);
    await deleteCategory(categoryId);
    reply.code(204).send("Category deleted successfully");
  } catch (error) {
    console.error(error);
    reply.code(500).send({ error: "Internal Server Error" });
  }
}

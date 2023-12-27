import { PrismaClient } from "@prisma/client";
import { CreateCategoryInput } from "./category.schema";
import * as fs from "fs";
import { UploadClient } from "@uploadcare/upload-client";
import sharp from "sharp";

const prisma = new PrismaClient();
const client = new UploadClient({
  publicKey: process.env.IMAGES_CLOUD_API as string,
});

export async function createCategory(data: CreateCategoryInput) {
  let categoryPicture: string | null = null;

  if (data && data.picture && data.picture.length > 0) {
    const pictureBuffer = Buffer.from(data.picture[0].data, "base64");
    const sharpedBuffer = await sharp(pictureBuffer)
      .resize(3200, 3200)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toBuffer();

    const file = await client.uploadFile(sharpedBuffer, {
      fileName: data.picture[0].filename,
    });
    categoryPicture = file.cdnUrl + "-/preview/3200x3200/";
  }
  console.log(data);

  return await prisma.category.create({
    data: {
      name: data.name,
      parent_id: data.parent_id,
      picture: categoryPicture,
    },
  });
}

export async function getCategories() {
  const categories = await prisma.category.findMany();
  return categories;
}

export async function getCategoriesWithProductsCount() {
  const categories = await prisma.category.findMany({
    include: {
      products: true,
      _count: {
        select: { products: true },
      },
    },
  });
  return categories.map((category) => ({
    ...category,
    products_count: category._count.products,
  }));
}

export async function getCategory(categoryId: number) {
  return await prisma.category.findUnique({
    where: { id: categoryId },
  });
}

export async function updateCategory(
  categoryId: number,
  data: Partial<CreateCategoryInput>
) {
  let categoryPicture: string | null = null;

  if (data && data.picture && data.picture.length > 0) {
    const pictureBuffer = Buffer.from(data.picture[0].data, "base64");
    const sharpedBuffer = await sharp(pictureBuffer)
      .resize(3200, 3200)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toBuffer();

    const file = await client.uploadFile(sharpedBuffer, {
      fileName: data.picture[0].filename,
    });
    categoryPicture = file.cdnUrl + "-/preview/3200x3200/";
  }

  return await prisma.category.update({
    where: { id: categoryId },
    data: {
      name: data.name,
      parent_id: data.parent_id,
      picture: categoryPicture || undefined,
    },
  });
}

export async function deleteCategory(categoryId: number) {
  return await prisma.category.delete({
    where: { id: categoryId },
  });
}

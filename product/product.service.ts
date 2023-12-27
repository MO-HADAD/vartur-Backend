import { PrismaClient } from "@prisma/client";
import { CreateProductInput } from "./product.schema";

import { UploadClient } from "@uploadcare/upload-client";

import sharp from "sharp";

const prisma = new PrismaClient();
const client = new UploadClient({
  publicKey: process.env.IMAGES_CLOUD_API as string,
});

export async function createProduct(data: CreateProductInput) {
  let productPicture: string | null = null;

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
    productPicture = file.cdnUrl + "-/preview/3200x3200/";
  }

  return await prisma.product.create({
    data: {
      name: data.name,
      category_id: data.category_id,
      picture: productPicture,
    },
  });
}

export async function getProducts() {
  return await prisma.product.findMany();
}

export async function getProduct(productId: number) {
  return await prisma.product.findUnique({
    where: { id: productId },
  });
}

export async function updateProduct(
  productId: number,
  data: Partial<CreateProductInput>
) {
  let productPicture: string | null = null;

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
    productPicture = file.cdnUrl + "-/preview/3200x3200/";
  }

  return await prisma.product.update({
    where: { id: productId },
    data: {
      name: data.name,
      category_id: data.category_id,
      picture: productPicture || undefined,
    },
  });
}

export async function deleteProduct(productId: number) {
  return await prisma.product.delete({
    where: { id: productId },
  });
}

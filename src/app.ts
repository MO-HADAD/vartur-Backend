import path from "path";
import productRoutes from "../product/product.route";
import { productSchemas } from "../product/product.schema";
import { categorySchemas } from "../category/category.schema";

const fastify = require("fastify")({ logger: true });

fastify.register(require("../product/product.route"));
fastify.register(require("../category/category.route"));
fastify.register(require("@fastify/multipart"), {
  addToBody: true,
});

const port = process.env.PORT || 5000;

async function main() {
  for (const schema of [...productSchemas, ...categorySchemas]) {
    fastify.addSchema({
      ...schema,
    });
  }

  try {
    await fastify.listen({ port: port });
    console.log(`Server is running on port ${port}...`);
  } catch (error) {
    console.error(error);
  }
}
main();

import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { CreateProductInput, Product, UpdateProductInput } from "../types/Product";
import { ProductModel } from "../../model/Product";
import { ByIdArgs } from ".";

@Resolver((of) => Product)
export class ProductResolver {
  constructor() {}

  @Query((returns) => Product, { nullable: true })
  async productById(
    @Args() { id }: ByIdArgs
  ): Promise<Product | null> {
    const product = await ProductModel.findById(id);
    return product;
  }

  @Query((returns) => [Product], { nullable: true })
  async products(): Promise<Product[] | null> {
    const products = await ProductModel.find({});
    return products;
  }

  @Mutation((returns) => Boolean)
  async updateProduct(
    @Arg("updateProductInput") product: UpdateProductInput
  ): Promise<Boolean> {
    const model = await ProductModel.findById(product._id);
    if (model) {
      if (product.price != null) {
        model.price = product.price;
      }
      if (product.stock != null) {
        model.stock = product.stock;
      }
      await model.save();
      return true;
    }
    return false;
  }

  @Mutation((returns) => Product)
  async createProduct(
    @Arg("createProductInput") product: CreateProductInput
  ): Promise<Product> {
    const model = new ProductModel({
      price: product.price,
      stock: product.stock
    });
    model.save();
    return model;
  }

}

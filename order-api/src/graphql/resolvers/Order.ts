import { Arg, Args, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { OrderModel } from "../../model/Order";
import { ByIdArgs } from ".";
import { CreateOrderInput, Order, OrderStatus, ShipOrderInput, UpdateOrderStatusInput } from "../types/Order";
import { Context } from "..";
import { gql } from "graphql-request";

@Resolver((of) => Order)
export class OrderResolver {
  constructor() {}

  @Query((returns) => Order, { nullable: true })
  async orderById(
    @Args() { id }: ByIdArgs
  ): Promise<Order | null> {
    const order = await OrderModel.findById(id);
    return order;
  }

  @Query((returns) => [Order], { nullable: true })
  async orders(): Promise<Order[] | null> {
    const orders = await OrderModel.find({});
    return orders;
  }

  @Mutation((returns) => Boolean)
  async shipOrder(
    @Arg("shipOrderInput") order: ShipOrderInput
  ): Promise<Boolean> {
    const model = await OrderModel.findById(order._id);
    if (model) {
      model.carrier = order.carrier;
      model.trackingNumber = order.trackingNumber;
      model.orderStatus = OrderStatus.Shipped;
      await model.save();
      return true;
    }
    return false;
  }

  @Mutation((returns) => Boolean)
  async updateOrderStatus(
    @Arg("updateOrderStatusInput") order: UpdateOrderStatusInput
  ): Promise<Boolean> {
    const model = await OrderModel.findById(order._id);
    if (model) {
      model.orderStatus = order.orderStatus;
      await model.save();
      return true;
    }
    return false;
  }

  @Mutation((returns) => Order)
  async createOrder(
    @Arg("createOrderInput") order: CreateOrderInput,
    @Ctx() context: Context
  ): Promise<Order> {
    const model = new OrderModel({
      productId: order.productId,
      price: order.price,
      quantity: order.quantity,
      orderStatus: OrderStatus.Placed
    });
    model.save();

    await context.marketplaceClient.request(gql`
      mutation DecrementStock($decrementStockInput: DecrementStockInput!) {
        decrementStock(decrementStockInput: $decrementStockInput) {
          _id
          price
          stock
        }
      }`,
      {
        decrementStockInput: {
          _id: order.productId,
          quantity: order.quantity
        }
      }
    );

    return model;
  }

}

import { DataByIdMap, Order, OrdersByIdMap, ProductsByIdMap, StatsByProductIdMap } from './types';

export const calculateOrderTotal = ({ amountsByProductId = {} }: Order, products: DataByIdMap) =>
	Object.keys(amountsByProductId)
		.reduce((sum, productId) => (
			sum + (products[productId].price * amountsByProductId[productId]
		)), 0);

export const prepareProductsStats = (orders: OrdersByIdMap, products: ProductsByIdMap): StatsByProductIdMap => 
	Object.keys(orders)
		.reduce((output: StatsByProductIdMap, orderId: string) =>
			Object.keys(orders[orderId].amountsByProductId)
				.reduce((output: StatsByProductIdMap, productId: string) => {
					const newCount: number = orders[orderId].amountsByProductId[productId];
					if (output[productId]) {
						return {
							...output,
							[productId]: {
								...output[productId],
								count: output[productId].count + newCount,
								inOrders: [...output[productId].inOrders, orderId]
							}
						}
					}
					return {
						...output,
						[productId]: {
							count: newCount,
							inOrders: [orderId]
						}
					};
				}, output),
			{});
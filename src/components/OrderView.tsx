import * as React from 'react';
import { Order, DataByIdMap } from '../types';
import { calculateOrderTotal } from '../utils';

export interface PropTypes {
	order: Order,
	products: DataByIdMap,
	onConfirm: Function
}

const defaultProps: PropTypes = {
	order: {
		amountsByProductId: {}
	},
	products: [],
	onConfirm: (): void => {}
}

export const OrderView= ({
	order = defaultProps.order,
	products = defaultProps.products,
	onConfirm = defaultProps.onConfirm
} = defaultProps) => {
	const amountsByProductId = order.amountsByProductId || {};
	const total = calculateOrderTotal(order, products);
	const hasProducts: boolean = Object.keys(amountsByProductId).length > 0;

	return (
		<fieldset>
			<legend>
				Current order
			</legend>
			<ul>
				{
					Object.keys(amountsByProductId).map((productId: string) => {
						const product = products[productId]
						const amount = amountsByProductId[productId];
						const total = product.price * amount;

						return (
							<li key={ productId }>
								{ `${product.name} price: $${product.price} (${amount}) Total: $${total}` } 
							</li>
						)
					})
				}
			</ul>
			{
				hasProducts ? <hr/> : ' No products added.'
			}
			<p>
				{
					hasProducts ? `Total: $${total}` : 'Add some...'
				}
			</p>
			{
				hasProducts ?
				<button onClick={ () => onConfirm() }>
					Confirm
				</button> : null
			}
		</fieldset>
	)
}
import * as React from 'react';
import { ProductsList } from './ProductsList';
import { OrderView } from './OrderView';
import { Statistics } from './Statistics';
import { Order, Product, DataByIdMap, OrdersByIdMap, StatsByProductIdMap } from '../types';
import { prepareProductsStats } from '../utils';

export interface AppState {
	orders: OrdersByIdMap,
	currentOrder: Order
}

export interface PropTypes {
	products: DataByIdMap
}

export class App extends React.Component<PropTypes, AppState> {
	constructor (props: any) {
		super(props);

		const state: AppState = {
			orders: {},
			currentOrder: undefined
		};

		this.state = state;
		this.addProduct = this.addProduct.bind(this);
		this.confirmOrder = this.confirmOrder.bind(this);
	}

	addProduct (id: string): void {
		const product: Product = this.props.products[id];

		if (!product) {
			throw 'unknown product';
		}

		if (this.state.currentOrder) {
			const currentProductAmount = this.state.currentOrder.amountsByProductId[id] || 0;
			
			this.setState({
				currentOrder: {
					amountsByProductId: {
						...this.state.currentOrder.amountsByProductId,
						[id]: currentProductAmount + 1
					}
				}
			});
		} else {
			this.setState({
				currentOrder: {
					amountsByProductId: { [id]: 1 }
				}
			});
		}
	}

	confirmOrder (): void {
		this.setState({
			orders: {
				...this.state.orders,
				[`order-${ new Date().getTime() }`]: this.state.currentOrder
			},
			currentOrder: undefined
		});
	}

	render () {
		const statsData: StatsByProductIdMap = prepareProductsStats(this.state.orders, this.props.products);

		console.log(statsData);

		return (
			<div>
				<ProductsList
					products={ this.props.products }
					addProduct={ this.addProduct } />
				<OrderView
					order={ this.state.currentOrder }
					products={ this.props.products }
					onConfirm={ this.confirmOrder } />
			</div> 
		)
	}
}
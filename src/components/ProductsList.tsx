import * as React from 'react';
import { DataByIdMap } from '../types';

export interface PropTypes {
	products: DataByIdMap,
	addProduct: Function
}

export const ProductsList = ({ products, addProduct }: PropTypes) => {
	return (
		<ul>
			{
				Object.keys(products).map((id) => {
					const { name, price } = products[id];

					return (
						<li key={id}>
							<p>{`${ name } $${price}`}</p>
							<button onClick={ () => addProduct(id) }>
								Add
							</button>
						</li>
					)
				})
			}
		</ul>
	)
}
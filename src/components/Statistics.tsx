import * as React from 'react';
import { OrdersByIdMap } from '../types';

export interface PropTypes {
	orders: OrdersByIdMap,
}

const defaultProps: PropTypes = {
	orders: {}
}

export const Statistics = ({
	orders = defaultProps.orders
} = defaultProps) => {
	return (
		<div>

		</div>
	)
}
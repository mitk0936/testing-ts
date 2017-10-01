export interface Order {
	amountsByProductId: DataByIdMap
}

export interface OrdersByIdMap {
	[id: string]: Order
}

export interface DataByIdMap {
	[id: string]: any
}

export interface ProductsByIdMap {
	[id: string]: Product
}

export interface ProductStats {
	count: number,
	inOrders: String[]
}

export interface StatsByProductIdMap {
	[id: string]: ProductStats
}

export interface Product {
	name: string,
	id: string,
	price: number
}
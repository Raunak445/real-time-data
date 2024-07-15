interface DefaultStockType {
    name: string;
    code: string;
    volume: number;
    cap: number;
}

export interface ResponseStockType extends DefaultStockType {
    rate: number;
}

export interface CustomStockType extends DefaultStockType {
    rates: number[];
}
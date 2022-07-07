export type User = {
    username: string,
    password: string,
    customerId: string
}

export type Product = {
    _id: string,
    name: string,
    price: string
}

export enum Method {
    GET = 'GET',
    POST = 'POST'
}
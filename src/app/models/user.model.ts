export interface User {
    name: string
    balance: number
    transactions: Transaction[] | []
    imgUrl?: string
}

export interface Transaction {
    amount: number
    at: number
    to: string
    toId: string
}

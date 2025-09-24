export interface Contact {
    id: string,
    firstName: string,
    lastName: string,
    address: string,
    image: string,
    number: string,
    email: string,
    company: string
    isFavorite?: boolean //Es opcional(?)
}

export interface NewContactT {
    firstName: string,
    lastName: string,
    address: string,
    image: string,
    number: string,
    email: string,
    company: string
    isFavorite?: boolean //Es opcional(?)
}
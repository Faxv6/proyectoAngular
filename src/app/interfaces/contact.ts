export interface Contact {
    id: string,
    firstName: string,
    lastName: string,
    adress: string,
    image: string,
    number: string,
    email: string,
    company: string
    isFavourite?: boolean //Es opcional(?)
}

export interface NewContactT {
    firstName: string,
    lastName: string,
    adress: string,
    image: string,
    number: string,
    email: string,
    company: string
    isFavourite?: boolean //Es opcional(?)
}
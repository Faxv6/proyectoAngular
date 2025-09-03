export interface Contact {
    id: string,
    nombre: string,
    apellido: string,
    direccion: string,
    imagen: string,
    telefono: string,
    email: string,
    compania: string
    isFavourite?: boolean //Es opcional(?)
}

export interface NewContact {
    nombre: string,
    apellido: string,
    direccion: string,
    imagen: string,
    telefono: string,
    email: string,
    compania: string
    isFavourite?: boolean //Es opcional(?)
}
export interface Contact {
    nombre: string,
    apellido: string,
    direccion: string,
    imagen: string, 
    telefono: string,
    email: string,
    compania: string
    isFavourite?: boolean //Es opcional(?)
}
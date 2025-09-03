import { Injectable } from '@angular/core';
import { Contact, NewContact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  contacts: Contact[] = [
    {
      id: "0",
      nombre: "Facu",
      apellido: "Racca",
      direccion: "viamonte",
      telefono: "34133123",
      imagen: "",
      email: "facuracca@mail.com",
      compania: "",
      isFavourite: true
    },
    {
      id: "1",
      nombre: "Agus",
      apellido: "Fussi",
      direccion: "viamonte",
      imagen: "",
      telefono: "34133123",
      email: "agusfussi@mail.com",
      compania: ""

    },
    {
      id: "2",
      nombre: "Tomi",
      apellido: "Rosciolino",
      direccion: "calle 123",
      imagen: "",
      telefono: "34133123",
      email: "tomiros@mail.com",
      compania: ""
    }
  ]



  getContacts() { }
  getContactById() { }
  createContact(nuevoContacto: NewContact) {
    const contacto: Contact = {

      id: Math.random().toString(),
      ...nuevoContacto
    }
    this.contacts.push(contacto)
  }
  editContact() { }
  deleteContact(id: string) {
    this.contacts = this.contacts.filter(contact => contact.id !== id)
  }
  seetFavourite() { }

}

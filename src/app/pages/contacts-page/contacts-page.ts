import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import { ContactListItem } from '../../components/contact-list-item/contact-list-item';
import { Contact } from '../../interfaces/contact';

@Component({
  selector: 'app-contacts-page',
  imports: [RouterModule, ContactListItem],
  templateUrl: './contacts-page.html',
  styleUrl: './contacts-page.scss'
})
export class ContactsPage {

  contactos: Contact[] = [
    {
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
      nombre: "Agus",
      apellido: "Fussi",
      direccion: "viamonte",
      imagen: "",
      telefono: "34133123",
      email: "agusfussi@mail.com",
      compania: ""

    },
    {
      nombre: "Tomi",
      apellido: "Rosciolino",
      direccion: "viamonte",
      imagen: "",
      telefono: "34133123",
      email: "tomiros@mail.com",
      compania: ""
    }
  ]

}

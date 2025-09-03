import { Component, inject } from '@angular/core';
import { RouterModule } from "@angular/router";
import { ContactListItem } from '../../components/contact-list-item/contact-list-item';
import { Contact, NewContact } from '../../interfaces/contact';
import { ContactsService } from '../../services/contacts-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacts-page',
  imports: [RouterModule, ContactListItem, FormsModule],
  templateUrl: './contacts-page.html',
  styleUrl: './contacts-page.scss'
})
export class ContactsPage {

  contactService = inject(ContactsService)

  contactos: Contact[] = []

  createContact(form: any) {
    const nuevoContacto: NewContact = {
      nombre: form.firstName,
      apellido: form.lastName,
      direccion: form.address,
      email: form.email,
      imagen: form.image,
      telefono: form.number,
      compania: form.company,
      isFavourite: form.isFavorite
    }

    this.contactService.createContact(nuevoContacto)

  }
}

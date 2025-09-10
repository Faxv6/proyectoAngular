import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from "@angular/router";
import { ContactListItem } from '../../components/contact-list-item/contact-list-item';
import { Contact, NewContact } from '../../interfaces/contact';
import { ContactsService } from '../../services/contacts-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-contacts-page',
  imports: [RouterModule, ContactListItem, FormsModule, CommonModule],
  templateUrl: './contacts-page.html',
  styleUrl: './contacts-page.scss',
  standalone: true,

})
export class ContactsPage implements OnInit {
  ngOnInit(): void {
    this.contactService.getContacts();
  }


  contactService = inject(ContactsService)

  contactos: Contact[] = []

  createContact(form: any) {
    const nuevoContacto: NewContact = {
      firstName: form.firstName,
      lastName: form.lastName,
      adress: form.address,
      email: form.email,
      image: form.image,
      number: form.number,
      company: form.company,
      isFavourite: form.isFavorite
    }

    this.contactService.createContact(nuevoContacto)

  }
}

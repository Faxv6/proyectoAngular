import { inject, Injectable } from '@angular/core';
import { Contact, NewContact } from '../interfaces/contact';
import { AuthService } from './auth-service';


@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  authService = inject(AuthService);
  contacts: Contact[] = []



  async getContacts() {
    const res = await fetch("https://agenda-api.somee.com/api/contacts",
      {
        headers: {
          Authorization: "Bearer " + this.authService.token,
        }
      }
    )
    const resJson: Contact[] = await res.json()
    this.contacts = resJson;
  }
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
  setFavourite() { }

}

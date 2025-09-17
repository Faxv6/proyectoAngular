import { inject, Injectable } from '@angular/core';
import { Contact, NewContactT } from '../interfaces/contact';
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
  async createContact(nuevoContacto: NewContactT) {
    const res = await fetch("https://agenda-api.somee.com/api/contacts",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + this.authService.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoContacto)
      }
    );
    return res.ok;
  }
  editContact() { }
  deleteContact(id: string) {
    this.contacts = this.contacts.filter(contact => contact.id !== id)
  }
  setFavourite() { }

}

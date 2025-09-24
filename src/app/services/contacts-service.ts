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

  async getContactById(id: string | number) {
    const res = await fetch("https://agenda-api.somee.com/api/contacts" + "/" + id,
      {
        headers: {
          Authorization: "Bearer " + this.authService.token
        },
      }
    );
    if (!res.ok) return;
    const resContact: Contact = await res.json();
    return resContact

  }

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
  async editContact(contactoEditado: Contact) {
    const res = await fetch("https://agenda-api.somee.com/api/contacts" + "/" + contactoEditado.id,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + this.authService.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactoEditado)
      }
    );
    if (!res.ok) return;

    this.contacts = this.contacts.map(contact => {
      if (contact.id === contactoEditado.id) return contactoEditado;
      return contact
    })
  }

  async deleteContact(id: string | number) {
    const res = await fetch("https://agenda-api.somee.com/api/contacts" + "/" + id,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + this.authService.token
        }
      }
    );
    if (res.ok) {
      this.contacts = this.contacts.filter(contact => contact.id !== id)
      return true;
    } else {
      return false;
    }
  }
  async setfavorite(id: string | number) {
    const res = await fetch("https://agenda-api.somee.com/api/contacts" + "/" + id + "favorite",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + this.authService.token
        },
      }
    );
    if (!res.ok) return;
    this.contacts = this.contacts.map(contact => {
      if (contact.id === id) {
        return { ...contact, isFavorite: !contact.isFavorite };
      }
      return contact;
    });
    return true
  }
}

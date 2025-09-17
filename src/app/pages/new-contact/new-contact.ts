import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewContactT } from '../../interfaces/contact';
import { ContactsService } from '../../services/contacts-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-contact',
  imports: [FormsModule, CommonModule],
  templateUrl: './new-contact.html',
  styleUrl: './new-contact.scss'
})
export class NewContactComponent {
  contactService = inject(ContactsService)
  router = inject(Router)
  contactoCreado = true; // or true, depending on your logic


  async createContact(form: any) {
    const nuevoContacto: NewContactT = {
      firstName: form.firstName,
      lastName: form.lastName,
      adress: form.adress,
      email: form.email,
      image: form.image,
      number: form.number,
      company: form.company,
      isFavourite: form.isFavourite
    };

    if (await this.contactService.createContact(nuevoContacto)) {
      console.log("AAAAAAA");
      this.router.navigate(['/contacts']);
    } else {
      this.contactoCreado = false;
    }
  }
}

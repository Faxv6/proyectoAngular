import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from "@angular/router";
import { ContactListItem } from '../../components/contact-list-item/contact-list-item';
import { Contact } from '../../interfaces/contact';
import { ContactsService } from '../../services/contacts-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-contacts-page',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './contacts-page.html',
  styleUrl: './contacts-page.scss',
  standalone: true,

})
export class ContactsPage implements OnInit {
  isLoading = false;

  newContactForm: any;
  ngOnInit(): void {
    this.contactService.getContacts();
  }

  contactService = inject(ContactsService)

  contactos: Contact[] = []

  /*async deletingContact(form: { email: string, password: string }) {

    this.isLoading = true;
    await this.contactService.deleteContact();
    this.isLoading = false;
  }*/

    
}

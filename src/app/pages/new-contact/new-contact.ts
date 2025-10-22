import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { inject, viewChild } from '@angular/core';
import { Contact, NewContactT } from '../../interfaces/contact';
import { ContactsService } from '../../services/contacts-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Spinner } from '../../components/spinner/spinner';

@Component({
  selector: 'app-new-edit-contact',
  imports: [FormsModule, Spinner],
  templateUrl: './new-contact.html',
  styleUrl: './new-contact.scss'
})
export class NewEditContact implements OnInit {
  contactsService = inject(ContactsService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  errorEnBack = false;

  idContacto: string | null = null;

  contactoOriginal: Contact | undefined = undefined;
  form = viewChild<NgForm>('newContactForm');
  isLoading = false;
  isEditMode = false;

  async ngOnInit() {
    this.idContacto = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.idContacto;


    if (this.isEditMode && this.idContacto) {
      this.contactoOriginal = await this.contactsService.getContactById(this.idContacto);


      setTimeout(() => {
        if (this.contactoOriginal && this.form()) {

          this.form()?.form.setValue({
            firstName: this.contactoOriginal.firstName || '',
            lastName: this.contactoOriginal.lastName || '',
            number: this.contactoOriginal.number || '',
            email: this.contactoOriginal.email || '',
            isFavourite: this.contactoOriginal.isFavorite || false,
            address: this.contactoOriginal.address || '',
            company: this.contactoOriginal.company || '',
            image: this.contactoOriginal.image || ''
          });
        }
      }, 200);
    }
  }
  async handleFormSubmission(form: NgForm) {
    this.errorEnBack = false;
    const nuevoContacto: NewContactT = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      address: form.value.address,
      email: form.value.email,
      image: form.value.image,
      number: form.value.number,
      company: form.value.company,
      isFavorite: form.value.isFavorite
    }
    this.isLoading = true;
    let res;
    if (this.isEditMode && this.idContacto) {
      res = await this.contactsService.editContact({ ...nuevoContacto, id: this.idContacto });
    } else {
      res = await this.contactsService.createContact(nuevoContacto);
    }
    this.isLoading = false;
    if (!res) {
      this.errorEnBack = true;
      return;
    }
    this.router.navigate([""]);
  }
}
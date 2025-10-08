import { Component, inject, input, OnInit, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Contact, NewContactT } from '../../interfaces/contact';
import { ContactsService } from '../../services/contacts-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Spinner } from "../../components/spinner/spinner";


@Component({
  selector: 'app-new-contact',
  imports: [FormsModule, CommonModule, Spinner],
  templateUrl: './new-contact.html',
  styleUrl: './new-contact.scss'
})
export class NewContactComponent implements OnInit {
  contactService = inject(ContactsService)
  router = inject(Router)
  contactoCreado = true;
  idContacto = input<number>();
  contactoOriginal: Contact | undefined = undefined;
  form = viewChild<NgForm>("newContactForm")
  isLoading = false

  async ngOnInit() {
    if (this.idContacto()) {
      this.contactoOriginal = await this.contactService.getContactById(this.idContacto()!);
      this.form()?.setValue({
        firstName: this.contactoOriginal!.firstName,
        lastName: this.contactoOriginal!.lastName,
        address: this.contactoOriginal!.address,
        email: this.contactoOriginal!.email,
        image: this.contactoOriginal!.image,
        number: this.contactoOriginal!.number,
        company: this.contactoOriginal!.company,
        favorite: this.contactoOriginal!.isFavorite
      })
    }
  }
  async handleFormSubmission(form: NgForm) {
    console.log(form, this.idContacto())
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
    if (this.idContacto()) {
      res = await this.contactService.editContact({ ...nuevoContacto, id: this.idContacto()!.toString() })
    } else {
      res = await this.contactService.createContact(nuevoContacto)
    }
    this.isLoading = false;
    this.router.navigate(["/"])


    if (await this.contactService.createContact(nuevoContacto)) {
      console.log("AAAAAAA");
      this.router.navigate(['']);
    } else {
      this.contactoCreado = false;
    }
  }
}

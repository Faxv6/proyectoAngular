import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from "@angular/router";
import { Contact } from '../../interfaces/contact';
import { ContactsService } from '../../services/contacts-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2'


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
  deleteContactModal(id: string | number) {

    Swal.fire({
      title: "¿Querés borrar el contacto?",
      showConfirmButton: false,
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: `Borrar`,
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isDenied) {
        this.contactService.deleteContact(id)
        Swal.fire("Usuario eliminado");
      } 
    });
  }

}

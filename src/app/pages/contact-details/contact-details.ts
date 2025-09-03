import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContactsService } from '../../services/contacts-service';

@Component({
  selector: 'app-contact-details',
  imports: [RouterModule],
  templateUrl: './contact-details.html',
  styleUrl: './contact-details.scss'
})
export class ContactDetails {
  contactService = inject(ContactsService)

}

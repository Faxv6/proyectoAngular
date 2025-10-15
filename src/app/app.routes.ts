import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { ContactsPage } from './pages/contacts-page/contacts-page';
import { ContactDetails } from './pages/contact-details/contact-details';
import { RegisterPage } from './pages/register-page/register-page';
import { LoggedLayout } from './logged-layout/logged-layout';
import { onlyPublicUserGuard } from './guards/only-public-user-guard';
import { onlyLoggedUserGuard } from './guards/only-logged-user-guard';
import { NewEditContact } from './pages/new-contact/new-contact';

export const routes: Routes = [
    {
        path: "login",
        component: LoginPage,
        canActivate: [onlyPublicUserGuard]
    },

    {
        path: "register",
        component: RegisterPage,
        canActivate: [onlyPublicUserGuard]
    },
    {
        path: "",
        component: LoggedLayout,
        canActivateChild: [onlyLoggedUserGuard],
        children: [
            {
                path: "",
                component: ContactsPage
            },
            {
                path: "contact-details/:id",
                component: ContactDetails
            }, {
                path: "new-contact",
                component: NewEditContact
            },
            {
                path: "edit-contact/:id/edit",
                component: NewEditContact
            }
        ]
    }
];


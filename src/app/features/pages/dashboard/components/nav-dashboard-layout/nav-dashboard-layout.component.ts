import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookComponent } from '../../../../../shared/components/icons/book/book.component';
import { CategoryComponent } from '../../../../../shared/components/icons/category/category.component';
import { BagComponent } from '../../../../../shared/components/icons/bag/bag.component';
import { PersonComponent } from '../../../../../shared/components/icons/person/person.component';
import { DashboardSidebarComponent } from '../dashboard-sidebar/dashboard-sidebar.component';
import { ClientsComponent } from '../../clients/clients.component';
import { ClientComponent } from '../../../../../shared/components/icons/client/client.component';

@Component({
  selector: 'app-nav-dashboard-layout',
  imports: [RouterModule, DashboardSidebarComponent],
  templateUrl: './nav-dashboard-layout.component.html',
  styleUrl: './nav-dashboard-layout.component.css',
})
export class NavDashboardLayoutComponent {
  personIcon = PersonComponent;
  bookIcon = BookComponent;
  categoryIcon = CategoryComponent;
  bagIcon = BagComponent;
  clientIcon = ClientComponent;

  showModal = false;

  toggleModal() {
    this.showModal = !this.showModal;
  }
}

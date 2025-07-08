import { Component, Input, Type, Injector } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-active-nav-dashboard-layout',
  imports: [RouterModule, NgComponentOutlet],
  templateUrl: './active-nav-dashboard-layout.component.html',
  styleUrl: './active-nav-dashboard-layout.component.css',
})
export class ActiveNavDashboardLayoutComponent {
  @Input() link!: string;
  @Input() label!: string;
  @Input() iconComponent!: Type<any>;

  constructor(private router: Router, private injector: Injector) {}

  get isActive(): boolean {
    return this.router.isActive(this.link, {
      paths: 'exact',
      queryParams: 'ignored',
      matrixParams: 'ignored',
      fragment: 'ignored',
    });
  }

  createIconInjector(): Injector {
    return Injector.create({
      providers: [
        {
          provide: 'color',
          useValue: this.isActive ? '#087F5B' : '#495057',
        },
      ],
      parent: this.injector,
    });
  }
}

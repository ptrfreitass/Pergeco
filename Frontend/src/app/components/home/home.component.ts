import { Component, HostListener, OnInit, signal } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MainComponent } from "../main/main.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SidebarComponent,
    MainComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  isSidebarCollapsed = signal<boolean>(false);

  screenWidth = signal<number>(window.innerWidth);


  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth); 
    if (this.screenWidth() < 768) {
      this.isSidebarCollapsed.set(true);
    }
  }

  ngOnInit(): void {
    this.isSidebarCollapsed.set(this.screenWidth() < 768 );
  }

  changeIsSidebarCollapsed(isSidebarCollapsed: boolean): void {
    this.isSidebarCollapsed.set(isSidebarCollapsed);
  }
}

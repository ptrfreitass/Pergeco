import { Component, input, output } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isSidebarCollapsed = input.required<boolean>();
  changeIsSidebarCollapsed = output<boolean>();
  userName: string = '';
  isDarkMode = false;
  openSubmenu: string | null = null;

  constructor(private authService: AuthService) {
    const user = this.authService.getUser();
    this.userName = user?.name || 'Usuário';
  }

  logout() {
    this.authService.logout();
  }

  toggleCollapse(): void {
    this.changeIsSidebarCollapsed.emit(!this.isSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsSidebarCollapsed.emit(true);
  }

  toggleSubmenu(item: any) {
    this.openSubmenu = (this.openSubmenu === item.label) ? null : item.label;
  }

  handleSubmenuClick(item: any) {
    if (item.submenu) {
      if (this.isSidebarCollapsed()) {
        // Se colapsada, redireciona diretamente
        window.location.href = item.routeLink;
      } else {
        this.toggleSubmenu(item);
      }
    }
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }

  items = [
    {
      routeLink: '/dashboard',
      icon: 'fal fa-home',
      label: 'Dashboard'
    },
    {
      routeLink: '/financas',
      icon: 'fal fa-coins',
      label: 'Finanças',
      submenu: [
        { route: '/financas/painel', icon: 'bi bi-clipboard-data', label: 'Visão Geral' },
        { route: '/financas/novo-registro', icon: 'bi bi-plus-circle', label: 'Novo Registro' },
        { route: '/financas/importar-extrato', icon: 'bi bi-plus-circle', label: 'Importar Extrato' },
        { route: '/financas/previsao', icon: 'bi bi-calendar2-week', label: 'Previsão' },
        { route: '/financas/categorias', icon: 'bi bi-tags', label: 'Categorias' },
        { route: '/financas/historico', icon: 'bi bi-clock-history', label: 'Histórico' },
        { route: '/financas/dividas', icon: 'bi bi-exclamation-circle', label: 'Dívidas' },
        { route: '/financas/ajustes', icon: 'bi bi-sliders', label: 'Ajustes' }
      ]
    },
    {
      routeLink: '/estoque',  
      icon: 'bi bi-box-seam',
      label: 'Estoque'
    },
    {
      routeLink: '/familia',
      icon: 'bi bi-people-fill',
      label: 'Família',
      submenu: [
        { route: '/familia/painel-familiar', icon: 'bi bi-bar-chart-line', label: 'Visão Geral' },
        { route: '/familia/divisao-despesas', icon: 'bi bi-cash-stack', label: 'Despesas' },
        { route: '/familia/estoque-conjunto', icon: 'bi bi-box-seam', label: 'Estoque Conjunto' },
        { route: '/familia/privacidade', icon: 'bi bi-shield-lock', label: 'Privacidade' },
        { route: '/familia/ajustes', icon: 'bi bi-sliders', label: 'Ajustes' }
      ]
    },
  ];
}

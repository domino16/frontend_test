import { ChangeDetectionStrategy, Component, inject, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { SettingsPopupComponent } from './components/settings-popup/settings-popup.component';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    SettingsPopupComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly dataService = inject(DataService);

  isSettingsPopupOpen:WritableSignal<boolean> = this.dataService.isSettingsPopupOpen
}

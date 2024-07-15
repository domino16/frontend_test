import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';
import { CloseComponentIfClickedOutsideDirective } from '../../directives/close-component-if-clicked-outside.directive';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CloseComponentIfClickedOutsideDirective, FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  private readonly dataService = inject(DataService);

  inputValue: boolean = false;

  onResetClick() {
    this.dataService.resetPage();
  }

  onAddNameClick() {
    this.dataService.onAddNameToHeaderBtnClick();
  }

  closeDropdownIfClickedOutside() {
    this.inputValue = false;
  }
}

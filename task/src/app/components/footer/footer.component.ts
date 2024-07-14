import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  private readonly dataService = inject(DataService)


onResetClick(){
this.dataService.resetPage();
}


onAddNameClick(){
  this.dataService.handleAddNameToHeaderBtnClick();
}

}

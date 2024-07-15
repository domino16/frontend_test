import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-second-block',
  standalone: true,
  imports: [],
  templateUrl: './second-block.component.html',
  styleUrl: './second-block.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SecondBlockComponent {
  private readonly dataService = inject(DataService);

  onReplaceClick($event:MouseEvent){
    this.dataService.onReplaceBtnClick();
  }

  onAddClick($event:MouseEvent){
    this.dataService.onAddBtnClick();
  }
}

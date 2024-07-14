import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-first-block',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './first-block.component.html',
  styleUrl: './first-block.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FirstBlockComponent implements OnDestroy {
  private readonly dataService = inject(DataService);

  optionsForm = new FormGroup({
    option: new FormControl('first'),
  });

  optionsSubscription = this.optionsForm.valueChanges.subscribe((value) =>
    this.dataService.currentOption.set(
      value.option as 'first' | 'second' | 'third'
    )
  );

  currentOptionEffect = effect(() => {
    const formControlOption = this.optionsForm.controls.option;
    const signalValue = this.dataService.currentOption();

    if (formControlOption.value !== (signalValue as string))
      formControlOption.setValue(signalValue);
  });

  ngOnDestroy(): void {
    this.optionsSubscription.unsubscribe();
  }
}

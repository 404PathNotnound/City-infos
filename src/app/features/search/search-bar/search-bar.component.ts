import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {



  protected readonly searchRequested = output<string>();
  protected readonly searchInput = new FormControl('', { nonNullable: true });
  protected  submitIsDisabled: boolean = false;

  constructor() {
    this.searchInput.valueChanges.subscribe(()=>this.submitIsDisabled= false)
  }

  submit(): void {
    this.searchRequested.emit(this.searchInput.value);
    this.submitIsDisabled = true
  }
}

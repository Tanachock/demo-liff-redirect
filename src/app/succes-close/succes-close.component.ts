import { Component } from '@angular/core';
import liff from '@line/liff';

@Component({
  selector: 'app-succes-close',
  templateUrl: './succes-close.component.html',
  styleUrls: ['./succes-close.component.scss']
})
export class SuccesCloseComponent {

  close() {
    liff.closeWindow();
  }
}

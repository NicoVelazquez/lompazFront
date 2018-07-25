import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DateValidation} from '../../shared/validators/date-validation';
import {BannerService} from '../../shared/services/banner.service';
import * as UIkit from 'uikit';

@Component({
  selector: 'app-edit-banner',
  templateUrl: './edit-banner.component.html',
  styleUrls: ['./edit-banner.component.css']
})
export class EditBannerComponent implements OnInit {

  public editBannerForm: FormGroup;
  bannerIdToEdit;

  constructor(private fb: FormBuilder, private bannerService: BannerService) {
    // this.editBannerForm = fb.group({
    //   'startDateE': new FormControl(null, [Validators.required, isValidStartDate]),
    //   'finishDateE': new FormControl(null, [Validators.required]),
    // }, {
    //   validator: DateValidation.GreaterThanDate
    // });
  }

  ngOnInit() {
  }

  editBanner(id: number) {
    this.bannerIdToEdit = id;
  }

  confirmEditBanner() {
    // Hacer el update del banner TODO
    // this.editBannerForm.value;
    console.log('Queda editado');
    UIkit.notification({
      message: 'Banner modificado exitosamente',
      status: 'primary',
      pos: 'top-right'
    });
  }

}

function isValidStartDate(input: FormControl) {
  const startDate = Date.parse(input.value);
  const today = new Date().getTime();

  if (startDate > today) {
    return null;
  } else {
    return {notValidDate: true};
  }
}

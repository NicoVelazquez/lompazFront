import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DateValidation} from '../../../shared/validators/date-validation';
import {BannerService} from '../../../shared/services/banner.service';
import * as UIkit from 'uikit';

@Component({
  selector: 'app-edit-banner',
  templateUrl: './edit-banner.component.html',
  styleUrls: ['./edit-banner.component.css']
})
export class EditBannerComponent implements OnInit {

  public editBannerForm: FormGroup;
  public bannerToEdit: any;

  constructor(private fb: FormBuilder, private bannerService: BannerService) {
    this.editBannerForm = fb.group({
      'name': new FormControl(null, [Validators.required]),
      'startDate': new FormControl(null, [Validators.required, isValidStartDate]),
      'finishDate': new FormControl(null, [Validators.required]),
    }, {
      validator: DateValidation.GreaterThanDate
    });
  }

  ngOnInit() {
  }

  editBanner(banner: any) {
    this.bannerToEdit = banner;
    this.editBannerForm.setValue({
      name: this.bannerToEdit.name,
      startDate: this.bannerToEdit.startDate,
      finishDate: this.bannerToEdit.finishDate
    });
  }

  confirmEditBanner() {
    this.bannerToEdit.name = this.editBannerForm.value.name;
    this.bannerToEdit.startDate = this.editBannerForm.value.startDate;
    this.bannerToEdit.finishDate = this.editBannerForm.value.finishDate;
    this.bannerService.updateBanner(this.bannerToEdit).then(() => {
      this.bannerToEdit = null;
      UIkit.notification({
        message: 'Banner modificado exitosamente',
        status: 'primary',
        pos: 'top-right'
      });
    });
  }

  cancelEditBanner() {
    this.bannerToEdit = null;
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

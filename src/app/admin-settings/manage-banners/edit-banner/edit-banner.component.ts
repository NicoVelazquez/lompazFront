import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DateValidation} from '../../../shared/validators/date-validation';
import {BannerService} from '../../../shared/services/banner.service';
import * as UIkit from 'uikit';
import {toDate} from '@angular/common/src/i18n/format_date';

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
      startDate: this.toMyDate(new Date(this.bannerToEdit.startDate)),
      finishDate: this.toMyDate(new Date(this.bannerToEdit.finishDate))
    });
  }

  toMyDate(date: any): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return year + '-' + month + '-' + day;
  }

  confirmEditBanner() {
    this.bannerToEdit.name = this.editBannerForm.value.name;
    this.bannerToEdit.startDate = Date.parse(this.editBannerForm.value.startDate) + 86400000;
    this.bannerToEdit.finishDate = Date.parse(this.editBannerForm.value.finishDate) + 86400000;
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

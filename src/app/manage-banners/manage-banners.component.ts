import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DateValidation} from '../shared/validators/date-validation';
import * as UIkit from 'uikit';
import {BannerService} from '../shared/services/banner.service';
import {EditBannerComponent} from './edit-banner/edit-banner.component';

@Component({
  selector: 'app-manage-banners',
  templateUrl: './manage-banners.component.html',
  styleUrls: ['./manage-banners.component.css']
})
export class ManageBannersComponent implements OnInit {

  url: any;
  showSpinner = false;
  public bannerForm: FormGroup;
  addBannerText = 'Agregar Banner';
  banners = [];
  bannerIdToDelete;

  @ViewChild(EditBannerComponent) child: EditBannerComponent;

  constructor(private fb: FormBuilder, private bannerService: BannerService) {
    this.bannerForm = fb.group({
      'startDate': new FormControl(null, [Validators.required, isValidStartDate]),
      'finishDate': new FormControl(null, [Validators.required]),
    }, {
      validator: DateValidation.GreaterThanDate
    });
  }

  ngOnInit() {
    this.banners = this.bannerService.getBanners();
  }

  readUrl(event: any) {
    // Arreglar bien esto TODO
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
      this.addBannerText = 'Elige el periodo del banner:';

      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (event2: ProgressEvent) => {
          this.url = (<FileReader>event2.target).result;
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }, 1000);
  }

  closeBanner() {
    this.url = null;
    this.addBannerText = 'Agregar Banner';
  }

  addBanner() {
    console.log(this.bannerForm.value);
    this.closeBanner();
    UIkit.notification({
      message: 'Banner agregado exitosamente',
      status: 'primary',
      pos: 'top-right'
    });
    this.bannerForm.reset();
  }

  displaySpinner() {
    // this.showSpinner = true;
    // setTimeout(() => { this.showSpinner = false; }, 4000);
  }

  hideSpinner() {
    // this.showSpinner = false;
  }

  confirmDeleteBanner() {
    // Eliminar el banner de la base de datos tambien TODO
    for (let i = 0; i <= this.banners.length; i++) {
      if (this.banners[i].id === this.bannerIdToDelete) {
        this.banners.splice(i, 1);
        break;
      }
    }
    UIkit.notification({
      message: 'Banner eliminado exitosamente',
      status: 'primary',
      pos: 'top-right'
    });
    UIkit.modal('#confirmDeleteBanner').hide();
  }

  deleteBanner(id: number) {
    this.bannerIdToDelete = id;
  }

  editBanner(id: number) {
    this.child.editBanner(id);
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

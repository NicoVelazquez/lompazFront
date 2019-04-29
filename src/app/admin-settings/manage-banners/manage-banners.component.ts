import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DateValidation} from '../../shared/validators/date-validation';
import * as UIkit from 'uikit';
import {BannerService} from '../../shared/services/banner.service';
import {EditBannerComponent} from './edit-banner/edit-banner.component';


@Component({
  selector: 'app-manage-banners',
  templateUrl: './manage-banners.component.html',
  styleUrls: ['./manage-banners.component.css']
})
export class ManageBannersComponent implements OnInit {

  photos = [];
  photosFiles = [];
  showSpinner = false;
  public bannerForm: FormGroup;
  saveBannerText = 'Guardar';
  banners = [];
  bannerIdToDelete;

  @ViewChild(EditBannerComponent) child: EditBannerComponent;

  constructor(private fb: FormBuilder, private bannerService: BannerService) {
    this.bannerForm = fb.group({
      'name': new FormControl(null, [Validators.required]),
      'startDate': new FormControl(null, [Validators.required, isValidStartDate]),
      'finishDate': new FormControl(null, [Validators.required]),
    }, {
      validator: DateValidation.GreaterThanDate
    });
  }

  ngOnInit() {
    this.bannerService.getAllBanners().subscribe(data => {
      this.banners = data;
      console.log(this.banners);
    });
  }

  readUrl(event: any) {
    // Arreglar bien esto TODO
    this.showSpinner = true;


    setTimeout(() => {
      this.showSpinner = false;
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (event2: ProgressEvent) => {
          this.photosFiles.push(event.target.files[0]);
          this.photos.push((<FileReader>event2.target).result);
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }, 1000);

  }

  closeBanner() {
    this.photos = [];
    this.photosFiles = [];
  }

  addBanner() {
    (<HTMLInputElement>document.getElementById('saveBannerButton')).disabled = true;
    this.saveBannerText = 'Procesando...';
    const newBanner = {
      name: this.bannerForm.value.name,
      startDate: this.bannerForm.value.startDate,
      finishDate: this.bannerForm.value.finishDate,
      photoUrl: [],
    };

    // TODO Poner los .catch devuelta bien
    // Fijarme como hacer para pasar el id y arreglo de fotos
    this.bannerService.addBannerPhotos(newBanner.name, this.photosFiles[0]).then(data => {
      data.subscribe(url => {
        newBanner.photoUrl.push(url);
        this.bannerService.addBanner(newBanner).then(() => {
          UIkit.notification({
            message: 'Banner agregado exitosamente',
            status: 'primary',
            pos: 'top-right'
          });
          this.closeBanner();
          this.bannerForm.reset();
          this.photos = [];
          this.photosFiles = [];
          this.saveBannerText = 'Guardar';
        }).catch(productErr => {
          UIkit.notification({
            message: 'Banner no se ha agregado exitosamente',
            status: 'danger',
            pos: 'top-right'
          });
          console.log(productErr);
        });
      });
    });

  }

  confirmDeleteBanner() {
    this.bannerService.deleteBanner(this.bannerIdToDelete).then(() => {
      UIkit.modal('#confirmDeleteBanner').hide();
      UIkit.notification({
        message: 'Banner eliminado exitosamente',
        status: 'primary',
        pos: 'top-right'
      });
    });
  }

  deleteBanner(id: number) {
    this.bannerIdToDelete = id;
  }

  editBanner(banner: any) {
    this.child.editBanner(banner);
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

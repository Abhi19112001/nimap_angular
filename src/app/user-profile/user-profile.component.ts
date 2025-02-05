import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { User } from '../user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

export interface Tags {
  name: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: UserServiceService,
    private formBuilder: FormBuilder
  ) {}
  visible = true;
  selectable: boolean = true;
  removable = true;
  addOnBlur = true;
  //readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  myTag: string;

  id: number;
  editForm: FormGroup;
  editPhotoForm: FormGroup;
  profPic = null;
  profileData: User = null;
  homeHide: boolean = true;
  companyHide: boolean = true;
  age: number;
  imageValid: boolean = true;
  //tagdata = [];
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.editForm = this.formBuilder.group({
      id: [''],
      firstName: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z]{1,20}$')],
      ],
      lastName: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[0-9]*[a-zA-Z]([-.w]*[0-9a-zA-Z])*@([a-zA-Z][-w.]*[0-9a-zA-Z].)+[a-zA-Z]{2,9}$'
          ),
        ],
      ],
      contactNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      age: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      address1: [{ value: '', disabled: true }, Validators.required],
      address2: [{ value: '', disabled: true }, Validators.required],
      companyAddress1: [{ value: '', disabled: true }, Validators.required],
      companyAddress2: [{ value: '', disabled: true }, Validators.required],
      tags: [''],
      newsLetter: [''],
      profilePhoto: [''],
    });

    this.editPhotoForm = this.formBuilder.group({
      id: [''],
      profilePhoto: [''],
    });

    this.service.getData(this.id).subscribe((res) => {
      this.myTag = res.tags;
      // for (var i = 0; i < data.length; i++) {
      //   this.tagdata.push(data[i]['name']);
      // }
      this.profileData = res;
      this.editForm.controls['newsLetter'].setValue(res['newsLetter']);
    });
  }
  editProfile(id: string) {
    this.service.getData(this.id).subscribe((res) => {
      if (res['address'] == '1') {
        this.homeHide = false;
        this.companyHide = true;
        this.editForm.controls['address1'].enable();
        this.editForm.controls['address2'].enable();
        this.editForm.controls['id'].setValue(res['id']);
        this.editForm.controls['firstName'].setValue(res['firstName']);
        this.editForm.controls['lastName'].setValue(res['lastName']);
        this.editForm.controls['email'].setValue(res['email']);
        this.editForm.controls['contactNo'].setValue(res['contactNo']);
        this.editForm.controls['age'].setValue(res['age']);
        this.age = res['age'];
        this.editForm.controls['state'].setValue(res['state']);
        this.editForm.controls['country'].setValue(res['country']);
        this.editForm.controls['address'].setValue(res['address']);
        this.editForm.controls['address1'].setValue(res['address1']);
        this.editForm.controls['address2'].setValue(res['address2']);
        this.editForm.controls['newsLetter'].setValue(res['newsLetter']);
        this.profPic = res['profilePhoto'];
        this.editForm.controls['tags'].setValue(res['tags']);
        // var tagdata = JSON.parse(res['tags']);
        // for (var i = 0; i < tagdata.length; i++) {
        //   this.myTag.push(tagdata[i]);
        // }
      }
      if (res['address'] == '2') {
        this.homeHide = true;
        this.companyHide = false;
        this.editForm.controls['companyAddress1'].enable();
        this.editForm.controls['companyAddress2'].enable();
        this.editForm.controls['id'].setValue(res['id']);
        this.editForm.controls['firstName'].setValue(res['firstName']);
        this.editForm.controls['lastName'].setValue(res['lastName']);
        this.editForm.controls['email'].setValue(res['email']);
        this.editForm.controls['contactNo'].setValue(res['contactNo']);
        this.editForm.controls['age'].setValue(res['age']);
        this.age = res['age'];
        this.editForm.controls['state'].setValue(res['state']);
        this.editForm.controls['country'].setValue(res['country']);
        this.editForm.controls['address'].setValue(res['address']);
        this.editForm.controls['companyAddress1'].setValue(
          res['companyAddress1']
        );
        this.editForm.controls['companyAddress2'].setValue(
          res['companyAddress2']
        );
        this.editForm.controls['newsLetter'].setValue(res['newsLetter']);
        this.profPic = res['profilePhoto'];
        this.editForm.controls['tags'].setValue(res['tags']);
        // var tagdata = JSON.parse(res['tags']);
        // for (var i = 0; i < tagdata.length; i++) {
        //   this.myTag.push(tagdata[i]);
        // }
      }
    });
  }

  imagePreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.checkres(event);
      var reader = new FileReader();
      reader.onload = (event) => {
        this.profPic = (<FileReader>event.target).result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  checkres(event: any) {
    let file = event.target.files && event.target.files[0];
    var img = new Image();
    img.src = window.URL.createObjectURL(file);
    var data: boolean = true;
    var me = this;
    img.onload = function () {
      var width = img.naturalWidth,
        height = img.naturalHeight;
      window.URL.revokeObjectURL(img.src);
      if (width == 310 && height == 325) {
        me.imageValid = true;
      } else {
        me.imageValid = false;
      }
    };
  }

  rangedata(agevalue: any) {
    this.age = agevalue.target.value;
  }

  displayAddress(address: any) {
    if (address == '1') {
      this.companyHide = true;
      this.homeHide = false;
      this.editForm.controls['address1'].enable();
      this.editForm.controls['address2'].enable();
      this.editForm.controls['companyAddress1'].disable();
      this.editForm.controls['companyAddress2'].disable();
    }
    if (address == '2') {
      this.homeHide = true;
      this.companyHide = false;
      this.editForm.controls['companyAddress1'].enable();
      this.editForm.controls['companyAddress2'].enable();
      this.editForm.controls['address1'].disable();
      this.editForm.controls['address2'].disable();
    }
  }

  submiteditForm(editFormData: User) {
    editFormData.profilePhoto = this.profPic;
    //editFormData.tags = JSON.stringify(this.myTag);
    this.service.updateData(editFormData).subscribe();
    window.location.reload();
    alert('profile update Succesfully');
  }

  editPhoto(id: any) {
    this.service.getData(this.id).subscribe((res) => {
      this.editPhotoForm.controls['id'].setValue(res['id']);
      this.profPic = res['profilePhoto'];
    });
  }

  submiteditPhoto(editPhotoData: any) {
    editPhotoData.profilePhoto = this.profPic;
    this.service.updateProfileData(editPhotoData).subscribe();
    window.location.reload();
    alert('photo update Succesfully');
  }

  closeModal() {
    this.ngOnInit();
  }

  // add(event: MatChipInputEvent): void {
  //   const input = event.input;
  //   const value = event.value;

  //   // Add our Tag
  //   if ((value || '').trim()) {
  //     this.myTag.push({ name: value.trim() });
  //   }

  //   // Reset the input value
  //   if (input) {
  //     input.value = '';
  //   }
  // }

  // remove(tags: Tags): void {
  //   const index = this.myTag.indexOf(tags);

  //   if (index >= 0) {
  //     this.myTag.splice(index, 1);
  //   }
  // }
}

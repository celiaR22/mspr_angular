import { Component, OnInit } from '@angular/core';
import { User, UserInformation } from '../../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  user: User;
  constructor(private fb: FormBuilder, private userService: UserService) {}
  ngOnInit() {
    this.userService.getUserByUser().subscribe((value) => {
      console.log(value);
    });

    this.profileForm = this.fb.group({
      firstName: [this.user.firstname, Validators.required],
      lastName: [this.user.lastname, Validators.required],
      email: [
        this.user.email,
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      phone: [
        this.user.phone,
        [Validators.required, Validators.pattern('[0][1-9][0-9]{8}')],
      ],
      birthdate: [this.user.birthdate, Validators.required],
    });
  }

  profileForm: FormGroup;
  isEditMode = false;
  file: File;
  file_store: FileList;
  file_list: Array<string> = [];

  imageUrl: any = '../../assets/image/avatar.png';

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    console.log(this.file);

    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };

    reader.readAsDataURL(this.file);
  }

  handleSubmit(): void {}
  get firstName() {
    return this.profileForm.get('firstName');
  }

  get lastName() {
    return this.profileForm.get('lastName');
  }

  get email() {
    return this.profileForm.get('email');
  }

  get phone() {
    return this.profileForm.get('phone');
  }

  onEdit() {
    this.isEditMode = true;
    this.profileForm.enable();
  }

  onSubmit() {
    console.log(this.profileForm.value);
    if (this.profileForm.valid) {
      this.isEditMode = false;
      this.profileForm.enable();
    }
  }

  onCancel() {
    this.isEditMode = false;
    this.profileForm.enable();
  }

  getFormData(data: any): User {
    return {
      email: data.email,
      password: data.password,
      firstname: data.firstname,
      lastname: data.lastname,
      birthdate: data.birthdate,
      phone: data.phoneNumber,
    };
  }
}

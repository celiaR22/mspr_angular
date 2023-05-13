import { Component, OnInit } from '@angular/core';
import { User, UserInformation } from '../../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  user: User;
  userInformation: UserInformation;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit() {
    this.loadData();
    this.createForm();
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
  getFormData(data: any): User {
    return {
      email_user: data.email,
      password_user: data.password,
      firstname_user: data.firstname,
      lastname_user: data.lastname,
      birthdate_user: data.birthdate,
      phone_user: data.phoneNumber,
    };
  }
  onSubmit() {
    if (this.profileForm.valid) {
      const data = this.getFormData(this.profileForm.value);
      this.userService.updateUser(data).subscribe({
        next: (value) => {
          this.user = data;
          this.isEditMode = false;
          this.profileForm.enable();
          console.log(value);
        },
        error: (error: any) => {
          this.snackBar.open(error.error.message, 'X', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
      });
    }
  }

  onCancel() {
    this.isEditMode = false;
    this.profileForm.enable();
  }
  createForm() {
    this.profileForm = this.fb.group({
      firstname: [this.user?.firstname_user, Validators.required],
      lastname: [this.user?.lastname_user, Validators.required],
      email: [
        this.user?.email_user,
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      phone: [
        this.user?.phone_user,
        [Validators.required, Validators.pattern('[0][1-9][0-9]{8}')],
      ],
      birthdate: [this.user?.birthdate_user, Validators.required],
    });
  }

  loadData() {
    this.userService.getUserByUser().subscribe({
      next: (value) => {
        this.user = value['profile'];
        console.log(this.user);

        this.createForm();
      },
      error: (error: any) => {
        this.snackBar.open(error.error.message, 'X', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
    });
  }
}

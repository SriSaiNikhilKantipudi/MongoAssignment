import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import {FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'customer-book-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  customerForm: FormGroup;
  id: string = '';
  fname: string = '';
  lname: string = '';
  dob: string = '';
  email: string = '';
  add: string = '';

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      'id': [null, Validators.required],
      'fname': [null, Validators.required],
      'lname': [null, Validators.required],
      'dob': [null, Validators.required],
      'email': [null, Validators.required],
      'add': [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.api.postCustomer(form)
      .subscribe(res => {
        let id = res['_id'];
        this.router.navigate(['/customer-details', id]);
      }, (err) => {
        console.log(err);
      });
  }
}

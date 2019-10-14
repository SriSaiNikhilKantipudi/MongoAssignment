import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ApiService} from '../api.service';
import {FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'customer-book-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  customer = {};
  customerForm: FormGroup;
  id: string = '';
  fname: string = '';
  lname: string = '';
  dob: string = '';
  email: string = '';
  add: string = '';
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) {
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
    this.getCustomer(this.route.snapshot.params['id']);
  }
  getCustomerDetails(id) {
    this.api.getCustomer(id)
      .subscribe(data => {
        console.log(data);
        this.customer = data;
      });
  }
  onFormSubmit(form: NgForm) {
    let id = this.route.snapshot.params['id'];
    console.log(form)
    this.api.updateCustomer(id, form)
      .subscribe(res => {
        this.router.navigate(['/customer-details', id]);
      }, (err) => {
        console.log(err);
      });
  }
  getCustomer(id) {
    this.api.getCustomer(id).subscribe(data => {
      id = data._id;
      this.customerForm.setValue({
        id: data.id,
        fname: data.fname,
        lname: data.lname,
        dob: data.dob,
        email: data.email,
        add: data.add
      });
    });
  }
}

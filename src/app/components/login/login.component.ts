import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule,RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  form!:FormGroup;

  constructor(
    private fb:FormBuilder,
    private route:Router
  ){

  }

  ngOnInit(): void {
     this.form = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }

  submitted():void{
    console.log(this.form.value.username);

  
    
    if(this.form.valid){
      let obj:any = {
        username:this.form?.value?.username,
        password:this.form?.value?.password
      }
  
      localStorage.setItem('userDetails', JSON.stringify(obj))

      this.route.navigate(['/login/home'])
    }
    
    this.form.reset();
  }
}

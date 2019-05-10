import { Component, Renderer, Input, OnInit, ViewChild, ElementRef, AfterContentInit, AfterViewChecked } from '@angular/core';
import { DataService } from './../../services/data.service';
declare var jquery: any;
declare var $: any;
import { Router } from '@angular/router';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showLogin: boolean = true;
  userName:any;
  password:any;
  showNew: boolean = false;
  newPassword:any;
  confirmNewPassword:any;
  constructor( public router: Router,private dataService: DataService) { }

  ngOnInit() {
    
(function ($) {
  "use strict";


  /*==================================================================
  [ Validate ]*/
  var input = $('.validate-input .input100');

  $('.validate-form').on('submit',function(){
      var check = true;

      for(var i=0; i<input.length; i++) {
          if(validate(input[i]) == false){
              showValidate(input[i]);
              check=false;
          }
      }

      return check;
  });


  $('.validate-form .input100').each(function(){
      $(this).focus(function(){
         hideValidate(this);
      });
  });

  function validate (input) {
      if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
          if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
              return false;
          }
      }
      else {
          if($(input).val().trim() == ''){
              return false;
          }
      }
  }

  function showValidate(input) {
      var thisAlert = $(input).parent();

      $(thisAlert).addClass('alert-validate');
  }

  function hideValidate(input) {
      var thisAlert = $(input).parent();

      $(thisAlert).removeClass('alert-validate');
  }
  
  /*==================================================================
  [ Show pass ]*/
  var showPass = 0;
  
  $('.btn-show-pass').on('click', function(){
      if(showPass == 0) {
          $(this).next('input').attr('type','text');
          $(this).find('i').removeClass('fa-eye-slash');
          $(this).find('i').addClass('fa-eye');
          showPass = 1;
      }
      else {
          $(this).next('input').attr('type','password');
          $(this).find('i').removeClass('fa-eye');
          $(this).find('i').addClass('fa-eye-slash');
          showPass = 0;
      }
      
  });
  $('.btn-show-pass1').on('click', function(){
    if(showPass == 0) {
        $(this).next('input').attr('type','text');
        $(this).find('i').removeClass('fa-eye-slash');
        $(this).find('i').addClass('fa-eye');
        showPass = 1;
    }
    else {
        $(this).next('input').attr('type','password');
        $(this).find('i').removeClass('fa-eye');
        $(this).find('i').addClass('fa-eye-slash');
        showPass = 0;
    }
    
});
$('.btn-show-pass2').on('click', function(){
    if(showPass == 0) {
        $(this).next('input').attr('type','text');
        $(this).find('i').removeClass('fa-eye-slash');
        $(this).find('i').addClass('fa-eye');
        showPass = 1;
    }
    else {
        $(this).next('input').attr('type','password');
        $(this).find('i').removeClass('fa-eye');
        $(this).find('i').addClass('fa-eye-slash');
        showPass = 0;
    }
    
});
  

})(jQuery);
  }
  onLogin() {
    let details = {
      username:this.userName,
      password: this.password
    };
    this.dataService.login(details);
  }

  onReset(){
    let details = {
        userName:this.userName,
        password: this.newPassword,
        confirmPassword: this.confirmNewPassword
      };
      this.dataService.reset(details);
  }

}

import { Component, OnInit } from '@angular/core';
import { ActionSheetController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from "@angular/forms";


/**
 * Generated class for the AddRecipePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-recipe',
  templateUrl: 'add-recipe.html',
})
export class AddRecipePage implements OnInit {

  mode:string = 'New';
  selectDifficulty:string[] = ['Easy', 'Medium', 'Hard'];
  recipeForm:FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private actionSheetCtrl: ActionSheetController) {
  }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initializeForm();
  }

  private initializeForm() {
    this.recipeForm = new FormGroup({
      // FormControl() takes default value and validator
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'difficulty': new FormControl(this.selectDifficulty[1], Validators.required)
    })
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

}

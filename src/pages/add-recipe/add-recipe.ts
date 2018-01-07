import { Component, OnInit } from '@angular/core';
import {
  ActionSheetController, AlertController, IonicPage, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { RecipeService } from "../../services/recipe.service";
import { Recipe } from "../../models/recipe";


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

  // only used for edit mode
  recipe:Recipe = null;
  index:number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    if (this.mode == 'Edit') {
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }
    this.initializeForm();
  }

  private initializeForm() {
    let title = null;
    let description = null;
    let difficulty = this.selectDifficulty[1];
    let ingredients = [];

    if (this.mode == 'Edit') {
      title = this.recipe.name;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;
      // requires form controls and not ingredients
      for (let ingredient of this.recipe.ingredients) {
        ingredients.push(new FormControl(ingredient.name, Validators.required));
      }
    }

    this.recipeForm = new FormGroup({
      // FormControl() takes default value and validator
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required),
      'ingredients': new FormArray(ingredients)
    })
  }

  onSubmit() {
    let value = this.recipeForm.value;
    let ingredients = [];
    // use map to transform ingredient list from just names to names and amount
    if (value.ingredients.length > 0) {
      ingredients = value.ingredients.map(name => {
        return {name: name, amount: 1};
      })
    }
    // if in edit mode
    if (this.mode == 'Edit') {
      this.recipeService.updateRecipe(this.index, value.title, value.description, value.difficulty, ingredients);
    }
    // if new recipe
    else {
      this.recipeService.addRecipe(value.title, value.description, value.difficulty, ingredients);
    }
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

  onManageIngredients() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            this.createIngredientAlert().present();
          }
        },
        {
          text: 'Remove All Ingredients',
          role: 'destructive',
          handler: () => {
            const currentIngredients: FormArray = <FormArray> this.recipeForm.get('ingredients');
            const len = currentIngredients.length;
            if (len > 0) {
              for (let i = len - 1; i >= 0; i--) {
                currentIngredients.removeAt(i);
              }
              this.toastCtrl.create({
                message: 'Ingredients Removed!',
                duration: 1000,
                position: 'bottom'
              }).present();
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    actionSheet.present();
  }

  private createIngredientAlert() {
    return this.alertCtrl.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            // use trim() to check for whitespace
            if (data.name.trim() == '' || data.name == null) {
              this.toastCtrl.create({
                message: 'Please enter a valid name!',
                duration: 1000,
                position: 'bottom'
              }).present();
              return;
            }
            (<FormArray> this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required))
            this.toastCtrl.create({
              message: 'Ingredient Added Successfully!',
              duration: 1000,
              position: 'bottom'
            }).present();
          }
        }
      ]
    })
  }

}

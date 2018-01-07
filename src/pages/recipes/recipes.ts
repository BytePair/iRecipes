import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AddRecipePage } from "../add-recipe/add-recipe";
import { RecipeService } from "../../services/recipe.service";
import { Recipe } from "../../models/recipe";
import { RecipePage } from "../recipe/recipe";


/**
 * Generated class for the RecipesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  recipes:Recipe[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private recipeService: RecipeService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipesPage');
  }

  onAddRecipe() {
    // set mode to 'New' so we kow if recipe already exists
    this.navCtrl.push(AddRecipePage, {mode: 'New'});
  }

  ionViewWillEnter() {
    this.recipes = this.recipeService.getRecipes();
  }

  onLoadRecipe(recipe:Recipe, index:number) {
    this.navCtrl.push(RecipePage, {recipe: recipe, index: index});
  }

}

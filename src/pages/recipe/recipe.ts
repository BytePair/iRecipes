import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Recipe } from "../../models/recipe";
import { RecipeService } from "../../services/recipe.service";
import { AddRecipePage } from "../add-recipe/add-recipe";
import { ShoppingListService } from "../../services/shopping-list.service";

/**
 * Generated class for the RecipePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {

  recipe:Recipe;
  index:number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipePage');
  }

  ngOnInit() {
    this.recipe = this.navParams.data.recipe; // can also use this.navParams.get('recipe')
    this.index = this.navParams.data.index;
  }

  onDeleteRecipe() {
    this.recipeService.removeRecipe(this.index);
    this.navCtrl.popToRoot();
  }

  onEditRecipe(recipe:Recipe) {
    this.navCtrl.push(AddRecipePage, {
      mode: 'Edit',
      recipe: this.recipe,
      index: this.index
    })
  }

  onAddIngredients() {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }

}

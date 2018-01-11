import { Component } from '@angular/core';
import {
  AlertController, IonicPage, LoadingController, NavController,
  PopoverController
} from 'ionic-angular';

import { AddRecipePage } from "../add-recipe/add-recipe";
import { RecipeService } from "../../services/recipe.service";
import { Recipe } from "../../models/recipe";
import { RecipePage } from "../recipe/recipe";
import { DBOptionsPage } from "../db-options/db-options";
import { AuthService } from "../../services/auth.service";


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
    private recipeService: RecipeService,
    private authService: AuthService,
    private popOverCtrl: PopoverController,
    private loadCtrl: LoadingController,
    private alertCtrl: AlertController) {
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

  private handleError(eMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An Error Has Occurred',
      message: eMessage,
      buttons: ['Ok']
    });
    alert.present();
  }

  onShowOptions(event: MouseEvent) {
    const loader = this.loadCtrl.create({
      content: 'Please wait...'
    });
    const popover = this.popOverCtrl.create(DBOptionsPage);
    // mouse event has coordinates so popover knows where to appear
    popover.present({
      ev: event
    });
    popover.onDidDismiss(data => {
      // if dismissed without clicking a button, just return
      if (!data) {
        return;
      }
      if (data.action == 'load') {
        loader.present();
        this.authService.getActiveUser().getToken()
          .then( (token: string) => {
            this.recipeService.fetchList(token)
              .subscribe( (list: Recipe[]) => {
                  if (list) {
                    this.recipes = list;
                  } else {
                    this.recipes = [];
                  }
                  loader.dismissAll();
                },
                error => {
                  loader.dismissAll();
                  this.handleError(error.message);
                })
          })
      } else if (data.action == 'save') {
        loader.present();
        this.authService.getActiveUser().getToken()
          .then( (token: string) => {
            this.recipeService.storeList(token)
              .subscribe( () => {
                  loader.dismissAll();
                },
                error => {
                  loader.dismissAll();
                  this.handleError(error.message);
                })
          })
      }
    })
  }

}

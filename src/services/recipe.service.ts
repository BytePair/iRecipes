import { Ingredient } from "../models/ingredient";
import { Recipe } from "../models/recipe";
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import 'rxjs/Rx';


@Injectable()
export class RecipeService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService) {
  }


  private recipes:Recipe[] = [];


  addRecipe(title:string, description:string, difficulty:string, ingredients:Ingredient[]) {
    this.recipes.push(new Recipe(title, description, difficulty, ingredients));
  }

  removeRecipe(index:number) {
    this.recipes.splice(index, 1);
  };

  getRecipes() {
    // use slice to return a copy
    return this.recipes.slice();
  };

  updateRecipe(index:number, title:string, description:string, difficulty:string, ingredients:Ingredient[]) {
    this.recipes[index] = new Recipe(title, description, difficulty, ingredients);
  };

  storeList(token: string) {
    const userID = this.authService.getActiveUser().uid;
    // returns an observable so you must subscribe in calling page
    return this.httpClient.put('https://udemyrecipes.firebaseio.com/' + userID + '/recipes.json?auth=' + token, this.recipes);
  };

  fetchList(token: string) {
    const userID = this.authService.getActiveUser().uid;
    return this.httpClient.get('https://udemyrecipes.firebaseio.com/' + userID + '/recipes.json?auth=' + token)
      .do( (data: Recipe[]) => {
        if (data) {
          this.recipes = data;
          for (let recipe of this.recipes) {
            if (!recipe.ingredients) {
              recipe.ingredients = [];
            }
          }
        } else {
          this.recipes = [];
        }
      })
  };

}

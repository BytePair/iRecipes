import { Ingredient } from "../models/ingredient";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";

import 'rxjs/Rx';


@Injectable()
export class ShoppingListService {

  private ingredients: Ingredient[] = [];

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService) {
  }

  addIngredient(name: string, amount: number) {
    this.ingredients.push(new Ingredient(name, amount));
  }

  addIngredients(ingredients: Ingredient[]) {
    // use spread operator (...) to deconstruct
    this.ingredients.push(...ingredients);
  }

  removeIngredient(index: number) {
    this.ingredients.splice(index, 1);
  }

  getIngredients() {
    // use slice to return a copy
    return this.ingredients.slice();
  }

  storeList(token: string) {
    const userID = this.authService.getActiveUser().uid;
    // returns an observable so you must subscribe in calling page
    return this.httpClient.put('https://udemyrecipes.firebaseio.com/' + userID + '/shopping-list.json?auth=' + token, this.ingredients);
  }

  fetchList(token: string) {
    const userID = this.authService.getActiveUser().uid;
    return this.httpClient.get('https://udemyrecipes.firebaseio.com/' + userID + '/shopping-list.json?auth=' + token)
      .do( (data: Ingredient[]) => {
        if (data.length > 0) {
          this.ingredients = data;
        } else {
          this.ingredients = [];
        }
      });
  }

}

import { Ingredient } from "../models/ingredient";


export class ShoppingListService {

  private ingredients: Ingredient[] = [];

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

}

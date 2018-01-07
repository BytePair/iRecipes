import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Form } from "@angular/forms";
import { ShoppingListService } from "../../services/shopping-list.service";
import { Ingredient } from "../../models/ingredient";


@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  listItems: Ingredient[];

  constructor (private shoppingListService: ShoppingListService) {
  }

  ionViewWillEnter() {
    this.loadItems();
  }

  onAddItem(form: Form) {
    // TODO: Fix form.value error
    this.shoppingListService.addIngredient(form.value.ingredientName, form.value.ingredientAmount);
    // TODO: Fix form.reset() error
    form.reset();
    this.loadItems();
  }

  private loadItems() {
    this.listItems = this.shoppingListService.getIngredients();
  }

  onDeleteItem(index: number) {
    this.shoppingListService.removeIngredient(index);
    this.loadItems();
  }

}

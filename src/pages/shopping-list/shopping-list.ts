import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NgForm } from "@angular/forms";
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

  onAddItem(form: NgForm) {
    this.shoppingListService.addIngredient(form.value.ingredientName, form.value.ingredientAmount);
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

import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, PopoverController } from 'ionic-angular';
import { NgForm } from "@angular/forms";
import { ShoppingListService } from "../../services/shopping-list.service";
import { Ingredient } from "../../models/ingredient";
import { DBOptionsPage } from "../db-options/db-options";
import { AuthService } from "../../services/auth.service";


@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  listItems: Ingredient[];

  constructor (
    private shoppingListService: ShoppingListService,
    private popOverCtrl: PopoverController,
    private authService: AuthService,
    private loadCtrl: LoadingController,
    private alertCtrl: AlertController) {
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
            this.shoppingListService.fetchList(token)
              .subscribe( (list: Ingredient[]) => {
                if (list) {
                  this.listItems = list;
                } else {
                  this.listItems = [];
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
            this.shoppingListService.storeList(token)
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

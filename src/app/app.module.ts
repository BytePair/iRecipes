import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { AddRecipePage } from "../pages/add-recipe/add-recipe";
import { RecipesPage } from "../pages/recipes/recipes";
import { ShoppingListPage } from "../pages/shopping-list/shopping-list";
import { RecipePage } from "../pages/recipe/recipe";
import { ShoppingListService } from "../services/shopping-list.service";
import { RecipeService } from "../services/recipe.service";
import { SigninPage } from "../pages/signin/signin";
import { SignupPage } from "../pages/signup/signup";


@NgModule({
  declarations: [
    MyApp,
    AddRecipePage,
    RecipesPage,
    RecipePage,
    ShoppingListPage,
    TabsPage,
    SigninPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Back',
      backButtonIcon: 'ios-arrow-back',
      iconMode: 'md'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddRecipePage,
    RecipesPage,
    RecipePage,
    ShoppingListPage,
    TabsPage,
    SigninPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ShoppingListService,
    RecipeService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

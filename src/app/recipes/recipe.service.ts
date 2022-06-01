import { Subject } from 'rxjs/Subject';

import { Ingridient } from '../shared/ingridient.model';
import { Recipe } from './recipe.model';

export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Pumpkin pie',
  //     'This is a pumpkin pie recipe',
  //     'https://images.pexels.com/photos/5706442/pexels-photo-5706442.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
  //     [
  //       new Ingridient('Pumpkin', 1),
  //       new Ingridient('Eggs', 2),
  //       new Ingridient('Butter', 1),
  //     ]
  //   ),
  //   new Recipe(
  //     'Pumpkin cheesecake',
  //     'This is a pumpkin cheesecake recipe',
  //     'https://cdn.pixabay.com/photo/2016/08/08/16/20/cheesecake-1578694_960_720.jpg',
  //     [
  //       new Ingridient('Pumpkin', 1),
  //       new Ingridient('Eggs', 3),
  //       new Ingridient('Creamcheese', 1),
  //     ]
  //   ),
  // ];

  private recipes: Recipe[] = [];

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, editedRecipe: Recipe) {
    this.recipes[index] = editedRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  constructor() {}
}

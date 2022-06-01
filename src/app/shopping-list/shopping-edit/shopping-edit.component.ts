import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingridient } from 'src/app/shared/ingridient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingListForm: NgForm;
  subscritpion: Subscription;
  editMode = false;
  editiedIngridientIndex: number;
  editedIngridient: Ingridient;

  constructor(private shoppingListService: ShoppingListService) {}

  onSubmit(shoppingEditForm: NgForm) {
    const value = shoppingEditForm.value;
    const newIngridient = new Ingridient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngridient(
        this.editiedIngridientIndex,
        newIngridient
      );
    } else {
      this.shoppingListService.addIngridient([newIngridient]);
    }
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  ngOnInit(): void {
    this.subscritpion = this.shoppingListService.startEditing.subscribe(
      (index: number) => {
        this.editiedIngridientIndex = index;
        this.editMode = true;
        this.editedIngridient = this.shoppingListService.getIngridient(index);
        this.shoppingListForm.setValue({
          name: this.editedIngridient.name,
          amount: this.editedIngridient.amount,
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.subscritpion.unsubscribe();
  }

  onClearForm() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngridient(this.editiedIngridientIndex);
    this.onClearForm();
  }
}

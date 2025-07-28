import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private _storage: Storage | null = null;
  private defaultCategories = [
    'Trabajo',
    'Personal',
    'Familiar',
    'Hogar',
    'Otros',
  ];
  private userCategories: string[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
    const saved = await this._storage.get('userCategories');
    this.userCategories = saved || [];
  }

  getAllCategories(): string[] {
    return [...this.defaultCategories, ...this.userCategories];
  }

  isDefault(category: string): boolean {
    return this.defaultCategories.includes(category);
  }

  async addCategory(name: string) {
    if (!this.userCategories.includes(name)) {
      this.userCategories.push(name);
      await this._storage?.set('userCategories', this.userCategories);
    }
  }

  async removeCategory(name: string) {
    if (!this.isDefault(name)) {
      this.userCategories = this.userCategories.filter((c) => c !== name);
      await this._storage?.set('userCategories', this.userCategories);
    }
  }
}

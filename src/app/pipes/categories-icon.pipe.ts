import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryIcon',
})
export class CategoryIconPipe implements PipeTransform {
  transform(category: string): string {
    switch (category?.toLowerCase()) {
      case 'trabajo':
        return 'briefcase-outline';
      case 'personal':
        return 'person-outline';
      case 'familiar':
        return 'people-outline';
      case 'hogar':
        return 'home-outline';
      default:
        return 'planet-outline';
    }
  }
}

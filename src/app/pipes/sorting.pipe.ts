import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(posts: any, category=''): any {
    if (!category) {
      return posts
    } else {
      return posts.filter(post => post.category.toLowerCase() ===category.toLowerCase())
    }
  }

}

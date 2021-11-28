import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ChargeAnimation } from 'src/app/Animations/animaciones';
import { AppState } from 'src/app/app.reducers';
import * as PostsAction from '../../actions';
import { PostDTO } from '../../models/post.dto';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
  animations: [ChargeAnimation],
})
export class PostsListComponent {
  posts: PostDTO[];
  private userId: string;
  displayedColumns: string[] = [
    'postId',
    'title',
    'description',
    'num_likes',
    'num_dislikes',
    'actions',
  ];
  dataSource: any;

  constructor(private router: Router, private store: Store<AppState>) {
    this.userId = '';
    this.posts = new Array<PostDTO>();

    this.store.select('auth').subscribe((auth) => {
      if (auth.credentials.user_id) {
        this.userId = auth.credentials.user_id;
      }
    });

    this.store.select('posts').subscribe((posts) => {
      this.posts = posts.posts;
    });

    this.loadPosts();
  }

  private loadPosts(): void {
    if (this.userId) {
      this.store.dispatch(
        PostsAction.getPostsByUserId({ userId: this.userId })
      );
      this.dataSource = new MatTableDataSource<PostDTO>(this.posts);
    }
  }

  createPost(): void {
    this.router.navigateByUrl('/user/post/');
  }

  updatePost(postId: string): void {
    this.router.navigateByUrl('/user/post/' + postId);
  }

  deletePost(postId: string): void {
    // show confirmation popup
    let result = confirm('Confirm delete post with id: ' + postId + ' .');
    if (result) {
      this.store.dispatch(PostsAction.deletePost({ postId: postId }));
    }
  }
}

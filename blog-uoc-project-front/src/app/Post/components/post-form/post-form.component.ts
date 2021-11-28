import { trigger, state, style, transition, animate } from '@angular/animations';
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ChargeAnimation } from 'src/app/Animations/animaciones';
import { AppState } from 'src/app/app.reducers';
import { CategoryDTO } from 'src/app/Category/models/category.dto';
import * as CategoriesAction from '../../../Category/actions';
import * as PostsAction from '../../actions';
import { PostDTO } from '../../models/post.dto';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
  animations: [ChargeAnimation],
})
export class PostFormComponent implements OnInit {
  post: PostDTO;
  title: FormControl;
  description: FormControl;
  num_likes!: FormControl;
  num_dislikes!: FormControl;
  publication_date: FormControl;
  categories!: FormControl;

  postForm: FormGroup;
  isValidForm: boolean | null;

  private isUpdateMode: boolean;
  private postId: string | null;

  categoriesList!: CategoryDTO[];

  private userId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.userId = '';

    this.isValidForm = null;
    this.postId = this.activatedRoute.snapshot.paramMap.get('id');
    this.post = new PostDTO('', '', 0, 0, new Date());
    this.isUpdateMode = false;

    this.title = new FormControl(this.post.title, [
      Validators.required,
      Validators.maxLength(55),
    ]);

    this.description = new FormControl(this.post.description, [
      Validators.required,
      Validators.maxLength(255),
    ]);

    this.publication_date = new FormControl(this.post.description, [
      Validators.required
    ]);

    this.categories = new FormControl([]);

    this.postForm = this.formBuilder.group({
      title: this.title,
      description: this.description,
      publication_date: this.publication_date,
      categories: this.categories,
    });

    this.store.select('auth').subscribe((auth) => {
      if (auth.credentials.user_id) {
        this.userId = auth.credentials.user_id;
      }
    });

    this.store.select('categories').subscribe((categories) => {
      this.categoriesList = categories.categories;
    });

    this.store.select('posts').subscribe((posts) => {
      this.post = posts.post;

      this.title.setValue(this.post.title);

      this.description.setValue(this.post.description);

      this.publication_date.setValue(
        formatDate(this.post.publication_date, 'yyyy-MM-dd', 'en')
      );

      if (this.post.categories) {
        let categoriesIds: string[] = [];
        this.post.categories.forEach((cat: CategoryDTO) => {
          categoriesIds.push(cat.categoryId);
        });

        this.categories.setValue(categoriesIds);
      }

      this.postForm = this.formBuilder.group({
        title: this.title,
        description: this.description,
        publication_date: this.publication_date,
        categories: this.categories,
      });
    });

    this.loadCategories();
  }

  private loadCategories(): void {
    if (this.userId) {
      this.store.dispatch(
        CategoriesAction.getCategoriesByUserId({ userId: this.userId })
      );
    }
  }

  ngOnInit(): void {
    if (this.postId) {
      this.isUpdateMode = true;
      this.store.dispatch(PostsAction.getPostById({ postId: this.postId }));
    } else {
      this.postForm.reset();
      this.publication_date.setValue(
        formatDate(this.post.publication_date, 'yyyy-MM-dd', 'en')
      );
    }
  }

  private editPost(): void {
    if (this.postId) {
      if (this.userId) {
        this.post.userId = this.userId;

        this.store.dispatch(
          PostsAction.updatePost({
            postId: this.postId,
            post: this.post,
          })
        );
      }
    }
  }

  private createPost(): void {
    if (this.userId) {
      this.post.userId = this.userId;

      this.store.dispatch(PostsAction.createPost({ post: this.post }));
    }
  }

  savePost(): void {
    this.isValidForm = false;

    if (this.postForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.post = this.postForm.value;

    if (this.isUpdateMode) {
      this.editPost();
    } else {
      this.createPost();
    }
  }
}

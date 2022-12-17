import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { useFetchData } from '../utils/hooks';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

export const InsertCommentDocument = `
    mutation insertComment {
  insert_comments_one(object: {comment: "test"}) {
    id
  }
}
    `;
export const useInsertCommentMutation = <
      TError = Error,
      TContext = unknown
    >(options?: UseMutationOptions<InsertCommentMutation, TError, InsertCommentMutationVariables, TContext>) =>
    useMutation<InsertCommentMutation, TError, InsertCommentMutationVariables, TContext>(
      ['insertComment'],
      useFetchData<InsertCommentMutation, InsertCommentMutationVariables>(InsertCommentDocument),
      options
    );
export const GetCommentsDocument = `
    query GetComments {
  comments {
    id
    user
    comment
  }
}
    `;
export const useGetCommentsQuery = <
      TData = GetCommentsQuery,
      TError = Error
    >(
      variables?: GetCommentsQueryVariables,
      options?: UseQueryOptions<GetCommentsQuery, TError, TData>
    ) =>
    useQuery<GetCommentsQuery, TError, TData>(
      variables === undefined ? ['GetComments'] : ['GetComments', variables],
      useFetchData<GetCommentsQuery, GetCommentsQueryVariables>(GetCommentsDocument).bind(null, variables),
      options
    );
useGetCommentsQuery.document = GetCommentsDocument;


useGetCommentsQuery.getKey = (variables?: GetCommentsQueryVariables) => variables === undefined ? ['GetComments'] : ['GetComments', variables];
;

export const PixelGridsDocument = `
    query pixelGrids {
  pixelGrids {
    pixelString
    user
    id
  }
}
    `;
export const usePixelGridsQuery = <
      TData = PixelGridsQuery,
      TError = Error
    >(
      variables?: PixelGridsQueryVariables,
      options?: UseQueryOptions<PixelGridsQuery, TError, TData>
    ) =>
    useQuery<PixelGridsQuery, TError, TData>(
      variables === undefined ? ['pixelGrids'] : ['pixelGrids', variables],
      useFetchData<PixelGridsQuery, PixelGridsQueryVariables>(PixelGridsDocument).bind(null, variables),
      options
    );
usePixelGridsQuery.document = PixelGridsDocument;


usePixelGridsQuery.getKey = (variables?: PixelGridsQueryVariables) => variables === undefined ? ['pixelGrids'] : ['pixelGrids', variables];
;

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** test */
export type Comments = {
  __typename?: 'comments';
  comment: Scalars['String'];
  id: Scalars['Int'];
  user?: Maybe<Scalars['String']>;
};

/** aggregated selection of "comments" */
export type Comments_Aggregate = {
  __typename?: 'comments_aggregate';
  aggregate?: Maybe<Comments_Aggregate_Fields>;
  nodes: Array<Comments>;
};

/** aggregate fields of "comments" */
export type Comments_Aggregate_Fields = {
  __typename?: 'comments_aggregate_fields';
  avg?: Maybe<Comments_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Comments_Max_Fields>;
  min?: Maybe<Comments_Min_Fields>;
  stddev?: Maybe<Comments_Stddev_Fields>;
  stddev_pop?: Maybe<Comments_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Comments_Stddev_Samp_Fields>;
  sum?: Maybe<Comments_Sum_Fields>;
  var_pop?: Maybe<Comments_Var_Pop_Fields>;
  var_samp?: Maybe<Comments_Var_Samp_Fields>;
  variance?: Maybe<Comments_Variance_Fields>;
};


/** aggregate fields of "comments" */
export type Comments_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Comments_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Comments_Avg_Fields = {
  __typename?: 'comments_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "comments". All fields are combined with a logical 'AND'. */
export type Comments_Bool_Exp = {
  _and?: InputMaybe<Array<Comments_Bool_Exp>>;
  _not?: InputMaybe<Comments_Bool_Exp>;
  _or?: InputMaybe<Array<Comments_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  user?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "comments" */
export enum Comments_Constraint {
  /** unique or primary key constraint on columns "id" */
  CommentsPkey = 'comments_pkey'
}

/** input type for incrementing numeric columns in table "comments" */
export type Comments_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "comments" */
export type Comments_Insert_Input = {
  comment?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  user?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Comments_Max_Fields = {
  __typename?: 'comments_max_fields';
  comment?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  user?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Comments_Min_Fields = {
  __typename?: 'comments_min_fields';
  comment?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  user?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "comments" */
export type Comments_Mutation_Response = {
  __typename?: 'comments_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Comments>;
};

/** on_conflict condition type for table "comments" */
export type Comments_On_Conflict = {
  constraint: Comments_Constraint;
  update_columns?: Array<Comments_Update_Column>;
  where?: InputMaybe<Comments_Bool_Exp>;
};

/** Ordering options when selecting data from "comments". */
export type Comments_Order_By = {
  comment?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user?: InputMaybe<Order_By>;
};

/** primary key columns input for table: comments */
export type Comments_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "comments" */
export enum Comments_Select_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Id = 'id',
  /** column name */
  User = 'user'
}

/** input type for updating data in table "comments" */
export type Comments_Set_Input = {
  comment?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  user?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Comments_Stddev_Fields = {
  __typename?: 'comments_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Comments_Stddev_Pop_Fields = {
  __typename?: 'comments_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Comments_Stddev_Samp_Fields = {
  __typename?: 'comments_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "comments" */
export type Comments_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Comments_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Comments_Stream_Cursor_Value_Input = {
  comment?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  user?: InputMaybe<Scalars['String']>;
};

/** aggregate sum on columns */
export type Comments_Sum_Fields = {
  __typename?: 'comments_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** update columns of table "comments" */
export enum Comments_Update_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Id = 'id',
  /** column name */
  User = 'user'
}

export type Comments_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Comments_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Comments_Set_Input>;
  where: Comments_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Comments_Var_Pop_Fields = {
  __typename?: 'comments_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Comments_Var_Samp_Fields = {
  __typename?: 'comments_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Comments_Variance_Fields = {
  __typename?: 'comments_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "comments" */
  delete_comments?: Maybe<Comments_Mutation_Response>;
  /** delete single row from the table: "comments" */
  delete_comments_by_pk?: Maybe<Comments>;
  /** delete data from the table: "pixelGrids" */
  delete_pixelGrids?: Maybe<PixelGrids_Mutation_Response>;
  /** delete single row from the table: "pixelGrids" */
  delete_pixelGrids_by_pk?: Maybe<PixelGrids>;
  /** insert data into the table: "comments" */
  insert_comments?: Maybe<Comments_Mutation_Response>;
  /** insert a single row into the table: "comments" */
  insert_comments_one?: Maybe<Comments>;
  /** insert data into the table: "pixelGrids" */
  insert_pixelGrids?: Maybe<PixelGrids_Mutation_Response>;
  /** insert a single row into the table: "pixelGrids" */
  insert_pixelGrids_one?: Maybe<PixelGrids>;
  /** update data of the table: "comments" */
  update_comments?: Maybe<Comments_Mutation_Response>;
  /** update single row of the table: "comments" */
  update_comments_by_pk?: Maybe<Comments>;
  /** update multiples rows of table: "comments" */
  update_comments_many?: Maybe<Array<Maybe<Comments_Mutation_Response>>>;
  /** update data of the table: "pixelGrids" */
  update_pixelGrids?: Maybe<PixelGrids_Mutation_Response>;
  /** update single row of the table: "pixelGrids" */
  update_pixelGrids_by_pk?: Maybe<PixelGrids>;
  /** update multiples rows of table: "pixelGrids" */
  update_pixelGrids_many?: Maybe<Array<Maybe<PixelGrids_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDelete_CommentsArgs = {
  where: Comments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Comments_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_PixelGridsArgs = {
  where: PixelGrids_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_PixelGrids_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootInsert_CommentsArgs = {
  objects: Array<Comments_Insert_Input>;
  on_conflict?: InputMaybe<Comments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Comments_OneArgs = {
  object: Comments_Insert_Input;
  on_conflict?: InputMaybe<Comments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_PixelGridsArgs = {
  objects: Array<PixelGrids_Insert_Input>;
  on_conflict?: InputMaybe<PixelGrids_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_PixelGrids_OneArgs = {
  object: PixelGrids_Insert_Input;
  on_conflict?: InputMaybe<PixelGrids_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_CommentsArgs = {
  _inc?: InputMaybe<Comments_Inc_Input>;
  _set?: InputMaybe<Comments_Set_Input>;
  where: Comments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Comments_By_PkArgs = {
  _inc?: InputMaybe<Comments_Inc_Input>;
  _set?: InputMaybe<Comments_Set_Input>;
  pk_columns: Comments_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Comments_ManyArgs = {
  updates: Array<Comments_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_PixelGridsArgs = {
  _inc?: InputMaybe<PixelGrids_Inc_Input>;
  _set?: InputMaybe<PixelGrids_Set_Input>;
  where: PixelGrids_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_PixelGrids_By_PkArgs = {
  _inc?: InputMaybe<PixelGrids_Inc_Input>;
  _set?: InputMaybe<PixelGrids_Set_Input>;
  pk_columns: PixelGrids_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_PixelGrids_ManyArgs = {
  updates: Array<PixelGrids_Updates>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "pixelGrids" */
export type PixelGrids = {
  __typename?: 'pixelGrids';
  id: Scalars['Int'];
  pixelString?: Maybe<Scalars['String']>;
  user: Scalars['String'];
};

/** aggregated selection of "pixelGrids" */
export type PixelGrids_Aggregate = {
  __typename?: 'pixelGrids_aggregate';
  aggregate?: Maybe<PixelGrids_Aggregate_Fields>;
  nodes: Array<PixelGrids>;
};

/** aggregate fields of "pixelGrids" */
export type PixelGrids_Aggregate_Fields = {
  __typename?: 'pixelGrids_aggregate_fields';
  avg?: Maybe<PixelGrids_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<PixelGrids_Max_Fields>;
  min?: Maybe<PixelGrids_Min_Fields>;
  stddev?: Maybe<PixelGrids_Stddev_Fields>;
  stddev_pop?: Maybe<PixelGrids_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<PixelGrids_Stddev_Samp_Fields>;
  sum?: Maybe<PixelGrids_Sum_Fields>;
  var_pop?: Maybe<PixelGrids_Var_Pop_Fields>;
  var_samp?: Maybe<PixelGrids_Var_Samp_Fields>;
  variance?: Maybe<PixelGrids_Variance_Fields>;
};


/** aggregate fields of "pixelGrids" */
export type PixelGrids_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<PixelGrids_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type PixelGrids_Avg_Fields = {
  __typename?: 'pixelGrids_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "pixelGrids". All fields are combined with a logical 'AND'. */
export type PixelGrids_Bool_Exp = {
  _and?: InputMaybe<Array<PixelGrids_Bool_Exp>>;
  _not?: InputMaybe<PixelGrids_Bool_Exp>;
  _or?: InputMaybe<Array<PixelGrids_Bool_Exp>>;
  id?: InputMaybe<Int_Comparison_Exp>;
  pixelString?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "pixelGrids" */
export enum PixelGrids_Constraint {
  /** unique or primary key constraint on columns "id" */
  PixelGridsPkey = 'pixelGrids_pkey',
  /** unique or primary key constraint on columns "user" */
  PixelGridsUserKey = 'pixelGrids_user_key'
}

/** input type for incrementing numeric columns in table "pixelGrids" */
export type PixelGrids_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "pixelGrids" */
export type PixelGrids_Insert_Input = {
  id?: InputMaybe<Scalars['Int']>;
  pixelString?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type PixelGrids_Max_Fields = {
  __typename?: 'pixelGrids_max_fields';
  id?: Maybe<Scalars['Int']>;
  pixelString?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type PixelGrids_Min_Fields = {
  __typename?: 'pixelGrids_min_fields';
  id?: Maybe<Scalars['Int']>;
  pixelString?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "pixelGrids" */
export type PixelGrids_Mutation_Response = {
  __typename?: 'pixelGrids_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<PixelGrids>;
};

/** on_conflict condition type for table "pixelGrids" */
export type PixelGrids_On_Conflict = {
  constraint: PixelGrids_Constraint;
  update_columns?: Array<PixelGrids_Update_Column>;
  where?: InputMaybe<PixelGrids_Bool_Exp>;
};

/** Ordering options when selecting data from "pixelGrids". */
export type PixelGrids_Order_By = {
  id?: InputMaybe<Order_By>;
  pixelString?: InputMaybe<Order_By>;
  user?: InputMaybe<Order_By>;
};

/** primary key columns input for table: pixelGrids */
export type PixelGrids_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "pixelGrids" */
export enum PixelGrids_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  PixelString = 'pixelString',
  /** column name */
  User = 'user'
}

/** input type for updating data in table "pixelGrids" */
export type PixelGrids_Set_Input = {
  id?: InputMaybe<Scalars['Int']>;
  pixelString?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type PixelGrids_Stddev_Fields = {
  __typename?: 'pixelGrids_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type PixelGrids_Stddev_Pop_Fields = {
  __typename?: 'pixelGrids_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type PixelGrids_Stddev_Samp_Fields = {
  __typename?: 'pixelGrids_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "pixelGrids" */
export type PixelGrids_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: PixelGrids_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type PixelGrids_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['Int']>;
  pixelString?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<Scalars['String']>;
};

/** aggregate sum on columns */
export type PixelGrids_Sum_Fields = {
  __typename?: 'pixelGrids_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** update columns of table "pixelGrids" */
export enum PixelGrids_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  PixelString = 'pixelString',
  /** column name */
  User = 'user'
}

export type PixelGrids_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<PixelGrids_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<PixelGrids_Set_Input>;
  where: PixelGrids_Bool_Exp;
};

/** aggregate var_pop on columns */
export type PixelGrids_Var_Pop_Fields = {
  __typename?: 'pixelGrids_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type PixelGrids_Var_Samp_Fields = {
  __typename?: 'pixelGrids_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type PixelGrids_Variance_Fields = {
  __typename?: 'pixelGrids_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "comments" */
  comments: Array<Comments>;
  /** fetch aggregated fields from the table: "comments" */
  comments_aggregate: Comments_Aggregate;
  /** fetch data from the table: "comments" using primary key columns */
  comments_by_pk?: Maybe<Comments>;
  /** fetch data from the table: "pixelGrids" */
  pixelGrids: Array<PixelGrids>;
  /** fetch aggregated fields from the table: "pixelGrids" */
  pixelGrids_aggregate: PixelGrids_Aggregate;
  /** fetch data from the table: "pixelGrids" using primary key columns */
  pixelGrids_by_pk?: Maybe<PixelGrids>;
};


export type Query_RootCommentsArgs = {
  distinct_on?: InputMaybe<Array<Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Comments_Order_By>>;
  where?: InputMaybe<Comments_Bool_Exp>;
};


export type Query_RootComments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Comments_Order_By>>;
  where?: InputMaybe<Comments_Bool_Exp>;
};


export type Query_RootComments_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootPixelGridsArgs = {
  distinct_on?: InputMaybe<Array<PixelGrids_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<PixelGrids_Order_By>>;
  where?: InputMaybe<PixelGrids_Bool_Exp>;
};


export type Query_RootPixelGrids_AggregateArgs = {
  distinct_on?: InputMaybe<Array<PixelGrids_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<PixelGrids_Order_By>>;
  where?: InputMaybe<PixelGrids_Bool_Exp>;
};


export type Query_RootPixelGrids_By_PkArgs = {
  id: Scalars['Int'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "comments" */
  comments: Array<Comments>;
  /** fetch aggregated fields from the table: "comments" */
  comments_aggregate: Comments_Aggregate;
  /** fetch data from the table: "comments" using primary key columns */
  comments_by_pk?: Maybe<Comments>;
  /** fetch data from the table in a streaming manner: "comments" */
  comments_stream: Array<Comments>;
  /** fetch data from the table: "pixelGrids" */
  pixelGrids: Array<PixelGrids>;
  /** fetch aggregated fields from the table: "pixelGrids" */
  pixelGrids_aggregate: PixelGrids_Aggregate;
  /** fetch data from the table: "pixelGrids" using primary key columns */
  pixelGrids_by_pk?: Maybe<PixelGrids>;
  /** fetch data from the table in a streaming manner: "pixelGrids" */
  pixelGrids_stream: Array<PixelGrids>;
};


export type Subscription_RootCommentsArgs = {
  distinct_on?: InputMaybe<Array<Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Comments_Order_By>>;
  where?: InputMaybe<Comments_Bool_Exp>;
};


export type Subscription_RootComments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Comments_Order_By>>;
  where?: InputMaybe<Comments_Bool_Exp>;
};


export type Subscription_RootComments_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootComments_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Comments_Stream_Cursor_Input>>;
  where?: InputMaybe<Comments_Bool_Exp>;
};


export type Subscription_RootPixelGridsArgs = {
  distinct_on?: InputMaybe<Array<PixelGrids_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<PixelGrids_Order_By>>;
  where?: InputMaybe<PixelGrids_Bool_Exp>;
};


export type Subscription_RootPixelGrids_AggregateArgs = {
  distinct_on?: InputMaybe<Array<PixelGrids_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<PixelGrids_Order_By>>;
  where?: InputMaybe<PixelGrids_Bool_Exp>;
};


export type Subscription_RootPixelGrids_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootPixelGrids_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<PixelGrids_Stream_Cursor_Input>>;
  where?: InputMaybe<PixelGrids_Bool_Exp>;
};

export type InsertCommentMutationVariables = Exact<{ [key: string]: never; }>;


export type InsertCommentMutation = { __typename?: 'mutation_root', insert_comments_one?: { __typename?: 'comments', id: number } | null };

export type GetCommentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCommentsQuery = { __typename?: 'query_root', comments: Array<{ __typename?: 'comments', id: number, user?: string | null, comment: string }> };

export type PixelGridsQueryVariables = Exact<{ [key: string]: never; }>;


export type PixelGridsQuery = { __typename?: 'query_root', pixelGrids: Array<{ __typename?: 'pixelGrids', pixelString?: string | null, user: string, id: number }> };

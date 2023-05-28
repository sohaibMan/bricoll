import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { ServerContext } from './server-context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  ObjectID: { input: any; output: any; }
  URL: { input: any; output: any; }
};

export type Attachment = {
  __typename?: 'Attachment';
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
  url: Scalars['URL']['output'];
};

export type AttachmentInput = {
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
  url: Scalars['URL']['input'];
};

export type Contract = {
  __typename?: 'Contract';
  _id: Scalars['ObjectID']['output'];
  client_id: Scalars['ObjectID']['output'];
  created_at: Scalars['Date']['output'];
  duration: Scalars['Int']['output'];
  fees: Scalars['Float']['output'];
  freelancer_id: Scalars['ObjectID']['output'];
  price: Scalars['Float']['output'];
  project_id: Scalars['ObjectID']['output'];
  proposal_id: Scalars['ObjectID']['output'];
  status: Contract_Status;
  submission_reviews: Array<Maybe<Submission_Review>>;
  terms: Array<Scalars['String']['output']>;
  updated_at: Scalars['Date']['output'];
};

export type Contract_Stats = {
  __typename?: 'Contract_stats';
  count: Scalars['Int']['output'];
  status: Contract_Status;
};

export enum Contract_Status {
  Accepted = 'ACCEPTED',
  CancelledByClient = 'CANCELLED_BY_CLIENT',
  CancelledByFreelancer = 'CANCELLED_BY_FREELANCER',
  Completed = 'COMPLETED',
  Paid = 'PAID',
  Pending = 'PENDING'
}

export enum EarningsStatus {
  Pending = 'PENDING',
  Withdrawn = 'withdrawn'
}

export type Mutation = {
  __typename?: 'Mutation';
  acceptContract?: Maybe<Contract>;
  acceptProposal?: Maybe<Proposal>;
  acceptRequestProjectSubmissionReview?: Maybe<QueryResult>;
  addReview?: Maybe<QueryResult>;
  cancelContract?: Maybe<Contract>;
  cancelProposal?: Maybe<Proposal>;
  cancelRequestProjectSubmissionReview?: Maybe<QueryResult>;
  createContract?: Maybe<Contract>;
  createProject?: Maybe<Project>;
  createProposal: Proposal;
  declineProposal?: Maybe<Proposal>;
  declineRequestProjectSubmissionReview?: Maybe<QueryResult>;
  deleteProject?: Maybe<QueryResult>;
  editContract?: Maybe<Contract>;
  editProject?: Maybe<Project>;
  editProposal?: Maybe<Proposal>;
  editReview?: Maybe<QueryResult>;
  reactToProject?: Maybe<QueryResult>;
  removeReview?: Maybe<QueryResult>;
  requestProjectSubmissionReview?: Maybe<QueryResult>;
  undoReactToProject?: Maybe<QueryResult>;
};


export type MutationAcceptContractArgs = {
  id: Scalars['ObjectID']['input'];
};


export type MutationAcceptProposalArgs = {
  id: Scalars['ObjectID']['input'];
};


export type MutationAcceptRequestProjectSubmissionReviewArgs = {
  contract_id: Scalars['ObjectID']['input'];
  submission_review_id: Scalars['ObjectID']['input'];
};


export type MutationAddReviewArgs = {
  description: Scalars['String']['input'];
  project_id: Scalars['ObjectID']['input'];
  rating: Scalars['Float']['input'];
  user_id: Scalars['ObjectID']['input'];
};


export type MutationCancelContractArgs = {
  id: Scalars['ObjectID']['input'];
};


export type MutationCancelProposalArgs = {
  id: Scalars['ObjectID']['input'];
};


export type MutationCancelRequestProjectSubmissionReviewArgs = {
  contract_id: Scalars['ObjectID']['input'];
  submission_review_id: Scalars['ObjectID']['input'];
};


export type MutationCreateContractArgs = {
  duration: Scalars['Int']['input'];
  freelancer_id: Scalars['ObjectID']['input'];
  price: Scalars['Float']['input'];
  project_id: Scalars['ObjectID']['input'];
  proposal_id: Scalars['ObjectID']['input'];
  terms: Array<Scalars['String']['input']>;
};


export type MutationCreateProjectArgs = {
  attachments?: InputMaybe<Array<AttachmentInput>>;
  category: ProjectCategoriesEnum;
  description: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  projectScope: ProjectScopeInput;
  skills: Array<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};


export type MutationCreateProposalArgs = {
  attachments?: InputMaybe<Array<AttachmentInput>>;
  cover_letter: Scalars['String']['input'];
  description: Scalars['String']['input'];
  duration: Scalars['Int']['input'];
  price: Scalars['Float']['input'];
  project_id: Scalars['ObjectID']['input'];
};


export type MutationDeclineProposalArgs = {
  id: Scalars['ObjectID']['input'];
};


export type MutationDeclineRequestProjectSubmissionReviewArgs = {
  contract_id: Scalars['ObjectID']['input'];
  submission_review_id: Scalars['ObjectID']['input'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['ObjectID']['input'];
};


export type MutationEditContractArgs = {
  duration?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ObjectID']['input'];
  price?: InputMaybe<Scalars['Float']['input']>;
  terms: Array<Scalars['String']['input']>;
};


export type MutationEditProjectArgs = {
  attachments?: InputMaybe<Array<AttachmentInput>>;
  category?: InputMaybe<ProjectCategoriesEnum>;
  description: Scalars['String']['input'];
  id: Scalars['ObjectID']['input'];
  price?: InputMaybe<Scalars['Float']['input']>;
  projectScope?: InputMaybe<ProjectScopeInput>;
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEditProposalArgs = {
  cover_letter?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  duration?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ObjectID']['input'];
  price?: InputMaybe<Scalars['Float']['input']>;
};


export type MutationEditReviewArgs = {
  description: Scalars['String']['input'];
  id: Scalars['ObjectID']['input'];
  project_id: Scalars['ObjectID']['input'];
  rating: Scalars['Float']['input'];
};


export type MutationReactToProjectArgs = {
  id: Scalars['ObjectID']['input'];
  reaction_type: Reaction_Type;
};


export type MutationRemoveReviewArgs = {
  id: Scalars['ObjectID']['input'];
};


export type MutationRequestProjectSubmissionReviewArgs = {
  attachments?: InputMaybe<Array<AttachmentInput>>;
  contract_id: Scalars['ObjectID']['input'];
  description: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationUndoReactToProjectArgs = {
  id: Scalars['ObjectID']['input'];
  reaction_type: Reaction_Type;
};

export type ProfileMetaData = {
  __typename?: 'ProfileMetaData';
  _id: Scalars['ObjectID']['output'];
  image: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type Project = {
  __typename?: 'Project';
  _id?: Maybe<Scalars['ObjectID']['output']>;
  attachments: Array<Attachment>;
  category: ProjectCategoriesEnum;
  client_id?: Maybe<Scalars['ObjectID']['output']>;
  created_at: Scalars['Date']['output'];
  description: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  projectScope: ProjectScopeOutput;
  proposals?: Maybe<Array<Proposal>>;
  reactions: Array<Reactions>;
  skills: Array<Scalars['String']['output']>;
  stats?: Maybe<ProjectStats>;
  title: Scalars['String']['output'];
};

export enum ProjectCategoriesEnum {
  DataScience = 'DATA_SCIENCE',
  Design = 'DESIGN',
  Marketing = 'MARKETING',
  MobileDevelopment = 'MOBILE_DEVELOPMENT',
  Other = 'OTHER',
  WebDevelopment = 'WEB_DEVELOPMENT',
  Writing = 'WRITING'
}

export type ProjectScopeInput = {
  estimated_duration_in_days: Scalars['Int']['input'];
  level_of_expertise: Level_Of_Expertise;
  size_of_project: Size_Of_Project;
};

export type ProjectScopeOutput = {
  __typename?: 'ProjectScopeOutput';
  estimated_duration_in_days: Scalars['Int']['output'];
  level_of_expertise: Level_Of_Expertise;
  size_of_project: Size_Of_Project;
};

export type ProjectStats = {
  __typename?: 'ProjectStats';
  approved_count: Scalars['Int']['output'];
  completed_count: Scalars['Int']['output'];
  declined_count: Scalars['Int']['output'];
  in_progress_count: Scalars['Int']['output'];
};

export type Project_Stats_Per_Month = {
  __typename?: 'Project_stats_per_month';
  count: Scalars['Int']['output'];
  month: Scalars['Int']['output'];
};

export type Proposal = {
  __typename?: 'Proposal';
  _id?: Maybe<Scalars['ObjectID']['output']>;
  attachments?: Maybe<Array<Attachment>>;
  client_id: Scalars['ObjectID']['output'];
  cover_letter: Scalars['String']['output'];
  created_at: Scalars['Date']['output'];
  description: Scalars['String']['output'];
  duration: Scalars['Int']['output'];
  freelancer_id: Scalars['ObjectID']['output'];
  price: Scalars['Float']['output'];
  project_id: Scalars['ObjectID']['output'];
  status: Proposal_Status;
  updated_at: Scalars['Date']['output'];
  user: ProfileMetaData;
};

export enum Proposal_Status {
  Approved = 'approved',
  Canceled = 'canceled',
  Completed = 'completed',
  Declined = 'declined',
  InProgress = 'in_progress'
}

export type Proposals_Stats = {
  __typename?: 'Proposals_stats';
  count: Scalars['Int']['output'];
  status: Proposal_Status;
};

export type Query = {
  __typename?: 'Query';
  Contract?: Maybe<Contract>;
  Profile?: Maybe<User>;
  ProfileById?: Maybe<User>;
  Project?: Maybe<Project>;
  Projects?: Maybe<Array<Maybe<Project>>>;
  Proposal?: Maybe<Proposal>;
};


export type QueryContractArgs = {
  id: Scalars['ObjectID']['input'];
};


export type QueryProfileByIdArgs = {
  id: Scalars['ObjectID']['input'];
};


export type QueryProjectArgs = {
  id: Scalars['ObjectID']['input'];
};


export type QueryProjectsArgs = {
  filter?: InputMaybe<FilterOptionsInput>;
  query?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProposalArgs = {
  id: Scalars['ObjectID']['input'];
};

export type Review = {
  __typename?: 'Review';
  _id: Scalars['ObjectID']['output'];
  createdAt: Scalars['Date']['output'];
  description: Scalars['String']['output'];
  project_id: Scalars['ObjectID']['output'];
  rating: Scalars['Float']['output'];
  reviewer_id: Scalars['ObjectID']['output'];
};

export enum StatusEnum {
  Invisible = 'Invisible',
  Online = 'Online'
}

export type Submission_Review = {
  __typename?: 'Submission_review';
  _id: Scalars['ObjectID']['output'];
  accepted_at?: Maybe<Scalars['Date']['output']>;
  attachments: Array<Attachment>;
  created_at: Scalars['Date']['output'];
  description: Scalars['String']['output'];
  status: Submission_Review_Status;
  title: Scalars['String']['output'];
  updated_at: Scalars['Date']['output'];
};

export enum Submission_Review_Status {
  Accepted = 'ACCEPTED',
  Cancelled = 'CANCELLED',
  Declined = 'Declined',
  Pending = 'PENDING'
}

export type User = {
  __typename?: 'User';
  _id: Scalars['ObjectID']['output'];
  address: Scalars['String']['output'];
  bio: Scalars['String']['output'];
  birthday: Scalars['Date']['output'];
  category: Scalars['String']['output'];
  city: Scalars['String']['output'];
  company: Scalars['String']['output'];
  contracts: Array<Contract>;
  contracts_stats: Array<Contract_Stats>;
  country: Scalars['String']['output'];
  educationLevel: Scalars['String']['output'];
  email: Scalars['String']['output'];
  experienceLevel: Scalars['String']['output'];
  image: Scalars['String']['output'];
  jobTitle: Scalars['String']['output'];
  language: Scalars['String']['output'];
  payments: Array<Payments>;
  phone: Scalars['String']['output'];
  portfolio: Scalars['String']['output'];
  profileTitle: Scalars['String']['output'];
  projects: Array<Project>;
  projects_stats: Array<Project_Stats_Per_Month>;
  proposals: Array<Proposal>;
  proposals_stats: Array<Proposals_Stats>;
  reviews: Array<Review>;
  role: Scalars['String']['output'];
  skills: Array<Scalars['String']['output']>;
  status?: Maybe<StatusEnum>;
  username: Scalars['String']['output'];
};

export type FilterOptionsInput = {
  category?: InputMaybe<ProjectCategoriesEnum>;
  priceMax?: InputMaybe<Scalars['Float']['input']>;
  priceMin?: InputMaybe<Scalars['Float']['input']>;
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
};

export enum Level_Of_Expertise {
  Advanced = 'ADVANCED',
  Beginner = 'BEGINNER',
  Intermediate = 'INTERMEDIATE'
}

export type Payments = {
  __typename?: 'payments';
  amount: Scalars['Float']['output'];
  contract_id: Scalars['ObjectID']['output'];
  created_at: Scalars['Date']['output'];
  currency: Scalars['String']['output'];
  description: Scalars['String']['output'];
};

export type QueryResult = {
  __typename?: 'queryResult';
  _id: Scalars['ObjectID']['output'];
  acknowledgement: Scalars['Boolean']['output'];
};

export enum Reaction_Type {
  Dislike = 'DISLIKE',
  Love = 'LOVE'
}

export type Reactions = {
  __typename?: 'reactions';
  freelancer_id: Scalars['ObjectID']['output'];
  reaction_type: Reaction_Type;
};

export enum Size_Of_Project {
  Large = 'LARGE',
  Medium = 'MEDIUM',
  Small = 'SMALL'
}

export enum UserRole {
  Client = 'Client',
  Freelancer = 'Freelancer'
}

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Attachment: ResolverTypeWrapper<Attachment>;
  AttachmentInput: AttachmentInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Contract: ResolverTypeWrapper<Contract>;
  Contract_stats: ResolverTypeWrapper<Contract_Stats>;
  Contract_status: Contract_Status;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  EarningsStatus: EarningsStatus;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  ObjectID: ResolverTypeWrapper<Scalars['ObjectID']['output']>;
  ProfileMetaData: ResolverTypeWrapper<ProfileMetaData>;
  Project: ResolverTypeWrapper<Project>;
  ProjectCategoriesEnum: ProjectCategoriesEnum;
  ProjectScopeInput: ProjectScopeInput;
  ProjectScopeOutput: ResolverTypeWrapper<ProjectScopeOutput>;
  ProjectStats: ResolverTypeWrapper<ProjectStats>;
  Project_stats_per_month: ResolverTypeWrapper<Project_Stats_Per_Month>;
  Proposal: ResolverTypeWrapper<Proposal>;
  Proposal_status: Proposal_Status;
  Proposals_stats: ResolverTypeWrapper<Proposals_Stats>;
  Query: ResolverTypeWrapper<{}>;
  Review: ResolverTypeWrapper<Review>;
  StatusEnum: StatusEnum;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Submission_review: ResolverTypeWrapper<Submission_Review>;
  Submission_review_status: Submission_Review_Status;
  URL: ResolverTypeWrapper<Scalars['URL']['output']>;
  User: ResolverTypeWrapper<User>;
  filterOptionsInput: FilterOptionsInput;
  level_of_expertise: Level_Of_Expertise;
  payments: ResolverTypeWrapper<Payments>;
  queryResult: ResolverTypeWrapper<QueryResult>;
  reaction_type: Reaction_Type;
  reactions: ResolverTypeWrapper<Reactions>;
  size_of_project: Size_Of_Project;
  userRole: UserRole;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Attachment: Attachment;
  AttachmentInput: AttachmentInput;
  Boolean: Scalars['Boolean']['output'];
  Contract: Contract;
  Contract_stats: Contract_Stats;
  Date: Scalars['Date']['output'];
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  ObjectID: Scalars['ObjectID']['output'];
  ProfileMetaData: ProfileMetaData;
  Project: Project;
  ProjectScopeInput: ProjectScopeInput;
  ProjectScopeOutput: ProjectScopeOutput;
  ProjectStats: ProjectStats;
  Project_stats_per_month: Project_Stats_Per_Month;
  Proposal: Proposal;
  Proposals_stats: Proposals_Stats;
  Query: {};
  Review: Review;
  String: Scalars['String']['output'];
  Submission_review: Submission_Review;
  URL: Scalars['URL']['output'];
  User: User;
  filterOptionsInput: FilterOptionsInput;
  payments: Payments;
  queryResult: QueryResult;
  reactions: Reactions;
}>;

export type ConstraintDirectiveArgs = {
  contains?: Maybe<Scalars['String']['input']>;
  endsWith?: Maybe<Scalars['String']['input']>;
  exclusiveMax?: Maybe<Scalars['Float']['input']>;
  exclusiveMin?: Maybe<Scalars['Float']['input']>;
  format?: Maybe<Scalars['String']['input']>;
  max?: Maybe<Scalars['Float']['input']>;
  maxItems?: Maybe<Scalars['Int']['input']>;
  maxLength?: Maybe<Scalars['Int']['input']>;
  min?: Maybe<Scalars['Float']['input']>;
  minItems?: Maybe<Scalars['Int']['input']>;
  minLength?: Maybe<Scalars['Int']['input']>;
  multipleOf?: Maybe<Scalars['Float']['input']>;
  notContains?: Maybe<Scalars['String']['input']>;
  pattern?: Maybe<Scalars['String']['input']>;
  startsWith?: Maybe<Scalars['String']['input']>;
  uniqueTypeName?: Maybe<Scalars['String']['input']>;
};

export type ConstraintDirectiveResolver<Result, Parent, ContextType = ServerContext, Args = ConstraintDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AttachmentResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Attachment'] = ResolversParentTypes['Attachment']> = ResolversObject<{
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ContractResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Contract'] = ResolversParentTypes['Contract']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  client_id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  duration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  fees?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  freelancer_id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  project_id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  proposal_id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Contract_status'], ParentType, ContextType>;
  submission_reviews?: Resolver<Array<Maybe<ResolversTypes['Submission_review']>>, ParentType, ContextType>;
  terms?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Contract_StatsResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Contract_stats'] = ResolversParentTypes['Contract_stats']> = ResolversObject<{
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Contract_status'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type MutationResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  acceptContract?: Resolver<Maybe<ResolversTypes['Contract']>, ParentType, ContextType, RequireFields<MutationAcceptContractArgs, 'id'>>;
  acceptProposal?: Resolver<Maybe<ResolversTypes['Proposal']>, ParentType, ContextType, RequireFields<MutationAcceptProposalArgs, 'id'>>;
  acceptRequestProjectSubmissionReview?: Resolver<Maybe<ResolversTypes['queryResult']>, ParentType, ContextType, RequireFields<MutationAcceptRequestProjectSubmissionReviewArgs, 'contract_id' | 'submission_review_id'>>;
  addReview?: Resolver<Maybe<ResolversTypes['queryResult']>, ParentType, ContextType, RequireFields<MutationAddReviewArgs, 'description' | 'project_id' | 'rating' | 'user_id'>>;
  cancelContract?: Resolver<Maybe<ResolversTypes['Contract']>, ParentType, ContextType, RequireFields<MutationCancelContractArgs, 'id'>>;
  cancelProposal?: Resolver<Maybe<ResolversTypes['Proposal']>, ParentType, ContextType, RequireFields<MutationCancelProposalArgs, 'id'>>;
  cancelRequestProjectSubmissionReview?: Resolver<Maybe<ResolversTypes['queryResult']>, ParentType, ContextType, RequireFields<MutationCancelRequestProjectSubmissionReviewArgs, 'contract_id' | 'submission_review_id'>>;
  createContract?: Resolver<Maybe<ResolversTypes['Contract']>, ParentType, ContextType, RequireFields<MutationCreateContractArgs, 'duration' | 'freelancer_id' | 'price' | 'project_id' | 'proposal_id' | 'terms'>>;
  createProject?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<MutationCreateProjectArgs, 'category' | 'description' | 'price' | 'projectScope' | 'skills' | 'title'>>;
  createProposal?: Resolver<ResolversTypes['Proposal'], ParentType, ContextType, RequireFields<MutationCreateProposalArgs, 'cover_letter' | 'description' | 'duration' | 'price' | 'project_id'>>;
  declineProposal?: Resolver<Maybe<ResolversTypes['Proposal']>, ParentType, ContextType, RequireFields<MutationDeclineProposalArgs, 'id'>>;
  declineRequestProjectSubmissionReview?: Resolver<Maybe<ResolversTypes['queryResult']>, ParentType, ContextType, RequireFields<MutationDeclineRequestProjectSubmissionReviewArgs, 'contract_id' | 'submission_review_id'>>;
  deleteProject?: Resolver<Maybe<ResolversTypes['queryResult']>, ParentType, ContextType, RequireFields<MutationDeleteProjectArgs, 'id'>>;
  editContract?: Resolver<Maybe<ResolversTypes['Contract']>, ParentType, ContextType, RequireFields<MutationEditContractArgs, 'id' | 'terms'>>;
  editProject?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<MutationEditProjectArgs, 'description' | 'id'>>;
  editProposal?: Resolver<Maybe<ResolversTypes['Proposal']>, ParentType, ContextType, RequireFields<MutationEditProposalArgs, 'description' | 'id'>>;
  editReview?: Resolver<Maybe<ResolversTypes['queryResult']>, ParentType, ContextType, RequireFields<MutationEditReviewArgs, 'description' | 'id' | 'project_id' | 'rating'>>;
  reactToProject?: Resolver<Maybe<ResolversTypes['queryResult']>, ParentType, ContextType, RequireFields<MutationReactToProjectArgs, 'id' | 'reaction_type'>>;
  removeReview?: Resolver<Maybe<ResolversTypes['queryResult']>, ParentType, ContextType, RequireFields<MutationRemoveReviewArgs, 'id'>>;
  requestProjectSubmissionReview?: Resolver<Maybe<ResolversTypes['queryResult']>, ParentType, ContextType, RequireFields<MutationRequestProjectSubmissionReviewArgs, 'contract_id' | 'description' | 'title'>>;
  undoReactToProject?: Resolver<Maybe<ResolversTypes['queryResult']>, ParentType, ContextType, RequireFields<MutationUndoReactToProjectArgs, 'id' | 'reaction_type'>>;
}>;

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectID'], any> {
  name: 'ObjectID';
}

export type ProfileMetaDataResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['ProfileMetaData'] = ResolversParentTypes['ProfileMetaData']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProjectResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = ResolversObject<{
  _id?: Resolver<Maybe<ResolversTypes['ObjectID']>, ParentType, ContextType>;
  attachments?: Resolver<Array<ResolversTypes['Attachment']>, ParentType, ContextType>;
  category?: Resolver<ResolversTypes['ProjectCategoriesEnum'], ParentType, ContextType>;
  client_id?: Resolver<Maybe<ResolversTypes['ObjectID']>, ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  projectScope?: Resolver<ResolversTypes['ProjectScopeOutput'], ParentType, ContextType>;
  proposals?: Resolver<Maybe<Array<ResolversTypes['Proposal']>>, ParentType, ContextType>;
  reactions?: Resolver<Array<ResolversTypes['reactions']>, ParentType, ContextType>;
  skills?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  stats?: Resolver<Maybe<ResolversTypes['ProjectStats']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProjectScopeOutputResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['ProjectScopeOutput'] = ResolversParentTypes['ProjectScopeOutput']> = ResolversObject<{
  estimated_duration_in_days?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  level_of_expertise?: Resolver<ResolversTypes['level_of_expertise'], ParentType, ContextType>;
  size_of_project?: Resolver<ResolversTypes['size_of_project'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProjectStatsResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['ProjectStats'] = ResolversParentTypes['ProjectStats']> = ResolversObject<{
  approved_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  completed_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  declined_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  in_progress_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Project_Stats_Per_MonthResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Project_stats_per_month'] = ResolversParentTypes['Project_stats_per_month']> = ResolversObject<{
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  month?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProposalResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Proposal'] = ResolversParentTypes['Proposal']> = ResolversObject<{
  _id?: Resolver<Maybe<ResolversTypes['ObjectID']>, ParentType, ContextType>;
  attachments?: Resolver<Maybe<Array<ResolversTypes['Attachment']>>, ParentType, ContextType>;
  client_id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  cover_letter?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  duration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  freelancer_id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  project_id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Proposal_status'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['ProfileMetaData'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Proposals_StatsResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Proposals_stats'] = ResolversParentTypes['Proposals_stats']> = ResolversObject<{
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Proposal_status'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  Contract?: Resolver<Maybe<ResolversTypes['Contract']>, ParentType, ContextType, RequireFields<QueryContractArgs, 'id'>>;
  Profile?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  ProfileById?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryProfileByIdArgs, 'id'>>;
  Project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<QueryProjectArgs, 'id'>>;
  Projects?: Resolver<Maybe<Array<Maybe<ResolversTypes['Project']>>>, ParentType, ContextType, Partial<QueryProjectsArgs>>;
  Proposal?: Resolver<Maybe<ResolversTypes['Proposal']>, ParentType, ContextType, RequireFields<QueryProposalArgs, 'id'>>;
}>;

export type ReviewResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  project_id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  reviewer_id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Submission_ReviewResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Submission_review'] = ResolversParentTypes['Submission_review']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  accepted_at?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  attachments?: Resolver<Array<ResolversTypes['Attachment']>, ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Submission_review_status'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL';
}

export type UserResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  bio?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  birthday?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  company?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contracts?: Resolver<Array<ResolversTypes['Contract']>, ParentType, ContextType>;
  contracts_stats?: Resolver<Array<ResolversTypes['Contract_stats']>, ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  educationLevel?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  experienceLevel?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  jobTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  payments?: Resolver<Array<ResolversTypes['payments']>, ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  portfolio?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profileTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  projects?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType>;
  projects_stats?: Resolver<Array<ResolversTypes['Project_stats_per_month']>, ParentType, ContextType>;
  proposals?: Resolver<Array<ResolversTypes['Proposal']>, ParentType, ContextType>;
  proposals_stats?: Resolver<Array<ResolversTypes['Proposals_stats']>, ParentType, ContextType>;
  reviews?: Resolver<Array<ResolversTypes['Review']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  skills?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['StatusEnum']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PaymentsResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['payments'] = ResolversParentTypes['payments']> = ResolversObject<{
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  contract_id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResultResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['queryResult'] = ResolversParentTypes['queryResult']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  acknowledgement?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ReactionsResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['reactions'] = ResolversParentTypes['reactions']> = ResolversObject<{
  freelancer_id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  reaction_type?: Resolver<ResolversTypes['reaction_type'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ServerContext> = ResolversObject<{
  Attachment?: AttachmentResolvers<ContextType>;
  Contract?: ContractResolvers<ContextType>;
  Contract_stats?: Contract_StatsResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  ObjectID?: GraphQLScalarType;
  ProfileMetaData?: ProfileMetaDataResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  ProjectScopeOutput?: ProjectScopeOutputResolvers<ContextType>;
  ProjectStats?: ProjectStatsResolvers<ContextType>;
  Project_stats_per_month?: Project_Stats_Per_MonthResolvers<ContextType>;
  Proposal?: ProposalResolvers<ContextType>;
  Proposals_stats?: Proposals_StatsResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Review?: ReviewResolvers<ContextType>;
  Submission_review?: Submission_ReviewResolvers<ContextType>;
  URL?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  payments?: PaymentsResolvers<ContextType>;
  queryResult?: QueryResultResolvers<ContextType>;
  reactions?: ReactionsResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = ServerContext> = ResolversObject<{
  constraint?: ConstraintDirectiveResolver<any, any, ContextType>;
}>;

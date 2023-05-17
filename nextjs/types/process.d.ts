declare namespace NodeJS {
  export interface ProcessEnv {
    NEXTAUTH_URL: string
    NEXTAUTH_SECRET: string
    GITHUB_ID: string
    GITHUB_SECRET: string
    FACEBOOK_ID: string
    FACEBOOK_SECRET: string
    TWITTER_ID: string
    TWITTER_SECRET: string
    GOOGLE_ID: string
    GOOGLE_SECRET: string
    AUTH0_ID: string
    AUTH0_SECRET: string
    MONGODB_URI: string
    SENDGRID_API_KEY:string
    SENDGRID_EMAIL_FROM:string
    REDIS_URL: string
    STRIPE_SECRET_KEY:string
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:string
    PUSHER_APP_ID:string
    PUSHER_KEY:string
    PUSHER_SECRET:string
    NEXT_PUBLIC_PUSHER_CLUSTER:string
    NEXT_PUBLIC_PUSHER_KEY:string
    SIGNING_SECRET:string
    NEXT_PUBLIC_AZURE_STORAGE_SAS_TOKEN:string
    NEXT_PUBLIC_AZURE_STORAGE_ACCOUNT_NAME:string
    NEXT_PUBLIC_CONTAINER_NAME:string
    NOVU_API_SECRET:string
  }
}

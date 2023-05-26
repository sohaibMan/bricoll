FROM node:20-alpine AS base


# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN #apk add --no-cache libc6-compat

# Rebuild the source code only when needed

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


COPY . .

RUN npm run build


ENV NODE_ENV production


#RUN addgroup --system --gid 1001 nodejs
#RUN adduser --system --uid 1001 nextjs



#USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "run","start"]
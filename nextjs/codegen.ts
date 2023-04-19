import type { CodegenConfig } from '@graphql-codegen/cli';
// import { ServerContext } from './types/custom-types.d';

const config: CodegenConfig = {
    schema: "./pages/api/graphql/schema/*.graphql",
    generates: {
        './types/resolvers.ts': {
            config: {
                useIndexSignature: true,
                contextType: './server-context#ServerContext',
            },
            plugins: ['typescript', 'typescript-resolvers'],

        },
    },
};
export default config;
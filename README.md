# Next.js + graphql-let plugin

This Next.js plugin makes it easy to setup [graphql-let](https://github.com/piglovesyou/graphql-let) in your Next.js project. The main purpose of this plugin is to eliminate configuration and re-generation friction that you might experience with pure `graphql-let` setup. Mainly this plugin make `next.config.js` cleaner and re-generates the types and query hooks on every `yarn dev` or `yarn build` run.

## Getting started

Although Next.js plugins usually don't require a lot of setup to get started, this one required couple of steps to be completed before it will work:

### 1. Install dependencies

Note that some of these dependencies are here to support `@apollo/client` integration specifically.

With yarn:

```bash
yarn add @apollo/client graphql graphql-let
yarn add -D next-graphql-let-plugin @graphql-codegen/cli @graphql-codegen/import-types-preset @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo
```

With npm:

```bash
npm i @apollo/client graphql graphql-let
npm i -D next-graphql-let-plugin @graphql-codegen/cli @graphql-codegen/import-types-preset @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo
```

### 2. Add the plugin to next.config.js.

```js
// next.config.js
const withGraphQLLetPlugin = require("next-graphql-let-plugin")({
  // Plugin options go here...
});

module.exports = withGraphQLLetPlugin({
  // Regular config goes here...
});
```

### 3. Configure `graphql-let.yml`

Since `graphql-let` does not allow to use json configuration that could be defined through the code, we have to create a `graphql-let.yml` file with the configuration. Luckily, this plugin will create that file for you if you don't have one - su just run:

```bash
# yarn
yarn dev

# npm
npm run dev
```

Then, you just have to customize the configuration to your needs. For starters and simple schema we recommend following schema:

```yml
schema: "**/*.graphqls"
documents: "**/*.graphql"
plugins:
  - typescript-operations
  - typescript-react-apollo
cacheDir: .cache
```

You can also provide a remote schema in the config by pointing it to the GraphQL API url.

You can find full options that are available for you in `graphql-let.yml` config [here](https://github.com/piglovesyou/graphql-let).

### 4. Add client provider

You will need to create a GraphQL client provider. To have the provider work on every page in your Next.js project it's best to add it to the `_app.tsx` file. You can find a full guide on how to setup Apollo Client in a frontend app on [this page](https://www.apollographql.com/docs/react/get-started/), but here's a simple example you can use:

```tsx
import type { AppProps } from "next/app";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "", // Enter URL to your API here
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
```

### 5. Run `yarn dev` or `npm run dev`

That's it! You can now add `.graphql` files to your project with queries defined in them and `graphql-let` will generate fetching functions for you that you can use straight in your project like so:

```graphql
# lib/queries/author.graphql
query GetAuthors {
  authors {
    id
    name
  }
}
```

The above query gets converted into a query hook like this:

```tsx
import { useGetAuthorsQuery } from "../lib/queries/author.graphql";

export default function Home() {
  const { data } = useGetAuthorsQuery();

  return (
    <ul>
      {data?.authors.map((author) => (
        <li key={author.id}>author.name</li>
      ))}
    </ul>
  );
}
```

## Contributors

- [Antoni Silvestrovic (author)](https://github.com/bring-shrubbery)

## License

[MIT](https://github.com/bring-shrubbery/next-graphql-let-plugin/blob/main/LICENSE)

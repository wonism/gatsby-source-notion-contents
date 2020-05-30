# gatsby-source-notion-contents
> Get gatsby sources from notion

[![NPM](https://img.shields.io/npm/v/gatsby-source-notion-contents.svg?style=flat)](https://npmjs.org/package/gatsby-source-notion-contents)
![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/gatsby-source-notion-contents.svg)

## Installation
```sh
$ npm i -S gatsby-source-notion-contents
```

## ⚠️ Prerequisite
You need a token to use this package if you want to get private contents.
You can get it from [Notion.so](https://www.notion.so/) cookie. the key of it is `token_v2`.


## Options
```ts
type Option = {
  token?: string; // Optional. need token when you need to get private contents.
  ids?: string[]; // Optional. to get contents that are out of scope.
  prefix?: string; // Optional. to add prefix into relative links.
  removeStyle?: boolean; // Optional. to remove inline styles.
};
```

__ids__

If the URL is `https://www.notion.so/Personal-Home-db45cd2e7c694c3493c97f2376ab184a`,
You need to add `db45cd2e7c694c3493c97f2376ab184a` into `options.ids`.

## How to use
```js
// In your gatsby-config.js
{
  // other configs ...
  plugins: [
    // other plugins ...
    {
      resolve: `gatsby-source-notion-contents`,
      options: {
        token: '<<YOUR_NOTION_TOKEN>>',
        ids: ['<<ID_OF_NOTION_PAGE>>'],
        prefix: '/',
        removeStyle: false,
      },
    },
  ]
}
```

## How to query
- Get all posts

```graphql
query Notions {
  allNotionContent {
    edges {
      node {
        id
        contentType
        internal {
          # ... other properties of internal
          content
        }
      }
    }
  }
}
```

- Get a post

```graphql
query Notion {
  notionContent {
    id
    contentType
    internal {
      # ... other properties of internal
      content
    }
  }
}
```

- Get a specific post

```graphql
query Notion {
  notionContent(id: { eq: "ID_SPECIFIC_POST" }) {
    id
    contentType
    internal {
      # ... other properties of internal
      content
    }
  }
}
```

## Example

#### Sample project
- https://github.com/wonism/gatsby-source-notion-contents-sample

#### Example source
```jsx
const Component = {
  const data = useStaticQuery(graphql`
    query Notion {
      notionContent {
        internal {
          content
        }
      }
    }
  `);

  return (
    <div dangerouslySetInnerHTML={{ __html: data.notionContent.internal.content }} />
  );
};
```

---

<p align="center">
  <a href="https://www.buymeacoffee.com/dQ3sAxl" target="_blank">
    <img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" width="217" height="51" />
  </a>
</p>

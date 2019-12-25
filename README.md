# gatsby-source-notion-contents
> Get gatsby sources from notion

[![NPM](https://img.shields.io/npm/v/gatsby-source-notion-contents.svg?style=flat)](https://npmjs.org/package/gatsby-source-notion-contents)
![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/gatsby-source-notion-contents.svg)

## Installation
```sh
$ npm i -S gatsby-source-notion-contents
```

## ⚠️ Prerequisite
You need a token to use this package.
You can get it from [Notion.so](https://www.notion.so/) cookie. the key of it is `token_v2`.

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
      },
    },
  ]
}
```

## How to query
- Get all posts

```js
query Notions {
  allNotionContent {
    edges {
      node {
        id
        internal {
          content
        }
      }
    }
	}
}
```

- Get a specific post

```js
query Notion {
  notionContent {
    id
    internal {
      content
    }
  }
}
```


---

<p align="center">
  <a href="https://www.buymeacoffee.com/dQ3sAxl" target="_blank">
    <img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" width="217" height="51" />
  </a>
</p>

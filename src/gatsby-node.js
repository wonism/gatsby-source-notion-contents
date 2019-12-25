const Notion = require('get-notion-contents').default;

const getSources = async ({ actions: { createNode }, createContentDigest }, options) => {
  if (options == null && options.token == null) {
    throw new Error('token is required');
  }

  const notion = new Notion(options.token);

  const pageIds = await notion.getPageIds();
  const pages = await Promise.all(
    pageIds.map(
      async (id) => {
        const page = await notion.getPageById(id);

        return {
          id,
          page,
        };
      }
    )
  );

  pages.forEach(({ id, page }) => {
    const content = JSON.stringify(page);
    const node = {
      id,
      parent: null,
      children: [],
      internal: {
        type: 'NotionContent',
        mediaType: 'text/html',
        content,
        contentDigest: createContentDigest(page),
      },
    };

    createNode(node);
  });
};

exports.sourceNodes = getSources;

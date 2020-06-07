const Notion = require('get-notion-contents').default;

const formatUid = (uid) => {
  if (uid.indexOf('-') === -1) {
    return `${uid.slice(0, 8)}-${uid.slice(8, 12)}-${uid.slice(12, 16)}-${uid.slice(16, 20)}-${uid.slice(20)}`;
  }

  return uid;
};

const getSources = async ({ actions: { createNode }, createContentDigest }, options) => {
  const notion = new Notion(options?.token, { prefix: options?.prefix, removeStyle: options?.removeStyle ?? false });

  const hydratedIds = (options?.ids || []).map(formatUid);
  const pageIds = (await notion.getPageIds()).concat(options?.ids || []);
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

  pages
    .filter(({ page: { title, titleString, content } }) => Boolean(title) && Boolean(titleString) && Boolean(content))
    .forEach(({ id, page: { type, titleString: description, title, content, resource = '' } }) => {
      const page = title + content + resource;

      const node = {
        id,
        parent: null,
        children: [],
        contentType: type,
        internal: {
          type: 'NotionContent',
          mediaType: 'text/html',
          content: page,
          contentDigest: createContentDigest(page),
          description,
        },
      };

      createNode(node);
    });
};

exports.sourceNodes = getSources;

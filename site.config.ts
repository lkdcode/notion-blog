import { siteConfig } from './lib/site-config'

export default siteConfig({
  // the site's root Notion page (required)
  rootNotionPageId: '253a12d08f8e802694cdc8a17d559a62',

  // if you want to restrict pages to a single notion workspace (optional)
  // (this should be a Notion ID; see the docs for how to extract this)
  rootNotionSpaceId: null,

  // basic site info (required)
  name: 'lkdcode.blog',
  domain: 'lkdcode.dev',
  author: 'lkdcode',

  // open graph metadata (optional)
  description: 'lkdcode blog description',

  // social usernames (optional)
  // twitter: 'transitive_bs',
  github: 'lkdcode',
  // linkedin: 'fisch2',
  // mastodon: '#', // optional mastodon profile URL, provides link verification
  // newsletter: '#', // optional newsletter URL
  // youtube: '#', // optional youtube channel name or `channel/UCGbXXXXXXXXXXXXXXXXXXXXXX`

  // default notion icon and cover images for site-wide consistency (optional)
  // page-specific values will override these site-wide defaults
  // defaultPageIcon: '/lkdcode-dark.gif',
  defaultPageIcon: 'https://www.lkdcode.dev/lkdcode.jpg',
  defaultPageCover: '/page_cover.png',
  defaultPageCoverPosition: 0.5,

  // whether or not to enable support for LQIP preview images (optional)
  isPreviewImageSupportEnabled: true,

  // whether or not redis is enabled for caching generated preview images (optional)
  // NOTE: if you enable redis, you need to set the `REDIS_HOST` and `REDIS_PASSWORD`
  // environment variables. see the readme for more info
  isRedisEnabled: false,

  // map of notion page IDs to URL paths (optional)
  // any pages defined here will override their default URL paths
  // example:
  //
  // pageUrlOverrides: {
  //   '/foo': '067dd719a912471ea9a3ac10710e7fdf',
  //   '/bar': '0be6efce9daf42688f65c76b89f8eb27'
  // }
  pageUrlOverrides: null,

  // whether to use the default notion navigation style or a custom one with links to
  // important pages. To use `navigationLinks`, set `navigationStyle` to `custom`.
  // navigationStyle: 'default'
  navigationStyle: 'custom',
  navigationLinks: [
    {
      title: 'Core',
      pageId: '259a12d08f8e807cb1c9cdd0d8d92322'
    },
    {
      title: 'DB',
      pageId: '259a12d08f8e80059855fd2e94d4aa15'
    },
    {
      title: 'DevOps',
      pageId: '25aa12d08f8e803da11dc7c928753191'
    }
  ]
})

import { siteConfig } from './lib/site-config'

export default siteConfig({
  // the site's root Notion page (required)
  rootNotionPageId: '253a12d08f8e802694cdc8a17d559a62',

  // if you want to restrict pages to a single notion workspace (optional)
  // (this should be a Notion ID; see the docs for how to extract this)
  rootNotionSpaceId: 'b50424d1-38bd-4df2-9f68-8594894dde00',

  // basic site info (required)
  name: 'lkdcode.blog',
  domain: 'https://www.lkdcode.dev',
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
  defaultPageCover: 'https://www.lkdcode.dev/page_cover.png',
  defaultPageCoverPosition: 0.5,

  // whether or not to enable support for LQIP preview images (optional)
  isPreviewImageSupportEnabled: true,

  // whether or not redis is enabled for caching generated preview images (optional)
  // NOTE: if you enable redis, you need to set the `REDIS_HOST` and `REDIS_PASSWORD`
  // environment variables. see the readme for more info
  isRedisEnabled: true,

  // 항상 URL에 Notion page ID를 포함 (페이지 이동에 필요)
  includeNotionIdInUrls: true,

  // map of notion page IDs to URL paths (optional)
  // any pages defined here will override their default URL paths
  // example:
  //
  // pageUrlOverrides: {
  //   '/foo': '067dd719a912471ea9a3ac10710e7fdf',
  //   '/bar': '0be6efce9daf42688f65c76b89f8eb27'
  // }
  pageUrlOverrides: null,

  // 삭제/변경된 페이지 URL 리디렉트
  pageUrlAdditions: {
    '/2a5a12d08f8e805a9f04d2112f476379': '2f8a12d08f8e818b9cdcd02109c5a2db', // jOOQ
    '/26ba12d08f8e80b693bacbe22a87aac4': '2f8a12d08f8e8030a6a1f14806fbfc6d', // Debezium
    '/267a12d08f8e80d08a74cacb4c314070': '2f8a12d08f8e81cdbb00c0730dc50340', // QueryDSL 추상화
    '/268a12d08f8e807db4d0d81fd8c108e7': '2f8a12d08f8e80baabaee1d36b8b6041', // Jenkins 구축기
    '/25ba12d08f8e806d8d6bf797ca557bbd': '2f8a12d08f8e81a783ebd43c583f325f', // 리플렉션
    '/258a12d08f8e80d88feac343eef63d46': '2f8a12d08f8e805994b0dddf2b8114f5', // 쿼리 튜닝
    '/26ca12d08f8e80b6bd5df31f91d29dee': '2f8a12d08f8e81a39bf9eb911c7704f7', // Flyway
    '/26da12d08f8e8091aa51e8cd858fce03': '2f8a12d08f8e8129b30ce718224262e0', // gRPC
    '/25ba12d08f8e801ab637e89a0c0eb5c3': '2f8a12d08f8e811abf9ad5b5a2fd644a', // 캐시전략
    '/267a12d08f8e808ab92ede5defc6defb': '2f8a12d08f8e819db1d6e806835264e7', // 경로변수 암호화
    '/25ba12d08f8e80609070fa24d84d5c97': '2f8a12d08f8e817094b8d71f1ff78323', // SCG
    '/25ba12d08f8e80fda552dccb25a49809': '2f8a12d08f8e8102a1f0fa26e9dbee0d', // TestContainer
    '/25ba12d08f8e80d6ab20e4addd70005d': '2f8a12d08f8e81e6a470d00abb87545c', // FixtureMonkey
    '/25ea12d08f8e80749860cd8850390251': '25ea12d08f8e80749860cd8850390251', // 함께자라기
    '/267a12d08f8e803ba247e7e053ca331e': '2f8a12d08f8e8115830df754bedcaa74' // 테스트 좋은 글
  },

  // whether to use the default notion navigation style or a custom one with links to
  // important pages. To use `navigationLinks`, set `navigationStyle` to `custom`.
  // navigationStyle: 'default'
  navigationStyle: 'custom'
  //   navigationLinks: [
  //     {
  //       title: 'Core',
  //       pageId: '259a12d08f8e807cb1c9cdd0d8d92322'
  //     },
  //     {
  //       title: 'DB',
  //       pageId: '259a12d08f8e80059855fd2e94d4aa15'
  //     },
  //     {
  //       title: 'DevOps',
  //       pageId: '25aa12d08f8e803da11dc7c928753191'
  //     }
  //   ]
})

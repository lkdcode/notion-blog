import { NotionAPI } from 'notion-client'

export const notion = new NotionAPI({
  // apiBaseUrl: process.env.NOTION_API_BASE_URL
  apiBaseUrl: 'https://regal-candytuft-da4.notion.site/api/v3'
})

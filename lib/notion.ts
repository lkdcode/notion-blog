import {
  type ExtendedRecordMap,
  type SearchParams,
  type SearchResults
} from 'notion-types'
import { mergeRecordMaps } from 'notion-utils'
import pMap from 'p-map'
import pMemoize from 'p-memoize'

import {
  isPreviewImageSupportEnabled,
  navigationLinks,
  navigationStyle
} from './config'
import { getTweetsMap } from './get-tweets'
import { notion } from './notion-api'
import { getPreviewImageMap } from './preview-images'

const getNavigationLinkPages = pMemoize(
  async (): Promise<ExtendedRecordMap[]> => {
    const navigationLinkPageIds = (navigationLinks || [])
      .map((link) => link?.pageId)
      .filter(Boolean)

    if (navigationStyle !== 'default' && navigationLinkPageIds.length) {
      return pMap(
        navigationLinkPageIds,
        async (navigationLinkPageId) =>
          notion.getPage(navigationLinkPageId, {
            chunkLimit: 1,
            fetchMissingBlocks: false,
            fetchCollections: false,
            signFileUrls: false
          }),
        {
          concurrency: 4
        }
      )
    }

    return []
  }
)

export async function getPage(pageId: string): Promise<ExtendedRecordMap> {
  let recordMap = await notion.getPage(pageId)

  // notion-client의 fetchMissingBlocks는 "p" 참조만 추적하고
  // "eoi" (external_object_instance) 참조는 무시하므로 직접 fetch
  const eoiBlockIds = new Set<string>()
  for (const block of Object.values(recordMap.block)) {
    const properties = (block as any)?.value?.properties
    if (!properties) continue
    for (const propValues of Object.values(properties) as any[]) {
      if (!Array.isArray(propValues)) continue
      for (const decoration of propValues) {
        if (!Array.isArray(decoration) || decoration.length < 2) continue
        const modifiers = decoration[1]
        if (!Array.isArray(modifiers)) continue
        for (const modifier of modifiers) {
          if (Array.isArray(modifier) && modifier[0] === 'eoi' && modifier[1]) {
            eoiBlockIds.add(modifier[1] as string)
          }
        }
      }
    }
  }

  const missingEoiBlockIds = Array.from(eoiBlockIds).filter(
    (id) => !recordMap.block[id]?.value
  )
  if (missingEoiBlockIds.length > 0) {
    try {
      const response = await (notion as any).getBlocks(missingEoiBlockIds)
      const newBlocks = response?.recordMap?.block || {}

      for (const [id, entry] of Object.entries(newBlocks) as [string, any][]) {
        if (entry?.value?.value && !entry?.value?.id) {
          recordMap.block[id] = entry.value
        } else {
          recordMap.block[id] = entry
        }
      }
    } catch (err) {
      console.warn('Failed to fetch EOI blocks:', err)
    }
  }

  if (navigationStyle !== 'default') {
    // ensure that any pages linked to in the custom navigation header have
    // their block info fully resolved in the page record map so we know
    // the page title, slug, etc.
    const navigationLinkRecordMaps = await getNavigationLinkPages()

    if (navigationLinkRecordMaps?.length) {
      recordMap = navigationLinkRecordMaps.reduce(
        (map, navigationLinkRecordMap) =>
          mergeRecordMaps(map, navigationLinkRecordMap),
        recordMap
      )
    }
  }

  if (isPreviewImageSupportEnabled) {
    const previewImageMap = await getPreviewImageMap(recordMap)
    ;(recordMap as any).preview_images = previewImageMap
  }

  await getTweetsMap(recordMap)

  return recordMap
}

export async function search(params: SearchParams): Promise<SearchResults> {
  return notion.search(params)
}

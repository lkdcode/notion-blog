import { type ExtendedRecordMap } from 'notion-types'
import { getBlockTitle, parsePageId, uuidToId } from 'notion-utils'

import { inversePageUrlOverrides } from './config'

/**
 * 페이지 제목을 URL-safe slug로 정규화합니다.
 */
function normalizeTitle(title: string | null): string {
  return (title || '')
    .replace(/\s+/g, '-')
    .replace(
      /[^a-zA-Z0-9\u3000-\u303F\u3041-\u3096\u30A1-\u30FC\u4E00-\u9FFF\uAC00-\uD7AF-]/g,
      ''
    )
    .replace(/--+/g, '-')
    .replace(/^-|-$/g, '')
    .trim()
    .toLowerCase()
}

/**
 * 페이지의 canonical ID를 반환합니다.
 * slug 속성 대신 pageId를 직접 사용합니다.
 *
 * @param pageId - Notion 페이지 ID
 * @param recordMap - Notion 레코드맵
 * @param options.uuid - true면 URL에 pageId 포함, false면 제목만
 * @returns URL에 사용할 canonical ID (예: "my-post-abc123def456")
 */
export function getCanonicalPageId(
  pageId: string,
  recordMap: ExtendedRecordMap,
  { uuid = true }: { uuid?: boolean } = {}
): string | undefined {
  const cleanPageId = parsePageId(pageId, { uuid: false })
  if (!cleanPageId) {
    return
  }

  // 수동 오버라이드 확인
  const override = inversePageUrlOverrides[cleanPageId]
  if (override) {
    return override
  }

  // 페이지 블록에서 제목 추출
  const block = recordMap.block[pageId]?.value
  if (!block) {
    return cleanPageId
  }

  const title = normalizeTitle(getBlockTitle(block, recordMap))

  if (uuid) {
    // URL에 pageId 포함: "제목-pageId" 형식
    return title ? `${title}-${cleanPageId}` : cleanPageId
  } else {
    // pageId 없이 제목만 (production에서 includeNotionIdInUrls: false일 때)
    // 하지만 제목이 없으면 pageId 사용
    return title || cleanPageId
  }
}

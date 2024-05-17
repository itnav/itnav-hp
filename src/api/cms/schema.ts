export interface MicroCMSEntity {
  id: string;
  publishedAt: string;
  revisedAt: string;
  updatedAt: string;
  createdAt: string;
}

export interface MicroCMSImageEntity {
  url: string;
  height: number;
  width: number;
}

/**
 * MicroCMS からデータを取得した際のレスポンスの型。
 *
 * @see https://document.microcms.io/content-api/get-list-contents#h0c0b84b0b7
 */
export interface MicroCMSResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}

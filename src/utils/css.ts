/** property を連結させる */
export function mergeCssProperty(
  before: string | null | undefined,
  after: string | null | undefined
) {
  return before && after ? `${before} ${after}` : before || after || '';
}

/** Object で渡されたクエリを文字列に変換する。 */
export function formatQueryToString(query: Record<string, any>) {
  return '?' + new URLSearchParams(query).toString();
}

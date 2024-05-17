/**
 * タイムスタンプの文字列を yyyy/mm/dd 形式へ変換する
 *
 * @param timestamp タイムスタンプの文字列
 */
export function timestampToYYYYMMDD(timestamp: string) {
  return timestamp.split(/[-T]/, 3).join('/');
}

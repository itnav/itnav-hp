import { navigate, type Options } from 'astro:transitions/client';
import { removeUrlFragment } from './fragment';
import { route } from '@/router';

/** 履歴が存在したら戻る、存在しなかったら引数に渡されたページへ遷移する関数のオプション */
export interface SafelyNavigateBackOptions extends Options {
  /** １つ戻ることで Browser が閉じる場合、代わりに遷移するパス */
  fallbackPath?: string;
}

/**
 * 履歴が存在したら戻る、存在しなかったら引数に渡されたページへ遷移する
 *
 * @param escapePathname 戻る先のパス
 */
export function safelyNavigateBack(options: SafelyNavigateBackOptions = {}) {
  // 履歴が存在したら戻る
  if (history.length > 2) {
    history.back();
    return;
  }

  // 履歴が存在しなかったら引数に渡されたページへ遷移
  if (options.fallbackPath) {
    navigate(options.fallbackPath, options);
    return;
  }

  // QueryParameter が存在したら削除する
  if (location.hash) return removeUrlFragment();
  // if (location.search) return removeAllSearchParams();

  // 引数に渡されたページが存在しなかったらトップページへ遷移
  navigate(route.top.path, options);
}

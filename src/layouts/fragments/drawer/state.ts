import { historyEvent } from '@/utils/history';
import { isClient } from '@/utils/runtime';
import { atom } from 'nanostores';

export const isOpenLayoutDialog = atom(false);

if (isClient) {
  /** メニューが開いているかどうかを確認し、状態を更新する */
  function checkOpen() {
    isOpenLayoutDialog.set(location.hash === '#drawer');
  }

  checkOpen();

  historyEvent.addListener('fragment', checkOpen);
}

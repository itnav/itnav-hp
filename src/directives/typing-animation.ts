export interface TypingAnimationOptions {
  observer?: IntersectionObserverInit;
}

/**
 * 一文字ずつ文字を表示するアニメーションを付与するディレクティブ
 *
 * @param node Element
 */
export function typingAnimation(
  node: Element,
  options: TypingAnimationOptions = {},
) {
  options.observer
    ? new IntersectionObserver(onObserve, options.observer).observe(node)
    : typing(node);
}

async function onObserve(nodeOrEntries: IntersectionObserverEntry[]) {
  const entry = nodeOrEntries[0];

  if (!entry.isIntersecting) return;

  return typing(entry.target as Element);
}

async function typing(node: Element) {
  node.classList.add('app-typing-animation');

  const targetNode = node.cloneNode(false) as Element;
  targetNode.setAttribute(
    'style',
    'position: absolute; visibility: initial; top: 0; left: 0;',
  );

  let targetContent = new Text();

  targetNode.appendChild(targetContent);

  const children = node.childNodes;
  const childLength = children.length;

  node.appendChild(targetNode);

  await toggleClass(targetNode, targetContent, children, childLength);
}

async function toggleClass(
  targetNode: Element,
  targetContent: Text,
  children: NodeListOf<ChildNode>,
  childLength: number,
) {
  for (let index = 0; index < childLength; index++) {
    const child = children.item(index);
    if (child.nodeName === 'BR') {
      const br = child.cloneNode(true);
      targetNode.appendChild(br);
      targetContent = new Text();
      targetNode.appendChild(targetContent);
      continue;
    }

    // textContentがないときにループをスキップする
    const textContent = child.textContent;
    if (!textContent) continue;

    const chars = textContent.trim().split('');
    const charLength = chars.length;

    for (let i = 0; i < charLength; i++) {
      targetContent.textContent += chars[i];
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 10));
    }
  }
}

import Block from '../core/block';

export function render(query: string, block: Block) {
    const root = document.querySelector(query);

    if (root) {
      root.appendChild(block.getContent());
    }

    return root;
}

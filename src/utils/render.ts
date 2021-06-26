import Block from '../core/block';

export default function render(query: string, block: Block) {
  const root = document.querySelector(query);

  root.appendChild(block.getContent());

  return root;
}

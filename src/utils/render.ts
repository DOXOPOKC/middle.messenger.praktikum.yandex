import Block from '../core/block';

export default function render(query: string, block: Block) {
  const root = document.querySelector(query);

  block.getTemplate();
  root.appendChild(block.getContent());

  return root;
}

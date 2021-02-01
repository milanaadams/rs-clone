export default function removeChildren(parent: HTMLElement): void {
  while (parent.children.length > 0) {
    parent.children[0].remove();
  }
}

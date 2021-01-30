export default function removeChildren(parent) {
  while (parent.children.length > 0) {
    parent.children[0].remove();
  }
}

import { chain } from "ramda";

export function flattenTrees(trees = []) {
  return chain((node) => {
    const children = node.children || [];
    return [node, ...flattenTrees(children)];
  }, trees);
}

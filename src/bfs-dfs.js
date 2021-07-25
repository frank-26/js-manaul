// https://plnkr.co/edit/ku4DWRyiYLyxBFqH?preview

// BFS

function wideTraversal(node) {
  const nodes = [];
  if (node != null) {
    const queue = [];
    queue.unshift(node);
    while (queue.length != 0) {
      const item = queue.shift(); //先出
      nodes.push(item.title);
      const children = item.children;
      for (let i = 0; i < children.length; i++) {
        queue.push(children[i]); //先进
      }
    }
  }
  return nodes;
}

// DFS
function deepTraversal(node) {
  const nodeList = [];
  if (node) {
    const stack = [];
    stack.push(node);
    while (stack.length != 0) {
      const item = stack.pop(); // 后出
      nodeList.push(item.title);
      const children = item.children;
      for (let i = children.length - 1; i >= 0; i--) {
        stack.push(children[i]); // 先进
      }
    }
  }
  return nodeList;
}
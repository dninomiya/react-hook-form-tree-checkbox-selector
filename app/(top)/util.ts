type TreeNode = {
  id?: string;
  label: string;
  items: TreeNode[];
};

function generateRandomTree(totalItems: number): TreeNode[] {
  let currentId = 1;

  function createItem(
    level: number,
    parentId: string,
    itemCount: number
  ): TreeNode {
    const id = parentId ? `${parentId}.${itemCount}` : `${itemCount}`;
    const label = `アイテム ${id}`;
    return {
      id,
      label,
      items: [],
    };
  }

  function createGroup(
    level: number,
    parentId: string,
    groupId: string
  ): TreeNode {
    const items: TreeNode[] = [];
    let itemCount = 1;
    const maxGroupItems = Math.floor(Math.random() * 10) + 1; // 各グループ内のアイテム数をランダムに決定

    while (items.length < maxGroupItems && currentId <= totalItems) {
      if (Math.random() > 0.5 && level < 4) {
        items.push(
          createGroup(
            level + 1,
            parentId ? `${parentId}.${groupId}` : groupId,
            itemCount.toString()
          )
        );
      } else {
        items.push(
          createItem(
            level,
            parentId ? `${parentId}.${groupId}` : groupId,
            itemCount
          )
        );
        currentId += 1;
      }
      itemCount += 1;
    }

    return {
      label: `グループ ${parentId ? `${parentId}.${groupId}` : groupId}`,
      items,
    };
  }

  const tree: TreeNode = {
    label: 'すべて',
    items: [],
  };

  let groupCount = 1;
  const maxTopLevelGroups = Math.floor(Math.random() * 10) + 1; // トップレベルのグループ数をランダムに決定
  while (currentId <= totalItems && tree.items.length < maxTopLevelGroups) {
    tree.items.push(createGroup(0, '', groupCount.toString()));
    groupCount += 1;
  }

  return [tree];
}

export { generateRandomTree };

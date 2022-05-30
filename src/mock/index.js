import Mock from 'mockjs';

function generageList(arrLength = 5, beginId = 1) {
  const { list } = Mock.mock({
    [`list|${arrLength}`]: [{
      // ID 自增
      'id|+1': beginId,
      title: '@ctitle(15.25)',
      readTimes: '@natural(0,99999)',
      source: '@ctitle(3,10)',
      date: '@date("yyyy-MM-dd")',
    }],
  });

  return {
    code: 200,
    data: list,
  };
}

/**
 *
 * @param {Number} pagination 页码索引
 * @param {Number} pageSize 每页的内容数量
 * @returns
 */
function findByPagination(pagination = 0, pageSize = 5) {
  const beginIndex = pagination * pageSize;
  const endIndex = beginIndex + pageSize;
  const { list } = Mock.mock({
    [`list|${endIndex - beginIndex}`]: [{
      // ID 自增
      'id|+1': beginIndex + 1,
      title: '@ctitle(15.25)',
      readTimes: '@natural(0,99999)',
      source: '@ctitle(3,10)',
      date: '@date("yyyy-MM-dd")',
    }],
  });

  return {
    code: 200,
    data: {
      list,
      pagination,
      pageSize,
    },
  };
}

export { generageList, findByPagination };

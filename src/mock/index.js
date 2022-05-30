import Mock from 'mockjs';

function generageList(arrLength = 5, beginId = 1) {
  const mockList = Mock.mock({
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
    data: mockList,
  };
}

// /**
//  *
//  * @param {Number} pagination 页码索引
//  * @param {Number} pageSize 每页的内容数量
//  * @returns
//  */
// function findByPagination(pagination = 0, pageSize = 5) {
//   const beginIndex = pagination * pageSize;
//   const endIndex = beginIndex + pageSize;
//   setTimeout(() => {
//     console.log(mockList);
//     const targetList = mockList.slice(beginIndex, endIndex);

//     return {
//       code: 200,
//       data: {
//         list: targetList,
//         pagination,
//         pageSize,
//       },
//     };
//   });
// }

export default generageList;

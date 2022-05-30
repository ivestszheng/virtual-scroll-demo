import Mock from 'mockjs';

function findAll(listNum = 5) {
  return Mock.mock({
    code: 200,
    data: {
      [`list|${listNum}`]: [{
        // ID 自增
        'id|+1': 1,
        title: '@ctitle(15.25)',
        readTimes: '@natural(0,99999)',
        source: '@ctitle(3,10)',
        date: '@date("yyyy-MM-dd")',
      }],
    },
  });
}

// eslint-disable-next-line import/prefer-default-export
export { findAll };

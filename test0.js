数组转换成树形结构对象
 
输入：
[
  {
    id: 1,
    pid: 0,
    name: 'body'
  },
  {
    id: 2,
    pid: 1,
    name: 'title'
  },
  {
    id: 3,
    pid: 1,
    name: 'div'
  },
  {
    id: 4,
    pid: 3,
    name: 'span'
  },
  {
    id: 5,
    pid: 3,
    name: 'icon'
  },
  {
    id: 6,
    pid: 4,
    name: 'subspan'
  }
]
 
输出：
[
  {
    "id": 1,
    "pid": 0,
    "name": "body",
    "children": [
      {
        "id": 2,
        "pid": 1,
        "name": "title"
      },
      {
        "id": 3,
        "pid": 1,
        "name": "div",
        "children": [
          {
            "id": 4,
            "pid": 3,
            "name": "span",
            "children": [
              {
                "id": 6,
                "pid": 4,
                "name": "subspan"
              }
            ]
          },
          {
            "id": 5,
            "pid": 3,
            "name": "icon"
          }
        ]
      }
    ]
  }
]
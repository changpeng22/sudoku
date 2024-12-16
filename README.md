# [a modified repository forked from sudoku](https://sudoku.jonasgeiler.com)

小组成员

- 常鹏
- 邱梓钿
- 郭集河
- 王舒航

# 实现了数独求解的前两种方法：Hidden Singles；Naked Pairs & Triples
- 求解方法运行逻辑：两种方法顺序运行
- 退出逻辑：当完全求解、无法继续求解，或达到最大迭代次数时退出
- 目前返回值类型：键值对
- 目前运行方法：
```bash
npm install
npm run build(忽略报错)
cd ./src/node_modules/@sudoku
node sudoku.js
```

测试外部数独题目
```javascript
import {testSudoku} from '@sudoku/sencode/index.js'
input_url = 'https://www.sudokuwiki.org/sudoku.htm?bd=093824560085600002206075008321769845000258300578040296850016723007082650002507180'
data = testSudoku(input_url);


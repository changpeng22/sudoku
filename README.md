# [a modified repository forked from sudoku](https://sudoku.jonasgeiler.com)

小组成员

- 常鹏
- 邱梓钿
- 郭集河
- 王舒航

# 实现了数独求解，使用SolveManagement类管理求解逻辑，使用BaseStragety类作为策略类的基类，所有策略类共享一套迭代子和比较子
- 采用设计原则：开放封闭原则
- 求解方法运行逻辑：顺序运行
- 退出逻辑：当完全求解、无法继续求解，或达到最大迭代次数时退出



测试外部数独题目
```
npm install
npm run dev
```

```javascript
import {testSudoku} from '@sudoku/sencode/index.js'
input_url = 'https://www.sudokuwiki.org/sudoku.htm?bd=093824560085600002206075008321769845000258300578040296850016723007082650002507180'
data = testSudoku(input_url);
```



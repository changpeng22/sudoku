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
```
npm install
npm run dev
```


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

## 更新：
- 增加从数独网站导入数独功能
- 增加回溯功能，点击候选值即可进入分支
- 增加撤销和回退功能
- 增加无解判断，在提示时进行
- 使用回溯和撤销回退功能时，应用一次提示
- 增加回溯和撤销回退功能的联动，撤销到回溯那一步时，减少回溯次数

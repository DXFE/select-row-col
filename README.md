### 图示
![eg](https://raw.githubusercontent.com/lyqeyes/images/master/select_table/selector-init.png)
![eg](https://raw.githubusercontent.com/lyqeyes/images/master/select_table/selector-use1.png)
![eg](https://raw.githubusercontent.com/lyqeyes/images/master/select_table/selector-use2.png)


### Develop
```apple js
npm run dev
```

### Usage
```apple js

组件props配置项,  maxSize = {row, col}

取消选择回调 onCancel()

成功选择回调 onSelect({row, col})

```

### Example
``` apple js

import TableSelector from 'select-row-col';

<TableSelector maxSize={{row:15, cols:10}} />

```

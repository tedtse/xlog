#### 引用 
```
UMD
  var Xlog = require('.../xlog');

Client
  <script src='.../xlog-client.js'></script>
```
#### 初始化
```
  Xlog.init({
    launchDirect: 123,
    overwriteConsole: false,
    isGlobalParameter: false,
    display: false
  });
```
- 参数说明
| Name        | Default           | Description  |
| ------------- |-----------| ---------------------|
| launchDirect      | 123 | 启动指令 |
| overwriteConsole      | false      | 是否覆盖 window.console |
| isGlobalParameter | false      | 是否设为全局变量(window.Xlog) |
| display| false      | 初始是否显示 |

#### Api
- log
  Xlog.log(msg), 同console.log(msg)
- debug
  Xlog.debug(msg), 同console.debug(msg)
- info
  Xlog.info(msg), 同console.info(msg)
- warn
  Xlog.warn(msg), 同console.warn(msg)
- error
  Xlog.error(msg), 同console.error(msg)

#### Example
```
  var Xlog = require('.../xlog');
  Xlog.log({a: 1, b: [2, 3]});
  Xlog.log({a: 1, b: {c: 2, d: 3}});
  Xlog.info([1, 2]);
  Xlog.info('ffffffffffffffeeeeeee');
  Xlog.warn(3);
  Xlog.error(4);
```
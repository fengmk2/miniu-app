## 概述

MiniU 支付宝小程序模板


- 支持 js 及 [TypeScript](https://www.typescriptlang.org/)
- 支持 acss 及 [Less](https://lesscss.org/)
- 支持 [Miniu Data](https://opendocs.alipay.com/mini/miniu/data_intro)
- 支持浏览器开发小程序
- 支持IDE开发小程序
- 支持 代码 Lint
- 支持 CI/CD


## 快速开始

> 以下都使用 npm 作为说明，推荐使用 [cnpm](https://github.com/cnpm/cnpm) 提升安装依赖速度

```bash
# 安装依赖
$ npm i

# 启动
$ npm run dev 
```

## 其他指令

```bash
# 打包生成 dist
$ npm run build

# 代码 lint
$ npm run lint

# 修改代码 lint 错误
$ npm run lint:fix

# ci 包括 lint、build、小程序本地构建
$ npm run ci
```

## 其他

### 依赖

小程序的依赖放到 dependencies，工具依赖放到devDependencies。

示例：

```bash
# 安装小程序的依赖
$ npm install mini-ali-ui --save 

# 安装工具依赖
$ npm install typescript --save-dev
```

### 去掉弹出浏览器

 不想要在 npm run dev 弹出浏览器只需修改 package.json "dev" 中 OPEN_BROWSER=`true` 修改为 OPEN_BROWSER=`false`

### 在小程序开发者工具中开发

```bash
$ npm i
$ npm run dev
# 接着使用小程序开发者工具打开当前的项目
```
### 使用 Typescript 及 Less

无需其他配置，在src里使用 ts，less

### 更多

https://opendocs.alipay.com/mini/miniu
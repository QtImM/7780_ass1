# Assignment 2 ToDo List（基于需求文档 + 当前项目现状）

## 目标
按 R1-R6、ITR1-ITR2 完成 Green World E-shop 的三轮迭代交付，并确保可演示、可验收。

## 当前状态快速判断
- [x] 已有首页与产品页前端雏形（对应 R2、R3 的一部分）
- [x] 已有下单/购物车前端交互（对应 R5 的一部分）
- [ ] 未形成作业要求的 Node.js 服务端交付（ITR1）
- [ ] 未接入 MySQL 持久化订单（ITR2）
- [ ] 未完成作业要求的 PayPal 结账流程（R4）
- [ ] 页脚学生信息未按“table + border=2”严格落地（R6）

## P0（先做，影响验收）
- [ ] 建立 `cycle1/cycle2/cycle3` 交付目录结构（或等效结构），避免当前仓库内容与作业要求脱节
- [ ] 统一页面命名到作业要求：
  - `comp7780_home.html`
  - `comp7780_product.html`
- [ ] 在两个页面补齐“heading / company info / footing”显式区块（R2、R3）
- [ ] 页脚改为学生信息表格，设置 `border="2"`（R6）

## P1（Cycle 1: HTTP Server）
- [ ] 新建 `http_server_input_file.js`（或等效）启动 Node.js HTTP 服务
- [ ] 正确返回 `comp7780_home.html` 与 `comp7780_product.html`
- [ ] 静态资源 MIME 正常（图片/CSS/JS）
- [ ] 本地验收：`http://localhost/comp7780_home.html` 可访问

## P1（Cycle 2: Express）
- [ ] 初始化 Node 项目并安装 Express
- [ ] 新建 `index.js`，用 Express 提供路由与静态目录（`public`）
- [ ] 校正首页到产品页链接（走 Express 端口）
- [ ] 验收：`http://localhost:3000/` 打开主页，产品页可访问

## P1（Cycle 3: MySQL + Order）
- [ ] 安装 `mysql2` 依赖
- [ ] 创建数据库脚本并执行（user/db/table）
- [ ] 新建 `connect.js`，确保显示 `Connected!`
- [ ] 实现 `/cart`：接收商品、数量、价格、用户名并写入 `cart`
- [ ] 实现 `/check_out`：读取购物车并汇总总价
- [ ] 页面端把“Checkout”接到 `/check_out` 流程

## P1（PayPal）
- [ ] 在 checkout 页面接入 PayPal SDK（sandbox）
- [ ] 按购物车总价创建订单并完成支付回调
- [ ] 支付成功后展示成功信息（满足 R4）
- [ ] 准备测试账号与演示步骤（防止课堂演示失败）

## P2（质量与提交）
- [ ] 补一份 `README`（运行步骤、依赖、端口、数据库初始化）
- [ ] 准备最小测试清单：
  - [ ] 下单写库成功
  - [ ] checkout 金额正确
  - [ ] PayPal 支付回调成功
  - [ ] R6 表格页脚在两页都生效
- [ ] 打包提交材料（代码 + SQL + 截图/说明）

## 验收 Checklist（最终打勾）
- [ ] R1 网站可展示并支持线上销售流程
- [ ] R2 `comp7780_home.html` 结构符合要求
- [ ] R3 `comp7780_product.html` 结构符合要求
- [ ] R4 PayPal 支付可用
- [ ] R5 用户可下单
- [ ] R6 学生信息表格 + `border=2`
- [ ] ITR1 Node.js Web Server 已部署运行
- [ ] ITR2 MySQL 交易数据可存取

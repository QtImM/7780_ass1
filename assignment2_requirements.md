# Assignment 2 需求梳理（Green World E-shop）

## 1. 项目背景
Green World 是一家于 **2026-01-01** 成立于香港的环保回收公司。现有销售以线下门店为主，目标是建设线上 E-shop，展示公司与商品信息，并支持在线下单与支付。

## 2. 核心业务需求（Business Requirements）
1. **R1**：建立网站（E-shop）用于展示并销售产品。
2. **R2**：`comp7780_home.html`（主页）必须包含：
   - 页头（heading）
   - 公司信息（company information）
   - 页脚（footing）
3. **R3**：`comp7780_product.html`（产品页）必须包含：
   - 页头（heading）
   - 公司信息（company information）
   - 产品信息（product information）
   - 页脚（footing）
4. **R5**：产品页允许用户下单（place orders）。
5. **R4**（在 cycle1 开始前新增）：支持使用 **PayPal** 支付订单。
6. **R6**（在 cycle2 新增）：页脚中的学生信息必须使用 **表格格式** 展示，且要求 `table border = 2`。

## 3. 技术需求（IT Requirements）
1. **ITR1**：搭建 Node.js Web Server。
2. **ITR2**：搭建 MySQL 数据库用于存储交易数据。
3. 项目按 3 个迭代（cycles）推进。

## 4. 迭代实施要点（按提供文档归纳）

### Cycle 1（http server）
1. 使用 Node.js 启动基础 HTTP 服务。
2. 使用/复用作业1页面文件，并提供 `comp7780_home.html` 与 `comp7780_product.html`。
3. 通过 `mime` 模块处理静态资源类型。

### Cycle 2（express）
1. 使用 Express 重构服务。
2. 主页链接应可跳转到产品页（示例中用 `http://localhost:3000/comp7780_product.html`）。
3. 图片资源放到 `public` 目录并由 Express 提供静态访问。
4. 新增并满足 **R6**（页脚学生信息表格）。

### Cycle 3（db）
1. 安装并启动 MySQL，创建用户、数据库和表。
2. Node.js 端安装 `mysql2` 并完成数据库连接测试（`connect.js`）。
3. 实现购物车/订单相关读写：
   - `/cart`：将下单信息写入 `cart` 表。
   - `/check_out`：读取购物车与商品信息，汇总金额并展示结算信息。
4. 支持 PayPal 付款流程（满足 **R4**）。

## 5. 可执行验收清单（建议按此自查）
1. 访问首页能看到公司信息（R1, R2）。
2. 访问产品页能看到产品信息（R1, R3）。
3. 产品页可提交订单（R5）。
4. 结账可进入 PayPal 支付流程（R4）。
5. 页脚学生信息以 `border=2` 表格展示（R6）。
6. 服务端使用 Node.js（ITR1）。
7. 下单/结账数据可写入并读取 MySQL（ITR2）。

## 6. 文档来源
1. `assignment2 project/2025_2026_assignment_2_requirements.docx`
2. `assignment2 project/developer documents/user_story.docx`
3. `assignment2 project/scrum master documents/backlog_cycle1.docx`
4. `assignment2 project/scrum master documents/backlog_cycle2.docx`
5. `assignment2 project/scrum master documents/backlog_cycle3.docx`
6. `cycle1 http_server/cycle1_notes.docx`
7. `cycle2 express/cycle2_notes.docx`
8. `cycle3_db/cycle3_notes.docx`

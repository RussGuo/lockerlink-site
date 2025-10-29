# Lockerlink Analytics Events

本文档列出落地页内置的埋点事件，说明触发时机、携带参数以及常见使用场景，便于运营/产品团队在仪表盘或数据库中分析用户行为。

## 事件通用字段
| 字段 | 说明 |
| ---- | ---- |
| `id` | 事件唯一 ID（UUID，由前端生成）。 |
| `eventId` | 事件标识（见下方事件表）。 |
| `label` | 可选标签，多数 CTA 暂未使用。 |
| `language` | 用户当前界面语言（zh / en / ja / ko）。 |
| `page` | 触发时文档标题。 |
| `path` | URL path，例如 `/delivery`。 |
| `metadata` | JSON 结构的额外上下文（各事件独有字段见下表“额外参数”列）。 |
| `occurredAt` | ISO 时间戳（UTC）。 |

> **数据库位置**：表 `analytics_events`（Vercel Postgres），字段与以上结构一致。

## 事件一览
| eventId | 触发位置 | 描述 | 额外参数（metadata） |
| ------- | -------- | ---- | -------------------- |
| `nav_home_click` | 顶部导航「首页」Logo 或导航项 | 用户点击回到首页。 | 无 |
| `nav_item_click` | 顶部导航各业务菜单 | 跳转到业务页（存包/转运/合作/账户）。 | `target`: 导航键名（storage/delivery/partner/account） |
| `language_change` | 右上角语言选择器 | 用户切换站点语言。 | `target`: 切换后的语言代码 |
| `home_store_click` | 首页 Hero CTA 「Book Storage / 立即寄存」等 | 首页主按钮，跳往存包体验。 | 无 |
| `home_transfer_click` | 首页 Hero CTA 「Arrange Transfer / 安排转运」 | 首页次按钮，跳往转运页面。 | 无 |
| `storage_primary_click` | 存包页 Hero 主按钮 | 用户尝试查找附近寄存点。 | 无 |
| `storage_secondary_click` | 存包页 Hero 次按钮 | 查看价格/服务说明。 | 无 |
| `delivery_primary_click` | 转运页 Hero 主按钮 | 预约转运。 | 无 |
| `delivery_secondary_click` | 转运页 Hero 次按钮 | 查看线路。 | 无 |
| `partner_primary_click` | 合作伙伴页 Hero 主按钮 | 申请合作咨询。 | 无 |
| `partner_secondary_click` | 合作伙伴页 Hero 次按钮 | 查看合作案例。 | 无 |
| `account_primary_click` | 我的账户页 Hero 主按钮 | 前往登录。 | 无 |
| `account_secondary_click` | 我的账户页 Hero 次按钮 | 创建账户。 | 无 |
| `search_submit` | 「Find a locker / 查找寄存点」搜索表单 | 用户提交城市或日期搜索。 | `location`: 输入的地点字符串；`date`: 选择的日期（可为空） |
| `analytics_dashboard_open` | 页脚隐蔽按钮 | 团队成员打开内部仪表盘。 | 无 |
| `subscribe_submit` | 「服务即将上线」订阅面板 | 用户提交邮箱订阅完整服务（当前用于转运页搜索后展示）。 | `email`: 邮箱；`intent`: 业务意图（如 `delivery`） |

（若将来新增 CTA/按钮，请同步更新此表，以便分析对照。）

## 数据查看入口
- 隐蔽按钮：页脚社交图标右侧的细小圆点。
- 目标路由：`/analytics`。
- 时段筛选：支持调整开始/结束日期（UTC，默认最近 7 天）。
- 数据内容：
  - 总览卡片：各事件累计次数。
  - Daily Trend：每日事件量（按事件分组）。
  - Recent Activity：最近 50 条原始记录（含 metadata、path、UA）。

## 部署准备
1. 创建 Vercel Postgres 实例或配置任意兼容的 PostgreSQL 数据库。
2. 设置以下环境变量（Vercel 项目 → Settings → Environment Variables）：
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`
   - `POSTGRES_DATABASE`
   - `POSTGRES_USER`
   - `POSTGRES_PASSWORD`

3. 首次部署后，API 会自动创建 `analytics_events` 表及索引。
4. 若数据库未配置，埋点请求会返回 `503 Analytics disabled`，仪表盘将显示空数据。

## 开发/调试建议
- 本地调试可临时注释 `analyticsEnabled` 检查逻辑，或在 `.env.local` 搭建本地 PostgreSQL。默认会 fallback，不阻断页面功能。
- 观察前端日志：在非生产环境，每次触发事件都会在控制台输出 `[analytics] { ... }`，方便核对参数。

---
如需扩充事件或关联后续 BI 平台，请保持 ID 命名统一，并在本文件补充说明。EOF

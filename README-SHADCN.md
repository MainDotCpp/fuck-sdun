# shadcn/ui 集成完成 ✅

## 已安装的组件

- ✅ **Button** - 按钮组件
- ✅ **Input** - 输入框组件
- ✅ **Card** - 卡片组件
- ✅ **Alert** - 提示组件
- ✅ **Badge** - 徽章组件

## 已更新的文件

1. **`components.json`** - shadcn/ui 配置文件
2. **`app/globals.css`** - 添加了 CSS 变量（支持亮色/暗色主题）
3. **`tailwind.config.ts`** - 更新了 Tailwind 配置以支持 shadcn/ui
4. **`lib/utils.ts`** - 工具函数（`cn` 用于合并类名）
5. **`app/components/BrowserControl.tsx`** - 使用 shadcn/ui 组件
6. **`app/components/BrowserStatus.tsx`** - 使用 shadcn/ui 组件
7. **`app/page.tsx`** - 更新了样式类名

## 启动项目

```bash
pnpm next:dev
```

访问 http://localhost:9292

## 组件使用示例

### Button
```tsx
import { Button } from '@/components/ui/button';

<Button variant="default" size="lg">开始</Button>
<Button variant="destructive">停止</Button>
```

### Input
```tsx
import { Input } from '@/components/ui/input';

<Input type="url" placeholder="https://example.com" />
```

### Card
```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>标题</CardTitle>
  </CardHeader>
  <CardContent>内容</CardContent>
</Card>
```

### Alert
```tsx
import { Alert, AlertDescription } from '@/components/ui/alert';

<Alert variant="destructive">
  <AlertDescription>错误消息</AlertDescription>
</Alert>
```

### Badge
```tsx
import { Badge } from '@/components/ui/badge';

<Badge variant="default">运行中</Badge>
<Badge variant="secondary">未运行</Badge>
```

## 添加更多组件

如果需要添加更多 shadcn/ui 组件：

```bash
pnpm dlx shadcn@latest add [component-name]
```

例如：
```bash
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add select
pnpm dlx shadcn@latest add toast
```

## 主题定制

主题颜色在 `app/globals.css` 中的 CSS 变量定义。可以修改这些变量来自定义主题。

## 文档

- [shadcn/ui 官网](https://ui.shadcn.com/)
- [组件文档](https://ui.shadcn.com/docs/components)


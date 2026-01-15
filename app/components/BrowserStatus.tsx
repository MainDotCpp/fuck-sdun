'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BrowserStatusProps {
  status: {
    isRunning: boolean;
    deviceName?: string;
    group?: string;
    startedAt?: string;
  };
}

export default function BrowserStatus({ status }: BrowserStatusProps) {
  const formatTime = (dateString?: string) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleString('zh-CN');
    } catch {
      return dateString;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>浏览器状态</CardTitle>
        <CardDescription>当前浏览器运行状态和配置信息</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">运行状态:</span>
          <Badge variant={status.isRunning ? 'default' : 'secondary'}>
            {status.isRunning ? '运行中' : '未运行'}
          </Badge>
        </div>

        {status.isRunning && (
          <>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">设备名称:</span>
              <span className="text-sm text-muted-foreground">{status.deviceName || '-'}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">启动时间:</span>
              <span className="text-sm text-muted-foreground">{formatTime(status.startedAt)}</span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}


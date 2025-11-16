'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export default function BrowserControl() {
  const [url, setUrl] = useState('');
  const [referer, setReferer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    // 验证输入
    if (!url.trim()) {
      toast.error('请填写目标网址');
      return;
    }

    // 验证 URL 格式
    try {
      new URL(url);
    } catch {
      toast.error('无效的 URL 格式');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/browser/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url.trim(),
          referer: referer.trim(),
          languageRotation: ['ja', 'ja-JP'],
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || '浏览器启动请求已提交');
      } else {
        toast.error(data.error || '启动失败');
      }
    } catch (error) {
      toast.error('网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };


  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="url" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            网址
          </label>
          <Input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="圣盾链接"
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="referer" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            来源
          </label>
          <Input
            id="referer"
            type="url"
            value={referer}
            onChange={(e) => setReferer(e.target.value)}
            placeholder="落地页链接"
            disabled={loading}
          />
        </div>

        <Button
          onClick={handleStart}
          disabled={loading}
          className="w-full"
          size="lg"
        >
          {loading ? '处理中...' : '开始'}
        </Button>
      </CardContent>
    </Card>
  );
}


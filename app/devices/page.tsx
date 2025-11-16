'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Eye, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import type { DeviceProfile } from '@/src/types/device';

export default function DevicesPage() {
  const [devices, setDevices] = useState<DeviceProfile[]>([]);
  const [loading, setLoading] = useState(true);

  // 加载设备列表
  const loadDevices = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/devices');
      const result = await response.json();
      
      if (result.success) {
        setDevices(result.data || []);
      } else {
        toast.error(result.error || '加载设备列表失败');
      }
    } catch (error: any) {
      toast.error('网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDevices();
  }, []);

  // 删除设备
  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个设备吗？')) {
      return;
    }

    try {
      const response = await fetch(`/api/devices/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        toast.success('设备已删除');
        loadDevices();
      } else {
        toast.error(result.error || '删除失败');
      }
    } catch (error: any) {
      toast.error('网络错误，请稍后重试');
    }
  };

  // 查看设备详情（JSON 格式）
  const handleViewDetails = (device: DeviceProfile) => {
    const json = JSON.stringify(device, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${device.name}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-sm text-muted-foreground">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">设备管理</h1>
            <p className="text-muted-foreground">共 {devices.length} 个设备</p>
          </div>
          <Button variant="outline" onClick={loadDevices} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            刷新
          </Button>
        </div>

        {devices.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">暂无设备</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {devices.map((device) => (
              <Card key={device.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{device.name}</CardTitle>
                      <Badge variant={device.platform === 'ios' ? 'default' : 'secondary'}>
                        {device.platform === 'ios' ? 'iOS' : 'Android'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">屏幕:</span>{' '}
                      {device.hardware.screenWidth} × {device.hardware.screenHeight}
                    </div>
                    <div>
                      <span className="text-muted-foreground">系统:</span>{' '}
                      {device.system.osVersion}
                    </div>
                    <div>
                      <span className="text-muted-foreground">浏览器:</span>{' '}
                      {device.browser.name} {device.browser.version}
                    </div>
                    {device.hardware.memory && (
                      <div>
                        <span className="text-muted-foreground">内存:</span>{' '}
                        {device.hardware.memory} GB
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(device)}
                      className="flex-1"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      详情
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(device.id)}
                      className="flex-1"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      删除
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


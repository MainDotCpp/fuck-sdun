'use client';

import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Trash2, Eye, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import type { DeviceProfile } from '@/src/types/device';

const ITEMS_PER_PAGE = 10;

export default function DevicesPage() {
  const params = useParams();
  const group = (params?.group as string) || 'all';

  const [devices, setDevices] = useState<DeviceProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewingDevice, setViewingDevice] = useState<DeviceProfile | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // 加载设备列表
  const loadDevices = async () => {
    try {
      setLoading(true);
      const url = group === 'all' ? '/api/devices' : `/api/devices?group=${group}`;
      const response = await fetch(url);
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
  }, [group]);

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

  // 查看设备详情
  const handleViewDetails = (device: DeviceProfile) => {
    setViewingDevice(device);
  };

  // 关闭详情视图
  const handleCloseDetails = () => {
    setViewingDevice(null);
  };

  // 分页计算
  const totalPages = Math.ceil(devices.length / ITEMS_PER_PAGE);
  const paginatedDevices = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return devices.slice(start, end);
  }, [devices, currentPage]);

  // 页面变化时重置到第一页
  useEffect(() => {
    if (devices.length > 0 && currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [devices.length, currentPage, totalPages]);

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
      <div className="max-w-7xl mx-auto px-4">
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
          <>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">ID</TableHead>
                      <TableHead>设备名称</TableHead>
                      <TableHead>平台</TableHead>
                      <TableHead>屏幕尺寸</TableHead>
                      <TableHead>系统版本</TableHead>
                      <TableHead>浏览器</TableHead>
                      <TableHead>内存</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedDevices.map((device) => (
                      <TableRow key={device.id}>
                        <TableCell className="font-medium">{device.id}</TableCell>
                        <TableCell>{device.name}</TableCell>
                        <TableCell>
                          <Badge variant={device.platform === 'ios' ? 'default' : 'secondary'}>
                            {device.platform === 'ios' ? 'iOS' : 'Android'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {device.hardware.screenWidth} × {device.hardware.screenHeight}
                        </TableCell>
                        <TableCell>{device.system.osVersion}</TableCell>
                        <TableCell>
                          {device.browser.name} {device.browser.version}
                        </TableCell>
                        <TableCell>
                          {device.hardware.memory ? `${device.hardware.memory} GB` : '-'}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewDetails(device)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              详情
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(device.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              删除
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* 分页控件 */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  显示第 {((currentPage - 1) * ITEMS_PER_PAGE) + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, devices.length)} 条，共 {devices.length} 条
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    上一页
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // 只显示当前页附近的页码
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <Button
                            key={page}
                            variant={currentPage === page ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className="min-w-[40px]"
                          >
                            {page}
                          </Button>
                        );
                      } else if (
                        page === currentPage - 2 ||
                        page === currentPage + 2
                      ) {
                        return (
                          <span key={page} className="px-2 text-muted-foreground">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    下一页
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* 详情对话框 */}
      {viewingDevice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={handleCloseDetails}>
          <div className="bg-background rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold">设备详情: {viewingDevice.name}</h2>
              <Button variant="ghost" size="icon" onClick={handleCloseDetails}>
                <span className="text-xl">×</span>
              </Button>
            </div>
            <div className="flex-1 overflow-auto p-6">
              <pre className="bg-muted p-4 rounded-lg overflow-auto text-sm">
                <code>{JSON.stringify(viewingDevice, null, 2)}</code>
              </pre>
            </div>
            <div className="flex justify-end gap-2 p-6 border-t">
              <Button variant="outline" onClick={handleCloseDetails}>
                关闭
              </Button>
              <Button
                onClick={() => {
                  const json = JSON.stringify(viewingDevice, null, 2);
                  const blob = new Blob([json], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${viewingDevice.name}.json`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
              >
                下载 JSON
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


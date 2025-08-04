import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

interface SystemMetrics {
  cpu: string;
  memory: string;
  storage: string;
  activeUsers: number;
  apiCalls: number;
  errorRate: string;
  avgResponseTime: string;
}

interface ServiceHealth {
  name: string;
  status: string;
  responseTime: number;
}

export const BackendMonitorDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [services, setServices] = useState<ServiceHealth[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSystemStatus = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('backend-monitor', {
        body: { action: 'getSystemStatus' }
      });

      if (error) throw error;
      setMetrics(data);
    } catch (error) {
      console.error('Failed to fetch system status:', error);
    }
  };

  const fetchHealthCheck = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('backend-monitor', {
        body: { action: 'healthCheck' }
      });

      if (error) throw error;
      setServices(data.services || []);
    } catch (error) {
      console.error('Failed to fetch health check:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSystemStatus();
    fetchHealthCheck();
    
    const interval = setInterval(() => {
      fetchSystemStatus();
      fetchHealthCheck();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
          Backend Monitor
        </h2>
        <Button 
          onClick={() => { fetchSystemStatus(); fetchHealthCheck(); }}
          className="bg-teal-600 hover:bg-teal-700"
        >
          Refresh
        </Button>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-600">{metrics?.cpu}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Memory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{metrics?.memory}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{metrics?.activeUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{metrics?.avgResponseTime}</div>
          </CardContent>
        </Card>
      </div>

      {/* Service Health */}
      <Card>
        <CardHeader>
          <CardTitle>Service Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {services.map((service) => (
              <div key={service.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="font-medium">{service.name}</div>
                  <Badge variant={service.status === 'healthy' ? 'default' : 'destructive'}>
                    {service.status}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">
                  {service.responseTime}ms
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { format } from "date-fns";

interface HRVChartProps {
  userId: string;
}

const HRVChart = ({ userId }: HRVChartProps) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    fetchData();
  }, [userId]);

  const fetchData = async () => {
    const { data: hrvData } = await supabase
      .from("hrv_data")
      .select("*")
      .eq("user_id", userId)
      .order("timestamp", { ascending: true })
      .limit(168);

    if (hrvData) {
      const chartData = hrvData.map((item) => ({
        time: format(new Date(item.timestamp), "MMM dd HH:mm"),
        hrv: Number(item.hrv_value),
        rmssd: item.rmssd ? Number(item.rmssd) : null,
        sdnn: item.sdnn ? Number(item.sdnn) : null,
      }));
      setData(chartData);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <Card className="shadow-soft border-border/50">
        <CardHeader>
          <CardTitle>HRV Metrics</CardTitle>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <div className="animate-pulse">Loading chart...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-soft border-border/50">
      <CardHeader>
        <CardTitle>HRV Metrics</CardTitle>
        <CardDescription>Heart Rate Variability measurements over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorHrv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorRmssd" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="time"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => value.split(" ")[0]}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="hrv"
              stroke="hsl(var(--primary))"
              fillOpacity={1}
              fill="url(#colorHrv)"
              name="HRV Value"
            />
            <Area
              type="monotone"
              dataKey="rmssd"
              stroke="hsl(var(--secondary))"
              fillOpacity={1}
              fill="url(#colorRmssd)"
              name="RMSSD"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default HRVChart;

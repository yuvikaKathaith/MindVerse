import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { format } from "date-fns";

interface StressChartProps {
  userId: string;
}

const StressChart = ({ userId }: StressChartProps) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    fetchData();

    // Generate sample data if none exists
    const checkAndGenerateData = async () => {
      const { data: existingData } = await supabase
        .from("hrv_data")
        .select("id")
        .eq("user_id", userId)
        .limit(1);

      if (!existingData || existingData.length === 0) {
        await supabase.rpc("insert_sample_hrv_data", { p_user_id: userId });
        fetchData();
      }
    };

    checkAndGenerateData();
  }, [userId]);

  const fetchData = async () => {
    const { data: hrvData } = await supabase
      .from("hrv_data")
      .select("*")
      .eq("user_id", userId)
      .order("timestamp", { ascending: true })
      .limit(168); // Last 7 days

    if (hrvData) {
      const chartData = hrvData.map((item) => ({
        time: format(new Date(item.timestamp), "MMM dd HH:mm"),
        stressLevel: getStressValue(item.stress_level),
        heartRate: item.heart_rate,
      }));
      setData(chartData);
    }
    setLoading(false);
  };

  const getStressValue = (level: string): number => {
    const map: Record<string, number> = {
      low: 1,
      moderate: 2,
      high: 3,
      very_high: 4,
    };
    return map[level] || 0;
  };

  if (loading) {
    return (
      <Card className="shadow-soft border-border/50">
        <CardHeader>
          <CardTitle>Stress Levels Over Time</CardTitle>
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
        <CardTitle>Stress Levels Over Time</CardTitle>
        <CardDescription>Your stress patterns for the last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="time"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => value.split(" ")[0]}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              domain={[0, 4]}
              ticks={[0, 1, 2, 3, 4]}
              tickFormatter={(value) => ["", "Low", "Moderate", "High", "Very High"][value]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="stressLevel"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
              name="Stress Level"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default StressChart;

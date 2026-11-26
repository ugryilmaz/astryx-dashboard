// Copyright (c) Meta Platforms, Inc. and affiliates.

import { Layout, LayoutContent, VStack } from "@astryxdesign/core/Layout";
import { Grid } from "@astryxdesign/core/Grid";
import { Text, Heading } from "@astryxdesign/core/Text";
import { Card } from "@astryxdesign/core/Card";
import { Line, LineChart, ResponsiveContainer } from "recharts";

interface SparkPoint {
  i: number;
  v: number;
}

interface Metric {
  key: string;
  label: string;
  value: string;
  spark: SparkPoint[];
}

const COLORS = {
  green: "var(--color-data-categorical-green, #0B991F)",
};

const TREND_DAYS = 90;

function noise(i: number, seed: number): number {
  const x = Math.sin(i * 127.1 + seed * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function spark(seed: number, trend: number): SparkPoint[] {
  const points: SparkPoint[] = [];
  let drift = 0;
  for (let i = 0; i < TREND_DAYS; i++) {
    const base = 50 + (trend * i * 24) / TREND_DAYS;
    const weekly = Math.sin((i * Math.PI * 2) / 7 + seed) * 2.5;
    drift = drift * 0.72 + (noise(i, seed) - 0.5) * 7;
    const jitter = (noise(i, seed + 17) - 0.5) * 8;
    const burst =
      noise(i, seed + 91) > 0.9 ? (noise(i, seed + 43) - 0.4) * 20 : 0;
    points.push({ i, v: Math.round(base + weekly + drift + jitter + burst) });
  }
  return points;
}

const OVERVIEW_METRICS: Metric[] = [
  {
    key: "active-users",
    label: "Active users",
    value: "1.28M",
    spark: spark(1, 1.1),
  },
  {
    key: "new-users",
    label: "New users",
    value: "184.2K",
    spark: spark(2, 1.4),
  },
  {
    key: "sessions",
    label: "Sessions",
    value: "4.62M",
    spark: spark(3, 0.9),
  },
  {
    key: "avg-session",
    label: "Avg. session",
    value: "6m 42s",
    spark: spark(4, 0.3),
  },
  {
    key: "pages-session",
    label: "Pages / session",
    value: "5.3",
    spark: spark(5, 0.4),
  },
  {
    key: "bounce",
    label: "Bounce rate",
    value: "38.6%",
    spark: spark(6, -0.5),
  },
  {
    key: "dau-mau",
    label: "DAU / MAU",
    value: "52.1%",
    spark: spark(7, 0.7),
  },
  {
    key: "conversion",
    label: "Conversion rate",
    value: "3.84%",
    spark: spark(8, 0.6),
  },
  {
    key: "activation",
    label: "Activation rate",
    value: "61.4%",
    spark: spark(9, 0.8),
  },
  {
    key: "retention-30",
    label: "30-day retention",
    value: "27.4%",
    spark: spark(10, -0.3),
  },
  {
    key: "churn",
    label: "Churn rate",
    value: "4.7%",
    spark: spark(11, -0.6),
  },
  {
    key: "load-time",
    label: "Avg. load time",
    value: "1.4s",
    spark: spark(12, 0.35),
  },
];

function MiniSparkline({ data, color }: { data: SparkPoint[]; color: string }) {
  return (
    <div aria-hidden="true">
      <ResponsiveContainer width="100%" height={48}>
        <LineChart
          data={data}
          margin={{ top: 4, right: 0, left: 0, bottom: 0 }}
          accessibilityLayer={false}
        >
          <Line
            type="linear"
            dataKey="v"
            stroke={color}
            strokeWidth={1.25}
            strokeLinecap="butt"
            strokeLinejoin="miter"
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function MetricCard({ metric }: { metric: Metric }) {
  return (
    <Card padding={4}>
      <VStack gap={4}>
        <VStack gap={1}>
          <Text type="label" color="secondary">
            {metric.label}
          </Text>
          <Heading level={1} accessibilityLevel={3}>
            {metric.value}
          </Heading>
        </VStack>
        <MiniSparkline data={metric.spark} color={COLORS.green} />
      </VStack>
    </Card>
  );
}

export default function DataDashboardPage() {
  return (
    <Layout
      height="fill"
      contentWidth={1440}
      content={
        <LayoutContent role="main" padding={6}>
          <VStack gap={6}>
            <Heading level={2}>Key metrics</Heading>
            <Grid columns={{ minWidth: 240, max: 4, repeat: "fit" }} gap={3}>
              {OVERVIEW_METRICS.map((metric) => (
                <MetricCard key={metric.key} metric={metric} />
              ))}
            </Grid>
          </VStack>
        </LayoutContent>
      }
    />
  );
}

import { TrendingUp } from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  // XAxis,
  // Tooltip,
  // ResponsiveContainer,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 186, mobile: 80, tablet: 65, foot: 40 },
  { month: "February", desktop: 305, mobile: 200, tablet: 100, foot: 60 },
  { month: "March", desktop: 237, mobile: 120, tablet: 95, foot: 70 },
  { month: "April", desktop: 73, mobile: 190, tablet: 55, foot: 30 },
  { month: "May", desktop: 209, mobile: 130, tablet: 85, foot: 50 },
  { month: "June", desktop: 214, mobile: 140, tablet: 75, foot: 65 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#EF4444", // red-500
  },
  mobile: {
    label: "Mobile",
    color: "#3B82F6", // blue-500
  },
  tablet: {
    label: "Tablet",
    color: "#10B981", // green-500
  },
  foot: {
    label: "Foot",
    color: "#EC4899", // pink-500
  },
} satisfies ChartConfig

export function BarChartComponent() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-base">Visitors Breakdown</CardTitle>
        <CardDescription className="text-xs">
          January - June 2024
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <ChartContainer config={chartConfig}>
          {/* <ResponsiveContainer width="100%" height={100}> */}
            <BarChart data={chartData} barCategoryGap={14}>
              <CartesianGrid vertical={false} />
              
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar
                dataKey="desktop"
                fill={chartConfig.desktop.color}
                radius={3}
                barSize={10}
              />
              <Bar
                dataKey="mobile"
                fill={chartConfig.mobile.color}
                radius={3}
                barSize={10}
              />
              <Bar
                dataKey="tablet"
                fill={chartConfig.tablet.color}
                radius={3}
                barSize={10}
              />
              <Bar
                dataKey="foot"
                fill={chartConfig.foot.color}
                radius={3}
                barSize={10}
              />
            </BarChart>
          {/* </ResponsiveContainer> */}
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1 text-xs">
        <div className="flex gap-1 font-medium leading-none">
          Trending up by 5.2% this month
          <TrendingUp className="h-3 w-3" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}

"use client"

import { useEffect, useRef } from "react"

interface EarningsChartProps {
  data: { date: string; amount: number }[]
}

export function EarningsChart({ data }: EarningsChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && chartRef.current) {
      // Dynamically import Plotly to avoid SSR issues
      import("plotly.js-dist-min").then((Plotly) => {
        const trace = {
          x: data.map((d) => d.date),
          y: data.map((d) => d.amount),
          type: "scatter" as const,
          mode: "lines+markers" as const,
          line: { color: "#7c3aed", width: 3 },
          marker: { color: "#7c3aed", size: 8 },
          name: "Earnings",
        }

        const layout = {
          title: {
            text: "Earnings Over Time",
            font: { size: 18, color: "#374151" },
          },
          xaxis: {
            title: "Date",
            gridcolor: "#f3f4f6",
          },
          yaxis: {
            title: "Amount ($)",
            gridcolor: "#f3f4f6",
          },
          plot_bgcolor: "rgba(0,0,0,0)",
          paper_bgcolor: "rgba(0,0,0,0)",
          margin: { t: 50, r: 30, b: 50, l: 60 },
        }

        const config = {
          responsive: true,
          displayModeBar: false,
        }

        Plotly.newPlot(chartRef.current!, [trace], layout, config)
      })
    }
  }, [data])

  return <div ref={chartRef} className="w-full h-64" />
}

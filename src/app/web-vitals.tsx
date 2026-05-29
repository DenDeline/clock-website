'use client'

import { sendGAEvent } from '@next/third-parties/google'
import { useReportWebVitals } from 'next/web-vitals'

type ReportWebVitalsCallback = Parameters<typeof useReportWebVitals>[0]
type WebVitalsMetric = Parameters<ReportWebVitalsCallback>[0]

function formatMetricValue(metric: WebVitalsMetric, value: number) {
  return Math.round(metric.name === 'CLS' ? value * 1000 : value)
}

const reportWebVitals: ReportWebVitalsCallback = (metric) => {
  if (process.env.NODE_ENV !== 'production') {
    return
  }

  sendGAEvent('event', 'web_vital', {
    metric_name: metric.name,
    metric_id: metric.id,
    metric_value: formatMetricValue(metric, metric.value),
    metric_delta: formatMetricValue(metric, metric.delta),
    metric_rating: metric.rating,
    navigation_type: metric.navigationType,
    non_interaction: true,
  })
}

export default function WebVitals() {
  useReportWebVitals(reportWebVitals)

  return null
}

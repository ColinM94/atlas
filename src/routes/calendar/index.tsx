import { createFileRoute } from '@tanstack/react-router'
import { Calendar } from './-calendar'

export const Route = createFileRoute('/calendar/')({
  component: Calendar,
})

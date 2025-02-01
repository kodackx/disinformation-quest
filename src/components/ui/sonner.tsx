import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"
import { useEffect } from "react"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  useEffect(() => {
    const updateCountdown = () => {
      const toasts = document.querySelectorAll('[data-sonner-toast]')
      toasts.forEach(toast => {
        const createdAt = Number(toast.getAttribute('data-created'))
        const duration = 4000 // Match the duration from toastOptions
        const now = Date.now()
        const remaining = Math.max(0, Math.ceil((createdAt + duration - now) / 1000))
        toast.setAttribute('data-remaining', remaining.toString())
      })
    }

    const interval = setInterval(updateCountdown, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      duration={4000}
      position="top-right"
      closeButton
      richColors
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-2 group-[.toaster]:border-yellow-500/30 group-[.toaster]:shadow-[0_0_10px_rgba(234,179,8,0.1)] group-[.toaster]:shadow-lg relative",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-yellow-500/10 group-[.toast]:text-yellow-500 group-[.toast]:hover:bg-yellow-500/20",
          closeButton:
            "group-[.toast]:bg-yellow-500/10 group-[.toast]:text-yellow-500 group-[.toast]:hover:bg-yellow-500/20",
        },
        descriptionClassName: "text-sm text-yellow-500/70",
        style: {
          '--duration': '4000ms',
        } as React.CSSProperties,
      }}
      {...props}
    />
  )
}

export { Toaster }

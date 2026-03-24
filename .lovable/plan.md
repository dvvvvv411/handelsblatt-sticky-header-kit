

## Fix: Seite soll beim Tab-Wechsel nicht neu laden

### Ursache
React Query hat standardmäßig `refetchOnWindowFocus: true` — bei jedem Tab-Wechsel werden alle Queries neu gefeuert, was Loading-States und Neu-Rendern auslöst.

### Fix in `src/App.tsx`

In der `QueryClient`-Konfiguration `refetchOnWindowFocus: false` hinzufügen:

```ts
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});
```

Eine Zeile, Problem gelöst.


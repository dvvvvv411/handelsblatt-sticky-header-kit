

## Sidebar sticky machen

### Problem
Die Sidebar ist `lg:static`, scrollt also mit dem Seiteninhalt mit.

### Lösung in `src/layouts/AdminLayout.tsx`

Zeile 105: `lg:static` durch `lg:fixed` ersetzen und `lg:h-screen` hinzufügen, damit die Sidebar auf Desktop fixiert bleibt.

Dann beim Main-Content einen linken Margin hinzufügen, der der Sidebar-Breite entspricht:
- `sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"`

### Änderungen

1. **Sidebar `<aside>`** (Zeile 104-108): `lg:static` → `lg:fixed`, plus `lg:h-screen`
2. **Main `<main>`** (ca. Zeile 185): Dynamischen `lg:ml-20` / `lg:ml-64` Margin hinzufügen


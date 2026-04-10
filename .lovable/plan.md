

## Fix: Badge Hover-Effekt entfernen

### Problem
Die `Badge`-Komponente verwendet standardmäßig `variant="default"`, das `hover:bg-primary/80` enthält. Diese Klasse hat höhere Spezifität als die custom `hover:bg-yellow-100` etc. aus `statusConfig`, weshalb der dunkle Hover-Effekt erscheint.

### Lösung
In `BalancePage.tsx` bei der Badge-Verwendung (ca. Zeile 119) einfach `variant="outline"` hinzufügen. Die `outline`-Variante hat **keinen** Hover-Effekt, sodass die custom Farben aus `statusConfig` sauber greifen.

**Änderung in `src/pages/admin/BalancePage.tsx`** (eine Zeile):
```tsx
// Vorher:
<Badge className={`${st.color} border gap-1 rounded-lg cursor-default`}>

// Nachher:
<Badge variant="outline" className={`${st.color} border gap-1 rounded-lg cursor-default`}>
```

Das ist die einzige Änderung. Kein weiterer Code betroffen.


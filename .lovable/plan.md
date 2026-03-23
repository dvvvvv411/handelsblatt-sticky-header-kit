

## Fix: Eingabefelder verlieren Fokus nach jedem Buchstaben

### Problem
Die `Field`-Komponente ist **innerhalb** der `CreateCardPage`-Komponente definiert (Zeile 96-114). Dadurch wird sie bei jedem State-Update (jedem Tastendruck) als **neue Komponente** erstellt. React unmountet das alte Input und mountet ein neues — der Fokus geht verloren.

### Lösung
Die `Field`-Komponente **außerhalb** von `CreateCardPage` definieren und `form` + `update` als Props übergeben. Dadurch bleibt die Komponenten-Identität stabil und React kann den Fokus beibehalten.

### Änderung in `src/pages/admin/CreateCardPage.tsx`

1. Neue Interface + Komponente **vor** `CreateCardPage`:

```typescript
interface FieldProps {
  label: string;
  field: string;
  textarea?: boolean;
  value: string;
  onChange: (field: string, value: string) => void;
}

const Field: React.FC<FieldProps> = ({ label, field, textarea, value, onChange }) => (
  <div className="space-y-1.5">
    <Label ...>{label}</Label>
    {textarea ? <Textarea value={value} onChange={e => onChange(field, e.target.value)} ... />
              : <Input value={value} onChange={e => onChange(field, e.target.value)} ... />}
  </div>
);
```

2. Alle `<Field>` Aufrufe bekommen zusätzlich `value={(form as any)[field]}` und `onChange={update}` als Props.

3. Die inline `Field`-Definition innerhalb von `CreateCardPage` wird entfernt.


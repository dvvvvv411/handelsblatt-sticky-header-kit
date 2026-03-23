import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Upload, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import CustomCardPreview from '@/components/CustomCardPreview';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface FieldProps {
  label: string;
  field: string;
  textarea?: boolean;
  value: string;
  onChange: (field: string, value: string) => void;
}

const Field: React.FC<FieldProps> = ({ label, field, textarea, value, onChange }) => (
  <div className="space-y-1.5">
    <Label className="text-slate-600 text-xs font-medium">{label}</Label>
    {textarea ? (
      <Textarea
        value={value}
        onChange={e => onChange(field, e.target.value)}
        className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 text-sm"
        rows={3}
      />
    ) : (
      <Input
        value={value}
        onChange={e => onChange(field, e.target.value)}
        className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 text-sm h-9"
      />
    )}
  </div>
);

const CreateCardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    sponsorLabel: 'ÜBER IHRE FIRMA',
    logoUrl: '',
    headline: 'Ihre Headline hier',
    description: 'Beschreiben Sie hier Ihr Produkt oder Ihre Dienstleistung. Nutzen Sie diesen Bereich um Ihre Zielgruppe zu überzeugen.',
    trustIndicator1: 'Vorteil 1',
    trustIndicator2: 'Vorteil 2',
    metricValue: '+XX%',
    metricLabel: 'Ihre Kennzahl',
    serviceTitle: 'PREMIUM-SERVICE',
    serviceLine1: 'Service Zeile 1',
    serviceLine2: 'Service Zeile 2',
    ctaButtonText: 'JETZT STARTEN',
    ctaUrl: 'https://example.com',
    accentColor: '#ef6400',
    disclaimerText: 'Ihr Risikohinweis oder rechtlicher Disclaimer hier.',
  });

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from('card-logos').upload(path, file);
      if (error) throw error;
      const { data: urlData } = supabase.storage.from('card-logos').getPublicUrl(path);
      update('logoUrl', urlData.publicUrl);
      toast.success('Logo hochgeladen');
    } catch (err: any) {
      toast.error('Upload fehlgeschlagen: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error('Bitte gib einen Card-Namen ein');
      return;
    }
    if (!user) return;
    setSaving(true);
    try {
      const { error } = await supabase.from('custom_cards').insert({
        created_by: user.id,
        name: form.name,
        sponsor_label: form.sponsorLabel,
        logo_url: form.logoUrl || null,
        headline: form.headline,
        description: form.description,
        trust_indicator_1: form.trustIndicator1,
        trust_indicator_2: form.trustIndicator2,
        metric_value: form.metricValue,
        metric_label: form.metricLabel,
        service_title: form.serviceTitle,
        service_line_1: form.serviceLine1,
        service_line_2: form.serviceLine2,
        cta_button_text: form.ctaButtonText,
        cta_url: form.ctaUrl,
        accent_color: form.accentColor,
        disclaimer_text: form.disclaimerText,
      } as any);
      if (error) throw error;
      toast.success('Card gespeichert!');
      navigate('/admin/card-previews');
    } catch (err: any) {
      toast.error('Fehler: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin/card-previews')} className="text-slate-400 hover:text-white hover:bg-white/10">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
            Neue Card erstellen
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">Erstelle eine individuelle Werbe-Card mit Live-Vorschau</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Sticky Preview */}
        <div className="sticky top-0 z-10 space-y-3">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Live-Vorschau</h2>
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-lg">
            <CustomCardPreview
              sponsorLabel={form.sponsorLabel}
              logoUrl={form.logoUrl}
              headline={form.headline}
              description={form.description}
              trustIndicator1={form.trustIndicator1}
              trustIndicator2={form.trustIndicator2}
              metricValue={form.metricValue}
              metricLabel={form.metricLabel}
              serviceTitle={form.serviceTitle}
              serviceLine1={form.serviceLine1}
              serviceLine2={form.serviceLine2}
              ctaButtonText={form.ctaButtonText}
              accentColor={form.accentColor}
              disclaimerText={form.disclaimerText}
            />
          </div>
        </div>

        {/* Right: Form Sections */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-xs">1</div>
              Grundeinstellungen
            </h2>
            <Field label="Card Name (intern)" field="name" value={form.name} onChange={update} />
            <Field label="Sponsor Label (z.B. ÜBER FIRMENNAME)" field="sponsorLabel" value={form.sponsorLabel} onChange={update} />

            <div className="space-y-1.5">
              <Label className="text-slate-600 text-xs font-medium">Logo</Label>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:border-indigo-400 transition-colors text-sm text-slate-600">
                  <Upload className="h-4 w-4" />
                  {uploading ? 'Lädt...' : 'Logo hochladen'}
                  <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" disabled={uploading} />
                </label>
                {form.logoUrl && <img src={form.logoUrl} alt="Logo" className="h-8 w-auto object-contain" />}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-slate-600 text-xs font-medium flex items-center gap-1.5">
                <Palette className="h-3.5 w-3.5" /> Akzentfarbe
              </Label>
              <div className="flex items-center gap-3">
                <input type="color" value={form.accentColor} onChange={e => update('accentColor', e.target.value)} className="w-10 h-9 rounded cursor-pointer border-0" />
                <Input value={form.accentColor} onChange={e => update('accentColor', e.target.value)} className="bg-slate-50 border-slate-200 text-slate-900 text-sm h-9 w-32 font-mono" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs">2</div>
              Inhalte
            </h2>
            <Field label="Headline" field="headline" value={form.headline} onChange={update} />
            <Field label="Beschreibung" field="description" textarea value={form.description} onChange={update} />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Trust Indikator 1" field="trustIndicator1" value={form.trustIndicator1} onChange={update} />
              <Field label="Trust Indikator 2" field="trustIndicator2" value={form.trustIndicator2} onChange={update} />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-xs">3</div>
              Kennzahlen & Service
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Metrik Wert" field="metricValue" value={form.metricValue} onChange={update} />
              <Field label="Metrik Label" field="metricLabel" value={form.metricLabel} onChange={update} />
            </div>
            <Field label="Service Titel" field="serviceTitle" value={form.serviceTitle} onChange={update} />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Service Zeile 1" field="serviceLine1" value={form.serviceLine1} onChange={update} />
              <Field label="Service Zeile 2" field="serviceLine2" value={form.serviceLine2} onChange={update} />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white text-xs">4</div>
              Call-to-Action & Disclaimer
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <Field label="CTA Button Text" field="ctaButtonText" value={form.ctaButtonText} onChange={update} />
              <Field label="CTA URL" field="ctaUrl" value={form.ctaUrl} onChange={update} />
            </div>
            <Field label="Disclaimer Text" field="disclaimerText" textarea value={form.disclaimerText} onChange={update} />
          </div>

          <Button
            onClick={handleSave}
            disabled={saving || !form.name.trim()}
            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white py-3 text-base font-semibold"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Wird gespeichert...' : 'Card speichern'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateCardPage;

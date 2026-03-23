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

  const Field = ({ label, field, textarea }: { label: string; field: string; textarea?: boolean }) => (
    <div className="space-y-1.5">
      <Label className="text-slate-300 text-xs font-medium">{label}</Label>
      {textarea ? (
        <Textarea
          value={(form as any)[field]}
          onChange={e => update(field, e.target.value)}
          className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-indigo-500 text-sm"
          rows={3}
        />
      ) : (
        <Input
          value={(form as any)[field]}
          onChange={e => update(field, e.target.value)}
          className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-indigo-500 text-sm h-9"
        />
      )}
    </div>
  );

  return (
    <div className="space-y-6">
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

      {/* Side-by-side layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Form */}
        <div className="space-y-6 order-2 xl:order-1">
          {/* Card Name */}
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/50 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-xs">1</div>
              Grundeinstellungen
            </h2>
            <Field label="Card Name (intern)" field="name" />
            <Field label="Sponsor Label (z.B. ÜBER FIRMENNAME)" field="sponsorLabel" />
            
            {/* Logo Upload */}
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs font-medium">Logo</Label>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors text-sm text-slate-300">
                  <Upload className="h-4 w-4" />
                  {uploading ? 'Lädt...' : 'Logo hochladen'}
                  <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" disabled={uploading} />
                </label>
                {form.logoUrl && <img src={form.logoUrl} alt="Logo" className="h-8 w-auto object-contain" />}
              </div>
            </div>

            {/* Color Picker */}
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs font-medium flex items-center gap-1.5">
                <Palette className="h-3.5 w-3.5" /> Akzentfarbe
              </Label>
              <div className="flex items-center gap-3">
                <input type="color" value={form.accentColor} onChange={e => update('accentColor', e.target.value)} className="w-10 h-9 rounded cursor-pointer border-0" />
                <Input value={form.accentColor} onChange={e => update('accentColor', e.target.value)} className="bg-slate-800/50 border-slate-700 text-white text-sm h-9 w-32 font-mono" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/50 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs">2</div>
              Inhalte
            </h2>
            <Field label="Headline" field="headline" />
            <Field label="Beschreibung" field="description" textarea />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Trust Indikator 1" field="trustIndicator1" />
              <Field label="Trust Indikator 2" field="trustIndicator2" />
            </div>
          </div>

          {/* Metrics & Service */}
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/50 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-xs">3</div>
              Kennzahlen & Service
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Metrik Wert" field="metricValue" />
              <Field label="Metrik Label" field="metricLabel" />
            </div>
            <Field label="Service Titel" field="serviceTitle" />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Service Zeile 1" field="serviceLine1" />
              <Field label="Service Zeile 2" field="serviceLine2" />
            </div>
          </div>

          {/* CTA & Disclaimer */}
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/50 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white text-xs">4</div>
              Call-to-Action & Disclaimer
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <Field label="CTA Button Text" field="ctaButtonText" />
              <Field label="CTA URL" field="ctaUrl" />
            </div>
            <Field label="Disclaimer Text" field="disclaimerText" textarea />
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            disabled={saving || !form.name.trim()}
            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white py-3 text-base font-semibold"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Wird gespeichert...' : 'Card speichern'}
          </Button>
        </div>

        {/* Live Preview */}
        <div className="order-1 xl:order-2">
          <div className="xl:sticky xl:top-8 space-y-3">
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
        </div>
      </div>
    </div>
  );
};

export default CreateCardPage;

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Trash2, Wand2, Image, CalendarIcon, Upload, Eye, Sparkles, Type, FileText, Megaphone, Settings, Save, ArrowLeft, RefreshCw, X, Link } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import HandelsblattHeader from '@/components/HandelsblattHeader';
import HandelsblattFooter from '@/components/HandelsblattFooter';
import PostArticleContent from '@/components/PostArticleContent';
import ArticlePaywall from '@/components/ArticlePaywall';
import ArticleBraunInvestments from '@/components/ArticleBraunInvestments';
import ArticleBovensiepenPartners from '@/components/ArticleBovensiepenPartners';
import CustomCardPreview from '@/components/CustomCardPreview';
import ArticleProtection from '@/components/ArticleProtection';

interface ContentSection {
  title: string;
  text: string;
}

interface ArticleFormData {
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  author: string;
  hero_image_url: string;
  hero_image_caption: string;
  content: ContentSection[];
  bitloon_ad_enabled: boolean;
  bitloon_ad_config: { url?: string };
  braun_investments_ad_enabled: boolean;
  braun_investments_ad_config: { url?: string };
  bovensiepen_partners_ad_enabled: boolean;
  bovensiepen_partners_ad_config: { url?: string };
  published: boolean;
  use_current_date: boolean;
  publication_date: Date | null;
  cta_card_type: string | null;
}

interface ArticleFormProps {
  onSuccess: () => void;
  editingArticle?: any;
  isEditing?: boolean;
}

interface CustomCard {
  id: string;
  name: string;
  accent_color: string;
  sponsor_label: string;
  logo_url: string | null;
  headline: string;
  description: string;
  trust_indicator_1: string;
  trust_indicator_2: string;
  metric_value: string;
  metric_label: string;
  service_title: string;
  service_line_1: string;
  service_line_2: string;
  cta_button_text: string;
  cta_url: string;
  disclaimer_text: string;
  logo_scale: number;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ onSuccess, editingArticle, isEditing = false }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [customCards, setCustomCards] = useState<CustomCard[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [showAiDialog, setShowAiDialog] = useState(false);
  const [aiSectionCount, setAiSectionCount] = useState(5);
  const [aiNewsType, setAiNewsType] = useState('Nachricht');
  const [aiTopic, setAiTopic] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiResult, setAiResult] = useState<{ category: string; title: string; subtitle: string; slug: string; sections: { title: string; text: string }[] } | null>(null);
  const [regeneratingSection, setRegeneratingSection] = useState<number | null>(null);
  const [heroInputMode, setHeroInputMode] = useState<'upload' | 'url'>('upload');
  const [heroUrlInput, setHeroUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<ArticleFormData>({
    slug: '',
    category: 'Krypto',
    title: '',
    subtitle: '',
    author: '',
    hero_image_url: '',
    hero_image_caption: '',
    content: [{ title: '', text: '' }],  
    bitloon_ad_enabled: false,
    bitloon_ad_config: {},
    braun_investments_ad_enabled: false,
    braun_investments_ad_config: {},
    bovensiepen_partners_ad_enabled: false,
    bovensiepen_partners_ad_config: {},
    published: true,
    use_current_date: true,
    publication_date: null,
    cta_card_type: null,
  });

  // Fetch custom cards
  useEffect(() => {
    const fetchCards = async () => {
      const { data } = await supabase.from('custom_cards').select('*');
      if (data) setCustomCards(data);
    };
    fetchCards();
  }, []);

  // Populate form when editing
  useEffect(() => {
    if (isEditing && editingArticle) {
      setFormData({
        slug: editingArticle.slug || '',
        category: editingArticle.category || 'Krypto',
        title: editingArticle.title || '',
        subtitle: editingArticle.subtitle || '',
        author: editingArticle.author || '',
        hero_image_url: editingArticle.hero_image_url || '',
        hero_image_caption: editingArticle.hero_image_caption || '',
        content: editingArticle.content || [{ title: '', text: '' }],
        bitloon_ad_enabled: editingArticle.bitloon_ad_enabled ?? false,
        bitloon_ad_config: editingArticle.bitloon_ad_config || {},
        braun_investments_ad_enabled: editingArticle.braun_investments_ad_enabled ?? false,
        braun_investments_ad_config: editingArticle.braun_investments_ad_config || {},
        bovensiepen_partners_ad_enabled: editingArticle.bovensiepen_partners_ad_enabled ?? false,
        bovensiepen_partners_ad_config: editingArticle.bovensiepen_partners_ad_config || {},
        published: editingArticle.published ?? true,
        use_current_date: editingArticle.use_current_date ?? true,
        publication_date: editingArticle.publication_date ? new Date(editingArticle.publication_date) : null,
        cta_card_type: (editingArticle as any).cta_card_type || null,
      });
    }
  }, [isEditing, editingArticle]);

  const handleInputChange = (field: keyof ArticleFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContentChange = (index: number, field: keyof ContentSection, value: string) => {
    const newContent = [...formData.content];
    newContent[index] = { ...newContent[index], [field]: value };
    setFormData(prev => ({ ...prev, content: newContent }));
  };

  const addContentSection = () => {
    setFormData(prev => ({
      ...prev,
      content: [...prev.content, { title: '', text: '' }]
    }));
  };

  const removeContentSection = (index: number) => {
    if (formData.content.length > 1) {
      const newContent = formData.content.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, content: newContent }));
    }
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    handleInputChange('slug', slug);
  };

  const handleAiGenerate = async () => {
    if (!aiTopic.trim()) {
      toast.error('Bitte beschreibe das Thema des Artikels');
      return;
    }
    setAiGenerating(true);
    setAiResult(null);
    try {
      const { data, error } = await supabase.functions.invoke('generate-article', {
        body: { sectionCount: aiSectionCount, newsType: aiNewsType, topic: aiTopic },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setAiResult(data);
    } catch (err: any) {
      console.error('AI generation error:', err);
      toast.error(err.message || 'Fehler bei der KI-Generierung');
    } finally {
      setAiGenerating(false);
    }
  };

  const handleRegenerateSection = async (index: number) => {
    if (!aiResult) return;
    setRegeneratingSection(index);
    try {
      const sectionTitle = aiResult.sections[index].title;
      const contextTopic = `Im Kontext eines Artikels mit dem Titel "${aiResult.title}" (Kategorie: ${aiResult.category}, Typ: ${aiNewsType}). Generiere einen neuen Textabschnitt für die Überschrift: "${sectionTitle}". Originalbeschreibung des Artikels: ${aiTopic}`;
      const { data, error } = await supabase.functions.invoke('generate-article', {
        body: { sectionCount: 1, newsType: aiNewsType, topic: contextTopic, regenerateSection: sectionTitle },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      const newSection = data.sections?.[0] || data;
      setAiResult(prev => {
        if (!prev) return prev;
        const updated = [...prev.sections];
        updated[index] = { title: newSection.title, text: newSection.text };
        return { ...prev, sections: updated };
      });
      toast.success('Abschnitt neu generiert!');
    } catch (err: any) {
      console.error('Section regeneration error:', err);
      toast.error(err.message || 'Fehler beim Neu-Generieren des Abschnitts');
    } finally {
      setRegeneratingSection(null);
    }
  };

  const handleAiApply = () => {
    if (!aiResult) return;
    setFormData(prev => ({
      ...prev,
      category: aiResult.category,
      title: aiResult.title,
      subtitle: aiResult.subtitle,
      slug: aiResult.slug,
      content: aiResult.sections,
    }));
    setShowAiDialog(false);
    setAiResult(null);
    toast.success('KI-Artikel übernommen!');
  };

  const handleSaveDraft = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const adFields = mapCtaToAdFields(formData.cta_card_type);
      const articleData: any = {
        slug: formData.slug,
        category: formData.category,
        title: formData.title,
        subtitle: formData.subtitle,
        author: formData.author,
        hero_image_url: formData.hero_image_url,
        hero_image_caption: formData.hero_image_caption,
        content: formData.content as any,
        published: false,
        use_current_date: formData.use_current_date,
        publication_date: formData.use_current_date ? null : formData.publication_date?.toISOString().split('T')[0],
        created_by: user.id,
        cta_card_type: formData.cta_card_type,
        ...adFields,
        bitloon_ad_config: formData.bitloon_ad_config,
        braun_investments_ad_config: formData.braun_investments_ad_config,
        bovensiepen_partners_ad_config: formData.bovensiepen_partners_ad_config,
      };

      if (isEditing && editingArticle) {
        const { error } = await supabase.from('articles').update(articleData).eq('id', editingArticle.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('articles').insert(articleData);
        if (error) throw error;
      }

      toast.success('Entwurf gespeichert!');
      onSuccess();
    } catch (error) {
      console.error('Error saving draft:', error);
      toast.error('Fehler beim Speichern des Entwurfs');
    } finally {
      setLoading(false);
    }
  };

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('article-images')
        .upload(fileName, file);
      
      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage
        .from('article-images')
        .getPublicUrl(fileName);
      
      handleInputChange('hero_image_url', publicUrl);
      toast.success('Bild erfolgreich hochgeladen!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Fehler beim Hochladen');
    } finally {
      setUploading(false);
    }
  };

  // Map CTA selection to old ad fields for backward compatibility
  const mapCtaToAdFields = (ctaType: string | null) => {
    return {
      bitloon_ad_enabled: ctaType === 'builtin:bitloon',
      braun_investments_ad_enabled: ctaType === 'builtin:braun',
      bovensiepen_partners_ad_enabled: ctaType === 'builtin:bovensiepen',
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const adFields = mapCtaToAdFields(formData.cta_card_type);
      const articleData: any = {
        slug: formData.slug,
        category: formData.category,
        title: formData.title,
        subtitle: formData.subtitle,
        author: formData.author,
        hero_image_url: formData.hero_image_url,
        hero_image_caption: formData.hero_image_caption,
        content: formData.content as any,
        published: formData.published,
        use_current_date: formData.use_current_date,
        publication_date: formData.use_current_date ? null : formData.publication_date?.toISOString().split('T')[0],
        created_by: user.id,
        cta_card_type: formData.cta_card_type,
        ...adFields,
        bitloon_ad_config: formData.bitloon_ad_config,
        braun_investments_ad_config: formData.braun_investments_ad_config,
        bovensiepen_partners_ad_config: formData.bovensiepen_partners_ad_config,
      };

      if (isEditing && editingArticle) {
        const { error } = await supabase
          .from('articles')
          .update(articleData)
          .eq('id', editingArticle.id);
        if (error) throw error;
        toast.success('Artikel erfolgreich aktualisiert!');
      } else {
        const { error } = await supabase
          .from('articles')
          .insert(articleData);
        if (error) throw error;
        toast.success('Artikel erfolgreich veröffentlicht!');
      }

      onSuccess();
      
      if (!isEditing) {
        setFormData({
          slug: '', category: 'Krypto', title: '', subtitle: '', author: '',
          hero_image_url: '', hero_image_caption: '', content: [{ title: '', text: '' }],
          bitloon_ad_enabled: false, bitloon_ad_config: {},
          braun_investments_ad_enabled: false, braun_investments_ad_config: {},
          bovensiepen_partners_ad_enabled: false, bovensiepen_partners_ad_config: {},
          published: true, use_current_date: true, publication_date: null, cta_card_type: null,
        });
      }
    } catch (error) {
      console.error('Error saving article:', error);
      toast.error(`Fehler beim ${isEditing ? 'Aktualisieren' : 'Erstellen'} des Artikels`);
    } finally {
      setLoading(false);
    }
  };

  const ctaEnabled = formData.cta_card_type !== null && formData.cta_card_type !== '';

  const builtinCards = [
    { id: 'builtin:bitloon', name: 'BitloonX', color: '#ef6400' },
    { id: 'builtin:braun', name: 'Braun Investments', color: '#1a365d' },
    { id: 'builtin:bovensiepen', name: 'Bovensiepen & Partner', color: '#2d5016' },
  ];

  const allCards = [
    ...builtinCards.map(c => ({ id: c.id, name: `${c.name} (Vorlage)`, accent_color: c.color })),
    ...customCards,
  ];

  return (
    <div>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleHeroImageUpload}
      />

      {/* KI-Artikelassistent */}
      {!isEditing && (
        <Card className="mb-6 border-indigo-200/50 bg-gradient-to-r from-indigo-50 to-violet-50 overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">KI-Artikelassistent</h3>
                <p className="text-xs text-slate-500">Lass dir deinen Artikel von KI schreiben</p>
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Button type="button" onClick={async () => {
                if (!user) return;
                const { data } = await supabase
                  .from('profiles')
                  .select('ai_assistant_enabled')
                  .eq('id', user.id)
                  .single();
                if (data && data.ai_assistant_enabled === false) {
                  toast.error('Der KI-Assistent wurde für deinen Account deaktiviert.');
                  return;
                }
                setShowAiDialog(true);
              }} variant="outline"
                className="border-indigo-300 text-indigo-700 hover:bg-indigo-100 bg-white">
                <Wand2 className="w-4 h-4 mr-2" /> KI-Assistent starten
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* KI Dialog */}
      <Dialog open={showAiDialog} onOpenChange={setShowAiDialog}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              KI-Artikelassistent
            </DialogTitle>
          </DialogHeader>

          {!aiResult ? (
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-600">Anzahl Textabschnitte</Label>
                  <Input
                    type="number"
                    min={1}
                    max={15}
                    value={aiSectionCount}
                    onChange={(e) => setAiSectionCount(Math.min(15, Math.max(1, parseInt(e.target.value) || 1)))}
                    className="bg-slate-50 border-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-600">Artikeltyp</Label>
                  <Select value={aiNewsType} onValueChange={setAiNewsType}>
                    <SelectTrigger className="bg-slate-50 border-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nachricht">Nachricht</SelectItem>
                      <SelectItem value="Analyse">Analyse</SelectItem>
                      <SelectItem value="Storytelling">Storytelling</SelectItem>
                      <SelectItem value="Meinungsbeitrag">Meinungsbeitrag</SelectItem>
                      <SelectItem value="Interview">Interview</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-600">Worum geht es im Artikel?</Label>
                <Textarea
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  placeholder="Beschreibe das Thema, die Branche und den Kontext des Artikels..."
                  rows={4}
                  className="bg-slate-50 border-slate-200"
                />
              </div>
              <Button
                type="button"
                onClick={handleAiGenerate}
                disabled={aiGenerating || !aiTopic.trim()}
                className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white"
              >
                {aiGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Artikel wird generiert...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" /> Generieren
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4 pt-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setAiResult(null)}
                className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 -ml-2"
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Zurück bearbeiten
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-lg p-3">
                  <span className="text-xs text-slate-500 block mb-1">Kategorie</span>
                  <span className="font-medium text-slate-800 text-sm">{aiResult.category}</span>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <span className="text-xs text-slate-500 block mb-1">Slug</span>
                  <span className="font-medium text-slate-800 text-sm break-all">{aiResult.slug}</span>
                </div>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <span className="text-xs text-slate-500 block mb-1">Titel</span>
                <span className="font-semibold text-slate-800">{aiResult.title}</span>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <span className="text-xs text-slate-500 block mb-1">Untertitel</span>
                <span className="text-slate-700 text-sm">{aiResult.subtitle}</span>
              </div>
              <div className="space-y-2">
                <span className="text-xs text-slate-500 font-medium">Textabschnitte ({aiResult.sections.length})</span>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {aiResult.sections.map((section, i) => (
                    <div key={i} className="bg-slate-50 rounded-lg p-3 relative group">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-medium text-slate-800 text-sm block mb-1">{section.title}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 shrink-0"
                          onClick={() => handleRegenerateSection(i)}
                          disabled={regeneratingSection !== null}
                          title="Abschnitt neu generieren"
                        >
                          <RefreshCw className={cn("w-3.5 h-3.5", regeneratingSection === i && "animate-spin")} />
                        </Button>
                      </div>
                      {regeneratingSection === i ? (
                        <div className="flex items-center gap-2 text-xs text-indigo-500 mt-1">
                          <div className="w-3 h-3 border-2 border-indigo-300 border-t-indigo-600 rounded-full animate-spin" />
                          Wird neu generiert...
                        </div>
                      ) : (
                        <span className="text-slate-600 text-xs leading-relaxed line-clamp-3">{section.text}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={handleAiApply}
                  className="flex-1 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white"
                >
                  Übernehmen
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAiGenerate}
                  disabled={aiGenerating}
                  className="border-indigo-300 text-indigo-700 hover:bg-indigo-100"
                >
                  {aiGenerating ? 'Generiert...' : 'Neu generieren'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info Card */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <Type className="w-3.5 h-3.5 text-white" />
              </div>
              <h3 className="font-semibold text-slate-700">Grundinformationen</h3>
            </div>
          </div>
          <CardContent className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-slate-600">Kategorie</Label>
                <Input id="category" value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  placeholder="z.B. Krypto" required
                  className="bg-slate-50 border-slate-200 focus:border-indigo-400" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author" className="text-slate-600">Autor</Label>
                <Input id="author" value={formData.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  placeholder="Name des Autors" required
                  className="bg-slate-50 border-slate-200 focus:border-indigo-400" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title" className="text-slate-600">Titel</Label>
              <Input id="title" value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Artikel-Titel" required
                className="bg-slate-50 border-slate-200 focus:border-indigo-400" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle" className="text-slate-600">Untertitel</Label>
              <Textarea id="subtitle" value={formData.subtitle}
                onChange={(e) => handleInputChange('subtitle', e.target.value)}
                placeholder="Artikel-Untertitel / Lead" rows={3}
                className="bg-slate-50 border-slate-200 focus:border-indigo-400" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="slug" className="text-slate-600">URL Slug</Label>
                <Input id="slug" value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  placeholder="url-freundlicher-slug" required
                  className="bg-slate-50 border-slate-200 focus:border-indigo-400" />
              </div>
              <div className="flex items-end">
                <Button type="button" onClick={generateSlug} variant="outline"
                  className="w-full border-slate-200 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300">
                  Aus Titel generieren
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Publication Date Card */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <CalendarIcon className="w-3.5 h-3.5 text-white" />
              </div>
              <h3 className="font-semibold text-slate-700">Veröffentlichungsdatum</h3>
            </div>
          </div>
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="use_current_date" checked={formData.use_current_date}
                onCheckedChange={(checked) => {
                  handleInputChange('use_current_date', checked);
                  if (checked) handleInputChange('publication_date', null);
                }} />
              <Label htmlFor="use_current_date" className="text-slate-600">Aktuelles Datum automatisch verwenden</Label>
            </div>
            {!formData.use_current_date && (
              <div className="space-y-2">
                <Label className="text-slate-600">Festes Datum</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline"
                      className={cn("w-full justify-start text-left font-normal bg-slate-50 border-slate-200",
                        !formData.publication_date && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.publication_date ? format(formData.publication_date, "dd.MM.yyyy") : <span>Datum wählen</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={formData.publication_date || undefined}
                      onSelect={(date) => handleInputChange('publication_date', date || null)} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Hero Image Card */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Image className="w-3.5 h-3.5 text-white" />
              </div>
              <h3 className="font-semibold text-slate-700">Hero-Bild</h3>
            </div>
          </div>
          <CardContent className="p-5 space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-600">Hero-Bild</Label>
              {!formData.hero_image_url ? (
                <div className="space-y-3">
                  {/* Toggle between upload and URL mode */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setHeroInputMode('upload')}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                        heroInputMode === 'upload'
                          ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                          : "bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200"
                      )}
                    >
                      <Upload className="w-3.5 h-3.5" />
                      Hochladen
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeroInputMode('url')}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                        heroInputMode === 'url'
                          ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                          : "bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200"
                      )}
                    >
                      <Link className="w-3.5 h-3.5" />
                      Bild-URL
                    </button>
                  </div>

                  {heroInputMode === 'upload' ? (
                    <button
                      type="button"
                      disabled={uploading}
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 hover:border-emerald-400 hover:bg-emerald-50/50 transition-colors py-8 cursor-pointer"
                    >
                      <Upload className="w-6 h-6 text-slate-400" />
                      <span className="text-sm font-medium text-slate-500">
                        {uploading ? 'Wird hochgeladen...' : 'Bild hochladen'}
                      </span>
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <Input
                        value={heroUrlInput}
                        onChange={(e) => setHeroUrlInput(e.target.value)}
                        placeholder="https://example.com/bild.jpg"
                        className="bg-slate-50 border-slate-200 focus:border-emerald-400 flex-1"
                      />
                      <Button
                        type="button"
                        size="sm"
                        disabled={!heroUrlInput.trim()}
                        onClick={() => {
                          handleInputChange('hero_image_url', heroUrlInput.trim());
                          setHeroUrlInput('');
                        }}
                        className="shrink-0"
                      >
                        Übernehmen
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <div
                    onClick={() => {
                      handleInputChange('hero_image_url', '');
                    }}
                    className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/50 transition-colors group"
                  >
                    <Image className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="text-sm font-medium text-slate-700 truncate flex-1">
                      {formData.hero_image_url.split('/').pop() || 'hero-image.jpg'}
                    </span>
                    <span className="text-xs text-slate-400 group-hover:text-emerald-600 shrink-0">Ändern</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleInputChange('hero_image_url', '');
                      }}
                      className="ml-1 p-1 rounded-md hover:bg-red-100 text-slate-400 hover:text-red-500 transition-colors shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="rounded-lg overflow-hidden border border-slate-200">
                    <img src={formData.hero_image_url} alt="Hero Preview"
                      className="w-full h-48 object-cover"
                      onContextMenu={(e) => e.preventDefault()}
                      draggable={false}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero_image_caption" className="text-slate-600">Bildunterschrift</Label>
              <Input id="hero_image_caption" value={formData.hero_image_caption}
                onChange={(e) => handleInputChange('hero_image_caption', e.target.value)}
                placeholder="Beschreibung und Quelle"
                className="bg-slate-50 border-slate-200 focus:border-indigo-400" />
            </div>
          </CardContent>
        </Card>

        {/* Content Sections Card */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3 bg-gradient-to-r from-violet-50 to-purple-50 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <FileText className="w-3.5 h-3.5 text-white" />
                </div>
                <h3 className="font-semibold text-slate-700">Inhaltsbereiche</h3>
              </div>
              <Button type="button" onClick={addContentSection} variant="outline" size="sm"
                className="border-violet-300 text-violet-700 hover:bg-violet-50">
                <Plus className="w-4 h-4 mr-1" /> Bereich hinzufügen
              </Button>
            </div>
          </div>
          <CardContent className="p-5 space-y-4">
            {formData.content.map((section, index) => (
              <div key={index} className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 hover:border-violet-200 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-white text-xs flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    <Label className="text-slate-600 font-medium">Bereich {index + 1}</Label>
                  </div>
                  {formData.content.length > 1 && (
                    <Button type="button" onClick={() => removeContentSection(index)} variant="ghost" size="sm"
                      className="text-red-400 hover:text-red-600 hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <Label htmlFor={`section-text-${index}`} className="text-slate-500 text-sm">Text</Label>
                    <Textarea id={`section-text-${index}`} value={section.text}
                      onChange={(e) => handleContentChange(index, 'text', e.target.value)}
                      placeholder="Abschnittsinhalt" rows={4} required
                      className="bg-white border-slate-200 focus:border-violet-400" />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* CTA Card Selection */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3 bg-gradient-to-r from-orange-50 to-rose-50 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-rose-600 flex items-center justify-center">
                <Megaphone className="w-3.5 h-3.5 text-white" />
              </div>
              <h3 className="font-semibold text-slate-700">CTA Card</h3>
            </div>
          </div>
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="cta_enabled" checked={ctaEnabled}
                onCheckedChange={(checked) => {
                  handleInputChange('cta_card_type', checked ? (allCards[0]?.id || null) : null);
                }} />
              <Label htmlFor="cta_enabled" className="text-slate-600">CTA Card aktivieren</Label>
            </div>
            {ctaEnabled && (
              <div className="space-y-2">
                <Label className="text-slate-600">Card auswählen</Label>
                <Select value={formData.cta_card_type || ''} onValueChange={(val) => handleInputChange('cta_card_type', val)}>
                  <SelectTrigger className="bg-slate-50 border-slate-200">
                    <SelectValue placeholder="Card wählen..." />
                  </SelectTrigger>
                  <SelectContent>
                    {allCards.map(card => (
                      <SelectItem key={card.id} value={card.id}>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: card.accent_color }} />
                          {card.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {customCards.length === 0 && (
                  <p className="text-xs text-slate-400">
                    Eigene Cards können unter Card Previews erstellt werden.
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Settings Card */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3 bg-gradient-to-r from-slate-50 to-gray-50 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-slate-500 to-gray-600 flex items-center justify-center">
                <Settings className="w-3.5 h-3.5 text-white" />
              </div>
              <h3 className="font-semibold text-slate-700">Status</h3>
            </div>
          </div>
          <CardContent className="p-5">
            <div className={`flex items-center space-x-2 p-4 border rounded-lg ${
              isEditing ? 'bg-blue-50 border-blue-200' : 'bg-emerald-50 border-emerald-200'
            }`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                isEditing ? 'bg-blue-500' : 'bg-emerald-500'
              }`}>
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className={`font-medium ${isEditing ? 'text-blue-800' : 'text-emerald-800'}`}>
                {isEditing ? 'Artikel wird aktualisiert' : 'Artikel wird automatisch veröffentlicht'}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={handleSaveDraft} disabled={loading}
            className="flex-1 border-slate-300 text-slate-600 hover:bg-slate-50">
            <Save className="w-4 h-4 mr-2" /> Entwurf speichern
          </Button>
          <Button type="button" variant="outline" onClick={() => setShowPreview(true)}
            className="flex-1 border-indigo-300 text-indigo-700 hover:bg-indigo-50">
            <Eye className="w-4 h-4 mr-2" /> Artikel Preview
          </Button>
          <Button type="submit" disabled={loading}
            className="flex-1 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-lg shadow-indigo-500/25">
            {loading
              ? (isEditing ? 'Wird aktualisiert...' : 'Wird erstellt...')
              : (isEditing ? 'Artikel aktualisieren' : 'Artikel veröffentlichen')
            }
          </Button>
        </div>
      </form>

      {/* Preview Dialog - High Fidelity */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="p-4 border-b">
            <DialogTitle>Artikel-Vorschau</DialogTitle>
          </DialogHeader>
          <ArticleProtection>
            <div style={{ backgroundColor: '#f6f6f6' }}>
              <HandelsblattHeader />
              <div style={{ backgroundColor: '#f6f6f6' }}>
                <article>
                  <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 xl:px-48 py-8 md:py-16 lg:py-32 bg-white">
                    {/* Article Header */}
                    <header className="mb-6">
                      <div className="mb-4">
                        <div className="flex items-center">
                          <img src="https://resources.handelsblatt.com/hb-frontend/images/h-plus/h-plus.svg" width="28" height="23" alt="H+" className="mr-2" />
                          <span className="text-sm md:text-base font-medium">{formData.category || 'Kategorie'}</span>
                        </div>
                      </div>
                      <h1 className="mb-4 text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight" style={{
                        color: '#000000', lineHeight: '1.3',
                        fontFamily: '"Guyot Headline", Georgia, "Times New Roman", serif',
                        fontWeight: '700'
                      }}>
                        {formData.title || 'Artikel-Titel'}
                      </h1>
                      {formData.subtitle && (
                        <p className="mb-4 text-lg sm:text-xl md:text-xl lg:text-2xl leading-relaxed" style={{
                          color: '#4a5568', lineHeight: '1.5',
                          fontFamily: '"ClassicGrotesquePro", Arial, sans-serif'
                        }}>
                          {formData.subtitle}
                        </p>
                      )}
                      <div className="text-sm md:text-base space-y-1" style={{ color: '#4a5568', fontWeight: '500' }}>
                        <div>{formData.author || 'Autor'}</div>
                        <div>{formData.use_current_date ? new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }) : formData.publication_date ? format(formData.publication_date, 'dd.MM.yyyy') : 'Datum'}</div>
                      </div>
                      <div className="mt-4 flex items-center">
                        <button className="flex items-center justify-center min-w-[44px] min-h-[44px] mr-3 bg-gray-100 rounded-full" disabled>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" className="text-gray-500">
                            <path fill="currentColor" d="M12 21.04V10.96c0-.74.836-1.2 1.502-.828l9.003 5.04a.94.94 0 0 1 0 1.656l-9.003 5.04c-.666.373-1.502-.088-1.502-.828Z" />
                          </svg>
                        </button>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                          <span className="text-sm md:text-base text-gray-600 font-bold">Artikel anhören</span>
                          <span className="text-xs sm:text-sm text-gray-500">nicht verfügbar</span>
                        </div>
                      </div>
                    </header>

                    {/* Hero Image */}
                    {formData.hero_image_url && (
                      <div className="mb-4 md:mb-6 -mx-4 md:-mx-8 lg:-mx-16">
                        <div className="relative mx-auto overflow-hidden" style={{ maxWidth: '900px', aspectRatio: '16/10', borderRadius: '4px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                          <img src={formData.hero_image_url} alt={formData.hero_image_caption || formData.title} className="w-full h-full object-cover" onContextMenu={(e) => e.preventDefault()} draggable={false} />
                        </div>
                        {formData.hero_image_caption && (
                          <p className="mt-2 md:mt-3 text-xs md:text-sm italic text-center mx-4 md:mx-8 lg:mx-16 leading-relaxed" style={{ color: '#718096' }}>
                            {formData.hero_image_caption}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Content */}
                    <div className="mt-6 md:mt-8">
                      <div className="prose prose-lg max-w-none" style={{ fontSize: '20px', lineHeight: '1.7', color: '#2d3748' }}>
                        {formData.content.map((section, index) => (
                          <div key={index}>
                           {section.text && (
                              <p className="mb-4 md:mb-6 font-classic-grotesque text-lg md:text-xl leading-relaxed">
                                {section.text}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* CTA Card Rendering */}
                      {ctaEnabled && formData.cta_card_type && (() => {
                        if (formData.cta_card_type === 'builtin:bitloon') {
                          return <ArticlePaywall articleId="preview" bitloonUrl="https://bitloon.com" />;
                        }
                        if (formData.cta_card_type === 'builtin:braun') {
                          return <ArticleBraunInvestments articleId="preview" braunInvestmentsUrl="https://braun-investments.com" />;
                        }
                        if (formData.cta_card_type === 'builtin:bovensiepen') {
                          return <ArticleBovensiepenPartners articleId="preview" bovensiepenPartnersUrl="https://bovensiepen-partners.com" />;
                        }
                        const card = customCards.find(c => c.id === formData.cta_card_type);
                        if (card) {
                          return (
                            <CustomCardPreview
                              sponsorLabel={card.sponsor_label}
                              logoUrl={card.logo_url || undefined}
                              logoScale={card.logo_scale ?? 1}
                              headline={card.headline}
                              description={card.description}
                              trustIndicator1={card.trust_indicator_1}
                              trustIndicator2={card.trust_indicator_2}
                              metricValue={card.metric_value}
                              metricLabel={card.metric_label}
                              serviceTitle={card.service_title}
                              serviceLine1={card.service_line_1}
                              serviceLine2={card.service_line_2}
                              ctaButtonText={card.cta_button_text}
                              accentColor={card.accent_color}
                              disclaimerText={card.disclaimer_text}
                            />
                          );
                        }
                        return null;
                      })()}
                    </div>
                  </div>
                </article>
              </div>
              <PostArticleContent />
              <HandelsblattFooter />
            </div>
          </ArticleProtection>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArticleForm;

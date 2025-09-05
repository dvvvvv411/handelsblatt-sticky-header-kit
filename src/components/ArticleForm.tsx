import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Plus, Trash2, Wand2, Image, CalendarIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { generateTestContent, generateTestImage } from '@/utils/testContentGenerator';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

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
  bitloon_ad_config: {
    url?: string;
  };
  braun_investments_ad_enabled: boolean;
  braun_investments_ad_config: {
    url?: string;
  };
  bovensiepen_partners_ad_enabled: boolean;
  bovensiepen_partners_ad_config: {
    url?: string;
  };
  published: boolean;
  use_current_date: boolean;
  publication_date: Date | null;
}

interface ArticleFormProps {
  onSuccess: () => void;
  editingArticle?: any;
  isEditing?: boolean;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ onSuccess, editingArticle, isEditing = false }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ArticleFormData>({
    slug: '',
    category: 'Krypto',
    title: '',
    subtitle: '',
    author: '',
    hero_image_url: '',
    hero_image_caption: '',
    content: [{ title: '', text: '' }],
    bitloon_ad_enabled: true,
    bitloon_ad_config: {},
    braun_investments_ad_enabled: false,
    braun_investments_ad_config: {},
    bovensiepen_partners_ad_enabled: false,
    bovensiepen_partners_ad_config: {},
    published: true,
    use_current_date: true,
    publication_date: null
  });

  // Populate form with existing article data when editing
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
        bitloon_ad_enabled: editingArticle.bitloon_ad_enabled ?? true,
        bitloon_ad_config: editingArticle.bitloon_ad_config || {},
        braun_investments_ad_enabled: editingArticle.braun_investments_ad_enabled ?? false,
        braun_investments_ad_config: editingArticle.braun_investments_ad_config || {},
        bovensiepen_partners_ad_enabled: editingArticle.bovensiepen_partners_ad_enabled ?? false,
        bovensiepen_partners_ad_config: editingArticle.bovensiepen_partners_ad_config || {},
        published: editingArticle.published ?? true,
        use_current_date: editingArticle.use_current_date ?? true,
        publication_date: editingArticle.publication_date ? new Date(editingArticle.publication_date) : null
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

  const fillWithTestContent = () => {
    const testContent = generateTestContent();
    setFormData(prev => ({
      ...prev,
      title: testContent.title,
      subtitle: testContent.subtitle,
      author: testContent.author,
      category: testContent.category,
      hero_image_url: testContent.heroImageUrl,
      hero_image_caption: testContent.heroImageCaption,
      content: testContent.content,
      slug: testContent.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
    }));
    toast.success('Form filled with test content!');
  };

  const generateTestHeroImage = () => {
    const testImageUrl = generateTestImage();
    handleInputChange('hero_image_url', testImageUrl);
    toast.success('Test hero image generated!');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // Prepare the data for database insertion/update
      const articleData = {
        ...formData,
        content: formData.content as any,
        created_by: user.id,
        publication_date: formData.use_current_date ? null : formData.publication_date?.toISOString().split('T')[0]
      };

      if (isEditing && editingArticle) {
        // Update existing article
        const { error } = await supabase
          .from('articles')
          .update(articleData)
          .eq('id', editingArticle.id);

        if (error) throw error;
        toast.success('Artikel wurde erfolgreich aktualisiert!');
      } else {
        // Create new article
        const { error } = await supabase
          .from('articles')
          .insert(articleData);

        if (error) throw error;
        toast.success('Artikel wurde erfolgreich veröffentlicht!');
      }

      onSuccess();
      
      // Reset form only if not editing
      if (!isEditing) {
        setFormData({
          slug: '',
          category: 'Krypto',
          title: '',
          subtitle: '',
          author: '',
          hero_image_url: '',
          hero_image_caption: '',
          content: [{ title: '', text: '' }],
          bitloon_ad_enabled: true,
          bitloon_ad_config: {},
          braun_investments_ad_enabled: false,
          braun_investments_ad_config: {},
          bovensiepen_partners_ad_enabled: false,
          bovensiepen_partners_ad_config: {},
          published: true,
          use_current_date: true,
          publication_date: null
        });
      }
    } catch (error) {
      console.error('Error saving article:', error);
      toast.error(`Failed to ${isEditing ? 'update' : 'create'} article`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Test Content Generation Section - only show when not editing */}
      {!isEditing && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold mb-3 text-blue-800">Test Content Generation</h3>
          <p className="text-sm text-blue-600 mb-4">
            Quickly populate the form with sample content for testing purposes
          </p>
          <div className="flex gap-3 flex-wrap">
            <Button 
              type="button" 
              onClick={fillWithTestContent} 
              variant="outline" 
              className="border-blue-300 text-blue-700 hover:bg-blue-100"
            >
              <Wand2 className="w-4 h-4 mr-2" />
              Fill with Test Content
            </Button>
            <Button 
              type="button" 
              onClick={generateTestHeroImage} 
              variant="outline"
              className="border-blue-300 text-blue-700 hover:bg-blue-100"
            >
              <Image className="w-4 h-4 mr-2" />
              Generate Test Image
            </Button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              placeholder="e.g., Krypto"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => handleInputChange('author', e.target.value)}
              placeholder="Author name"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Article title"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subtitle">Subtitle</Label>
          <Textarea
            id="subtitle"
            value={formData.subtitle}
            onChange={(e) => handleInputChange('subtitle', e.target.value)}
            placeholder="Article subtitle/lead"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="slug">URL Slug</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => handleInputChange('slug', e.target.value)}
              placeholder="url-friendly-slug"
              required
            />
          </div>
          <div className="flex items-end">
            <Button type="button" onClick={generateSlug} variant="outline" className="w-full">
              Generate from Title
            </Button>
          </div>
        </div>

        {/* Publication Date Section */}
        <Separator />
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Publication Date</h3>
          <div className="flex items-center space-x-2">
            <Switch
              id="use_current_date"
              checked={formData.use_current_date}
              onCheckedChange={(checked) => {
                handleInputChange('use_current_date', checked);
                if (checked) {
                  handleInputChange('publication_date', null);
                }
              }}
            />
            <Label htmlFor="use_current_date">Use current date automatically</Label>
          </div>
          
          {!formData.use_current_date && (
            <div className="space-y-2">
              <Label>Fixed Publication Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.publication_date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.publication_date ? (
                      format(formData.publication_date, "dd.MM.yyyy")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.publication_date || undefined}
                    onSelect={(date) => handleInputChange('publication_date', date || null)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>

        {/* Hero Image */}
        <Separator />
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Hero Image</h3>
          <div className="space-y-2">
            <Label htmlFor="hero_image_url">Image URL</Label>
            <Input
              id="hero_image_url"
              value={formData.hero_image_url}
              onChange={(e) => handleInputChange('hero_image_url', e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hero_image_caption">Image Caption</Label>
            <Input
              id="hero_image_caption"
              value={formData.hero_image_caption}
              onChange={(e) => handleInputChange('hero_image_caption', e.target.value)}
              placeholder="Image description and source"
            />
          </div>
        </div>

        {/* Content Sections */}
        <Separator />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Content Sections</h3>
            <Button type="button" onClick={addContentSection} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Section
            </Button>
          </div>
          
          {formData.content.map((section, index) => (
            <Card key={index} className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Section {index + 1}</Label>
                  {formData.content.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removeContentSection(index)}
                      variant="ghost"
                      size="sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`section-title-${index}`}>Section Title</Label>
                  <Input
                    id={`section-title-${index}`}
                    value={section.title}
                    onChange={(e) => handleContentChange(index, 'title', e.target.value)}
                    placeholder="Section heading"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`section-text-${index}`}>Section Text</Label>
                  <Textarea
                    id={`section-text-${index}`}
                    value={section.text}
                    onChange={(e) => handleContentChange(index, 'text', e.target.value)}
                    placeholder="Section content"
                    rows={4}
                    required
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Bitloon Ad Configuration */}
        <Separator />
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Bitloon Advertisement</h3>
          <div className="flex items-center space-x-2">
            <Switch
              id="bitloon_ad_enabled"
              checked={formData.bitloon_ad_enabled}
              onCheckedChange={(checked) => handleInputChange('bitloon_ad_enabled', checked)}
            />
            <Label htmlFor="bitloon_ad_enabled">Enable Bitloon Ad</Label>
          </div>
          {formData.bitloon_ad_enabled && (
            <div className="space-y-2">
              <Label htmlFor="bitloon_url">Bitloon URL (optional)</Label>
              <Input
                id="bitloon_url"
                value={formData.bitloon_ad_config.url || ''}
                onChange={(e) => handleInputChange('bitloon_ad_config', { url: e.target.value })}
                placeholder="https://bitloon.com/custom-link"
              />
            </div>
          )}
        </div>

        {/* Braun Investments Ad Configuration */}
        <Separator />
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Braun Investments Advertisement</h3>
          <div className="flex items-center space-x-2">
            <Switch
              id="braun_investments_ad_enabled"
              checked={formData.braun_investments_ad_enabled}
              onCheckedChange={(checked) => handleInputChange('braun_investments_ad_enabled', checked)}
            />
            <Label htmlFor="braun_investments_ad_enabled">Enable Braun Investments Ad</Label>
          </div>
          {formData.braun_investments_ad_enabled && (
            <div className="space-y-2">
              <Label htmlFor="braun_investments_url">Braun Investments URL (optional)</Label>
              <Input
                id="braun_investments_url"
                value={formData.braun_investments_ad_config.url || ''}
                onChange={(e) => handleInputChange('braun_investments_ad_config', { url: e.target.value })}
                placeholder="https://braun-investments.com/custom-link"
              />
            </div>
          )}
        </div>

        {/* Bovensiepen & Partner Ad Configuration */}
        <Separator />
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Bovensiepen & Partner Advertisement</h3>
          <div className="flex items-center space-x-2">
            <Switch
              id="bovensiepen_partners_ad_enabled"
              checked={formData.bovensiepen_partners_ad_enabled}
              onCheckedChange={(checked) => handleInputChange('bovensiepen_partners_ad_enabled', checked)}
            />
            <Label htmlFor="bovensiepen_partners_ad_enabled">Enable Bovensiepen & Partner Ad</Label>
          </div>
          {formData.bovensiepen_partners_ad_enabled && (
            <div className="space-y-2">
              <Label htmlFor="bovensiepen_partners_url">Bovensiepen & Partner URL (optional)</Label>
              <Input
                id="bovensiepen_partners_url"
                value={formData.bovensiepen_partners_ad_config.url || ''}
                onChange={(e) => handleInputChange('bovensiepen_partners_ad_config', { url: e.target.value })}
                placeholder="https://bovensiepen-partner.com/custom-link"
              />
            </div>
          )}
        </div>

        {/* Status Notice */}
        <Separator />
        <div className={`flex items-center space-x-2 p-4 border rounded-lg ${
          isEditing 
            ? 'bg-blue-50 border-blue-200' 
            : 'bg-green-50 border-green-200'
        }`}>
          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
            isEditing ? 'bg-blue-500' : 'bg-green-500'
          }`}>
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <span className={`font-medium ${
            isEditing ? 'text-blue-800' : 'text-green-800'
          }`}>
            {isEditing ? 'Artikel wird aktualisiert' : 'Artikel wird automatisch veröffentlicht'}
          </span>
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading 
            ? (isEditing ? 'Artikel wird aktualisiert...' : 'Artikel wird erstellt...') 
            : (isEditing ? 'Artikel aktualisieren' : 'Artikel veröffentlichen')
          }
        </Button>
      </form>
    </div>
  );
};

export default ArticleForm;

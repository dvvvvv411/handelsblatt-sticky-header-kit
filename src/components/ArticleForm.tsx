import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

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
  published: boolean;
}

interface ArticleFormProps {
  onSuccess: () => void;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ onSuccess }) => {
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
    published: false
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // Convert ContentSection[] to Json for database insertion
      const { error } = await supabase
        .from('articles')
        .insert({
          ...formData,
          content: formData.content as any, // Type cast to satisfy Supabase Json type
          created_by: user.id
        });

      if (error) throw error;

      toast.success('Article created successfully!');
      onSuccess();
      
      // Reset form
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
        published: false
      });
    } catch (error) {
      console.error('Error creating article:', error);
      toast.error('Failed to create article');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Article</CardTitle>
        <CardDescription>Fill in the details to create a new article</CardDescription>
      </CardHeader>
      <CardContent>
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

          {/* Publishing */}
          <Separator />
          <div className="flex items-center space-x-2">
            <Switch
              id="published"
              checked={formData.published}
              onCheckedChange={(checked) => handleInputChange('published', checked)}
            />
            <Label htmlFor="published">Publish Article</Label>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Creating...' : 'Create Article'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ArticleForm;

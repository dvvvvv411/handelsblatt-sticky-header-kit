import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ArrowLeft, Calendar, Sparkles } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const UserDetailPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) fetchAll();
  }, [userId]);

  const fetchAll = async () => {
    const [profileRes, rolesRes] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', userId!).single(),
      supabase.from('user_roles').select('role').eq('user_id', userId!),
    ]);
    if (profileRes.data) setProfile(profileRes.data);
    if (rolesRes.data) setRoles(rolesRes.data.map(r => r.role));
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return <div className="text-center py-20 text-slate-500">Benutzer nicht gefunden</div>;
  }

  const isAdmin = roles.includes('admin');

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate('/admin/users')} className="gap-2 text-slate-500 hover:text-slate-900">
        <ArrowLeft className="w-4 h-4" /> Zurück
      </Button>

      {/* User Info */}
      <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <span className="text-white text-xl font-bold">{profile.email?.charAt(0).toUpperCase()}</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">{profile.full_name || profile.email}</h1>
            <p className="text-slate-500 text-sm">{profile.email}</p>
          </div>
          <Badge className={isAdmin ? 'bg-gradient-to-r from-indigo-500 to-violet-500 border-0 text-white ml-auto' : 'bg-slate-100 text-slate-600 ml-auto'}>
            {isAdmin ? 'Admin' : 'Kunde'}
          </Badge>
        </div>
        <div className="mt-4 flex items-center gap-1.5 text-sm text-slate-500">
          <Calendar className="w-3.5 h-3.5" />
          Beigetreten: {new Date(profile.created_at).toLocaleDateString('de-DE')}
        </div>
      </div>

      {/* KI-Artikelassistent Card */}
      <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">KI-Artikelassistent</h2>
            <p className="text-sm text-slate-500">Nutzung und Zugriffskontrolle</p>
          </div>
        </div>
        <div className="flex items-center justify-between py-3 border-t border-slate-100">
          <span className="text-sm text-slate-600">Bisherige Nutzungen</span>
          <span className="text-lg font-bold text-slate-900">{profile.ai_usage_count ?? 0}</span>
        </div>
        <div className="flex items-center justify-between py-3 border-t border-slate-100">
          <span className="text-sm text-slate-600">KI-Assistent aktiv</span>
          <Switch
            checked={profile.ai_assistant_enabled ?? true}
            onCheckedChange={async (checked) => {
              const { error } = await supabase
                .from('profiles')
                .update({ ai_assistant_enabled: checked } as any)
                .eq('id', userId!);
              if (error) {
                toast.error('Fehler beim Speichern');
              } else {
                setProfile((p: any) => ({ ...p, ai_assistant_enabled: checked }));
                toast.success(checked ? 'KI-Assistent aktiviert' : 'KI-Assistent deaktiviert');
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
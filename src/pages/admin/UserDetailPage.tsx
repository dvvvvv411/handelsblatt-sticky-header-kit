import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ArrowLeft, User, Wallet, Calendar, Shield, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  waiting: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  confirming: 'bg-blue-100 text-blue-700 border-blue-200',
  sending: 'bg-blue-100 text-blue-700 border-blue-200',
  finished: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  expired: 'bg-red-100 text-red-700 border-red-200',
  failed: 'bg-red-100 text-red-700 border-red-200',
};

const UserDetailPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [newBalance, setNewBalance] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (userId) fetchAll();
  }, [userId]);

  const fetchAll = async () => {
    const [profileRes, rolesRes, txRes] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', userId!).single(),
      supabase.from('user_roles').select('role').eq('user_id', userId!),
      supabase.from('transactions').select('*').eq('user_id', userId!).order('created_at', { ascending: false }),
    ]);
    if (profileRes.data) setProfile(profileRes.data);
    if (rolesRes.data) setRoles(rolesRes.data.map(r => r.role));
    if (txRes.data) setTransactions(txRes.data);
    setLoading(false);
  };

  const handleSaveBalance = async () => {
    const val = parseFloat(newBalance);
    if (isNaN(val) || val < 0) {
      toast.error('Ungültiger Betrag');
      return;
    }
    setSaving(true);
    const { error } = await supabase
      .from('profiles')
      .update({ balance: val })
      .eq('id', userId!);
    if (error) {
      toast.error('Fehler beim Speichern');
    } else {
      toast.success('Guthaben aktualisiert');
      setProfile((p: any) => ({ ...p, balance: val }));
      setEditOpen(false);
    }
    setSaving(false);
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

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-indigo-100 text-sm font-medium">Guthaben</p>
            <p className="text-3xl font-bold mt-1">{Number(profile.balance || 0).toFixed(2)} €</p>
          </div>
          <Button
            onClick={() => { setNewBalance(String(profile.balance || 0)); setEditOpen(true); }}
            className="bg-white/20 hover:bg-white/30 text-white border-0 rounded-xl"
          >
            <Edit2 className="w-4 h-4 mr-2" /> Bearbeiten
          </Button>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-slate-50/80 to-indigo-50/30">
          <h2 className="font-semibold text-slate-900">Transaktionsverlauf</h2>
        </div>
        {transactions.length === 0 ? (
          <div className="p-12 text-center text-slate-500">Keine Transaktionen</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Betrag</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Krypto</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Datum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-4 font-medium text-slate-900">{Number(tx.amount_eur).toFixed(2)} €</td>
                    <td className="py-3.5 px-4">
                      <Badge className={`${statusColors[tx.status] || 'bg-slate-100'} border rounded-lg`}>{tx.status}</Badge>
                    </td>
                    <td className="py-3.5 px-4 text-sm text-slate-500">{tx.pay_currency?.toUpperCase() || '-'}</td>
                    <td className="py-3.5 px-4 text-sm text-slate-500">
                      {new Date(tx.created_at).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Balance Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Guthaben bearbeiten</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Neues Guthaben (EUR)</label>
            <Input type="number" min="0" step="0.01" value={newBalance} onChange={(e) => setNewBalance(e.target.value)} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>Abbrechen</Button>
            <Button onClick={handleSaveBalance} disabled={saving} className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white border-0">
              Speichern
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserDetailPage;

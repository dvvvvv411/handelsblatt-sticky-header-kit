import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Wallet, Plus, ExternalLink, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode; clickable: boolean }> = {
  pending: { label: 'Ausstehend', color: 'bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-100', icon: <Clock className="w-3 h-3" />, clickable: true },
  waiting: { label: 'Wartend', color: 'bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-100', icon: <Clock className="w-3 h-3" />, clickable: true },
  confirming: { label: 'Bestätigung', color: 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100', icon: <Loader2 className="w-3 h-3 animate-spin" />, clickable: false },
  sending: { label: 'Senden', color: 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100', icon: <Loader2 className="w-3 h-3 animate-spin" />, clickable: false },
  finished: { label: 'Abgeschlossen', color: 'bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100', icon: <CheckCircle className="w-3 h-3" />, clickable: false },
  expired: { label: 'Abgelaufen', color: 'bg-red-100 text-red-700 border-red-200 hover:bg-red-100', icon: <XCircle className="w-3 h-3" />, clickable: false },
  failed: { label: 'Fehlgeschlagen', color: 'bg-red-100 text-red-700 border-red-200 hover:bg-red-100', icon: <XCircle className="w-3 h-3" />, clickable: false },
};

const BalancePage: React.FC = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  const fetchData = async () => {
    const [profileRes, txRes] = await Promise.all([
      supabase.from('profiles').select('balance').eq('id', user!.id).single(),
      supabase.from('transactions').select('*').eq('user_id', user!.id).order('created_at', { ascending: false }),
    ]);
    if (profileRes.data) setBalance(Number(profileRes.data.balance));
    if (txRes.data) setTransactions(txRes.data);
    setLoading(false);
  };

  const handleCreateInvoice = async () => {
    const amountNum = parseFloat(amount);
    if (!amountNum || amountNum < 1) {
      toast.error('Bitte gib einen gültigen Betrag ein (min. 1€)');
      return;
    }
    setCreating(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-invoice', {
        body: { amount_eur: amountNum },
      });
      if (error) throw error;
      if (data?.error) {
        toast.error(data.error);
        return;
      }
      if (data?.invoice_url) {
        window.open(data.invoice_url, '_blank');
        setDialogOpen(false);
        setAmount('');
        toast.success('Rechnung erstellt – zahle im neuen Tab');
        setTimeout(fetchData, 2000);
      }
    } catch (err: any) {
      toast.error(err.message || 'Fehler beim Erstellen');
    } finally {
      setCreating(false);
    }
  };

  const getStatus = (s: string) => statusConfig[s] || { label: s, color: 'bg-slate-100 text-slate-600', icon: null, clickable: false };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-indigo-900 to-violet-900 bg-clip-text text-transparent">Guthaben</h1>
        <p className="text-slate-500 mt-1">Verwalte dein Guthaben und lade auf</p>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <p className="text-indigo-100 text-sm font-medium">Aktuelles Guthaben</p>
        {loading ? (
          <div className="h-10 w-32 bg-white/20 rounded-lg animate-pulse mt-2" />
        ) : (
          <p className="text-4xl font-bold mt-2">{balance.toFixed(2)} €</p>
        )}
        <Button
          onClick={() => setDialogOpen(true)}
          className="mt-6 bg-white text-violet-700 hover:bg-white/90 font-semibold rounded-xl"
        >
          <Plus className="w-4 h-4 mr-2" /> Guthaben hinzufügen
        </Button>
      </div>

      {/* Transactions */}
      <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-slate-50/80 to-indigo-50/30">
          <h2 className="font-semibold text-slate-900">Transaktionsverlauf</h2>
        </div>
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4" />
          </div>
        ) : transactions.length === 0 ? (
          <div className="p-12 text-center">
            <Wallet className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">Noch keine Transaktionen</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Betrag</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Datum</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Aktion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80">
                {transactions.map((tx) => {
                  const st = getStatus(tx.status);
                  return (
                    <tr key={tx.id} className="hover:bg-slate-50/50">
                      <td className="py-3.5 px-4 font-medium text-slate-900">{Number(tx.amount_eur).toFixed(2)} €</td>
                      <td className="py-3.5 px-4">
                        <Badge className={`${st.color} border gap-1 rounded-lg cursor-default`}>
                          {st.icon} {st.label}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-sm text-slate-500">
                        {new Date(tx.created_at).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {st.clickable && tx.nowpayments_invoice_url ? (
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-lg border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                            onClick={() => window.open(tx.nowpayments_invoice_url, '_blank')}
                          >
                            <ExternalLink className="w-3.5 h-3.5 mr-1" /> Bezahlen
                          </Button>
                        ) : null}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Balance Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Guthaben hinzufügen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">Betrag in EUR</label>
              <div className="relative">
                <Input
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="z.B. 50"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">€</span>
              </div>
              <p className="text-xs text-slate-400 mt-1.5">Du wirst zur Krypto-Zahlungsseite weitergeleitet</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Abbrechen</Button>
            <Button
              onClick={handleCreateInvoice}
              disabled={creating}
              className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white border-0"
            >
              {creating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
              Einzahlung erstellen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BalancePage;

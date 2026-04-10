import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ArrowLeftRight, CheckCircle, Clock, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  waiting: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  confirming: 'bg-blue-100 text-blue-700 border-blue-200',
  sending: 'bg-blue-100 text-blue-700 border-blue-200',
  finished: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  expired: 'bg-red-100 text-red-700 border-red-200',
  failed: 'bg-red-100 text-red-700 border-red-200',
};

const TransactionsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;

      // Fetch user emails
      const userIds = [...new Set((data || []).map(t => t.user_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, email')
        .in('id', userIds);

      const emailMap = Object.fromEntries((profiles || []).map(p => [p.id, p.email]));
      setTransactions((data || []).map(t => ({ ...t, email: emailMap[t.user_id] || '-' })));
    } catch (err) {
      toast.error('Fehler beim Laden der Transaktionen');
    } finally {
      setLoading(false);
    }
  };

  const finished = transactions.filter(t => t.status === 'finished');
  const open = transactions.filter(t => ['pending', 'waiting', 'confirming', 'sending'].includes(t.status));
  const totalFinished = finished.reduce((s, t) => s + Number(t.amount_eur), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-indigo-900 to-violet-900 bg-clip-text text-transparent">Transaktionen</h1>
        <p className="text-slate-500 mt-1">Alle Einzahlungen im Überblick</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-emerald-100 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Gesamteinzahlungen</p>
              {loading ? <div className="h-8 w-20 bg-slate-100 rounded-lg animate-pulse mt-2" /> : (
                <p className="text-3xl font-bold text-slate-900 mt-1">{totalFinished.toFixed(2)} €</p>
              )}
            </div>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center shadow-lg">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-yellow-100 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Offene Transaktionen</p>
              {loading ? <div className="h-8 w-12 bg-slate-100 rounded-lg animate-pulse mt-2" /> : (
                <p className="text-3xl font-bold text-slate-900 mt-1">{open.length}</p>
              )}
            </div>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-400 flex items-center justify-center shadow-lg">
              <Clock className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-blue-100 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Gesamt</p>
              {loading ? <div className="h-8 w-12 bg-slate-100 rounded-lg animate-pulse mt-2" /> : (
                <p className="text-3xl font-bold text-slate-900 mt-1">{transactions.length}</p>
              )}
            </div>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg">
              <ArrowLeftRight className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-slate-50/80 to-indigo-50/30">
          <h2 className="font-semibold text-slate-900">Alle Transaktionen</h2>
        </div>
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto" />
          </div>
        ) : transactions.length === 0 ? (
          <div className="p-12 text-center text-slate-500">Keine Transaktionen vorhanden</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Email</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Betrag</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Krypto</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Erstellt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-4 text-sm text-slate-900">{tx.email}</td>
                    <td className="py-3.5 px-4 font-medium text-slate-900">{Number(tx.amount_eur).toFixed(2)} €</td>
                    <td className="py-3.5 px-4">
                      <Badge className={`${statusColors[tx.status] || 'bg-slate-100 text-slate-600'} border rounded-lg`}>
                        {tx.status}
                      </Badge>
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
    </div>
  );
};

export default TransactionsPage;

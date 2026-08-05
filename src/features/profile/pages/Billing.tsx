import React from 'react';
import { CreditCard, Receipt, Download, CheckCircle2 } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';

export default function Billing() {
  const invoices = [
    { id: 'INV-2026-001', date: 'Aug 01, 2026', amount: '$49.00', status: 'Paid' },
    { id: 'INV-2026-002', date: 'Jul 01, 2026', amount: '$49.00', status: 'Paid' },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 font-sans text-slate-100">
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Billing & Subscriptions</h1>
        <p className="text-sm text-slate-400 mt-1">Manage your payment methods and download invoices.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Current Plan */}
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-3xl bg-slate-900/80 border border-sky-500/30 p-8 shadow-xl shadow-sky-500/5 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  Pro Plan <span className="text-xs bg-sky-500/20 text-sky-400 px-2 py-1 rounded-full uppercase tracking-wider">Active</span>
                </h2>
                <p className="text-sm text-slate-400 mt-1">Next billing date: Sept 01, 2026</p>
              </div>
              <div className="text-3xl font-extrabold text-white">$49<span className="text-sm text-slate-500 font-medium">/mo</span></div>
            </div>
            <div className="flex gap-4">
              <button className="bg-sky-500 hover:bg-sky-400 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition">Upgrade Plan</button>
              <button className="bg-slate-800 hover:bg-slate-700 text-white border border-white/10 px-5 py-2.5 rounded-xl text-sm font-semibold transition">Cancel Subscription</button>
            </div>
          </div>

          {/* Payment Method */}
          <div className="rounded-3xl bg-slate-900/80 border border-white/10 p-8 backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-4">Payment Method</h3>
            <div className="flex items-center justify-between bg-slate-950/50 border border-white/5 p-4 rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="bg-slate-800 p-3 rounded-xl"><CreditCard className="w-6 h-6 text-slate-300" /></div>
                <div>
                  <p className="text-sm font-bold text-white">Visa ending in 4242</p>
                  <p className="text-xs text-slate-400">Expires 12/28</p>
                </div>
              </div>
              <button className="text-sm text-sky-400 font-semibold hover:text-sky-300">Edit</button>
            </div>
          </div>
        </div>

        {/* Invoices */}
        <div className="rounded-3xl bg-slate-900/80 border border-white/10 p-8 backdrop-blur-xl h-fit">
          <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-4">Recent Invoices</h3>
          <div className="space-y-4">
            {invoices.map(inv => (
              <div key={inv.id} className="flex items-center justify-between p-3 hover:bg-slate-800/50 rounded-xl transition">
                <div className="flex items-center gap-3">
                  <Receipt className="w-5 h-5 text-slate-500" />
                  <div>
                    <p className="text-sm font-bold text-slate-200">{inv.amount}</p>
                    <p className="text-xs text-slate-400">{inv.date}</p>
                  </div>
                </div>
                <button className="p-2 text-slate-400 hover:text-sky-400 transition" title="Download PDF">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
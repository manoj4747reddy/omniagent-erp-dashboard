export function InvoiceView() {
  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-8 py-8 border-b border-slate-700">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">INVOICE</h1>
              <p className="text-slate-400">INV-2024-Q3-001</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-400">Date: July 15, 2024</p>
              <p className="text-sm text-slate-400">Due: August 15, 2024</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-xs text-slate-500 mb-2">FROM</p>
              <p className="font-semibold text-slate-100">OmniAgent Corp</p>
              <p className="text-sm text-slate-400">Suite 200, Tech Park</p>
              <p className="text-sm text-slate-400">San Francisco, CA 94105</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-2">BILL TO</p>
              <p className="font-semibold text-slate-100">Acme Industries Inc</p>
              <p className="text-sm text-slate-400">123 Business Ave</p>
              <p className="text-sm text-slate-400">New York, NY 10001</p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="px-8 py-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 text-slate-400 font-medium">
                  Description
                </th>
                <th className="text-right py-3 text-slate-400 font-medium w-20">
                  Qty
                </th>
                <th className="text-right py-3 text-slate-400 font-medium w-24">
                  Rate
                </th>
                <th className="text-right py-3 text-slate-400 font-medium w-24">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  desc: 'AI Multi-Agent Platform License',
                  qty: 1,
                  rate: '$5,000.00',
                  amount: '$5,000.00',
                },
                {
                  desc: 'Integration & Setup Services',
                  qty: 1,
                  rate: '$2,500.00',
                  amount: '$2,500.00',
                },
                {
                  desc: 'Premium Support (3 months)',
                  qty: 3,
                  rate: '$1,200.00',
                  amount: '$3,600.00',
                },
                {
                  desc: 'Training & Onboarding',
                  qty: 2,
                  rate: '$800.00',
                  amount: '$1,600.00',
                },
              ].map((item, i) => (
                <tr key={i} className="border-b border-slate-700/50">
                  <td className="py-3 text-slate-200">{item.desc}</td>
                  <td className="text-right py-3 text-slate-200">{item.qty}</td>
                  <td className="text-right py-3 text-slate-200">{item.rate}</td>
                  <td className="text-right py-3 text-amber-400 font-semibold">
                    {item.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="px-8 py-6 bg-slate-800/30 border-t border-slate-700">
          <div className="flex justify-end w-full max-w-xs ml-auto space-y-2">
            <div className="flex justify-between text-slate-400 text-sm">
              <span>Subtotal:</span>
              <span>$12,700.00</span>
            </div>
            <div className="flex justify-between text-slate-400 text-sm">
              <span>Tax (8%):</span>
              <span>$1,016.00</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-amber-400 pt-2 border-t border-slate-700">
              <span>Total:</span>
              <span>$13,716.00</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="px-8 py-6 bg-slate-800/20 border-t border-slate-700">
          <p className="text-xs text-slate-500 mb-1">NOTES</p>
          <p className="text-sm text-slate-400">
            Thank you for your business. Payment is due within 30 days of
            invoice date. Please remit payment via ACH or credit card to the
            address above.
          </p>
        </div>
      </div>
    </div>
  )
}

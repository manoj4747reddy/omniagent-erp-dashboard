import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type definitions for database tables
export interface InventoryItem {
  id: string
  warehouse: string
  product_name: string
  quantity: number
  reorder_level: number
  created_at?: string
  updated_at?: string
}

export interface Invoice {
  id?: string
  invoice_number: string
  customer_name: string
  amount: number
  status: 'pending' | 'paid' | 'overdue'
  created_at?: string
  items?: InvoiceItem[]
}

export interface InvoiceItem {
  id?: string
  invoice_id?: string
  description: string
  quantity: number
  unit_price: number
  total: number
}

// Database query functions
export async function fetchInventoryData(): Promise<InventoryItem[]> {
  try {
    const { data, error } = await supabase
      .from('inventory')
      .select('*')
      .order('warehouse', { ascending: true })

    if (error) {
      console.error('[Supabase] Inventory fetch error:', error)
      return []
    }

    return data || []
  } catch (err) {
    console.error('[Supabase] Inventory fetch exception:', err)
    return []
  }
}

export async function createInvoice(invoice: Invoice): Promise<Invoice | null> {
  try {
    const { data, error } = await supabase
      .from('invoices')
      .insert([
        {
          invoice_number: invoice.invoice_number,
          customer_name: invoice.customer_name,
          amount: invoice.amount,
          status: invoice.status,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('[Supabase] Invoice create error:', error)
      return null
    }

    return data || null
  } catch (err) {
    console.error('[Supabase] Invoice create exception:', err)
    return null
  }
}

export async function fetchRecentInvoices(limit: number = 5): Promise<Invoice[]> {
  try {
    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('[Supabase] Invoices fetch error:', error)
      return []
    }

    return data || []
  } catch (err) {
    console.error('[Supabase] Invoices fetch exception:', err)
    return []
  }
}

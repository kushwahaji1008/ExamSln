import { useEffect, useState } from 'react';
import apiClient from '@/services/api/client';

export default function MyNotifications() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => { apiClient.get('/notifications/my-notifications').then(r => setItems(r.data)).catch(()=>setItems([])); }, []);
  return (<div><h1 className="text-xl font-bold">Notifications</h1><ul className="mt-4">{items.map(n => <li key={n.id}>{n.title}</li>)}</ul></div>);
}

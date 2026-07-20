import { useEffect, useState } from 'react';
import apiClient from '@/services/api/client';

export default function CoursesList() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => { apiClient.get('/videos/courses').then(r => setItems(r.data)).catch(()=>setItems([])); }, []);
  return (<div><h1 className="text-xl font-bold">Courses</h1><ul className="mt-4">{items.map(c=> <li key={c.id}>{c.title}</li>)}</ul></div>);
}

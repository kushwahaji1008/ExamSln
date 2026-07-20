import { useEffect, useState } from 'react';
import { genExams } from '@/services/api/generated';

export default function ActiveExams() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => { genExams.listActiveExams().then(setItems).catch(() => setItems([])); }, []);
  return (<div><h1 className="text-xl font-bold">Active Exams</h1><ul className="mt-4">{items.map(i=> <li key={i.id}>{i.title}</li>)}</ul></div>);
}

import { useEffect, useState } from 'react';
import { genExams } from '@/services/api/generated';

export default function UpcomingExams() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => { genExams.listUpcomingExams().then(setItems).catch(() => setItems([])); }, []);
  return (<div><h1 className="text-xl font-bold">Upcoming Exams</h1><ul className="mt-4">{items.map(i=> <li key={i.id}>{i.title}</li>)}</ul></div>);
}

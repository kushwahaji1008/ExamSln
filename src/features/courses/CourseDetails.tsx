import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '@/services/api/client';

export default function CourseDetails(){
  const { courseId } = useParams();
  const [c, setC] = useState<any>(null);
  useEffect(()=>{ if (!courseId) return; apiClient.get(`/videos/courses/${courseId}`).then(r=>setC(r.data)).catch(()=>{}); }, [courseId]);
  if (!c) return <div>Loading...</div>;
  return (<div><h1 className="text-xl font-bold">{c.title}</h1><div className="mt-2">{c.description}</div></div>);
}

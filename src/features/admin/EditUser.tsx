import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { genAuth } from '@/services/api/generated';

export default function EditUser() {
  const { userId } = useParams();
  const [user, setUser] = useState<any>(null);
  useEffect(() => { if (userId) genAuth.getUser(userId).then(setUser).catch(() => {}); }, [userId]);
  if (!user) return <div>Loading...</div>;
  const save = async () => { try { await genAuth.updateUser(userId!, { fullName: user.fullName }); alert('Saved'); } catch { alert('Failed'); } };
  return (
    <div>
      <h1 className="text-xl font-bold">Edit User</h1>
      <input className="border p-2 w-full my-2" value={user.fullName || ''} onChange={e => setUser({ ...user, fullName: e.target.value })} />
      <button className="bg-green-600 text-white p-2" onClick={save}>Save</button>
    </div>
  );
}

import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import { addTag, updateTag, deleteTag } from './tagSlice';
import type { Tag } from './tagSlice';
import { useState } from 'react';

export default function TagManager() {
  const tags = useSelector((state: RootState) => state.tags.tags);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [color, setColor] = useState('#60a5fa');

  const handleAdd = () => {
    if (!name.trim()) return;
    dispatch(addTag({ id: name.toLowerCase(), name, color }));
    setName('');
    setColor('#60a5fa');
  };

  return (
    <div className="p-4">
      <h2 className="font-bold mb-2">Manage Tags</h2>
      <div className="flex gap-2 mb-4">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Tag name" className="border p-2 rounded" />
        <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-10 h-10 p-0 border rounded" />
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
      </div>
      <div className="space-y-2">
        {tags.map((tag: Tag) => (
          <div key={tag.id} className="flex items-center gap-2">
            <span style={{ background: tag.color }} className="px-2 py-1 rounded text-white min-w-[60px] text-center">{tag.name}</span>
            <button onClick={() => dispatch(deleteTag(tag.id))} className="text-red-500">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
} 
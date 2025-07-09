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
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="p-3 w-100" style={{maxWidth: '600px'}}>
        <h2 className="fw-bold mb-2">Manage Tags</h2>
        <div className="d-flex gap-2 mb-4">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Tag name" className="form-control me-2" />
          <input type="color" value={color} onChange={e => setColor(e.target.value)} className="form-control form-control-color p-0 border rounded" />
          <button onClick={handleAdd} className="btn btn-primary">Add</button>
        </div>
        <div className="mb-2">
          {tags.map((tag: Tag) => (
            <div key={tag.id} className="d-flex align-items-center gap-2">
              <span style={{ background: tag.color }} className="px-2 py-1 rounded text-white min-w-60 text-center">{tag.name}</span>
              <button onClick={() => dispatch(deleteTag(tag.id))} className="btn btn-link text-danger">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
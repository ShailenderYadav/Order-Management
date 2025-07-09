import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import { setSearch, setFilterTag, setPage } from './feedbackSlice';
import type { FeedbackItem } from './feedbackSlice';
import { useEffect, useRef, useCallback } from 'react';
import type { Tag } from '../tags/tagSlice';
import FeedbackTaggingModal from './FeedbackTaggingModal';
import { useState } from 'react';

function useDebouncedCallback(callback: (...args: any[]) => void, delay: number) {
  const timeout = useRef<number | null>(null);
  return useCallback((...args: any[]) => {
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => callback(...args), delay);
  }, [callback, delay]);
}

export default function FeedbackDashboard() {
  const dispatch = useDispatch();
  const { items, search, filterTag, page, pageSize } = useSelector((state: RootState) => state.feedback);
  const tags = useSelector((state: RootState) => state.tags.tags);
  const [editing, setEditing] = useState<FeedbackItem | null>(null);

  // Debounced search
  const debouncedSearch = useDebouncedCallback((value: string) => {
    dispatch(setSearch(value));
  }, 400);

  // Filtered and paginated feedback
  const filtered = items.filter(f =>
    (!search || f.message.toLowerCase().includes(search.toLowerCase())) &&
    (!filterTag || f.tags.includes(filterTag))
  );
  const paginated = filtered.slice(0, page * pageSize);
  const hasMore = paginated.length < filtered.length;

  // Infinite scroll
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (!listRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10 && hasMore) {
        dispatch(setPage(page + 1));
      }
    };
    const ref = listRef.current;
    if (ref) ref.addEventListener('scroll', handleScroll);
    return () => { if (ref) ref.removeEventListener('scroll', handleScroll); };
  }, [hasMore, page, dispatch]);

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="p-3 w-100" style={{maxWidth: '900px'}}>
        <div className="d-flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Search feedback..."
            defaultValue={search}
            onChange={e => debouncedSearch(e.target.value)}
            className="form-control w-50 me-2"
          />
          <select
            value={filterTag || ''}
            onChange={e => dispatch(setFilterTag(e.target.value || null))}
            className="form-control me-2"
          >
            <option value="">All Tags</option>
            {tags.map((tag: Tag) => (
              <option key={tag.id} value={tag.id}>{tag.name}</option>
            ))}
          </select>
        </div>
        <div ref={listRef} className="overflow-auto border rounded p-2 bg-white" style={{height: '24rem'}}>
          {paginated.map((f: FeedbackItem) => (
            <div key={f.id} className="border-bottom py-2 d-flex flex-column gap-1">
              <div className="fw-semibold">{f.customer}</div>
              <div>{f.message}</div>
              <div className="d-flex gap-2 small align-items-center">
                <span className="fst-italic">{f.sentiment}</span>
                {f.tags.map(tagId => {
                  const tag = tags.find(t => t.id === tagId);
                  return tag ? (
                    <span key={tag.id} style={{ background: tag.color }} className="px-2 py-1 rounded text-white">{tag.name}</span>
                  ) : null;
                })}
                <span className="ms-auto">{f.date}</span>
                <button onClick={() => setEditing(f)} className="ms-2 btn btn-primary btn-sm">Edit</button>
              </div>
            </div>
          ))}
          {paginated.length === 0 && <div className="text-center text-secondary">No feedback found.</div>}
        </div>
        {editing && <FeedbackTaggingModal feedback={editing} onClose={() => setEditing(null)} />}
      </div>
    </div>
  );
} 
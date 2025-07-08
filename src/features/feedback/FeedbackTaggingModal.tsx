import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import { updateFeedback } from './feedbackSlice';
import type { FeedbackItem } from './feedbackSlice';
import { useState } from 'react';
import type { Tag } from '../tags/tagSlice';

interface Props {
  feedback: FeedbackItem;
  onClose: () => void;
}

export default function FeedbackTaggingModal({ feedback, onClose }: Props) {
  const tags = useSelector((state: RootState) => state.tags.tags);
  const dispatch = useDispatch();
  const [selectedTags, setSelectedTags] = useState<string[]>(feedback.tags);
  const [sentiment, setSentiment] = useState(feedback.sentiment);

  const handleSave = () => {
    dispatch(updateFeedback({ ...feedback, tags: selectedTags, sentiment }));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="font-bold mb-4">Tag & Sentiment</h3>
        <div className="mb-4">
          <div className="mb-2">Tags:</div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag: Tag) => (
              <label key={tag.id} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag.id)}
                  onChange={e => {
                    setSelectedTags(sel =>
                      e.target.checked ? [...sel, tag.id] : sel.filter(t => t !== tag.id)
                    );
                  }}
                />
                <span style={{ background: tag.color }} className="px-2 py-0.5 rounded text-white">{tag.name}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <div className="mb-2">Sentiment:</div>
          <select value={sentiment} onChange={e => setSentiment(e.target.value as any)} className="border p-2 rounded w-full">
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>
        </div>
        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 rounded bg-blue-600 text-white">Save</button>
        </div>
      </div>
    </div>
  );
} 
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
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-black bg-opacity-50 d-flex align-items-center justify-content-center z-50">
      <div className="bg-white p-4 rounded shadow w-100" style={{maxWidth: '24rem'}}>
        <h3 className="fw-bold mb-4">Tag & Sentiment</h3>
        <div className="mb-4">
          <div className="mb-2">Tags:</div>
          <div className="d-flex flex-wrap gap-2">
            {tags.map((tag: Tag) => (
              <label key={tag.id} className="d-flex align-items-center gap-1">
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag.id)}
                  onChange={e => {
                    setSelectedTags(sel =>
                      e.target.checked ? [...sel, tag.id] : sel.filter(t => t !== tag.id)
                    );
                  }}
                />
                <span style={{ background: tag.color }} className="px-2 py-1 rounded text-white">{tag.name}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <div className="mb-2">Sentiment:</div>
          <select value={sentiment} onChange={e => setSentiment(e.target.value as any)} className="form-select w-100">
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>
        </div>
        <div className="d-flex gap-2 justify-content-end">
          <button onClick={onClose} className="btn btn-secondary">Cancel</button>
          <button onClick={handleSave} className="btn btn-primary">Save</button>
        </div>
      </div>
    </div>
  );
} 
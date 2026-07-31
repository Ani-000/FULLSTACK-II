import PostComposer from './components/PostComposer';
import './App.css';
import { useState } from "react";
import { useDrafts} from "./hooks/useDrafts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { drafts, addDraft, updateDraft, deleteDraft } = useDrafts();
  const [editingDraft, setEditingDraft] = useState(null);

  return (
    <div>
      <PostComposer 
        addDraft={addDraft}
        updateDraft={updateDraft}
        editingDraft={editingDraft}
        setEditingDraft={setEditingDraft} />

      <h2>Saved Drafts</h2>

      {drafts.map((draft) => (
        <div key={draft.id}>
          <h3>{draft.platform}</h3>
          <p>{draft.content}</p>

          <button onClick={() => setEditingDraft(draft)}>Edit</button>
          <button
            className="delete-btn"
            onClick={() => deleteDraft(draft.id)}
          >
            Delete
          </button>

          <hr />
        </div>
      ))}

      <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable
      theme="colored"
      />
    </div>
  );
}
export default App;
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";

/* ===== API ===== */
import {
  getVocabularies,
  createVocabulary,
  updateVocabulary,
  deleteVocabulary,
} from "@/services/vocabulary.service";

const VocabularyManagement = forwardRef((props, ref) => {
  /* ===== DATA ===== */

  
  const [wordsData, setWordsData] = useState([]);
const [page, setPage] = useState(0);
const pageSize = 6;



  /* ===== DIALOG ===== */
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingWord, setEditingWord] = useState(null);

  /* ===== FORM ===== */
  const emptyForm = {
    word: "",
    meaning: "",
    description: "",
    image: "",
    audio: "",
    lessonId: "",
  };

  const [formData, setFormData] = useState(emptyForm);

  useImperativeHandle(ref, () => ({
    openAddDialog: () => setIsAddDialogOpen(true),
  }));

  /* ===== FETCH ===== */
const fetchVocabularies = async () => {
  try {
    const res = await getVocabularies();

    // 🔥 BACKEND TRẢ VỀ ARRAY
    setWordsData(res.data);
  } catch (err) {
    console.error("Fetch vocabularies failed", err);
  }
};


useEffect(() => {
  fetchVocabularies();
}, []);


  /* ===== ADD ===== */
  const handleAddVocabulary = async () => {
    try {
      await createVocabulary(formData);
      setIsAddDialogOpen(false);
      setFormData(emptyForm);
      fetchVocabularies();
    } catch (err) {
      console.error("Add vocabulary failed", err);
    }
  };

  /* ===== OPEN EDIT ===== */
  const handleEditClick = (word) => {
    setEditingWord(word);
    setFormData({
      word: word.word,
      meaning: word.meaning,
      description: word.description,
      image: word.image,
      audio: word.audio,
      lessonId: word.lessonId,
    });
    setIsEditDialogOpen(true);
  };

  /* ===== UPDATE ===== */
  const handleUpdateVocabulary = async () => {
    try {
      await updateVocabulary(editingWord.vocabId, formData);
      setIsEditDialogOpen(false);
      setEditingWord(null);
      fetchVocabularies();
    } catch (err) {
      console.error("Update vocabulary failed", err);
    }
  };

  /* ===== DELETE ===== */
  const handleDeleteVocabulary = async (id) => {
    if (!confirm("Delete this vocabulary?")) return;
    try {
      await deleteVocabulary(id);
      fetchVocabularies();
    } catch (err) {
      console.error("Delete vocabulary failed", err);
    }
  };

  const totalPages = Math.ceil(wordsData.length / pageSize);

const paginatedData = wordsData.slice(
  page * pageSize,
  page * pageSize + pageSize
);


  return (
    <div className="p-8 max-w-[1200px] mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Vocabulary Management</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Vocabulary
        </Button>
      </div>

      {/* ===== TABLE ===== */}
      <Card>
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted">
              <th className="px-4 py-3 text-left">ID Word</th>
              <th className="px-4 py-3 text-left">Word</th>
              <th className="px-4 py-3 text-left">Meaning</th>
              <th className="px-4 py-3 text-left">description</th>
              <th className="px-4 py-3 text-left">Lesson</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((w) => (
              <tr key={w.vocabId} className="border-b">
                <td className="px-4 py-3">{w.vocabId}</td>
                <td className="px-4 py-3">{w.word}</td>
                <td className="px-4 py-3">{w.meaning}</td>
                <td className="px-4 py-3">{w.description}</td>
                <td className="px-4 py-3">#{w.lessonId}</td>
                <td className="px-4 py-3">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleEditClick(w)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDeleteVocabulary(w.vocabId)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* ===== PAGINATION ===== */}
<div className="flex justify-center items-center gap-4 mt-6">
  <Button
    variant="outline"
    disabled={page === 0}
    onClick={() => setPage((p) => p - 1)}
  >
    Previous
  </Button>

  <span className="text-sm">
    Page <strong>{page + 1}</strong> / {totalPages}
  </span>

  <Button
    variant="outline"
    disabled={page + 1 >= totalPages}
    onClick={() => setPage((p) => p + 1)}
  >
    Next
  </Button>
</div>


      {/* ===== ADD DIALOG ===== */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Vocabulary</DialogTitle>
          </DialogHeader>

          <input
            placeholder="Word"
            value={formData.word}
            onChange={(e) => setFormData({ ...formData, word: e.target.value })}
          />
          <input
            placeholder="Meaning"
            value={formData.meaning}
            onChange={(e) => setFormData({ ...formData, meaning: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <input
            placeholder="Lesson ID"
            value={formData.lessonId}
            onChange={(e) => setFormData({ ...formData, lessonId: e.target.value })}
          />

          <DialogFooter>
            <Button onClick={handleAddVocabulary}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ===== EDIT DIALOG ===== */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Vocabulary</DialogTitle>
          </DialogHeader>

          <input
            value={formData.word}
            onChange={(e) => setFormData({ ...formData, word: e.target.value })}
          />
          <input
            value={formData.meaning}
            onChange={(e) => setFormData({ ...formData, meaning: e.target.value })}
          />
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <input
            value={formData.lessonId}
            onChange={(e) => setFormData({ ...formData, lessonId: e.target.value })}
          />

          <DialogFooter>
            <Button onClick={handleUpdateVocabulary}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
});

VocabularyManagement.displayName = "VocabularyManagement";
export default VocabularyManagement;

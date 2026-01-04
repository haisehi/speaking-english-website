import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, ArrowLeft } from "lucide-react";

/* ===== API ===== */
import {
  getSentencesByLesson,
  createSentence,
} from "@/services/sentence.service";

export default function SpeakingSentencesManagement({ params }) {
  const { lessonId } = params;
  const [, setLocation] = useLocation();

  /* ===== DATA ===== */
  const [sentences, setSentences] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);

  /* ===== FORM ===== */
  const emptyForm = {
    sentenceEn: "",
    orderIndex: "",
  };
  const [formData, setFormData] = useState(emptyForm);

  /* ===== FETCH ===== */
  const fetchSentences = async () => {
    try {
      const res = await getSentencesByLesson(lessonId);
      setSentences(res.data);
    } catch (err) {
      console.error("Fetch sentences failed", err);
    }
  };

  useEffect(() => {
    fetchSentences();
  }, [lessonId]);

  /* ===== ADD ===== */
  const handleAddSentence = async () => {
    try {
      await createSentence({
        lessonId: Number(lessonId),
        sentenceEn: formData.sentenceEn,
        orderIndex: Number(formData.orderIndex),
      });

      setIsAddOpen(false);
      setFormData(emptyForm);
      fetchSentences();
    } catch (err) {
      console.error("Add sentence failed", err);
    }
  };

  return (
    <div className="p-8 max-w-[1200px] mx-auto">
      {/* ===== HEADER ===== */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setLocation(`/speaking-lessons/${lessonId}`)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <h1 className="text-3xl font-bold">
            Speaking Sentences (Lesson #{lessonId})
          </h1>
        </div>

        <Button onClick={() => setIsAddOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Sentence
        </Button>
      </div>

      {/* ===== TABLE ===== */}
      <Card>
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted">
              <th className="px-4 py-3 text-left">Order</th>
              <th className="px-4 py-3 text-left">Sentence</th>
            </tr>
          </thead>
          <tbody>
            {sentences.map((s) => (
              <tr key={s.id} className="border-b">
                <td className="px-4 py-3">{s.orderIndex}</td>
                <td className="px-4 py-3">{s.sentenceEn}</td>
              </tr>
            ))}

            {sentences.length === 0 && (
              <tr>
                <td
                  colSpan={2}
                  className="text-center py-10 text-muted-foreground"
                >
                  No sentences found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>

      {/* ===== ADD DIALOG ===== */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Speaking Sentence</DialogTitle>
          </DialogHeader>

          <Input
            placeholder="Sentence (English)"
            value={formData.sentenceEn}
            onChange={(e) =>
              setFormData({ ...formData, sentenceEn: e.target.value })
            }
          />

          <Input
            type="number"
            placeholder="Order index"
            value={formData.orderIndex}
            onChange={(e) =>
              setFormData({ ...formData, orderIndex: e.target.value })
            }
          />

          <DialogFooter>
            <Button onClick={handleAddSentence}>Add Sentence</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

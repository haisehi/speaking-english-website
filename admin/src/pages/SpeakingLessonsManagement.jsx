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
import { Textarea } from "@/components/ui/textarea";
import { Plus, ArrowRight, ArrowLeft } from "lucide-react";

/* ===== API ===== */
import {
  getSpeakingLessons,
  createSpeakingLesson,
} from "@/services/speakingLesson.service";

export default function SpeakingLessonsManagement({ params }) {
  const { topicId } = params;
  const [, setLocation] = useLocation();

  const [lessons, setLessons] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const emptyForm = { title: "", description: "" };
  const [formData, setFormData] = useState(emptyForm);

  const fetchLessons = async () => {
    try {
      const res = await getSpeakingLessons();

      const filtered = res.data.filter(
        (l) => l.topic.id === Number(topicId)
      );

      setLessons(filtered);
    } catch (err) {
      console.error("Fetch speaking lessons failed", err);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [topicId]);

  const handleAddLesson = async () => {
    try {
      await createSpeakingLesson({
        topicId: Number(topicId),
        title: formData.title,
        description: formData.description,
      });

      setIsAddOpen(false);
      setFormData(emptyForm);
      fetchLessons();
    } catch (err) {
      console.error("Add speaking lesson failed", err);
    }
  };

  return (
    <div className="p-8 max-w-[1200px] mx-auto">
<div className="flex items-center justify-between mb-6">
  <div className="flex items-center gap-3">
    <Button
      variant="outline"
      size="icon"
      onClick={() => setLocation("/speakingTopic")}
    >
      <ArrowLeft className="h-4 w-4" />
    </Button>

    <h1 className="text-3xl font-bold">
      Speaking Lessons (Topic #{topicId})
    </h1>
  </div>

  <Button onClick={() => setIsAddOpen(true)}>
    <Plus className="h-4 w-4 mr-2" />
    Add Lesson
  </Button>
</div>



      <Card>
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((l) => (
              <tr key={l.id}>
                <td className="px-4 py-3">{l.id}</td>
                <td className="px-4 py-3">{l.title}</td>
                <td className="px-4 py-3">{l.description}</td>
                <td className="px-4 py-3">
<Button
  size="icon"
  variant="ghost"
  onClick={() => setLocation(`/speaking-sentences/${l.id}`)}
>
  <ArrowRight className="h-4 w-4" />
</Button>

                </td>
              </tr>
            ))}
            {lessons.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-10 text-muted-foreground">
                  No lessons found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>

      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Speaking Lesson</DialogTitle>
          </DialogHeader>

          <Input
            placeholder="Lesson title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <Textarea
            placeholder="Lesson description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <DialogFooter>
            <Button onClick={handleAddLesson}>Add Lesson</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

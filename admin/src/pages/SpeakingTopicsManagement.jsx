import { useEffect, useState } from "react";
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
import { Plus, Trash2 } from "lucide-react";
import { useLocation } from "wouter";

import { ArrowRight } from "lucide-react";




/* ===== API ===== */
import {
  getTopics,
  createTopic,
  deleteTopic,
} from "@/services/topic.service";

export default function SpeakingTopicsManagement() {
const [, setLocation] = useLocation();

  /* ===== DATA ===== */
  const [topics, setTopics] = useState([]);
  const [page, setPage] = useState(0);
  const pageSize = 6;

  /* ===== DIALOG ===== */
  const [isAddOpen, setIsAddOpen] = useState(false);

  /* ===== FORM ===== */
  const emptyForm = {
    title: "",
    description: "",
  };
  const [formData, setFormData] = useState(emptyForm);

  /* ===== FETCH ===== */
  const fetchTopics = async () => {
    try {
      const res = await getTopics();
      setTopics(res.data);
    } catch (err) {
      console.error("Fetch topics failed", err);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  /* ===== ADD ===== */
  const handleAddTopic = async () => {
    try {
      await createTopic(formData);
      setIsAddOpen(false);
      setFormData(emptyForm);
      setPage(0);
      fetchTopics();
    } catch (err) {
      console.error("Add topic failed", err);
    }
  };

  /* ===== DELETE ===== */
  const handleDeleteTopic = async (id) => {
    if (!confirm("Delete this topic?")) return;
    try {
      await deleteTopic(id);
      setPage(0);
      fetchTopics();
    } catch (err) {
      console.error("Delete topic failed", err);
    }
  };

  /* ===== PAGINATION (CLIENT) ===== */
  const totalPages = Math.ceil(topics.length / pageSize);

  const paginatedData = topics.slice(
    page * pageSize,
    page * pageSize + pageSize
  );

  return (
    <div className="p-8 max-w-[1200px] mx-auto">
      {/* ===== HEADER ===== */}
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Speaking Topics Management</h1>
        <Button onClick={() => setIsAddOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Topic
        </Button>
      </div>

      {/* ===== TABLE ===== */}
      <Card>
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted">
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((t) => (
              <tr key={t.id} className="border-b">
                <td className="px-4 py-3">{t.id}</td>
                <td className="px-4 py-3 font-medium">{t.title}</td>
                <td className="px-4 py-3">{t.description}</td>
                <td className="px-4 py-3">
                    <Button
  size="icon"
  variant="ghost"
onClick={() => setLocation(`/speaking-lessons/${t.id}`)}

>
  <ArrowRight className="h-4 w-4" />
</Button>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDeleteTopic(t.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </td>
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-10 text-muted-foreground"
                >
                  No topics found
                </td>
              </tr>
            )}
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
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Speaking Topic</DialogTitle>
          </DialogHeader>

          <Input
            placeholder="Topic title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <Textarea
            placeholder="Topic description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <DialogFooter>
            <Button onClick={handleAddTopic}>Add Topic</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

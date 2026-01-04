import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  MessageSquare,
} from "lucide-react";

/* ===== API ===== */
import {
  getAnswersByQuestionId,
  createAnswer,
  updateAnswer,
  deleteAnswer,
} from "@/services/answerOption.service";

export default function AnswersManagement() {
  const [, setLocation] = useLocation();
  const { id: questionId } = useParams();
const searchParams = new URLSearchParams(window.location.search);
const testId = searchParams.get("testId");



  /* ===== DIALOG ===== */
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  /* ===== DATA ===== */
  const [answersData, setAnswersData] = useState([]);

  /* ===== FORM ===== */
  const [formData, setFormData] = useState({
    content: "",
    correctAnswer: "0",
    attachments: "",
  });

  /* ===== FETCH ===== */
  const fetchAnswers = async () => {
    try {
      const res = await getAnswersByQuestionId(questionId);

      const mapped = res.data.map((a) => ({
        answerId: a.answerId,
        content: a.content,
        isCorrect: a.correctAnswer === "1",
        attachments: a.attachments,
      }));

      setAnswersData(mapped);
    } catch (error) {
      console.error("Fetch answers failed", error);
    }
  };

  useEffect(() => {
    fetchAnswers();
  }, [questionId]);

  /* ===== ADD ===== */
  const handleAddAnswer = async () => {
    try {
      await createAnswer({
        content: formData.content,
        correctAnswer: formData.correctAnswer,
        attachments: formData.attachments || null,
        id: Number(questionId),
      });

      await fetchAnswers();
      setIsAddDialogOpen(false);
      setFormData({
        content: "",
        correctAnswer: "0",
        attachments: "",
      });
    } catch (error) {
      console.error("Add answer failed", error);
    }
  };

  /* ===== OPEN UPDATE ===== */
  const handleUpdateClick = (answer) => {
    setSelectedAnswer(answer);
    setFormData({
      content: answer.content,
      correctAnswer: answer.isCorrect ? "1" : "0",
      attachments: answer.attachments || "",
    });
    setIsUpdateDialogOpen(true);
  };

  /* ===== UPDATE ===== */
  const handleUpdateAnswer = async () => {
    try {
      await updateAnswer(selectedAnswer.answerId, {
        content: formData.content,
        correctAnswer: formData.correctAnswer,
        attachments: formData.attachments || null,
        id: Number(questionId),
      });

      await fetchAnswers();
      setIsUpdateDialogOpen(false);
      setSelectedAnswer(null);
    } catch (error) {
      console.error("Update answer failed", error);
    }
  };

  /* ===== DELETE ===== */
  const handleDeleteAnswer = async (answerId) => {
    try {
      await deleteAnswer(answerId);
      await fetchAnswers();
    } catch (error) {
      console.error("Delete answer failed", error);
    }
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      {/* ===== HEADER ===== */}
      <div className="mb-6">
        <Button
          variant="ghost"
onClick={() => setLocation(`/questions/${testId}`)}

          className="mb-4 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Questions
        </Button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Answers Management</h1>
            <p className="text-muted-foreground">
              Manage answers for Question #{questionId}
            </p>
          </div>
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Answer
          </Button>
        </div>
      </div>

      {/* ===== TABLE ===== */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-6 py-4 text-left">ID</th>
                <th className="px-6 py-4 text-left">Answer Content</th>
                <th className="px-6 py-4 text-left">Correct</th>
                <th className="px-6 py-4 text-left">Attachments</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {answersData.map((answer, index) => (
                <tr key={index} className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4">#{answer.answerId}</td>
                  <td className="px-6 py-4">{answer.content}</td>
                  <td className="px-6 py-4">
                    {answer.isCorrect ? (
                      <Badge className="bg-green-100 text-green-700">
                        <CheckCircle className="h-3.5 w-3.5 mr-1 inline" />
                        Correct
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-700">
                        <XCircle className="h-3.5 w-3.5 mr-1 inline" />
                        Incorrect
                      </Badge>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {answer.attachments ? "Yes" : "None"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleUpdateClick(answer)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteAnswer(answer.answerId)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {answersData.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-10 text-muted-foreground"
                  >
                    No answers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ===== ADD DIALOG ===== */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Answer</DialogTitle>
          </DialogHeader>

          <Textarea
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            placeholder="Enter answer content"
          />

          <Select
            value={formData.correctAnswer}
            onValueChange={(v) =>
              setFormData({ ...formData, correctAnswer: v })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Incorrect</SelectItem>
              <SelectItem value="1">Correct</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Attachments URL (optional)"
            value={formData.attachments}
            onChange={(e) =>
              setFormData({ ...formData, attachments: e.target.value })
            }
          />

          <DialogFooter>
            <Button onClick={handleAddAnswer}>Add Answer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ===== UPDATE DIALOG ===== */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Answer</DialogTitle>
          </DialogHeader>

          <Textarea
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
          />

          <Select
            value={formData.correctAnswer}
            onValueChange={(v) =>
              setFormData({ ...formData, correctAnswer: v })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Incorrect</SelectItem>
              <SelectItem value="1">Correct</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Attachments URL (optional)"
            value={formData.attachments}
            onChange={(e) =>
              setFormData({ ...formData, attachments: e.target.value })
            }
          />

          <DialogFooter>
            <Button onClick={handleUpdateAnswer}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

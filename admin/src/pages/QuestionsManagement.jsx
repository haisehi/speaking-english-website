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
  MessageSquare,
  Edit,
  Trash2,
  Paperclip,
  ClipboardList,
} from "lucide-react";

/* ===== API ===== */
import {
  getQuestionsByTestId,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from "@/services/question.service";

export default function QuestionsManagement() {
  const [, setLocation] = useLocation();
  const { testId } = useParams();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  /* ===== DATA ===== */
  const [questionsData, setQuestionsData] = useState([]);

  /* ===== FORM DATA ===== */
  const [formData, setFormData] = useState({
    content: "",
    type: "Single Choice",
    score: "10",
    attachments: "",
  });

  const testData = {
    name: "English Grammar Basics",
    type: "Quiz",
    level: "Beginner",
    time: "30",
    passing: "70%",
    maxExams: "100",
  };

  const mapTypeToApi = (uiType) => {
  switch (uiType) {
    case "Single Choice":
      return "single-choice";
    case "Multiple Choice":
      return "multiple-choice";
    case "Text Answer":
      return "text-answer";
    default:
      return "single-choice";
  }
};


  /* ===== FETCH QUESTIONS ===== */
  const fetchQuestions = async () => {
    try {
      const res = await getQuestionsByTestId(testId);

      const mappedData = res.data.map((q) => ({
        id: q.id,
        content: q.content,
        type: q.type,
        score: q.score,
        attachments: q.attachments,
        typeBadge:
          q.type === "Single Choice"
            ? "bg-blue-100 text-blue-700"
            : q.type === "Multiple Choice"
            ? "bg-purple-100 text-purple-700"
            : "bg-green-100 text-green-700",
      }));

      setQuestionsData(mappedData);
    } catch (error) {
      console.error("Fetch questions failed", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [testId]);

  /* ===== ADD ===== */
const handleAddQuestion = async () => {
  try {
    await createQuestion({
      content: formData.content,
      attachments: formData.attachments || null,
      type: mapTypeToApi(formData.type),
      score: String(formData.score),
      testId: Number(testId),
    });

    await fetchQuestions();
    setIsAddDialogOpen(false);
    setFormData({
      content: "",
      type: "Single Choice",
      score: "10",
      attachments: "",
    });
  } catch (error) {
    console.error("Add question failed", error);
  }
};


  /* ===== UPDATE ===== */
const openUpdateDialog = (question) => {
  setSelectedQuestion(question);
  setFormData({
    content: question.content,
    type: mapTypeToUI(question.type),
    score: question.score,
    attachments: question.attachments || "",
  });
  setIsUpdateDialogOpen(true);
};


const handleUpdateQuestion = async () => {
  try {
    await updateQuestion(selectedQuestion.id, {
      content: formData.content,
      attachments: formData.attachments || null,
      type: mapTypeToApi(formData.type),
      score: String(formData.score),
      testId: Number(testId),
    });

    await fetchQuestions();
    setIsUpdateDialogOpen(false);
    setSelectedQuestion(null);
  } catch (error) {
    console.error("Update question failed", error);
  }
};

const mapTypeToUI = (apiType) => {
  switch (apiType) {
    case "single-choice":
      return "Single Choice";
    case "multiple-choice":
      return "Multiple Choice";
    case "text-answer":
      return "Text Answer";
    default:
      return "Single Choice";
  }
};


  /* ===== DELETE ===== */
  const handleDeleteQuestion = async (id) => {
    try {
      await deleteQuestion(id);
      await fetchQuestions();
    } catch (error) {
      console.error("Delete question failed", error);
    }
  };

  const stats = {
    totalQuestions: questionsData.length,
    totalScore: questionsData.reduce((sum, q) => sum + Number(q.score), 0) + " pts",
    passingScore: testData.passing,
    maxAttempts: testData.maxExams,
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      {/* ===== HEADER ===== */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => setLocation("/exercises")}
          className="mb-4 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tests
        </Button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Questions Management</h1>
            <p className="text-muted-foreground">{testData.name}</p>
          </div>
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Question
          </Button>
        </div>
      </div>

      {/* ===== TEST INFO ===== */}
      <Card className="p-6 mb-8 bg-blue-50">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center">
            <ClipboardList className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{testData.name}</h3>
            <p className="text-sm text-muted-foreground">
              {testData.type} • {testData.level} • {testData.time} minutes
            </p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Total Questions</div>
            <div className="text-2xl font-bold">{stats.totalQuestions}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Total Score</div>
            <div className="text-2xl font-bold">{stats.totalScore}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Passing Score</div>
            <div className="text-2xl font-bold">{stats.passingScore}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Max Attempts</div>
            <div className="text-2xl font-bold">{stats.maxAttempts}</div>
          </Card>
        </div>
      </Card>

      {/* ===== QUESTIONS TABLE ===== */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <tbody>
              {questionsData.map((question) => (
                <tr key={question.id} className="border-b">
                  <td className="px-6 py-4">#{question.id}</td>
                  <td className="px-6 py-4">{question.content}</td>
                  <td className="px-6 py-4">
                    <Badge className={question.typeBadge}>{question.type}</Badge>
                  </td>
                  <td className="px-6 py-4">{question.score} pts</td>
                  <td className="px-6 py-4">
                    {question.attachments ? (
                      <div className="flex items-center gap-1 text-blue-600">
                        <Paperclip className="h-4 w-4" /> Yes
                      </div>
                    ) : (
                      "None"
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
  setLocation(`/answers/${question.id}?testId=${testId}`)
}

                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openUpdateDialog(question)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteQuestion(question.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ===== ADD DIALOG ===== */}
{/* ===== ADD DIALOG ===== */}
<Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add New Question</DialogTitle>
    </DialogHeader>

    {/* Content */}
    <div className="space-y-2">
      <label className="text-sm font-medium">Question Content</label>
      <Textarea
        value={formData.content}
        onChange={(e) =>
          setFormData({ ...formData, content: e.target.value })
        }
      />
    </div>

    {/* Type */}
    <div className="space-y-2 mt-4">
      <label className="text-sm font-medium">Question Type</label>
      <Select
        value={formData.type}
        onValueChange={(value) =>
          setFormData({ ...formData, type: value })
        }
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Single Choice">Single Choice</SelectItem>
          <SelectItem value="Multiple Choice">Multiple Choice</SelectItem>
          <SelectItem value="Text Answer">Text Answer</SelectItem>
        </SelectContent>
      </Select>
    </div>

    {/* Score */}
    <div className="space-y-2 mt-4">
      <label className="text-sm font-medium">Score</label>
      <Input
        type="number"
        value={formData.score}
        onChange={(e) =>
          setFormData({ ...formData, score: e.target.value })
        }
      />
    </div>

    {/* Attachments */}
    <div className="space-y-2 mt-4">
      <label className="text-sm font-medium">Attachments (optional)</label>
      <Input
        placeholder="https://example.com/file.jpg"
        value={formData.attachments}
        onChange={(e) =>
          setFormData({ ...formData, attachments: e.target.value })
        }
      />
    </div>

    <DialogFooter className="mt-6">
      <Button onClick={handleAddQuestion}>Add Question</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>


      {/* ===== UPDATE DIALOG ===== */}
{/* ===== UPDATE DIALOG ===== */}
<Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Update Question</DialogTitle>
    </DialogHeader>

    {/* Content */}
    <div className="space-y-2">
      <label className="text-sm font-medium">Question Content</label>
      <Textarea
        value={formData.content}
        onChange={(e) =>
          setFormData({ ...formData, content: e.target.value })
        }
      />
    </div>

    {/* Type */}
    <div className="space-y-2 mt-4">
      <label className="text-sm font-medium">Question Type</label>
      <Select
        value={formData.type}
        onValueChange={(value) =>
          setFormData({ ...formData, type: value })
        }
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Single Choice">Single Choice</SelectItem>
          <SelectItem value="Multiple Choice">Multiple Choice</SelectItem>
          <SelectItem value="Text Answer">Text Answer</SelectItem>
        </SelectContent>
      </Select>
    </div>

    {/* Score */}
    <div className="space-y-2 mt-4">
      <label className="text-sm font-medium">Score</label>
      <Input
        type="number"
        value={formData.score}
        onChange={(e) =>
          setFormData({ ...formData, score: e.target.value })
        }
      />
    </div>

    {/* Attachments */}
    <div className="space-y-2 mt-4">
      <label className="text-sm font-medium">Attachments (optional)</label>
      <Input
        placeholder="https://example.com/file.jpg"
        value={formData.attachments}
        onChange={(e) =>
          setFormData({ ...formData, attachments: e.target.value })
        }
      />
    </div>

    <DialogFooter className="mt-6">
      <Button onClick={handleUpdateQuestion}>Save Changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

    </div>
  );
}

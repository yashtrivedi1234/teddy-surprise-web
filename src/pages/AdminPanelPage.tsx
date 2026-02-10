import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type AdminEntry = {
  id: string;
  name: string;
  description: string;
  imageDataUrl: string | null;
  createdAt: string;
};

const STORAGE_KEY = "teddy-admin-entries";

const AdminPanelPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [entries, setEntries] = useState<AdminEntry[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as AdminEntry[];
        setEntries(parsed);
      }
    } catch {
      // ignore corrupt storage
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);

    if (!file) {
      setPreview(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() && !description.trim()) return;

    setIsSaving(true);

    const imageDataUrl =
      preview ||
      (imageFile
        ? await new Promise<string | null>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () =>
              resolve(typeof reader.result === "string" ? reader.result : null);
            reader.readAsDataURL(imageFile);
          })
        : null);

    const newEntry: AdminEntry = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name: name.trim() || "Untitled",
      description: description.trim(),
      imageDataUrl,
      createdAt: new Date().toISOString(),
    };

    setEntries((prev) => [newEntry, ...prev]);
    setName("");
    setDescription("");
    setImageFile(null);
    setPreview(null);
    setIsSaving(false);
  };

  return (
    <div className="min-h-screen bg-gradient-section pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-3"
        >
          <p className="font-handwritten text-3xl text-primary">
            Admin Panel
          </p>
          <h1 className="text-2xl md:text-3xl font-heading text-foreground">
            Add Special People & Moments
          </h1>
          <p className="text-sm md:text-base text-foreground/70 max-w-xl mx-auto">
            Upload a photo, write their name, and add a small note or memory.
            These stay safely in your browser only.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-card/90 backdrop-blur-md shadow-dreamy border-primary/20">
            <CardHeader>
              <CardTitle className="font-heading text-lg md:text-xl flex items-center gap-2">
                💾 Create new entry
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
                autoComplete="off"
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">
                    Name
                  </label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">
                    Description / Memory
                  </label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Write a short note or memory..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">
                    Image
                  </label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {preview && (
                    <div className="mt-3">
                      <p className="text-xs text-foreground/60 mb-1">
                        Preview
                      </p>
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-2xl border border-primary/20 shadow-soft"
                      />
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSaving}
                  className="mt-2 px-6"
                >
                  {isSaving ? "Saving..." : "Save entry"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-4"
        >
          <h2 className="font-heading text-lg md:text-xl text-foreground flex items-center gap-2">
            📂 Saved entries
          </h2>

          {entries.length === 0 ? (
            <p className="text-sm text-foreground/60">
              No entries yet. Add your first special person above.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {entries.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full bg-card/90 border-primary/15 shadow-soft overflow-hidden">
                    <CardContent className="p-4 flex gap-3">
                      {entry.imageDataUrl && (
                        <img
                          src={entry.imageDataUrl}
                          alt={entry.name}
                          className="w-24 h-24 rounded-2xl object-cover border border-primary/20"
                        />
                      )}
                      <div className="flex-1 space-y-1">
                        <p className="font-heading text-base text-foreground flex items-center gap-2">
                          <span>❤️</span>
                          <span>{entry.name}</span>
                        </p>
                        {entry.description && (
                          <p className="text-xs text-foreground/70 whitespace-pre-line">
                            {entry.description}
                          </p>
                        )}
                        <p className="text-[11px] text-foreground/40 mt-1">
                          {new Date(entry.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPanelPage;


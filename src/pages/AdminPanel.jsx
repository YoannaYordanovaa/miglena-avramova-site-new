import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import EmojiPicker from "emoji-picker-react";
import { useNavigate } from "react-router-dom";
import {
  Trash2,
  LogOut,
  Save,
  Edit2,
  Image as ImageIcon,
  X,
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  Quote,
  Heading2,
  Smile,
  ArrowRight,
  Upload,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3010";

// --- КОМПОНЕНТ ЗА ЛЕНТАТА С ИНСТРУМЕНТИ ---
const MenuBar = ({ editor }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);

  if (!editor) return null;

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        editor.chain().focus().setImage({ src: e.target.result }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  const btnClass = (active) =>
    `p-2.5 md:p-2 rounded-xl transition-all shrink-0 ${
      active
        ? "bg-brand-primary text-white shadow-md"
        : "hover:bg-brand-cream text-gray-500"
    }`;

  return (
    <>
      <div className="sticky top-4 z-[100] border-b border-brand-primary/10 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-1.5 p-2 overflow-x-auto no-scrollbar md:flex-wrap">
          <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btnClass(editor.isActive("bold"))} title="Получер"><Bold size={18} /></button>
          <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btnClass(editor.isActive("italic"))} title="Курсив"><Italic size={18} /></button>
          <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btnClass(editor.isActive("heading", { level: 2 }))} title="Заглавие"><Heading2 size={18} /></button>
          <div className="w-[1px] h-6 bg-gray-100 mx-1 shrink-0" />
          <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnClass(editor.isActive("bulletList"))} title="Списък"><List size={18} /></button>
          <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btnClass(editor.isActive("orderedList"))} title="Номериран списък"><ListOrdered size={18} /></button>
          <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btnClass(editor.isActive("blockquote"))} title="Цитат"><Quote size={18} /></button>
          <div className="w-[1px] h-6 bg-gray-100 mx-1 shrink-0" />
          <button type="button" onClick={() => {
            const url = window.prompt("Въведете линк:");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }} className={btnClass(editor.isActive("link"))} title="Добави линк"><LinkIcon size={18} /></button>
          <button type="button" onClick={() => fileInputRef.current.click()} className={btnClass(false)} title="Качи снимка в текста"><Upload size={18} /></button>
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
          <button type="button" onClick={() => setShowEmojiPicker(true)} className={btnClass(showEmojiPicker)} title="Емотикони"><Smile size={18} /></button>
        </div>
      </div>
      <AnimatePresence>
        {showEmojiPicker && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowEmojiPicker(false)} className="fixed inset-0 bg-brand-dark/20 backdrop-blur-sm z-[200]" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[201] w-[90vw] max-w-[350px]">
              <div className="bg-brand-light rounded-3xl shadow-2xl overflow-hidden border border-brand-primary/10">
                <EmojiPicker onEmojiClick={(emoji) => {
                  editor.chain().focus().insertContent(emoji.emoji).run();
                  setShowEmojiPicker(false);
                }} theme="light" width="100%" height={400} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [news, setNews] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "", imageFile: null, imagePreview: "", buttonText: "", buttonLink: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("adminToken");
      if (token) {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };
    
    checkAuth();
    fetchNews();
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ history: true }),
      LinkExtension.configure({ openOnClick: false, HTMLAttributes: { class: "text-brand-primary underline font-bold" } }),
      ImageExtension.configure({ HTMLAttributes: { class: "rounded-2xl shadow-xl my-6 md:my-10 max-w-full block mx-auto border-2 md:border-4 border-white" } }),
    ],
    content: "",
  });

  const fetchNews = async () => {
    try {
      const response = await fetch(`${API_URL}/getNews`);
      if (!response.ok) throw new Error("Проблем при зареждане на новините");
      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error("Грешка:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();

      if (data.success) {
        localStorage.setItem("adminToken", data.token);
        setIsAuthenticated(true);
        setPassword("");
      } else {
        alert(data.message || "Невалидна парола!");
      }
    } catch (error) {
      alert("Грешка при свързване със сървъра. Проверете бекенда.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
    navigate("/");
  };

  const handleSaveNews = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    if (!token) return handleLogout();

    const htmlContent = editor.getHTML();
    const submissionData = new FormData();
    submissionData.append("title", formData.title);
    submissionData.append("text", htmlContent);
    submissionData.append("buttonText", formData.buttonText);
    submissionData.append("buttonLink", formData.buttonLink);
    submissionData.append("date", new Date().toLocaleDateString("bg-BG"));
    if (formData.imageFile) submissionData.append("image", formData.imageFile);

    const url = editingId ? `${API_URL}/updateNews/${editingId}` : `${API_URL}/saveNews`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: submissionData,
      });

      if (response.status === 401 || response.status === 403) {
        alert("Сесията изтече. Моля, влезте отново.");
        return handleLogout();
      }

      const result = await response.json();
      if (result.success) {
        alert("Успешно запазване!");
        fetchNews();
        setEditingId(null);
        setFormData({ title: "", imageFile: null, imagePreview: "", buttonText: "", buttonLink: "" });
        editor.commands.setContent("");
      } else {
        alert(result.message || "Грешка при запазване.");
      }
    } catch (error) {
      alert("Възникна грешка при комуникация със сървъра.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Наистина ли искате да изтриете тази статия?")) return;
    const token = localStorage.getItem("adminToken");
    if (!token) return handleLogout();
    
    try {
      const response = await fetch(`${API_URL}/deleteNews/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (response.status === 401 || response.status === 403) {
        alert("Неоторизиран достъп. Излизане...");
        return handleLogout();
      }

      if (response.ok) fetchNews();
    } catch (error) {
      console.error("Грешка при изтриване.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imageFile: file, imagePreview: URL.createObjectURL(file) });
    }
  };

  if (isLoading) return <div className="min-h-screen bg-brand-cream flex items-center justify-center font-sans">Зареждане...</div>;

  if (!isAuthenticated)
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-md font-sans">
          <form onSubmit={handleLogin} className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl space-y-8">
            <div className="text-center space-y-2">
              <h2 className="font-display text-4xl text-brand-dark">Админ <span className="text-brand-primary font-light">Вход</span></h2>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Защитена зона</p>
            </div>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-brand-cream/50 px-6 py-5 rounded-2xl outline-none text-center border-2 border-transparent focus:border-brand-primary/20 transition-all" placeholder="Въведете парола" required />
            <button className="btn-primary w-full">
              Влез в панела <ArrowRight size={16} />
            </button>
          </form>
        </motion.div>
      </div>
    );

  return (
    <div className="min-h-screen pt-30 md:pt-24 pb-10 px-4 md:px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-8 text-left">
        <header className="flex justify-between items-center">
          <h1 className="font-display text-4xl tracking-tighter">Админ <span className="text-brand-primary italic">Панел</span></h1>
          <button onClick={handleLogout} className="text-gray-500 hover:text-red-500 flex gap-2 items-center transition-colors font-medium">
            Изход <LogOut size={20} />
          </button>
        </header>

        <section className="bg-brand-light rounded-[2.5rem] shadow-sm border border-brand-light overflow-hidden">
          <form onSubmit={handleSaveNews}>
            <div className="p-6 md:p-10 space-y-6">
              <div className="relative aspect-[21/9] bg-white rounded-3xl overflow-hidden border-2 border-dashed border-brand-primary/10">
                {formData.imagePreview ? (
                  <div className="relative w-full h-full">
                    <img src={formData.imagePreview.startsWith("blob") ? formData.imagePreview : `${API_URL}${formData.imagePreview}`} className="w-full h-full object-cover" alt="Предварителен преглед" />
                    <button type="button" onClick={() => setFormData({ ...formData, imageFile: null, imagePreview: "" })} className="absolute top-4 right-4 bg-brand-dark p-2 rounded-full text-white"><X size={14} /></button>
                  </div>
                ) : (
                  <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-brand-primary/5 transition-colors">
                    <ImageIcon size={32} className="text-brand-primary/20 mb-2" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 text-center">Качи основна снимка</span>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                )}
              </div>
              <input required placeholder="Заглавие на статията..." value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-8 py-5 rounded-2xl bg-white border-2 border-gray-50 focus:border-brand-primary outline-none font-display text-brand-dark" />
            </div>

            <div className="bg-white border-y border-brand-primary/5">
              <MenuBar editor={editor} />
              <div className="article-content p-6 md:p-10 overflow-y-auto custom-scrollbar" style={{ minHeight: "400px", maxHeight: "60vh" }}>
                <EditorContent editor={editor} />
              </div>
            </div>

            <div className="p-6 md:p-10 bg-brand-cream/10 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <input placeholder="Текст на бутона (CTA)" value={formData.buttonText} onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })} className="px-6 py-4 rounded-xl bg-white border border-gray-100 outline-none focus:border-brand-primary transition-all" />
                <input placeholder="Линк на бутона" value={formData.buttonLink} onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })} className="px-6 py-4 rounded-xl bg-white border border-gray-100 outline-none focus:border-brand-primary transition-all" />
              </div>
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                <Save size={18} /> {editingId ? "Обнови статията" : "Публикувай статията"}
              </button>
            </div>
          </form>
        </section>

        <div className="space-y-4">
          <h3 className="font-display text-2xl px-2 text-brand-dark">Архив на статиите</h3>
          <div className="grid gap-3">
            {news.map((n) => (
              <div key={n.id} className="bg-white p-4 rounded-3xl border border-white flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 truncate">
                  {n.image && <img src={`${API_URL}${n.image}`} className="w-12 h-12 rounded-xl object-cover" alt="" />}
                  <div className="truncate text-left">
                    <p className="font-medium text-brand-dark truncate">{n.title}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{n.date}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => {
                    setEditingId(n.id);
                    setFormData({ title: n.title, buttonText: n.buttonText || "", buttonLink: n.buttonLink || "", imagePreview: n.image, imageFile: null });
                    editor.commands.setContent(n.text);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }} className="p-2 text-brand-primary hover:bg-brand-primary/5 rounded-lg transition-all" title="Редактирай"><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(n.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-all" title="Изтрий"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
            {news.length === 0 && <p className="text-center text-gray-400 py-10">Все още няма добавени статии.</p>}
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .ProseMirror { outline: none !important; min-height: 400px; font-family: 'Montserrat', sans-serif; color: #4b5563; text-align: left; } 
        .ProseMirror p { margin-bottom: 1rem; } 
        .ProseMirror h2 { font-family: "Cormorant Infant", serif; font-size: 1.8rem; color: #003f00; margin-top: 1.5rem; text-align: left; } 
        .ProseMirror img { border-radius: 1rem; margin: 1.5rem auto; display: block; max-width: 90%; } 
        .ProseMirror blockquote { border-left: 4px solid #74ab1a; padding-left: 1rem; font-style: italic; margin: 1.5rem 0; text-align: left; }
      ` }} />
    </div>
  );
};

export default AdminPanel;
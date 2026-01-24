import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import EmojiPicker from "emoji-picker-react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
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
  Upload,
} from "lucide-react";

// --- КОМПОНЕНТ ЗА ЛЕНТАТА С ИНСТРУМЕНТИ ---
const MenuBar = ({ editor }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);
  const fileInputRef = useRef(null);

  if (!editor) return null;

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Тук все още ползваме Base64 само за вмъкване вътре в самия текст (Tiptap content)
      const reader = new FileReader();
      reader.onload = (e) => {
        editor.chain().focus().setImage({ src: e.target.result }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  const btnClass = (active) =>
    `p-2.5 md:p-2 rounded-xl transition-all shrink-0 ${
      active ? "bg-brand-primary text-white shadow-md" : "hover:bg-brand-cream text-gray-500"
    }`;

  return (
    <>
      <div className="sticky top-4 z-[100] border-b border-brand-primary/10 bg-brand-light/95 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-1.5 p-2 overflow-x-auto no-scrollbar md:flex-wrap">
          <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btnClass(editor.isActive("bold"))}><Bold size={18} /></button>
          <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btnClass(editor.isActive("italic"))}><Italic size={18} /></button>
          <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btnClass(editor.isActive("heading", { level: 2 }))}><Heading2 size={18} /></button>
          <div className="w-[1px] h-6 bg-gray-100 mx-1 shrink-0" />
          <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnClass(editor.isActive("bulletList"))}><List size={18} /></button>
          <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btnClass(editor.isActive("orderedList"))}><ListOrdered size={18} /></button>
          <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btnClass(editor.isActive("blockquote"))}><Quote size={18} /></button>
          <div className="w-[1px] h-6 bg-gray-100 mx-1 shrink-0" />
          <button type="button" onClick={() => {
            const url = window.prompt("Линк:");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }} className={btnClass(editor.isActive("link"))}><LinkIcon size={18} /></button>
          <button type="button" onClick={() => fileInputRef.current.click()} className={btnClass(false)}><Upload size={18} /></button>
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
          <button type="button" onClick={() => setShowEmojiPicker(true)} className={btnClass(showEmojiPicker)}><Smile size={18} /></button>
        </div>
      </div>
      <AnimatePresence>
        {showEmojiPicker && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowEmojiPicker(false)} className="fixed inset-0 bg-brand-dark/20 backdrop-blur-sm z-[200]" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} ref={emojiPickerRef} className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[201] w-[90vw] max-w-[350px]">
              <div className="bg-brand-light rounded-3xl shadow-2xl overflow-hidden border border-brand-primary/10">
                <EmojiPicker onEmojiClick={(emoji) => { editor.chain().focus().insertContent(emoji.emoji).run(); setShowEmojiPicker(false); }} theme="light" width="100%" height={400} />
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
  
  // Оптимизирано състояние на формата за качване на файлове
  const [formData, setFormData] = useState({
    title: "",
    imageFile: null,      // Самият обект на файла за бекенда
    imagePreview: "",    // URL за визуализация в браузъра
    buttonText: "",
    buttonLink: "",
  });

  const navigate = useNavigate();
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ bulletList: true, orderedList: true, blockquote: true }),
      LinkExtension.configure({ openOnClick: false, HTMLAttributes: { class: "text-brand-primary underline font-bold" } }),
      ImageExtension.configure({ HTMLAttributes: { class: "rounded-2xl shadow-xl my-6 md:my-10 max-w-full block mx-auto border-2 md:border-4 border-white" } }),
    ],
    content: "",
  });

  // Зареждане на статиите (тук вече трябва да е API заявка, но оставяме localStorage за съвместимост засега)
  useEffect(() => {
    const saved = localStorage.getItem("miglena_news");
    if (saved) setNews(JSON.parse(saved));
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        imageFile: file,
        imagePreview: URL.createObjectURL(file) // Правим временен линк за преглед
      });
    }
  };

  const handleSaveNews = async (e) => {
    e.preventDefault();
    if (!formData.title) return alert("Заглавието е задължително!");

    const htmlContent = editor.getHTML();

    // ПОДГОТОВКА НА FORMDATA ЗА БЕКЕНД
    const submissionData = new FormData();
    submissionData.append("title", formData.title);
    submissionData.append("text", htmlContent);
    submissionData.append("buttonText", formData.buttonText);
    submissionData.append("buttonLink", formData.buttonLink);
    submissionData.append("date", new Date().toLocaleDateString("bg-BG"));
    
    if (formData.imageFile) {
        submissionData.append("image", formData.imageFile);
    }
    if (editingId) {
        submissionData.append("id", editingId);
    }

    // --- ТУК ЩЕ БЪДЕ ВАШАТА API ЗАЯВКА ---
    // Пример:
    // try {
    //   const response = await fetch("https://iglika.me/api/saveNews.php", {
    //     method: "POST",
    //     body: submissionData
    //   });
    //   ...
    // } catch (err) { ... }

    // ВРЕМЕННО: Оставяме localStorage логиката, но тя не поддържа истински файлове (само за превю)
    const newEntry = {
      id: editingId || Date.now(),
      title: formData.title,
      image: formData.imagePreview, // В localStorage пазим само временния линк (няма да работи след refresh)
      text: htmlContent,
      buttonText: formData.buttonText,
      buttonLink: formData.buttonLink,
      date: new Date().toLocaleDateString("bg-BG"),
    };

    let updatedNews = editingId ? news.map(n => n.id === editingId ? newEntry : n) : [newEntry, ...news];
    
    setNews(updatedNews);
    localStorage.setItem("miglena_news", JSON.stringify(updatedNews));
    
    // Reset
    setEditingId(null);
    setFormData({ title: "", imageFile: null, imagePreview: "", buttonText: "", buttonLink: "" });
    editor.commands.setContent("");
    alert("Статията е запазена локално!");
  };

  if (!isAuthenticated)
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center px-4 italic">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const securePassword = import.meta.env.VITE_ADMIN_PASSWORD;
            if (password === securePassword) { setIsAuthenticated(true); localStorage.setItem("isLoggedIn", "true"); }
            else { alert("Грешна парола!"); }
          }}
          className="bg-brand-light p-10 rounded-[2.5rem] shadow-2xl max-w-sm w-full space-y-6"
        >
          <h2 className="font-display text-2xl text-center text-brand-dark leading-none">Вход</h2>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-brand-cream px-6 py-4 rounded-xl outline-none text-center" placeholder="Парола" />
          <button className="btn-primary w-full py-4 text-[10px] font-bold">Влез</button>
        </form>
      </div>
    );

  return (
    <div className="min-h-screen bg-brand-cream pt-30 md:pt-24 pb-5 px-4 md:px-6 font-sans text-brand-dark">
      <div className="max-w-4xl mx-auto space-y-6 md:space-y-12 text-left">
        <header className="flex justify-between items-center">
          <h1 className="font-display text-3xl md:text-5xl tracking-tighter">Админ <span className="text-brand-primary italic font-normal">панел</span></h1>
          <button onClick={() => { setIsAuthenticated(false); navigate("/"); }} className="text-gray-400 p-2 hover:text-brand-primary transition-colors flex gap-2 items-center">Изход <LogOut size={20} /></button>
        </header>

        <section className="bg-brand-light rounded-[2rem] md:rounded-[3.5rem] shadow-sm border border-brand-light overflow-hidden">
          <form onSubmit={handleSaveNews}>
            <div className="p-5 md:p-10 space-y-6">
              <div className="space-y-3">
                <label className="font-sans tracking-widest text-gray-400 ml-4">Водеща снимка</label>
                <div className="relative aspect-[16/9] md:aspect-[21/9] bg-brand-cream rounded-[2rem] overflow-hidden border-2 border-dashed border-brand-primary/10">
                  {formData.imagePreview ? (
                    <>
                      <img src={formData.imagePreview} className="w-full h-full object-cover" alt="" />
                      <button type="button" onClick={() => setFormData({ ...formData, imageFile: null, imagePreview: "" })} className="absolute top-3 right-3 bg-brand-dark p-2 rounded-full text-white shadow-lg"><X size={14} /></button>
                    </>
                  ) : (
                    <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-brand-primary/5 transition-colors text-center">
                      <ImageIcon size={24} className="text-brand-primary/20 mb-1" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Качи снимка</span>
                      <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                    </label>
                  )}
                </div>
              </div>

              <input required placeholder="Заглавие на статията..." value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-5 py-3 rounded-xl bg-brand-cream border-none font-sans text-xl md:text-3xl outline-none focus:ring-2 focus:ring-brand-primary/10 transition-all" />
            </div>

            <div className="relative bg-brand-light border-t border-brand-primary/5">
              <MenuBar editor={editor} />
              <div className="prose prose-sm max-w-none p-5 md:p-14 min-h-[400px]">
                <EditorContent editor={editor} />
              </div>
            </div>

            <div className="p-5 md:p-10 border-t border-brand-primary/5 bg-brand-cream/5 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input placeholder="Текст на бутона" value={formData.buttonText} onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })} className="w-full bg-brand-cream px-5 py-3 rounded-xl outline-none text-sm" />
                <input placeholder="Линк на бутона" value={formData.buttonLink} onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })} className="w-full bg-brand-cream px-5 py-3 rounded-xl outline-none text-sm" />
              </div>
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-3 py-4 uppercase tracking-widest text-xs font-bold">
                <Save size={18} /> {editingId ? "Обнови статията" : "Публикувай статията"}
              </button>
            </div>
          </form>
        </section>

        {/* АРХИВ */}
        <div className="grid gap-3 pt-6">
          <h3 className="font-display text-xl md:text-2xl ml-2">Архив статии</h3>
          <div className="space-y-3 pb-10">
            {news.map((n) => (
              <div key={n.id} className="bg-brand-light p-3 md:p-4 rounded-[2rem] border border-brand-light flex items-center justify-between hover:border-brand-primary/20 transition-all shadow-sm">
                <div className="flex items-center gap-3 md:gap-4 overflow-hidden text-left">
                  {n.image && <img src={n.image} className="w-12 h-12 rounded-xl object-cover shrink-0 shadow-sm" alt="" />}
                  <div className="truncate pr-2">
                    <p className="text-sm md:text-base text-brand-dark truncate font-medium">{n.title}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">{n.date}</p>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => { setEditingId(n.id); setFormData({ ...n, imagePreview: n.image, imageFile: null }); editor.commands.setContent(n.text); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="p-2 text-brand-primary hover:bg-brand-cream rounded-lg transition-all"><Edit2 size={16} /></button>
                  <button onClick={() => { if (window.confirm("Сигурни ли сте?")) { const filtered = news.filter(x => x.id !== n.id); setNews(filtered); localStorage.setItem("miglena_news", JSON.stringify(filtered)); } }} className="p-2 text-red-300 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .ProseMirror { outline: none !important; min-height: 400px; font-size: 1.1rem; line-height: 1.6; color: #444; font-family: 'Montserrat', sans-serif; }
        .ProseMirror p { margin-bottom: 1.2rem; }
        .ProseMirror h2 { font-family: 'Literata', serif; font-size: 1.8rem; color: #003f00; margin: 2rem 0 1rem; }
        .ProseMirror img { border-radius: 1.5rem; margin: 2rem auto; display: block; max-width: 80%; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .ProseMirror ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; }
        .ProseMirror ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1.5rem; }
        .ProseMirror blockquote { border-left: 4px solid #74ab1a; padding-left: 1.5rem; font-style: italic; color: #666; margin: 2rem 0; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  );
};

export default AdminPanel;
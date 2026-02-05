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
  ArrowRight,
  Upload,
} from "lucide-react";

// URL на вашия бекенд сървър
const API_URL = "http://localhost:3010";

// --- КОМПОНЕНТ ЗА ЛЕНТАТА С ИНСТРУМЕНТИ ---
const MenuBar = ({ editor }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);
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
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={btnClass(editor.isActive("bold"))}
          >
            <Bold size={18} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={btnClass(editor.isActive("italic"))}
          >
            <Italic size={18} />
          </button>
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={btnClass(editor.isActive("heading", { level: 2 }))}
          >
            <Heading2 size={18} />
          </button>
          <div className="w-[1px] h-6 bg-gray-100 mx-1 shrink-0" />
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={btnClass(editor.isActive("bulletList"))}
          >
            <List size={18} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={btnClass(editor.isActive("orderedList"))}
          >
            <ListOrdered size={18} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={btnClass(editor.isActive("blockquote"))}
          >
            <Quote size={18} />
          </button>
          <div className="w-[1px] h-6 bg-gray-100 mx-1 shrink-0" />
          <button
            type="button"
            onClick={() => {
              const url = window.prompt("Линк:");
              if (url) editor.chain().focus().setLink({ href: url }).run();
            }}
            className={btnClass(editor.isActive("link"))}
          >
            <LinkIcon size={18} />
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className={btnClass(false)}
          >
            <Upload size={18} />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => setShowEmojiPicker(true)}
            className={btnClass(showEmojiPicker)}
          >
            <Smile size={18} />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {showEmojiPicker && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEmojiPicker(false)}
              className="fixed inset-0 bg-brand-dark/20 backdrop-blur-sm z-[200]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              ref={emojiPickerRef}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[201] w-[90vw] max-w-[350px]"
            >
              <div className="bg-brand-light rounded-3xl shadow-2xl overflow-hidden border border-brand-primary/10">
                <EmojiPicker
                  onEmojiClick={(emoji) => {
                    editor.chain().focus().insertContent(emoji.emoji).run();
                    setShowEmojiPicker(false);
                  }}
                  theme="light"
                  width="100%"
                  height={400}
                />
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
  const [formData, setFormData] = useState({
    title: "",
    imageFile: null,
    imagePreview: "",
    buttonText: "",
    buttonLink: "",
  });

  const navigate = useNavigate();
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Деактивираме вградените неща, които добавяме ръчно, за да няма дублиране
        history: true,
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-brand-primary underline font-bold" },
      }),
      ImageExtension.configure({
        HTMLAttributes: {
          class:
            "rounded-2xl shadow-xl my-6 md:my-10 max-w-full block mx-auto border-2 md:border-4 border-white",
        },
      }),
    ],
    content: "",
  });

  // Зареждане на статиите от базата данни
  const fetchNews = async () => {
    try {
      const response = await fetch(`${API_URL}/getNews`);
      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error("Грешка при зареждане на новините:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        imageFile: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleSaveNews = async (e) => {
    e.preventDefault();
    if (!formData.title) return alert("Заглавието е задължително!");

    const htmlContent = editor.getHTML();
    const submissionData = new FormData();
    submissionData.append("title", formData.title);
    submissionData.append("text", htmlContent);
    submissionData.append("buttonText", formData.buttonText);
    submissionData.append("buttonLink", formData.buttonLink);
    // Запазваме оригиналната дата, ако редактираме, или слагаме нова, ако е нова статия
    submissionData.append("date", new Date().toLocaleDateString("bg-BG"));

    if (formData.imageFile) {
      submissionData.append("image", formData.imageFile);
    }

    // ОПРЕДЕЛЯМЕ ДАЛИ Е UPDATE ИЛИ INSERT
    const url = editingId
      ? `${API_URL}/updateNews/${editingId}`
      : `${API_URL}/saveNews`;

    try {
      const response = await fetch(url, {
        method: "POST", // Може да ползвате и PUT, ако бекендът го поддържа
        body: submissionData,
      });

      const result = await response.json();

      if (result.success) {
        alert(
          editingId
            ? "Статията е обновена успешно!"
            : "Статията е запазена успешно!",
        );
        fetchNews();
        setEditingId(null); // ВАЖНО: Нулираме ID-то след успех
        setFormData({
          title: "",
          imageFile: null,
          imagePreview: "",
          buttonText: "",
          buttonLink: "",
        });
        editor.commands.setContent("");
      }
    } catch (error) {
      console.error("Грешка при изпращане:", error);
      alert("Възникна грешка при комуникацията със сървъра.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Сигурни ли сте, че искате да изтриете тази статия?"))
      return;
    try {
      const response = await fetch(`${API_URL}/deleteNews/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setNews(news.filter((n) => n.id !== id));
      }
    } catch (error) {
      console.error("Грешка при изтриване:", error);
    }
  };

  if (!isAuthenticated)
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center px-4 relative overflow-hidden">
        {/* Декоративен елемент за фон */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-md"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const securePassword = import.meta.env.VITE_ADMIN_PASSWORD;
              if (password === securePassword) {
                setIsAuthenticated(true);
                localStorage.setItem("isLoggedIn", "true");
              } else {
                alert("Грешна парола!");
              }
            }}
            className="bg-white p-8 md:p-12 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/50 space-y-8"
          >
            <div className="space-y-3 text-center">
              <h2 className="font-display text-4xl md:text-5xl text-brand-dark tracking-tighter">
                Админ{" "}
                <span className="text-brand-primary font-light">Вход</span>
              </h2>
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">
                Само за оторизиран достъп
              </p>
            </div>

            <div className="space-y-4">
              <div className="relative group">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-brand-cream/50 px-6 py-5 rounded-2xl outline-none text-center font-sans text-brand-dark border-2 border-transparent focus:border-brand-primary/20 focus:bg-white transition-all duration-300 placeholder:text-gray-300"
                  placeholder="Въведете парола"
                />
              </div>

              <button className="btn-primary w-full py-5 rounded-2xl shadow-lg shadow-brand-primary/20 hover:shadow-xl hover:shadow-brand-primary/30 active:scale-[0.98] transition-all duration-300 group flex items-center justify-center gap-3">
                <span className="text-xs uppercase ">Влез в панела</span>
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-brand-dark transition-colors font-bold"
              >
                Назад към сайта
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );

  return (
    <div className="min-h-screen bg-brand-cream pt-30 md:pt-24 pb-5 px-4 md:px-6 font-sans text-brand-dark">
      <div className="max-w-4xl mx-auto space-y-6 md:space-y-12 text-left">
        <header className="flex justify-between items-center">
          <h1 className="font-display text-3xl md:text-5xl tracking-tighter">
            Админ{" "}
            <span className="text-brand-primary italic font-normal">панел</span>
          </h1>
          <button
            onClick={() => {
              setIsAuthenticated(false);
              navigate("/");
            }}
            className="text-gray-500 p-2 hover:text-brand-primary transition-colors flex gap-2 items-center"
          >
            Изход <LogOut size={20} />
          </button>
        </header>

        <section className="bg-brand-light rounded-[2rem] md:rounded-[3.5rem] shadow-sm border border-brand-light overflow-hidden">
          <form onSubmit={handleSaveNews}>
            <div className="p-5 md:p-10 space-y-6">
              <div className="space-y-3">
                <label className="font-sans text-gray-500 ml-4">
                  Водеща снимка
                </label>
                <div className="relative aspect-[16/9] md:aspect-[21/9] bg-white rounded-[2rem] overflow-hidden border-2 border-dashed border-brand-primary/10">
                  {formData.imagePreview ? (
                    <>
                      <img
                        src={
                          formData.imagePreview.startsWith("blob")
                            ? formData.imagePreview
                            : `${API_URL}${formData.imagePreview}`
                        }
                        className="w-full h-full object-cover"
                        alt=""
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            imageFile: null,
                            imagePreview: "",
                          })
                        }
                        className="absolute top-3 right-3 bg-brand-dark p-2 rounded-full text-white shadow-lg"
                      >
                        <X size={14} />
                      </button>
                    </>
                  ) : (
                    <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-brand-primary/20 transition-colors text-center">
                      <ImageIcon
                        size={24}
                        className="text-brand-primary/20 mb-1"
                      />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500">
                        Качи снимка
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
              <input
                required
                placeholder="Заглавие на статията..."
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="
    w-full px-6 py-5 rounded-2xl outline-none transition-all duration-300 border-2
    bg-white border-gray-100 text-gray shadow-lg
    focus:bg-white focus:border-brand-primary focus:text-gray-500 focus:shadow-lg
    font-sans text-xl md:text-3xl font-medium
  "
              />
            </div>

            <div className="relative bg-white rounded-2xl border border-brand-primary/10 shadow-sm overflow-hidden flex flex-col">
              {/* 1. Менюто стои фиксирано най-горе в контейнера */}
              <div className="sticky top-0 z-10 bg-gray-200 backdrop-blur-md border-b border-brand-primary/5">
                <MenuBar editor={editor} />
              </div>

              {/* 2. Зоната за писане с фиксирана максимална височина и вътрешен скрол */}
              {/* В AdminPanel.jsx под лентата с инструменти */}
              <div
                className="article-content prose prose-lg max-w-none p-6 md:p-14 overflow-y-auto custom-scrollbar"
                style={{ height: "600px", maxHeight: "70vh" }}
              >
                <EditorContent editor={editor} />
              </div>
            </div>
            <div className="p-5 md:p-10 border-t border-brand-primary/5 bg-brand-cream/5 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  placeholder="Текст на бутона"
                  value={formData.buttonText}
                  onChange={(e) =>
                    setFormData({ ...formData, buttonText: e.target.value })
                  }
                  className="
    w-full px-6 py-5 rounded-2xl outline-none transition-all duration-300 border-2
    bg-white border-gray-100 text-gray shadow-lg
    focus:bg-white focus:border-brand-primary focus:text-gray-500 focus:shadow-lg
    font-sans text-xl md:text-3xl font-medium
  "
                />
                <input
                  placeholder="Линк на бутона"
                  value={formData.buttonLink}
                  onChange={(e) =>
                    setFormData({ ...formData, buttonLink: e.target.value })
                  }
                  className="
    w-full px-6 py-5 rounded-2xl outline-none transition-all duration-300 border-2
    bg-white border-gray-100 text-gray shadow-lg
    focus:bg-white focus:border-brand-primary focus:text-gray-500 focus:shadow-lg
    font-sans text-xl md:text-3xl font-medium
  "
                />
              </div>
              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-3"
              >
                <Save size={18} />{" "}
                {editingId ? "Обнови статията" : "Публикувай статията"}
              </button>
            </div>
          </form>
        </section>

        {/* АРХИВ */}
        <div className="grid gap-3 pt-6">
          <h3 className="font-display text-xl md:text-2xl ml-2">
            Архив статии
          </h3>
          <div className="space-y-3 pb-10">
            {news.map((n) => (
              <div
                key={n.id}
                className="bg-white p-3 md:p-4 rounded-[2rem] border border-brand-light flex items-center justify-between hover:border-brand-primary/20 transition-all shadow-sm"
              >
                <div className="flex items-center gap-3 md:gap-4 overflow-hidden text-left">
                  {n.image && (
                    <img
                      src={`${API_URL}${n.image}`}
                      className="w-12 h-12 rounded-xl object-cover shrink-0 shadow-sm"
                      alt=""
                    />
                  )}
                  <div className="truncate pr-2">
                    <p className="text-sm md:text-base text-brand-dark truncate font-medium">
                      {n.title}
                    </p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                      {n.date}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={() => {
                      setEditingId(n.id);
                      setFormData({
                        title: n.title,
                        buttonText: n.buttonText || "",
                        buttonLink: n.buttonLink || "",
                        imagePreview: n.image,
                        imageFile: null,
                      });
                      editor.commands.setContent(n.text);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="p-2 text-brand-primary hover:bg-brand-cream rounded-lg transition-all"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(n.id)}
                    className="p-2 text-red-300 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .ProseMirror { 
          outline: none !important; 
          min-height: 400px; 
          white-space: pre-wrap !important; 
          font-family: 'Montserrat', sans-serif;
          color: #4b5563; /* text-gray-600 */
          font-size: 1rem;
        }
        
        .ProseMirror p { margin-bottom: 1.2rem; }
        
        .ProseMirror h2 { 
          font-family: "Cormorant Infant", serif; 
          font-size: 2rem;
          font-weight: 500;
          color: #003f00;
          line-height: 1.2;
          margin-top: 2rem;
        }

        .ProseMirror img { border-radius: 1.5rem; margin: 2rem auto; display: block; max-width: 80%; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .ProseMirror ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; }
        .ProseMirror ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1.5rem; }
        .ProseMirror blockquote { border-left: 4px solid #74ab1a; padding-left: 1.5rem; font-style: italic; color: #666; margin: 2rem 0; }
  
      `,
        }}
      />
    </div>
  );
};

export default AdminPanel;

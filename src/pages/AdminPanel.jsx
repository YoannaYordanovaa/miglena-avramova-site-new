import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import EmojiPicker from "emoji-picker-react";
import { useNavigate } from "react-router-dom"; // Добави това
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

  // Затваряне при клик извън пикъра
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };
    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showEmojiPicker]);

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
      <div className="sticky top-4 z-[100] border-b border-brand-primary/10 bg-brand-light/95 backdrop-blur-md shadow-sm">
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
            title="Качи снимка"
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

      {/* МОБИЛНО ОПТИМИЗИРАН ПИКЪР (ИЗВЪН STICKY ЛЕНТАТА) */}
      <AnimatePresence>
        {showEmojiPicker && (
          <>
            {/* Затъмняващ фон */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEmojiPicker(false)}
              className="fixed inset-0 bg-brand-dark/20 backdrop-blur-sm z-[200]"
            />
            {/* Самият Пикър */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              ref={emojiPickerRef}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[201] w-[90vw] max-w-[350px]"
            >
              <div className="bg-brand-light rounded-3xl shadow-2xl overflow-hidden border border-brand-primary/10">
                <div className="flex justify-between items-center p-4 border-b border-brand-cream bg-brand-light">
                  <span className="font-display italic text-brand-dark">
                    Емотикони
                  </span>
                  <button
                    onClick={() => setShowEmojiPicker(false)}
                    className="p-1 hover:bg-brand-cream rounded-full"
                  >
                    <X size={20} />
                  </button>
                </div>
                <EmojiPicker
                  onEmojiClick={(emoji) => {
                    editor.chain().focus().insertContent(emoji.emoji).run();
                    setShowEmojiPicker(false);
                  }}
                  theme="light"
                  width="100%"
                  height={400}
                  skinTonesDisabled
                  searchPlaceholder="Търси..."
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
    image: "",
    buttonText: "",
    buttonLink: "",
  });
  const navigate = useNavigate();
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Увери се, че тези НЕ са изключени (по подразбиране са включени в StarterKit)
        bulletList: true,
        orderedList: true,
        blockquote: true,
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

  useEffect(() => {
    const saved = localStorage.getItem("miglena_news");
    if (saved) setNews(JSON.parse(saved));
  }, []);

  const handleSaveNews = (e) => {
    e.preventDefault();
    const htmlContent = editor.getHTML();
    if (!formData.title) return alert("Заглавието е задължително!");

    let updatedNews;
    const currentData = { ...formData, text: htmlContent };

    if (editingId) {
      updatedNews = news.map((n) =>
        n.id === editingId ? { ...n, ...currentData } : n
      );
      setEditingId(null);
    } else {
      const newEntry = {
        id: Date.now(),
        ...currentData,
        date: new Date().toLocaleDateString("bg-BG"),
      };
      updatedNews = [newEntry, ...news];
    }
    setNews(updatedNews);
    localStorage.setItem("miglena_news", JSON.stringify(updatedNews));
    setFormData({ title: "", image: "", buttonText: "", buttonLink: "" });
    editor.commands.setContent("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isAuthenticated)
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center px-4 italic">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // Вземаме паролата от системните настройки
            const securePassword = import.meta.env.VITE_ADMIN_PASSWORD;

            if (password === securePassword) {
              setIsAuthenticated(true); // Трябва да е IsAuthenticated, а не IsLoggedIn
              localStorage.setItem("isLoggedIn", "true");
            } else {
              alert("Грешна парола!");
            }
          }}
          className="bg-brand-light p-10 rounded-[2.5rem] shadow-2xl max-w-sm w-full space-y-6"
        >
          <h2 className="font-display text-2xl text-center text-brand-dark leading-none">
            Вход
          </h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-brand-cream px-6 py-4 rounded-xl outline-none text-center border-none"
            placeholder="Парола"
          />
          <button className="btn-primary w-full py-4 text-[10px] font-bold">
            Влез
          </button>
        </form>
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
              setIsAuthenticated(false); // Деактивира сесията
              navigate("/"); // Пренасочва към заглавната страница
            }}
            className="text-gray-400 p-2 hover:text-brand-primary transition-colors flex gap-2 justify-center align-middle"
          >
            {" "}
            Изход
            <LogOut size={20} />
          </button>
        </header>

        <section className="bg-brand-light rounded-[2rem] md:rounded-[3.5rem] shadow-sm border border-brand-light">
          <form onSubmit={handleSaveNews}>
            <div className="p-5 md:p-10 space-y-6">
              <div className="space-y-3">
                <label className=" font-sans tracking-widest text-gray-400 ml-4 py-4 ">
                  Водеща снимка
                </label>
                <div className="relative aspect-[16/9] md:aspect-[21/9] bg-brand-cream rounded-[2rem] overflow-hidden border-2 border-dashed border-brand-primary/10">
                  {formData.image ? (
                    <>
                      <img
                        src={formData.image}
                        className="w-full h-full object-cover"
                        alt=""
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, image: "" })}
                        className="absolute top-3 right-3 bg-brand-dark p-2 rounded-full text-white shadow-lg"
                      >
                        <X size={14} />
                      </button>
                    </>
                  ) : (
                    <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-brand-primary/5 transition-colors p-4 text-center">
                      <ImageIcon
                        size={24}
                        className="text-brand-primary/20 mb-1"
                      />
                      <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-gray-400">
                        Качи снимка
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () =>
                              setFormData({
                                ...formData,
                                image: reader.result,
                              });
                            reader.readAsDataURL(file);
                          }
                        }}
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
                className="w-full px-5 py-3 rounded-xl  bg-brand-cream border-b border-brand-primary/10 font-sans text-xl md:text-3xl outline-none focus:border-brand-primary transition-all"
              />
            </div>

            <div className="relative bg-brand-light border-t border-brand-primary/5">
              <MenuBar editor={editor} />
              <div className="prose prose-sm max-w-none p-5 md:p-14 min-h-[400px]">
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
                  className="w-full bg-brand-cream px-5 py-3 rounded-xl outline-none text-sm border border-brand-primary/5"
                />
                <input
                  placeholder="Линк на бутона"
                  value={formData.buttonLink}
                  onChange={(e) =>
                    setFormData({ ...formData, buttonLink: e.target.value })
                  }
                  className="w-full bg-brand-cream px-5 py-3 rounded-xl outline-none text-sm border border-brand-primary/5"
                />
              </div>
              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-3"
              >
                <Save size={18} /> Публикувай статията
              </button>
            </div>
          </form>
        </section>

        {/* АРХИВ */}
        <div className="grid gap-3 pt-6">
          <h3 className="font-display text-xl md:text-2xl ml-2">Архив</h3>
          <div className="space-y-3">
            {news.map((n) => (
              <div
                key={n.id}
                className="bg-brand-light p-3 md:p-6 rounded-[2rem] md:rounded-[2.5rem] border border-brand-light flex items-center justify-between hover:border-brand-primary/20 transition-all shadow-sm"
              >
                <div className="flex items-center gap-3 md:gap-6 overflow-hidden text-left">
                  {n.image && (
                    <img
                      src={n.image}
                      className="w-10 h-10 md:w-16 md:h-16 rounded-lg md:rounded-2xl object-cover shrink-0 shadow-sm"
                      alt=""
                    />
                  )}
                  <div className="truncate pr-2">
                    <p className=" text-sm md:text-lg text-brand-dark truncate mb-0.5">
                      {n.title}
                    </p>
                    <p className="text-[10px] md:text-[10px] text-gray-400 uppercase tracking-widest">
                      {n.date}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 md:gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setEditingId(n.id);
                      setFormData(n);
                      editor.commands.setContent(n.text);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="p-2.5 md:p-4 bg-brand-cream text-brand-primary rounded-xl md:rounded-2xl hover:bg-brand-primary hover:text-white transition-all"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("Изтриване?")) {
                        setNews(news.filter((x) => x.id !== n.id));
                        localStorage.setItem(
                          "miglena_news",
                          JSON.stringify(news.filter((x) => x.id !== n.id))
                        );
                      }
                    }}
                    className="p-2.5 md:p-4 text-red-300 hover:bg-red-50 rounded-xl md:rounded-2xl transition-all"
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
        .ProseMirror { outline: none !important; min-height: 400px; font-size: 1rem; md:font-size: 1.2rem; line-height: 1; color: #444; font-family: 'Montserrat', sans-serif; font-weight: 300; }
        .ProseMirror p { margin-bottom: 1.2rem; }
        .ProseMirror h2 { font-family: 'Literata', serif; font-size: 1.8rem; md:font-size: 2.5rem; color: #003f00; margin-top: 2rem; margin-bottom: 1rem; }
        .ProseMirror img { border-radius: 1rem; md:border-radius: 2rem; margin: 1.5rem auto; border: 2px solid white; box-shadow: 0 10px 30px rgba(0,0,0,0.1); max-width: 60%; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        /* Добави това в <style> тага в края на AdminPanel.jsx */
.ProseMirror ul { 
  list-style-type: disc !important; 
  padding-left: 1.5rem !important; 
  margin-bottom: 1rem;
}

.ProseMirror ol { 
  list-style-type: decimal !important; 
  padding-left: 1.5rem !important; 
  margin-bottom: 1rem;
}

.ProseMirror blockquote { 
  border-left: 4px solid #74ab1a !important; /* Твоето brand-primary зелено */
  padding-left: 1rem !important; 
  font-style: italic !important;
  color: #666 !important;
  margin: 1.5rem 0 !important;
}
      `,
        }}
      />
    </div>
  );
};

export default AdminPanel;

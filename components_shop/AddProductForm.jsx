"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import createProduct from "@/actions_shop/createProduct";
import toast from "react-hot-toast";
import Image from "next/image";
import {
  X,
  Loader2,
  ImagePlus,
  Trash2,
  Search,
  Check,
  ChevronDown,
  Star,
} from "lucide-react";

export default function AddProductForm({ categories }) {
  const router = useRouter();

  // 1. الصور (أول عنصر في الفورم + حد أقصى 5 صور)
  const [images, setImages] = useState([]); // [{ id, url, uploading, preview, isThumbnail }]
  const imagesInputRef = useRef(null);
  const MAX_IMAGES = 5;

  // 2. باقي حقول الفورم
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");

  // التصنيف — بحث واختيار مخصص
  const [categorySearch, setCategorySearch] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoryRef = useRef(null);

  // حالة إنشاء المنتج
  const [isSubmitting, setIsSubmitting] = useState(false);

  // إغلاق dropdown عند الضغط بالخارج
  useEffect(() => {
    function handleClickOutside(e) {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setIsCategoryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedCategory = categories?.find((c) => c.id === categoryId);
  const filteredCategories = (categories || []).filter((cat) =>
    cat.nickName.toLowerCase().includes(categorySearch.toLowerCase()),
  );

  // رفع صورة إلى Supabase Storage
  async function uploadToSupabase(file) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error } = await supabase.storage
      .from("product-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from("product-images").getPublicUrl(filePath);

    return publicUrl;
  }

  // حذف صورة من Supabase Storage
  async function deleteFromSupabase(url) {
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split("/product-images/");
      if (pathParts.length > 1) {
        const filePath = pathParts[1];
        await supabase.storage.from("product-images").remove([filePath]);
      }
    } catch (err) {
      console.error("Error deleting from storage:", err);
    }
  }

  // التعامل مع اختيار الصور (أقصى عدد 5)
  async function handleImagesSelect(e) {
    const allFiles = Array.from(e.target.files || []);
    if (allFiles.length === 0) return;

    const availableSlots = MAX_IMAGES - images.length;
    if (availableSlots <= 0) {
      toast.error(`الحد الأقصى ${MAX_IMAGES} صور فقط`);
      if (imagesInputRef.current) imagesInputRef.current.value = "";
      return;
    }

    const filesToUpload = allFiles.slice(0, availableSlots);
    if (allFiles.length > availableSlots) {
      toast.error(`تم اختيار أول ${availableSlots} صور فقط لتخطي الحد الأقصى`);
    }

    for (const file of filesToUpload) {
      const tempId = crypto.randomUUID();
      const previewUrl = URL.createObjectURL(file);

      setImages((prev) => {
        const hasThumbnail = prev.some((img) => img.isThumbnail);
        return [
          ...prev,
          {
            id: tempId,
            url: previewUrl,
            uploading: true,
            preview: true,
            isThumbnail: !hasThumbnail && prev.length === 0,
          },
        ];
      });

      uploadToSupabase(file)
        .then((publicUrl) => {
          URL.revokeObjectURL(previewUrl);
          setImages((prev) =>
            prev.map((img) =>
              img.id === tempId
                ? { ...img, url: publicUrl, uploading: false, preview: false }
                : img,
            ),
          );
        })
        .catch(() => {
          URL.revokeObjectURL(previewUrl);
          setImages((prev) => {
            const filtered = prev.filter((img) => img.id !== tempId);
            const wasThumb = prev.find((img) => img.id === tempId)?.isThumbnail;
            if (wasThumb && filtered.length > 0) {
              filtered[0] = { ...filtered[0], isThumbnail: true };
            }
            return filtered;
          });
          toast.error("فشل رفع صورة");
        });
    }

    if (imagesInputRef.current) imagesInputRef.current.value = "";
  }

  // حذف صورة
  async function handleImageDelete(imageToDelete) {
    if (imageToDelete.uploading) {
      if (imageToDelete.preview) URL.revokeObjectURL(imageToDelete.url);
    } else if (imageToDelete.url && !imageToDelete.preview) {
      await deleteFromSupabase(imageToDelete.url);
    }

    setImages((prev) => {
      const filtered = prev.filter((img) => img.id !== imageToDelete.id);
      if (imageToDelete.isThumbnail && filtered.length > 0) {
        filtered[0] = { ...filtered[0], isThumbnail: true };
      }
      return filtered;
    });
  }

  // تعيين صورة كـ Thumbnail
  function setAsThumbnail(imageId) {
    setImages((prev) =>
      prev.map((img) => ({
        ...img,
        isThumbnail: img.id === imageId,
      })),
    );
  }

  function resetForm() {
    setTitle("");
    setPrice("");
    setCategoryId("");
    setDescription("");
    setImages([]);
    setCategorySearch("");
    setIsCategoryOpen(false);
    setIsSubmitting(false);
    if (imagesInputRef.current) imagesInputRef.current.value = "";
  }

  // تنسيق الأرقام بالفواصل
  const formatNumberWithCommas = (val) => {
    if (!val) return "";
    const clean = val.toString().replace(/,/g, "");
    if (clean === "") return "";
    const [intPart, decPart] = clean.split(".");
    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return decPart !== undefined ? `${formattedInt}.${decPart}` : formattedInt;
  };

  // التحكم في السعر (حد أقصى 8 أرقام مع فواصل وبدون تحويل تلقائي)
  const handlePriceChange = (e) => {
    let val = e.target.value.replace(/,/g, "");
    if (val === "") {
      setPrice("");
      return;
    }

    // السماح فقط بالأرقام والنقطة العشرية
    if (!/^\d*\.?\d*$/.test(val)) return;

    const [intPart, decPart] = val.split(".");
    let formattedInt = intPart || "";
    // الاكتفاء بـ 8 أرقام فقط وتجاهل أي رقم زيادة
    if (formattedInt.length > 8) {
      formattedInt = formattedInt.slice(0, 8);
    }

    let rawVal =
      decPart !== undefined
        ? `${formattedInt}.${decPart.slice(0, 2)}`
        : formattedInt;

    setPrice(formatNumberWithCommas(rawVal));
  };

  // تقديم الفورم
  async function handleSubmit(e) {
    e.preventDefault();

    if (images.length === 0) return toast.error("أضف صورة واحدة على الأقل");
    const thumbnailImg = images.find((img) => img.isThumbnail);
    if (!thumbnailImg) return toast.error("اختر صورة مصغرة للمنتج");

    const rawPrice = price.replace(/,/g, "");
    const priceNum = parseFloat(rawPrice);

    if (!categoryId) return toast.error("اختر تصنيف المنتج");
    if (!title.trim()) return toast.error("عنوان المنتج مطلوب");
    if (!rawPrice || isNaN(priceNum) || priceNum <= 0)
      return toast.error("السعر يجب أن يكون أكبر من صفر");
    if (description.trim() === "") return toast.error("وصف المنتج مطلوب");

    const stillUploading = images.some((img) => img.uploading);
    if (stillUploading) return toast.error("استنى لما كل الصور تخلص رفع");

    setIsSubmitting(true);

    try {
      const imageUrls = images
        .filter((img) => !img.isThumbnail)
        .map((img) => img.url);

      const result = await createProduct({
        title: title.trim(),
        price: rawPrice,
        categoryId,
        description: description.trim(),
        thumbnail: thumbnailImg.url,
        imageUrls,
      });

      if (result.success) {
        resetForm();
        router.push(`/product/${result.productId}?new=true`);
      } else {
        toast.error(result.error || "حدث خطأ أثناء إنشاء المنتج");
        setIsSubmitting(false);
      }
    } catch {
      toast.error("حدث خطأ غير متوقع");
      setIsSubmitting(false);
    }
  }

  const anyUploading = images.some((img) => img.uploading);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-4 sm:p-6 space-y-8 pb-20"
    >
      <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100 text-center mb-8">
        إضافة منتج جديد
      </h1>

      {/* ===================== 1. الصور (أول قسم) ===================== */}
      <div className="space-y-4 bg-zinc-900/50 p-5 rounded-2xl border border-zinc-800">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-semibold text-zinc-200">
            صور المنتج <span className="text-red-400">*</span>
            <span className="block text-xs font-normal text-zinc-500 mt-1">
              (اضغط على النجمة لتعيين الصورة الأساسية - الحد الأقصى {MAX_IMAGES}{" "}
              صور)
            </span>
          </label>
          <span className="text-xs font-medium px-2.5 py-1 bg-zinc-800 text-amber-400 rounded-full">
            {images.length} / {MAX_IMAGES}
          </span>
        </div>

        <div className="flex flex-wrap gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden border-2 group transition-all ${
                img.isThumbnail
                  ? "border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                  : "border-zinc-700 hover:border-zinc-500"
              }`}
            >
              <Image
                src={img.url}
                alt="صورة المنتج"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 112px, 128px"
                unoptimized={img.preview}
              />

              {/* Loading overlay */}
              {img.uploading && (
                <div className="absolute inset-0 bg-zinc-900/80 flex flex-col items-center justify-center gap-2">
                  <Loader2 className="w-6 h-6 text-amber-400 animate-spin" />
                  <span className="text-[10px] text-zinc-300 font-medium">
                    جاري الرفع...
                  </span>
                </div>
              )}

              {/* badge الصورة الأساسية */}
              {img.isThumbnail && !img.uploading && (
                <div className="absolute bottom-0 inset-x-0 bg-amber-500/90 text-black text-[11px] font-bold py-1 text-center backdrop-blur-sm z-10">
                  الصورة الأساسية
                </div>
              )}

              {/* Overlay عند הـ Hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* زر تعيين كـ thumbnail */}
              {!img.isThumbnail && !img.uploading && (
                <button
                  type="button"
                  onClick={() => setAsThumbnail(img.id)}
                  disabled={isSubmitting}
                  className="absolute top-2 right-2 z-10 bg-zinc-800 hover:bg-amber-500 text-zinc-400 hover:text-black rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-lg"
                  title="تعيين كصورة أساسية"
                >
                  <Star className="w-4 h-4" />
                </button>
              )}

              {/* زر الحذف */}
              <button
                type="button"
                onClick={() => handleImageDelete(img)}
                disabled={isSubmitting}
                className="absolute top-2 left-2 z-10 bg-red-500/90 hover:bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-lg"
                title={img.uploading ? "إلغاء الرفع" : "حذف الصورة"}
              >
                {img.uploading ? (
                  <X className="w-3.5 h-3.5" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
              </button>
            </div>
          ))}

          {/* زر إضافة صور */}
          {images.length < MAX_IMAGES && (
            <button
              type="button"
              onClick={() => imagesInputRef.current?.click()}
              disabled={isSubmitting}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl border-2 border-dashed border-zinc-700 bg-zinc-800/30 hover:bg-zinc-800/80 hover:border-amber-500/50 flex flex-col items-center justify-center gap-2 text-zinc-500 hover:text-amber-400 transition-all cursor-pointer group"
            >
              <div className="bg-zinc-800 p-2.5 rounded-full group-hover:scale-110 transition-transform">
                <ImagePlus className="w-6 h-6" />
              </div>
              <span className="text-[13px] font-medium">أضف صور</span>
            </button>
          )}
        </div>

        <input
          ref={imagesInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleImagesSelect}
          className="hidden"
        />
      </div>

      {/* ===================== 2. التصنيف (Custom Select with Custom Scrollbar) ===================== */}
      <div className="space-y-2" ref={categoryRef}>
        <label className="block text-sm font-medium text-zinc-300">
          التصنيف <span className="text-red-400">*</span>
        </label>

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setIsCategoryOpen((prev) => !prev);
              setCategorySearch("");
            }}
            disabled={isSubmitting}
            className={`w-full px-4 py-3.5 rounded-xl bg-zinc-900 border text-right focus:outline-none transition-all flex items-center justify-between cursor-pointer ${
              isCategoryOpen
                ? "border-amber-500 ring-1 ring-amber-500/50"
                : "border-zinc-700 hover:border-zinc-600"
            }`}
          >
            <span
              className={
                selectedCategory ? "text-zinc-100 font-medium" : "text-zinc-500"
              }
            >
              {selectedCategory
                ? selectedCategory.nickName
                : "اختر التصنيف من القائمة..."}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${
                isCategoryOpen ? "rotate-180 text-amber-500" : ""
              }`}
            />
          </button>

          {isCategoryOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              {/* حقل البحث */}
              <div className="p-3 border-b border-zinc-800 bg-zinc-900/90 backdrop-blur-sm">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    value={categorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                    placeholder="ابحث عن تصنيف..."
                    className="w-full pr-9 pl-3 py-2.5 rounded-lg bg-zinc-800/50 border border-zinc-700 text-zinc-100 text-sm placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-zinc-800 transition-colors"
                    autoFocus
                  />
                </div>
              </div>

              {/* قائمة التصنيفات مع Custom Scrollbar */}
              <div className="max-h-60 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-zinc-900 [&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-zinc-600">
                {filteredCategories.length > 0 ? (
                  <div className="p-1.5">
                    {filteredCategories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setCategoryId(cat.id);
                          setIsCategoryOpen(false);
                          setCategorySearch("");
                        }}
                        className={`w-full px-3 py-3 text-sm text-right flex items-center justify-between rounded-lg transition-all cursor-pointer ${
                          categoryId === cat.id
                            ? "bg-amber-500/10 text-amber-400 font-bold"
                            : "text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
                        }`}
                      >
                        <span>{cat.nickName}</span>
                        {categoryId === cat.id && (
                          <Check className="w-4 h-4 text-amber-400" />
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-8 text-sm text-zinc-500 text-center flex flex-col items-center gap-2">
                    <Search className="w-6 h-6 opacity-20" />
                    <span>مفيش تصنيف بالاسم ده</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ===================== 3. عنوان المنتج ===================== */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-zinc-300">
          عنوان المنتج <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="مثال: خاتم ذهب عيار 21"
          className="w-full px-4 py-3.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all hover:border-zinc-600"
          disabled={isSubmitting}
        />
      </div>

      {/* ===================== 4. السعر ===================== */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-zinc-300">
          السعر (ج.م) <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          inputMode="decimal"
          value={price}
          onChange={handlePriceChange}
          placeholder="مثال: 1,500"
          className="w-full px-4 py-3.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all hover:border-zinc-600"
          disabled={isSubmitting}
        />
      </div>

      {/* ===================== 5. الوصف ===================== */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-zinc-300">
          وصف المنتج <span className="text-red-400">*</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="اكتب وصف تفصيلي للمنتج (المقاسات، الوزن، العيار، الخ...)"
          rows={5}
          className="w-full px-4 py-3.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all resize-none hover:border-zinc-600 leading-relaxed"
          disabled={isSubmitting}
        />
      </div>

      {/* ===================== زر الإنشاء ===================== */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting || anyUploading}
          className="w-full py-4 rounded-xl font-bold text-lg text-black bg-amber-400 hover:bg-amber-500 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 transition-all flex items-center justify-center gap-3 shadow-xl shadow-amber-500/10 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>جاري إنشاء المنتج والتسجيل...</span>
            </>
          ) : anyUploading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>انتظر اكتمال رفع الصور...</span>
            </>
          ) : (
            <span>إنشاء المنتج ونشره</span>
          )}
        </button>
      </div>
    </form>
  );
}

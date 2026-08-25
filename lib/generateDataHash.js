// دالة بصمة خفيفة جداً وسريعة للغاية
export default function generateDataHash(data) {
  if (!data) return "";
  try {
    // 1. تحويل الـ Object أو الـ Array لنص
    const strData = typeof data === "string" ? data : JSON.stringify(data);

    // 2. تطبيق خوارزمية الهاش السريعة (32-bit Bitwise Hash)
    let hash = 5381;
    for (let i = 0; i < strData.length; i++) {
      // ضرب الهاش في 33 وإضافة القيمة الرقمية للحرف (ASCII Code)
      hash = (hash * 33) ^ strData.charCodeAt(i);
    }

    // 3. تحويل الرقم الناتج لنص صغير من حروف وأرقام (Base36)
    return (hash >>> 0).toString(36); // بيرجع بصمة فريدة زي "3m2k8x"
  } catch {
    return "";
  }
}

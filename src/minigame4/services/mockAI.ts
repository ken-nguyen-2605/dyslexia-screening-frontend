// Hàm giả lập việc gửi ảnh lên Server để AI chấm điểm
export const checkHandwritingAI = async (
  imageBase64: string, 
  targetLetter: string
): Promise<boolean> => {
  
  // Log ra để bạn kiểm tra xem ảnh đã truyền xuống đây chưa
  console.log(`[MockAPI] Đang kiểm tra chữ: ${targetLetter}`);
  console.log(`[MockAPI] Dữ liệu ảnh (độ dài): ${imageBase64.length} ký tự`);

  // Giả lập độ trễ mạng (Network Latency) từ 0.5s - 1.5s cho giống thật
  const fakeLatency = 500 + Math.random() * 1000;

  return new Promise((resolve) => {
    setTimeout(() => {
      // LOGIC GIẢ LẬP:
      // 70% trả về TRUE (Đúng)
      // 30% trả về FALSE (Sai)
      const isCorrect = Math.random() > 0.3; 
      
      console.log(`[MockAPI] Kết quả trả về: ${isCorrect ? 'ĐÚNG' : 'SAI'}`);
      resolve(isCorrect);
    }, fakeLatency);
  });
};
const About = () => {
  const teamMembers = [
    { name: "Thành viên 1", role: "Frontend Developer" },
    { name: "Thành viên 2", role: "Backend Developer" },
    { name: "Thành viên 3", role: "UI/UX Designer" },
    { name: "Thành viên 4", role: "Data Analyst" },
    { name: "Thành viên 5", role: "Project Manager" },
  ];

  return (
    <div className="bg-gradient-to-br from-yellow-100 via-pink-100 to-cyan-100 min-h-screen py-12 px-4 sm:px-8 rounded-[1.5rem]">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-pink-600 leading-tight font-[Comic Sans MS,cursive,sans-serif] drop-shadow-md mb-6">
          Về Chúng Tôi
        </h1>
        <p className="text-lg text-pink-500 font-semibold max-w-3xl mx-auto">
          Chào mừng bạn đến với{" "}
          <span className="text-yellow-500 font-bold">DyslexiaBuddy</span> - Nền
          tảng sàng lọc chứng khó đọc (Dyslexia) dành cho trẻ em Việt Nam
        </p>
      </section>

      {/* Mission Section */}
      <section className="max-w-5xl mx-auto mb-16">
        <div className="bg-white/70 backdrop-blur-sm p-8 rounded-[2rem] shadow-xl border-4 border-pink-200">
          <h2 className="text-3xl font-extrabold text-green-500 mb-6 font-[Comic Sans MS,cursive,sans-serif] drop-shadow-md text-center">
            🎯 Sứ Mệnh Của Chúng Tôi
          </h2>
          <div className="space-y-4 text-gray-700 text-lg">
            <p>
              <span className="font-bold text-pink-600">Dyslexia</span> (chứng
              khó đọc) là một rối loạn học tập phổ biến, ảnh hưởng đến khả năng
              đọc, viết và đánh vần của trẻ. Tại Việt Nam, nhận thức về dyslexia
              còn rất hạn chế và việc chẩn đoán chính thức đòi hỏi chi phí cao,
              thiết bị chuyên dụng và đội ngũ chuyên gia.
            </p>
            <p>
              Chính vì vậy, chúng tôi đã phát triển{" "}
              <span className="font-bold text-yellow-500">DyslexiaBuddy</span> -
              một công cụ sàng lọc sơ bộ miễn phí, dễ tiếp cận, giúp phụ huynh
              và giáo viên nhận biết sớm các dấu hiệu của chứng khó đọc ở trẻ.
            </p>
          </div>
        </div>
      </section>

      {/* Why This Matters Section */}
      <section className="max-w-5xl mx-auto mb-16">
        <h2 className="text-3xl font-extrabold text-green-500 mb-8 font-[Comic Sans MS,cursive,sans-serif] drop-shadow-md text-center">
          💡 Tại Sao Điều Này Quan Trọng?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-yellow-200 p-6 rounded-[2rem] shadow-xl border-4 border-pink-200">
            <h3 className="font-bold text-xl text-blue-800 mb-3 font-[Comic Sans MS,cursive,sans-serif]">
              📊 Thực Trạng Tại Việt Nam
            </h3>
            <ul className="text-gray-700 space-y-2">
              <li>• Khoảng 5-10% trẻ em có thể mắc dyslexia</li>
              <li>• Nhận thức xã hội về dyslexia còn rất thấp</li>
              <li>• Thiếu công cụ sàng lọc bằng tiếng Việt</li>
              <li>• Chi phí chẩn đoán chính thức cao</li>
            </ul>
          </div>
          <div className="bg-pink-200 p-6 rounded-[2rem] shadow-xl border-4 border-yellow-200">
            <h3 className="font-bold text-xl text-green-700 mb-3 font-[Comic Sans MS,cursive,sans-serif]">
              ✨ Lợi Ích Phát Hiện Sớm
            </h3>
            <ul className="text-gray-700 space-y-2">
              <li>• Can thiệp kịp thời, hiệu quả hơn</li>
              <li>• Giảm áp lực tâm lý cho trẻ</li>
              <li>• Phương pháp học tập phù hợp hơn</li>
              <li>• Tăng cơ hội thành công trong học tập</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-5xl mx-auto mb-16">
        <h2 className="text-3xl font-extrabold text-green-500 mb-8 font-[Comic Sans MS,cursive,sans-serif] drop-shadow-md text-center">
          🎮 Cách Hoạt Động
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-cyan-200 p-6 rounded-[2rem] shadow-xl border-4 border-green-100 text-center">
            <div className="text-4xl mb-4">🎧</div>
            <h3 className="font-bold text-xl text-pink-700 mb-2 font-[Comic Sans MS,cursive,sans-serif]">
              Bài Test Thính Giác
            </h3>
            <p className="text-gray-700">
              Đánh giá khả năng phân biệt âm thanh và nhận diện ngữ âm
            </p>
          </div>
          <div className="bg-yellow-200 p-6 rounded-[2rem] shadow-xl border-4 border-pink-200 text-center">
            <div className="text-4xl mb-4">👁️</div>
            <h3 className="font-bold text-xl text-blue-800 mb-2 font-[Comic Sans MS,cursive,sans-serif]">
              Bài Test Thị Giác
            </h3>
            <p className="text-gray-700">
              Kiểm tra khả năng nhận diện hình ảnh và chữ cái
            </p>
          </div>
          <div className="bg-pink-200 p-6 rounded-[2rem] shadow-xl border-4 border-yellow-200 text-center">
            <div className="text-4xl mb-4">📖</div>
            <h3 className="font-bold text-xl text-green-700 mb-2 font-[Comic Sans MS,cursive,sans-serif]">
              Bài Test Ngôn Ngữ
            </h3>
            <p className="text-gray-700">
              Đánh giá kỹ năng đọc, viết và xử lý ngôn ngữ
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-5xl mx-auto mb-16">
        <h2 className="text-3xl font-extrabold text-green-500 mb-8 font-[Comic Sans MS,cursive,sans-serif] drop-shadow-md text-center">
          👨‍💻 Đội Ngũ Phát Triển
        </h2>
        <div className="bg-white/70 backdrop-blur-sm p-8 rounded-[2rem] shadow-xl border-4 border-cyan-200">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-pink-600 font-[Comic Sans MS,cursive,sans-serif]">
              Trường Đại học Bách Khoa
            </h3>
            <p className="text-lg text-gray-600 font-semibold">
              Đại học Quốc Gia TP. Hồ Chí Minh (HCMUT - VNU HCM)
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-pink-100 to-yellow-100 p-4 rounded-xl text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-pink-300 to-yellow-300 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl">
                  👤
                </div>
                <p className="font-bold text-gray-800 text-sm">{member.name}</p>
                <p className="text-xs text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="max-w-5xl mx-auto mb-16">
        <div className="bg-orange-100 p-6 rounded-[2rem] shadow-xl border-4 border-orange-300">
          <h2 className="text-2xl font-extrabold text-orange-600 mb-4 font-[Comic Sans MS,cursive,sans-serif] text-center">
            ⚠️ LƯU Ý QUAN TRỌNG
          </h2>
          <p className="text-gray-700 text-center">
            <span className="font-bold">DyslexiaBuddy</span> là công cụ{" "}
            <span className="font-bold text-orange-600">sàng lọc sơ bộ</span>,
            không thay thế cho việc chẩn đoán chuyên môn từ các chuyên gia tâm
            lý hoặc bác sĩ. Nếu kết quả cho thấy có dấu hiệu nghi ngờ, vui lòng
            liên hệ với các chuyên gia để được tư vấn và hỗ trợ thêm.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-5xl mx-auto text-center">
        <div className="bg-gradient-to-r from-pink-200 via-yellow-200 to-cyan-200 p-8 rounded-[2rem] shadow-xl border-4 border-white">
          <h2 className="text-2xl font-extrabold text-pink-600 mb-4 font-[Comic Sans MS,cursive,sans-serif]">
            📞 Liên Hệ
          </h2>
          <p className="text-gray-700 mb-2">
            Mọi thắc mắc hoặc đóng góp, vui lòng liên hệ:
          </p>
          <p className="text-lg font-bold text-blue-600">
            Đội ngũ phát triển tại HCMUT
          </p>
          <p className="text-gray-600 mt-2">
            268 Lý Thường Kiệt, Phường 14, Quận 10, TP. Hồ Chí Minh
          </p>
        </div>
      </section>

      {/* Footer */}
      <div className="text-center mt-12">
        <p className="text-pink-500 font-semibold">
          Được xây dựng với ❤️ bởi sinh viên HCMUT
        </p>
      </div>
    </div>
  );
};

export default About;

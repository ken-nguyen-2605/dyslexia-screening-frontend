import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  vi: {
    translation: {
      // Common
      "common": {
        "start": "Bắt đầu",
        "next": "Tiếp theo",
        "back": "Quay lại",
        "complete": "Hoàn thành",
        "exit": "Thoát",
        "home": "Trang chủ",
        "dashboard": "Bảng điều khiển",
        "about": "Giới thiệu",
        "contact": "Liên hệ",
        "yes": "Có",
        "no": "Không",
        "male": "Nam",
        "female": "Nữ",
        "submit": "Gửi",
        "cancel": "Hủy",
        "continue": "Tiếp tục",
        "save": "Lưu",
        "loading": "Đang tải...",
        "error": "Lỗi",
        "success": "Thành công"
      },
      
      // Navigation
      "nav": {
        "home": "Trang chủ",
        "about": "Giới thiệu",
        "tests": "Bài test",
        "dashboard": "Bảng điều khiển",
        "profile": "Hồ sơ",
        "login": "Đăng nhập",
        "register": "Đăng ký",
        "logout": "Đăng xuất"
      },

      // Home page
      "home": {
        "title": "Đọc dễ dàng hơn",
        "subtitle": "cùng DyslexiaCare",
        "description": "Phát hiện sớm khó khăn đọc viết và nhận hỗ trợ kịp thời cho trẻ em",
        "getStarted": "Bắt đầu ngay!",
        "whyChooseTitle": "Vì sao học cùng DyslexiaCare thật tuyệt?",
        "benefits": {
          "early": {
            "title": "Bắt đầu sớm!",
            "description": "Phát hiện khó khăn khi đọc sớm giúp hỗ trợ kịp thời và hiệu quả hơn."
          },
          "personalized": {
            "title": "Chỉ dành riêng cho bạn!",
            "description": "Các bài test được thiết kế phù hợp với từng độ tuổi và trình độ phát triển."
          },
          "fun": {
            "title": "Vui vẻ và thú vị!",
            "description": "Học tập qua trò chơi, tạo hứng thú và động lực cho trẻ em."
          }
        }
      },

      // Test selection
      "testSelection": {
        "title": "Chọn loại bài test",
        "subtitle": "Chọn bài test phù hợp với độ tuổi và nhu cầu của bạn",
        "quickTest": {
          "title": "Bài test nhanh",
          "subtitle": "(Cơ bản)",
          "time": "Thời gian: 10 phút",
          "description": "Sàng lọc cơ bản các khó khăn đọc viết phổ biến"
        },
        "detailedTest": {
          "title": "Bài test",
          "subtitle": "(Chuyên sâu)",
          "time": "Thời gian: 20 phút",
          "description": "Đánh giá chi tiết toàn diện các khía cạnh đọc viết"
        },
        "childTest": {
          "title": "Test cho trẻ 4-5 tuổi",
          "time": "Thời gian: 5 phút",
          "description": "Sàng lọc đặc biệt dành cho trẻ mầm non"
        }
      },

      // Human features form
      "humanForm": {
        "title": "Chia sẻ một chút nhé!",
        "step": "Bước 1 / 4: Thông tin của bạn",
        "name": "Tên",
        "namePlaceholder": "Nhập tên của bạn",
        "yearOfBirth": "Năm sinh",
        "yearPlaceholder": "Nhập năm sinh của bạn",
        "gender": "Giới tính",
        "hobby": "Sở thích",
        "hobbyPlaceholder": "Ví dụ: Đọc sách, chơi game, vẽ...",
        "errors": {
          "required": "Hãy nhập đầy đủ thông tin.",
          "invalidYear": "Vui lòng nhập năm sinh hợp lệ.",
          "sessionFailed": "Không thể bắt đầu phiên test. Vui lòng thử lại."
        }
      },

      // Test results
      "results": {
        "title": "🎉 Hoàn thành bài test!",
        "score": "Điểm số",
        "riskLevel": "Mức độ rủi ro",
        "time": "Thời gian",
        "timeTarget": "Mục tiêu: 5 phút",
        "moduleScores": "📊 Điểm từng module:",
        "recommendations": "📋 Khuyến nghị:",
        "viewHistory": "📊 Xem lịch sử test",
        "retakeTest": "🔄 Làm lại bài test",
        "riskLevels": {
          "low": "Rủi ro thấp",
          "medium": "Rủi ro trung bình",
          "high": "Rủi ro cao"
        },
        "suggestions": {
          "title": "💡 Gợi ý hỗ trợ",
          "failed25": "Kết quả cho thấy trẻ có thể gặp một số khó khăn trong việc đọc viết (25% khó khăn được phát hiện). Đây là mức độ nhẹ và có thể cải thiện được với sự hỗ trợ phù hợp.",
          "failed75": "Kết quả cho thấy trẻ gặp nhiều khó khăn trong việc đọc viết (75% khó khăn được phát hiện). Cần có sự can thiệp và hỗ trợ chuyên sâu từ các chuyên gia.",
          "recommendations": {
            "general": "• Tạo môi trường học tập tích cực và khuyến khích\n• Đọc sách cùng trẻ thường xuyên\n• Sử dụng phương pháp học đa giác quan",
            "mild": "• Luyện tập đọc từng từ một cách chậm rãi\n• Sử dụng các trò chơi về chữ cái và âm thanh\n• Theo dõi tiến bộ của trẻ hàng tuần",
            "severe": "• Tham vấn với chuyên gia về ngôn ngữ và học tập\n• Xem xét việc sử dụng các phương pháp hỗ trợ đặc biệt\n• Phối hợp với giáo viên để có kế hoạch hỗ trợ cá nhân\n• Kiên nhẫn và khuyến khích trẻ trong quá trình học"
          }
        }
      },

      // Test instructions
      "instructions": {
        "basic": {
          "title": "Hướng dẫn bài test cơ bản",
          "step": "Bước 2 / 4: Hướng dẫn",
          "modules": {
            "phonological": "Nhận thức âm vị",
            "phonologicalDesc": "Nhận biết và phân biệt âm thanh",
            "decoding": "Nhận diện chữ & giải mã",
            "decodingDesc": "Đọc và hiểu các từ đơn giản",
            "fluency": "Tốc độ hiểu",
            "fluencyDesc": "Đọc nhanh và hiểu ý nghĩa",
            "spelling": "Chính tả & viết",
            "spellingDesc": "Viết chính xác các từ",
            "language": "Hiểu và nhận dạng ngôn ngữ",
            "languageDesc": "Nhận biết và phân biệt ngôn ngữ"
          },
          "note": "Hãy đeo tai nghe hoặc bật âm thanh để nghe rõ các câu hỏi. Test sẽ tự động phát âm thanh khi bắt đầu mỗi câu hỏi."
        }
      },

      // Test questions
      "test": {
        "title": "Test Sàng lọc Dyslexia (4-5 tuổi)",
        "question": "Câu",
        "timeRecommendation": "⏱️ Thời gian khuyến nghị: 30 giây/câu",
        "totalTime": "🎯 Tổng thời gian: 5 phút",
        "playAudio": "🔊 Phát âm thanh",
        "playAgain": "Bấm để nghe lại",
        "imageAlt": "Hình ảnh câu hỏi",
        "finish": "🏁 Hoàn thành",
        "loading": "Đang tải bài test",
        "loadingQuestions": "Vui lòng đợi trong khi chúng tôi chuẩn bị các câu hỏi...",
        "errorLoading": "Lỗi tải bài test",
        "errorLoadingQuestions": "Không thể tải câu hỏi. Vui lòng thử lại.",
        "retry": "Thử lại"
      },

      // Footer
      "footer": {
        "description": "Giúp mọi trẻ em đều trở thành ngôi sao đọc hiểu!",
        "links": {
          "title": "Liên kết",
          "home": "Trang chủ",
          "about": "Giới thiệu",
          "support": "Hỗ trợ"
        },
        "social": {
          "title": "Mạng xã hội",
          "instagram": "Instagram",
          "linkedin": "LinkedIn",
          "twitter": "Twitter"
        },
        "newsletter": {
          "title": "Nhận tin mới",
          "placeholder": "Email của bạn",
          "button": "ĐĂNG KÝ"
        },
        "copyright": "© {{year}} Dyslexia Care · Được tạo bằng ❤️ cho trẻ em ở khắp mọi nơi"
      }
    }
  },
  en: {
    translation: {
      // Common
      "common": {
        "start": "Start",
        "next": "Next",
        "back": "Back",
        "complete": "Complete",
        "exit": "Exit",
        "home": "Home",
        "dashboard": "Dashboard",
        "about": "About",
        "contact": "Contact",
        "yes": "Yes",
        "no": "No",
        "male": "Male",
        "female": "Female",
        "submit": "Submit",
        "cancel": "Cancel",
        "continue": "Continue",
        "save": "Save",
        "loading": "Loading...",
        "error": "Error",
        "success": "Success"
      },

      // Navigation
      "nav": {
        "home": "Home",
        "about": "About",
        "tests": "Tests",
        "dashboard": "Dashboard",
        "profile": "Profile",
        "login": "Login",
        "register": "Register",
        "logout": "Logout"
      },

      // Home page
      "home": {
        "title": "Reading made easier",
        "subtitle": "with DyslexiaCare",
        "description": "Early detection of reading difficulties and timely support for children",
        "getStarted": "Get Started!",
        "whyChooseTitle": "Why learning with DyslexiaCare is awesome?",
        "benefits": {
          "early": {
            "title": "Start Early!",
            "description": "Early detection of reading difficulties helps provide timely and effective support."
          },
          "personalized": {
            "title": "Just for You!",
            "description": "Tests are designed to suit each age group and developmental level."
          },
          "fun": {
            "title": "Fun and Engaging!",
            "description": "Learning through games creates interest and motivation for children."
          }
        }
      },

      // Test selection
      "testSelection": {
        "title": "Choose Test Type",
        "subtitle": "Select a test that suits your age and needs",
        "quickTest": {
          "title": "Quick Test",
          "subtitle": "(Basic)",
          "time": "Time: 10 minutes",
          "description": "Basic screening for common reading difficulties"
        },
        "detailedTest": {
          "title": "Detailed Test",
          "subtitle": "(Comprehensive)",
          "time": "Time: 20 minutes",
          "description": "Comprehensive assessment of all reading aspects"
        },
        "childTest": {
          "title": "Test for 4-5 year olds",
          "time": "Time: 5 minutes",
          "description": "Special screening for preschool children"
        }
      },

      // Human features form
      "humanForm": {
        "title": "Tell us a bit about yourself!",
        "step": "Step 1 / 4: Your Information",
        "name": "Name",
        "namePlaceholder": "Enter your name",
        "yearOfBirth": "Year of Birth",
        "yearPlaceholder": "Enter your birth year",
        "gender": "Gender",
        "hobby": "Hobbies",
        "hobbyPlaceholder": "e.g., Reading books, gaming, drawing...",
        "errors": {
          "required": "Please fill in all information.",
          "invalidYear": "Please enter a valid birth year.",
          "sessionFailed": "Failed to start test session. Please try again."
        }
      },

      // Test results
      "results": {
        "title": "🎉 Test Completed!",
        "score": "Score",
        "riskLevel": "Risk Level",
        "time": "Time",
        "timeTarget": "Target: 5 minutes",
        "moduleScores": "📊 Module Scores:",
        "recommendations": "📋 Recommendations:",
        "viewHistory": "📊 View Test History",
        "retakeTest": "🔄 Retake Test",
        "riskLevels": {
          "low": "Low Risk",
          "medium": "Medium Risk",
          "high": "High Risk"
        },
        "suggestions": {
          "title": "💡 Support Suggestions",
          "failed25": "The results show the child may have some reading and writing difficulties (25% difficulties detected). This is a mild level and can be improved with appropriate support.",
          "failed75": "The results show the child has significant reading and writing difficulties (75% difficulties detected). Professional intervention and specialized support is needed.",
          "recommendations": {
            "general": "• Create a positive and encouraging learning environment\n• Read books with the child regularly\n• Use multi-sensory learning methods",
            "mild": "• Practice reading words slowly and carefully\n• Use letter and sound games\n• Monitor the child's progress weekly",
            "severe": "• Consult with language and learning specialists\n• Consider using special support methods\n• Coordinate with teachers for individual support plans\n• Be patient and encourage the child throughout the learning process"
          }
        }
      },

      // Test instructions
      "instructions": {
        "basic": {
          "title": "Basic Test Instructions",
          "step": "Step 2 / 4: Instructions",
          "modules": {
            "phonological": "Phonological Awareness",
            "phonologicalDesc": "Recognize and distinguish sounds",
            "decoding": "Word Recognition & Decoding",
            "decodingDesc": "Read and understand simple words",
            "fluency": "Understanding Speed",
            "fluencyDesc": "Read quickly and understand meaning",
            "spelling": "Spelling & Writing",
            "spellingDesc": "Write words correctly",
            "language": "Language Understanding & Recognition",
            "languageDesc": "Recognize and distinguish languages"
          },
          "note": "Please wear headphones or turn on audio to hear the questions clearly. The test will automatically play audio when starting each question."
        }
      },

      // Test questions
      "test": {
        "title": "Dyslexia Screening Test (4-5 years old)",
        "question": "Question",
        "timeRecommendation": "⏱️ Recommended time: 30 seconds/question",
        "totalTime": "🎯 Total time: 5 minutes",
        "playAudio": "🔊 Play Audio",
        "playAgain": "Click to play again",
        "imageAlt": "Question image",
        "finish": "🏁 Finish",
        "loading": "Loading test",
        "loadingQuestions": "Please wait while we prepare the questions...",
        "errorLoading": "Error loading test",
        "errorLoadingQuestions": "Failed to load questions. Please try again.",
        "retry": "Retry"
      },

      // Footer
      "footer": {
        "description": "Helping every child become a reading star!",
        "links": {
          "title": "Links",
          "home": "Home",
          "about": "About",
          "support": "Support"
        },
        "social": {
          "title": "Social Media",
          "instagram": "Instagram",
          "linkedin": "LinkedIn",
          "twitter": "Twitter"
        },
        "newsletter": {
          "title": "Get Updates",
          "placeholder": "Your email",
          "button": "SUBSCRIBE"
        },
        "copyright": "© {{year}} Dyslexia Care · Made with ❤️ for children everywhere"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'vi', // Default to Vietnamese
    lng: 'vi', // Default language
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

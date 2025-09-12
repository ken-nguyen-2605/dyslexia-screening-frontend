import React, { useState } from 'react';
import type { TreatmentCenter } from '../data/learningPlan';

interface TreatmentCentersDisplayProps {
  treatmentCenters: {
    north: TreatmentCenter[];
    central: TreatmentCenter[];
    south: TreatmentCenter[];
  };
}

const TreatmentCentersDisplay: React.FC<TreatmentCentersDisplayProps> = ({ 
  treatmentCenters 
}) => {
  const [activeRegion, setActiveRegion] = useState<'north' | 'central' | 'south'>('north');

  const regionLabels = {
    north: 'Miền Bắc',
    central: 'Miền Trung', 
    south: 'Miền Nam'
  };

  const regionIcons = {
    north: '🏔️',
    central: '🏝️',
    south: '🌴'
  };

  return (
    <div className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-6">
      <div className="text-center mb-6">
        <div className="text-4xl mb-3">🏥</div>
        <h2 className="text-2xl font-bold text-red-700 mb-2">
          Cơ sở điều trị Dyslexia uy tín
        </h2>
        <p className="text-gray-600 text-sm">
          Danh sách các bệnh viện và trung tâm chuyên khoa trên toàn quốc
        </p>
      </div>

      {/* Important message */}
      <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-2">
          <span className="text-red-600 text-lg">🚨</span>
          <div>
            <h5 className="font-medium text-red-800 mb-2">Khuyến nghị quan trọng:</h5>
            <p className="text-sm text-red-700 leading-relaxed">
              Kết quả test cho thấy trẻ cần được can thiệp chuyên sâu. Hãy liên hệ với các cơ sở 
              y tế dưới đây để được thăm khám và tư vấn điều trị từ các chuyên gia. 
              Can thiệp sớm sẽ giúp trẻ có cơ hội phục hồi tốt nhất.
            </p>
          </div>
        </div>
      </div>

      {/* Region tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(regionLabels).map(([region, label]) => (
          <button
            key={region}
            onClick={() => setActiveRegion(region as 'north' | 'central' | 'south')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
              activeRegion === region
                ? 'bg-red-600 text-white'
                : 'bg-white text-red-600 hover:bg-red-100'
            }`}
          >
            <span>{regionIcons[region as keyof typeof regionIcons]}</span>
            {label}
          </button>
        ))}
      </div>

      {/* Treatment centers list */}
      <div className="space-y-4">
        {treatmentCenters[activeRegion].map((center, index) => (
          <div key={index} className="bg-white/80 rounded-lg p-5 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-bold text-red-800">{center.name}</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                  {regionLabels[center.region]}
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-2">
                <span className="text-gray-500 text-sm mt-0.5">📍</span>
                <p className="text-sm text-gray-700">{center.address}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-sm">📞</span>
                <a 
                  href={`tel:${center.phone}`}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  {center.phone}
                </a>
              </div>

              {center.website && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-sm">🌐</span>
                  <a 
                    href={center.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Trang web chính thức
                  </a>
                </div>
              )}
            </div>

            {/* Specialties */}
            <div>
              <h4 className="text-sm font-medium text-gray-800 mb-2">🔬 Chuyên khoa:</h4>
              <div className="flex flex-wrap gap-2">
                {center.specialties.map((specialty, specialtyIndex) => (
                  <span 
                    key={specialtyIndex}
                    className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency contacts */}
      <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
        <h5 className="font-medium text-orange-800 mb-3 flex items-center gap-2">
          <span>📞</span>
          Đường dây tư vấn miễn phí:
        </h5>
        <div className="space-y-2 text-sm text-orange-700">
          <div>• <strong>Hotline tâm lý trẻ em:</strong> 1900-2087 (24/7)</div>
          <div>• <strong>Tư vấn giáo dục đặc biệt:</strong> 1900-1567</div>
          <div>• <strong>Hỗ trợ gia đình:</strong> 1900-9090</div>
        </div>
      </div>

      {/* Additional tips */}
      <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
        <h5 className="font-medium text-green-800 mb-3 flex items-center gap-2">
          <span>💡</span>
          Lời khuyên khi đến khám:
        </h5>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• Mang theo kết quả test này và các tài liệu học tập của trẻ</li>
          <li>• Chuẩn bị danh sách các khó khăn cụ thể trẻ gặp phải</li>
          <li>• Đặt trước lịch hẹn để tránh chờ đợi lâu</li>
          <li>• Chuẩn bị tâm lý tích cực và kiên nhẫn cho quá trình điều trị</li>
          <li>• Tham khảo ý kiến từ nhiều chuyên gia nếu cần thiết</li>
        </ul>
      </div>
    </div>
  );
};

export default TreatmentCentersDisplay;

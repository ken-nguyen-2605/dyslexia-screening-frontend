import React, { useState } from 'react';
import type { LearningPlan } from '../data/learningPlan';
import { LearningPlanService } from '../services/learningPlanService';

interface LearningPlanDisplayProps {
  learningPlans: LearningPlan[];
  weakestModules?: string[];
}

const LearningPlanDisplay: React.FC<LearningPlanDisplayProps> = ({ 
  learningPlans, 
  weakestModules 
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);

  const toggleWeek = (weekNumber: number) => {
    setExpandedWeek(expandedWeek === weekNumber ? null : weekNumber);
  };

  if (!learningPlans || learningPlans.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-6">
      <div className="text-center mb-6">
        <div className="text-4xl mb-3">📚</div>
        <h2 className="text-2xl font-bold text-blue-700 mb-2">
          Lộ trình học 4 tuần
        </h2>
        <p className="text-gray-600 text-sm">
          Được thiết kế riêng dựa trên kết quả test của bạn
        </p>
      </div>

      {/* Module tabs */}
      {learningPlans.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {learningPlans.map((plan, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === index
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-600 hover:bg-blue-100'
              }`}
            >
              {plan.title}
            </button>
          ))}
        </div>
      )}

      {/* Active learning plan */}
      <div className="space-y-4">
        <div className="bg-white/70 rounded-lg p-4">
          <h3 className="text-lg font-bold text-blue-800 mb-2">
            {learningPlans[activeTab].title}
          </h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            {learningPlans[activeTab].description}
          </p>
        </div>

        {/* Weeks */}
        <div className="space-y-3">
          {learningPlans[activeTab].weeks.map((week) => (
            <div key={week.week} className="bg-white/70 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleWeek(week.week)}
                className="w-full px-4 py-3 text-left hover:bg-blue-50 transition flex items-center justify-between"
              >
                <div>
                  <h4 className="font-semibold text-blue-800">
                    Tuần {week.week}: {week.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {week.goals.length} mục tiêu • {week.activities.length} hoạt động
                  </p>
                </div>
                <div className={`transform transition-transform ${
                  expandedWeek === week.week ? 'rotate-180' : ''
                }`}>
                  ⬇️
                </div>
              </button>

              {expandedWeek === week.week && (
                <div className="px-4 pb-4 space-y-4">
                  {/* Goals */}
                  <div>
                    <h5 className="font-medium text-gray-800 mb-2">🎯 Mục tiêu:</h5>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                      {week.goals.map((goal, index) => (
                        <li key={index}>{goal}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Activities */}
                  <div>
                    <h5 className="font-medium text-gray-800 mb-2">🏃‍♂️ Hoạt động:</h5>
                    <div className="space-y-3">
                      {week.activities.map((activity, index) => (
                        <div key={index} className="bg-blue-50 rounded-lg p-3">
                          <div className="flex justify-between items-start mb-2">
                            <h6 className="font-medium text-blue-800">{activity.name}</h6>
                            <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded">
                              {activity.duration}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{activity.description}</p>
                          {activity.materials && activity.materials.length > 0 && (
                            <div>
                              <span className="text-xs font-medium text-gray-600">Cần chuẩn bị: </span>
                              <span className="text-xs text-gray-600">
                                {activity.materials.join(', ')}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tips */}
                  <div>
                    <h5 className="font-medium text-gray-800 mb-2">💡 Lời khuyên:</h5>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                      {week.tips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Important notes */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <span className="text-yellow-600 text-lg">⚠️</span>
            <div>
              <h5 className="font-medium text-yellow-800 mb-2">Lưu ý quan trọng:</h5>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Thực hiện đều đặn mỗi ngày để đạt hiệu quả tốt nhất</li>
                <li>• Không nên vội vàng, hãy kiên nhẫn với quá trình phát triển của trẻ</li>
                <li>• Nếu cần hỗ trợ thêm, hãy tham khảo ý kiến chuyên gia giáo dục</li>
                <li>• Tạo môi trường học tập tích cực và vui vẻ</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Weakest modules info */}
        {weakestModules && weakestModules.length > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h5 className="font-medium text-orange-800 mb-2">
              🎯 Khu vực cần tập trung:
            </h5>
            <div className="text-sm text-orange-700">
              {weakestModules.map((module, index) => (
                <span key={module}>
                  {LearningPlanService.getModuleDisplayName(module as any)}
                  {index < weakestModules.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningPlanDisplay;

import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next';
import apiClient from '../services/apiClient';

interface EmailNotificationProps {
  testResult: any; // Replace with proper type
  userEmail?: string;
}

interface NotificationSettings {
  email: string;
  notificationType: 'daily' | 'weekly' | 'monthly';
  reminderTime: string; // Format: "HH:MM"
  enabled: boolean;
}

const EmailNotificationComponent: React.FC<EmailNotificationProps> = ({ 
  testResult, 
  userEmail 
}) => {
  // const { t } = useTranslation();
  const [settings, setSettings] = useState<NotificationSettings>({
    email: userEmail || '',
    notificationType: 'weekly',
    reminderTime: '09:00',
    enabled: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSettingsChange = (key: keyof NotificationSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      // This would call your backend API
      const response = await apiClient.post('/notifications/email-settings', {
        ...settings,
        testResultId: testResult?.id,
        failureLevel: getFailureLevel(testResult)
      });

      if (response.status === 200) {
        setMessage({
          type: 'success',
          text: settings.enabled 
            ? 'Email notifications have been set up successfully!' 
            : 'Email notifications have been disabled.'
        });
      }
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to save notification settings. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFailureLevel = (result: any) => {
    if (!result) return null;
    const totalQuestions = 10; // Adjust based on your test
    const wrongAnswers = totalQuestions - result.totalScore;
    
    if (wrongAnswers >= 7) return 'severe';
    if (wrongAnswers >= 3) return 'mild';
    return null;
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
      <div className="text-center mb-6">
        <div className="text-3xl mb-2">📧</div>
        <h3 className="text-xl font-bold text-blue-700 mb-2">
          Email Reminders & Follow-up
        </h3>
        <p className="text-gray-600 text-sm">
          Get personalized reminders and progress tracking via email
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Enable/Disable Toggle */}
        <div className="flex items-center justify-between p-4 bg-white rounded-lg">
          <div>
            <label className="font-semibold text-gray-700">Enable Email Notifications</label>
            <p className="text-sm text-gray-500">Receive follow-up emails and reminders</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.enabled}
              onChange={(e) => handleSettingsChange('enabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {settings.enabled && (
          <>
            {/* Email Input */}
            <div className="space-y-2">
              <label className="block font-semibold text-gray-700">Email Address</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleSettingsChange('email', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email address"
                required
              />
            </div>

            {/* Notification Frequency */}
            <div className="space-y-2">
              <label className="block font-semibold text-gray-700">Reminder Frequency</label>
              <div className="grid grid-cols-3 gap-2">
                {(['daily', 'weekly', 'monthly'] as const).map((type) => (
                  <label
                    key={type}
                    className={`p-3 border-2 rounded-lg cursor-pointer text-center transition-all ${
                      settings.notificationType === type
                        ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="notificationType"
                      value={type}
                      checked={settings.notificationType === type}
                      onChange={(e) => handleSettingsChange('notificationType', e.target.value)}
                      className="sr-only"
                    />
                    <div className="capitalize">{type}</div>
                  </label>
                ))}
              </div>
            </div>

            {/* Reminder Time */}
            <div className="space-y-2">
              <label className="block font-semibold text-gray-700">Preferred Time</label>
              <input
                type="time"
                value={settings.reminderTime}
                onChange={(e) => handleSettingsChange('reminderTime', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* What will be included */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-700 mb-2">What you'll receive:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Progress reminders and encouragement</li>
                <li>• Personalized learning tips based on test results</li>
                <li>• New exercise recommendations</li>
                <li>• Monthly progress summaries</li>
              </ul>
            </div>
          </>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
            isSubmitting
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isSubmitting ? 'Saving...' : 'Save Notification Settings'}
        </button>

        {/* Message Display */}
        {message && (
          <div className={`p-3 rounded-lg text-center ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-700 border border-green-200' 
              : 'bg-red-100 text-red-700 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
};

export default EmailNotificationComponent;

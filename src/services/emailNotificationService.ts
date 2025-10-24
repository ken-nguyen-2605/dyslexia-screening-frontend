/**
 * Email Notification Service API Documentation
 * 
 * This file documents the backend API endpoints that should be implemented
 * for the email notification system.
 * 
 * IMPLEMENTATION RECOMMENDATION: 
 * These endpoints should be implemented in your backend repository, not here.
 * This is for reference only.
 */

export interface EmailNotificationSettings {
  email: string;
  notificationType: 'daily' | 'weekly' | 'monthly';
  reminderTime: string; // Format: "HH:MM"
  enabled: boolean;
  testResultId?: number;
  failureLevel?: 'mild' | 'severe' | null;
}

export interface EmailScheduleRequest {
  userId: number;
  settings: EmailNotificationSettings;
  timezone?: string;
}

/**
 * Backend API Endpoints to Implement:
 * 
 * 1. POST /api/notifications/email-settings
 *    - Save user's email notification preferences
 *    - Schedule recurring emails based on frequency
 *    - Payload: EmailScheduleRequest
 * 
 * 2. GET /api/notifications/email-settings/:userId
 *    - Retrieve user's current notification settings
 *    - Returns: EmailNotificationSettings
 * 
 * 3. PUT /api/notifications/email-settings/:userId
 *    - Update existing notification settings
 *    - Payload: EmailNotificationSettings
 * 
 * 4. DELETE /api/notifications/email-settings/:userId
 *    - Disable/delete user's email notifications
 * 
 * 5. POST /api/notifications/send-immediate
 *    - Send immediate notification (e.g., test completion)
 *    - Payload: { userId: number, type: 'test_completion' | 'follow_up', data: any }
 */

/**
 * Backend Implementation Guide:
 * 
 * 1. Database Schema:
 *    - email_notifications table with columns:
 *      - id, user_id, email, notification_type, reminder_time, enabled, created_at, updated_at
 *    - email_schedules table for tracking scheduled sends
 *    - email_logs table for delivery tracking
 * 
 * 2. Email Service Setup:
 *    - Use services like SendGrid, AWS SES, or SMTP
 *    - Store credentials securely (environment variables)
 *    - Implement email templates for different notification types
 * 
 * 3. Scheduling System:
 *    - Use cron jobs or task queues (Redis/Celery for Python, Bull for Node.js)
 *    - Schedule based on user's timezone and preferred time
 *    - Handle retry logic for failed emails
 * 
 * 4. Email Content Based on Test Results:
 *    - For 'mild' failure (3-6 wrong): Encouraging tips, simple exercises
 *    - For 'severe' failure (7+ wrong): Professional resources, specialized support info
 *    - For good results: Maintenance tips, advanced challenges
 * 
 * 5. Security & Privacy:
 *    - Validate email addresses
 *    - Provide unsubscribe links in all emails
 *    - Store user consent and preferences
 *    - Implement rate limiting to prevent spam
 * 
 * 6. Monitoring:
 *    - Track email delivery rates
 *    - Monitor user engagement (opens, clicks)
 *    - Handle bounces and unsubscribes
 */

/**
 * Example Email Templates:
 * 
 * 1. Test Completion Email:
 *    Subject: "Your Dyslexia Screening Results - DyslexiaCare"
 *    Content: Result summary, next steps, encouragement
 * 
 * 2. Weekly Progress Reminder:
 *    Subject: "Time for Your Weekly Reading Practice! 📚"
 *    Content: Progress tips, new exercises, motivational content
 * 
 * 3. Follow-up After Poor Results:
 *    Subject: "Supporting Your Child's Reading Journey"
 *    Content: Professional resources, local support groups, parent guides
 */

// Frontend service for calling the backend API
const emailNotificationService = {
  async saveSettings(settings: EmailNotificationSettings) {
    // This calls your backend API
    const response = await fetch('/api/notifications/email-settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    return response.json();
  },

  async getSettings(userId: number) {
    const response = await fetch(`/api/notifications/email-settings/${userId}`);
    return response.json();
  },

  async updateSettings(userId: number, settings: EmailNotificationSettings) {
    const response = await fetch(`/api/notifications/email-settings/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    return response.json();
  },

  async disableNotifications(userId: number) {
    const response = await fetch(`/api/notifications/email-settings/${userId}`, {
      method: 'DELETE',
    });
    return response.json();
  }
};

export default emailNotificationService;

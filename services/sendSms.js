import { mnotifybaseUrl, mnotifyKey, sender, sms } from "../constants";
import apiClient from "../lib/apiClient";

// Helper function for sending SMS
export const sendSMS = async (postData) => {
    const endpoint = `/sms/quick?key=${mnotifyKey}`;
    const url = `${mnotifybaseUrl}${endpoint}`;
    const smsData = {
      recipient: [postData.phone],
      sender,
      message: sms.replace('name', postData.name)
    };

    try {
      const smsRes = await apiClient.post(url, smsData);
      
      return smsRes;
    } catch (error) {
      console.error('Error sending SMS:', error);
      return { status: 'failed', message: 'Failed to send SMS' };
    }
  };

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.c9f59f27d7834b58b8111704663ccf99',
  appName: 'wanderlust-booking-expo',
  webDir: 'dist',
  server: {
    url: 'https://c9f59f27-d783-4b58-b811-1704663ccf99.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  }
};

export default config;

// Script to safely inject GPS & Notification permissions into AndroidManifest.xml
const fs = require('fs');
const path = require('path');

const manifestPath = path.join(process.cwd(), 'android', 'app', 'src', 'main', 'AndroidManifest.xml');

console.log('Checking AndroidManifest at:', manifestPath);

if (!fs.existsSync(manifestPath)) {
  console.log('AndroidManifest.xml not found yet, skipping permission injection.');
  process.exit(0);
}

let content = fs.readFileSync(manifestPath, 'utf8');

const requiredPermissions = [
  '<!-- 1. GPS Fine & Coarse Location -->',
  '<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />',
  '<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />',
  '<uses-feature android:name="android.hardware.location.gps" android:required="false" />',
  '',
  '<!-- 2. Push Notifications (Android 13+) -->',
  '<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />',
  '',
  '<!-- 3. Network & Vibration -->',
  '<uses-permission android:name="android.permission.INTERNET" />',
  '<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />',
  '<uses-permission android:name="android.permission.VIBRATE" />',
  '<uses-permission android:name="android.permission.WAKE_LOCK" />'
].join('\n    ');

if (content.includes('ACCESS_FINE_LOCATION')) {
  console.log('GPS permissions already present in AndroidManifest.xml.');
} else {
  content = content.replace('<application', requiredPermissions + '\n\n    <application');
  fs.writeFileSync(manifestPath, content, 'utf8');
  console.log('Successfully injected GPS & Notification permissions into AndroidManifest.xml!');
}

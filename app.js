// Simple JavaScript for the mobile app demo
// This file contains basic logic that you can easily modify for testing CI/CD

// App configuration - easy to change these values
const appConfig = {
    name: "Demo Mobile App",
    version: "1.0.0",
    buildNumber: "001",
    environment: "development"
};

// Features list - you can add/remove items here
const appFeatures = [
    "User Login",
    "Dashboard", 
    "Settings",
    "Profile Management"
];

// Function to update the web page with app info
function updateAppInfo() {
    // Update app name
    const appNameElement = document.getElementById('app-name');
    if (appNameElement) {
        appNameElement.textContent = appConfig.name;
    }
    
    // Update version
    const versionElement = document.getElementById('app-version');
    if (versionElement) {
        versionElement.textContent = appConfig.version;
    }
    
    // Update build number
    const buildElement = document.getElementById('build-number');
    if (buildElement) {
        buildElement.textContent = appConfig.buildNumber;
    }
    
    // Update timestamp
    const timestampElement = document.getElementById('last-updated');
    if (timestampElement) {
        const now = new Date();
        timestampElement.textContent = now.toLocaleString();
    }
}

// Function to update features list
function updateFeatures() {
    const featureList = document.getElementById('feature-list');
    if (featureList) {
        featureList.innerHTML = '';
        appFeatures.forEach(feature => {
            const listItem = document.createElement('li');
            listItem.textContent = feature;
            featureList.appendChild(listItem);
        });
    }
}

// Function to simulate build status
function updateBuildStatus() {
    const statusElement = document.getElementById('build-status');
    if (statusElement) {
        const statuses = [
            "✅ Build Successful",
            "🔄 Build in Progress", 
            "❌ Build Failed",
            "⚠️ Build with Warnings"
        ];
        
        // For demo, we'll always show successful
        // In real CI/CD, this would come from Jenkins
        statusElement.textContent = "✅ Build Successful - " + new Date().toLocaleString();
        statusElement.className = "status-message success";
    }
}

// Run functions when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('App loaded successfully!');
    updateAppInfo();
    updateFeatures();
    updateBuildStatus();
    
    // Log some info for debugging
    console.log('App Config:', appConfig);
    console.log('Features:', appFeatures);
});

// Simple function you can call to test changes
function testFunction() {
    alert('Test function called! Build number: ' + appConfig.buildNumber);
}
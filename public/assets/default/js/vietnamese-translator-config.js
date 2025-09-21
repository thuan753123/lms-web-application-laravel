/**
 * LMS AI168 Vietnamese Auto Translator Configuration
 * Version: 2.0 (Advanced AI Translation Mode)
 *
 * Cấu hình cho LMS AI168 Vietnamese Auto Translator - phiên bản nâng cao
 * với khả năng dịch thông minh như Google Translate, hỗ trợ API translation,
 * tối ưu hiệu suất và nhiều tính năng AI khác.
 *
 * Copyright © 2024 AI168 - Nền tảng học tập thông minh
 */

// Cấu hình mặc định
window.VN_TRANSLATOR_CONFIG = {
    // Bật/tắt translator
    enabled: true,

    // Hiển thị button toggle
    showToggleButton: false,

    // Hiển thị thông báo trạng thái
    showStatusMessages: true,

    // Hiển thị thống kê
    showStatistics: false,

    // Chế độ debug (hiển thị tooltip cho text đã dịch)
    debugMode: false,

    // Tự động dịch khi trang load (BẬT - dịch full page tĩnh và động)
    autoTranslateOnLoad: true,

    // Delay trước khi dịch (ms)
    translationDelay: 500,

    // Cài đặt API translation
    apiTranslation: {
        // Bật/tắt API translation
        enabled: true,

        // Google Translate API (Recommended)
        google: {
            enabled: true,
            apiKey: "AIzaSyBZEM7fs2sqT9DlEGkl73E3ZOIN4g7N54c", // API key của bạn
        },

        // LibreTranslate (Lựa chọn thay thế miễn phí)
        libreTranslate: {
            enabled: false,
            url: "https://libretranslate.de/translate",
            apiKey: "", // Một số instance yêu cầu API key
        },

        // Microsoft Translator API
        microsoft: {
            enabled: false,
            apiKey: "",
            region: "", // Ví dụ: 'global', 'eastus'
        },

        // Cài đặt chung cho các API
        maxRetries: 2, // Số lần thử lại nếu thất bại
        retryDelay: 1000, // Thời gian chờ giữa các lần thử lại (ms)
        timeout: 8000, // Timeout cho mỗi request (ms)
        maxRequestsPerMinute: 60, // Giới hạn số request để tránh block
        batchSize: 20, // Số lượng text dịch trong một lần gọi API (nếu API hỗ trợ)
    },

    // Các selector để bỏ qua không dịch
    excludeSelectors: [
        "script",
        "style",
        "code",
        "pre",
        ".no-translate",
        ".vn-no-translate",
        "[data-no-translate]",
        ".ace_editor",
        ".CodeMirror",
        ".hljs",
    ],

    // Các thuộc tính cần dịch
    translateAttributes: [
        "placeholder",
        "title",
        "alt",
        "aria-label",
        "data-original-title",
        "data-bs-original-title",
    ],

    // Từ điển tùy chỉnh (sẽ được merge với từ điển mặc định)
    customTranslations: {
        // Thêm các từ dịch tùy chỉnh ở đây
        // 'English Text': 'Văn bản tiếng Việt',
    },

    // Callback functions
    callbacks: {
        onInit: null,
        onTranslate: null,
        onToggle: null,
        onDestroy: null,
        onTranslationComplete: null,
        onTranslationError: null,
    },

    // Cài đặt UI
    ui: {
        // Vị trí button toggle
        toggleButtonPosition: {
            top: "20px",
            right: "20px",
        },

        // Màu sắc
        colors: {
            primary: "#007bff",
            secondary: "#6c757d",
            success: "#28a745",
            danger: "#dc3545",
            warning: "#ffc107",
            info: "#17a2b8",
        },

        // Animation
        animations: {
            enabled: true,
            duration: 300,
        },
    },

    // Cài đặt hiệu suất
    performance: {
        // Batch size cho việc dịch nhiều element cùng lúc
        batchSize: 50,

        // Throttle delay cho MutationObserver (ms) - Tăng lên để tránh lag
        observerThrottle: 500,

        // Cache translations
        enableCache: true,

        // Max cache size
        maxCacheSize: 1000,
    },
};

// Khởi tạo translator với config tùy chỉnh
document.addEventListener("DOMContentLoaded", function () {
    // Kiểm tra localStorage để lưu trạng thái
    const savedState = localStorage.getItem("vn-translator-enabled");
    if (savedState !== null) {
        window.VN_TRANSLATOR_CONFIG.enabled = savedState === "true";
    }

    // Áp dụng debug mode nếu có query parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("vn-debug") === "1") {
        window.VN_TRANSLATOR_CONFIG.debugMode = true;
        document.body.classList.add("vn-debug");
    }

    // Khởi tạo translator nếu chưa có
    if (
        typeof window.vietnameseTranslator === "undefined" &&
        window.VN_TRANSLATOR_CONFIG.enabled
    ) {
        // Đợi script chính load xong
        const checkTranslator = setInterval(() => {
            if (typeof VietnameseTranslator !== "undefined") {
                clearInterval(checkTranslator);
                window.vietnameseTranslator = new VietnameseTranslator();

                // Áp dụng config tùy chỉnh
                if (window.VN_TRANSLATOR_CONFIG.customTranslations) {
                    window.vietnameseTranslator.addTranslations(
                        window.VN_TRANSLATOR_CONFIG.customTranslations
                    );
                }

                // Gọi callback init
                if (window.VN_TRANSLATOR_CONFIG.callbacks.onInit) {
                    window.VN_TRANSLATOR_CONFIG.callbacks.onInit(
                        window.vietnameseTranslator
                    );
                }
            }
        }, 100);
    }
});

/**
 * =========================================================================
 * WARNING: SECURITY RISK
 * =========================================================================
 * Hardcoding API keys in client-side JavaScript is highly insecure.
 * An attacker can easily find and steal your API key, leading to
 * unauthorized use and potential billing charges.
 *
 * BEST PRACTICE:
 * 1. Create a backend endpoint (e.g., in your Laravel app) that
 *    securely stores the API key.
 * 2. Have the client-side code call your backend endpoint.
 * 3. Your backend then makes the call to the translation API and
 *    returns the result to the client.
 *
 * This acts as a proxy, hiding your key from the public internet.
 * =========================================================================
 */

// Utility functions
window.VN_TRANSLATOR_UTILS = {
    /**
     * Thêm từ dịch tùy chỉnh
     */
    addCustomTranslation: function (english, vietnamese) {
        if (window.vietnameseTranslator) {
            window.vietnameseTranslator.addTranslation(english, vietnamese);
        }
        window.VN_TRANSLATOR_CONFIG.customTranslations[english] = vietnamese;
    },

    /**
     * Thêm nhiều từ dịch
     */
    addCustomTranslations: function (translations) {
        if (window.vietnameseTranslator) {
            window.vietnameseTranslator.addTranslations(translations);
        }
        Object.assign(
            window.VN_TRANSLATOR_CONFIG.customTranslations,
            translations
        );
    },

    /**
     * Bật/tắt translator
     */
    toggle: function () {
        if (window.vietnameseTranslator) {
            window.vietnameseTranslator.toggle();
            localStorage.setItem(
                "vn-translator-enabled",
                window.vietnameseTranslator.isEnabled
            );
        }
    },

    /**
     * Bật/tắt API translation
     */
    toggleAPI: function () {
        if (window.vietnameseTranslator) {
            window.vietnameseTranslator.toggleAPITranslation();
        }
    },

    /**
     * Hiển thị thống kê
     */
    showStats: function () {
        if (window.vietnameseTranslator) {
            window.vietnameseTranslator.showStatistics();
        }
    },

    /**
     * Revert tất cả dịch thuật
     */
    revertAll: function () {
        if (window.vietnameseTranslator) {
            window.vietnameseTranslator.revertAllTranslations();
        }
    },

    /**
     * Dịch toàn bộ trang (force)
     */
    translateFullPage: function () {
        if (window.vietnameseTranslator) {
            window.vietnameseTranslator.translatePage();
        }
    },

    /**
     * Dịch dữ liệu JSON
     */
    translateData: async function (data) {
        if (window.vietnameseTranslator) {
            return await window.vietnameseTranslator.translateJSONRecursively(
                data
            );
        }
        return data;
    },

    /**
     * Dịch API response
     */
    translateApiResponse: async function (response) {
        if (
            window.vietnameseTranslator &&
            response &&
            typeof response === "object"
        ) {
            return await window.vietnameseTranslator.translateJSONRecursively(
                response
            );
        }
        return response;
    },

    /**
     * Dịch database records
     */
    translateDatabaseRecords: async function (records) {
        if (!window.vietnameseTranslator || !Array.isArray(records))
            return records;

        const translatedRecords = [];
        for (const record of records) {
            if (record && typeof record === "object") {
                translatedRecords.push(
                    await window.vietnameseTranslator.translateJSONRecursively(
                        record
                    )
                );
            } else {
                translatedRecords.push(record);
            }
        }
        return translatedRecords;
    },

    /**
     * Dịch form data
     */
    translateFormData: async function (formData) {
        if (!window.vietnameseTranslator) return formData;

        if (formData instanceof FormData) {
            const newFormData = new FormData();
            for (const [key, value] of formData.entries()) {
                if (typeof value === "string") {
                    const translatedValue =
                        await window.vietnameseTranslator.translateText(value);
                    newFormData.append(key, translatedValue);
                } else {
                    newFormData.append(key, value);
                }
            }
            return newFormData;
        } else if (typeof formData === "object") {
            return await window.vietnameseTranslator.translateJSONRecursively(
                formData
            );
        }

        return formData;
    },

    /**
     * Cấu hình API key
     */
    setApiKey: function (provider, apiKey) {
        if (provider === "google") {
            window.VN_TRANSLATOR_CONFIG.apiTranslation.google.apiKey = apiKey;
            window.VN_TRANSLATOR_CONFIG.apiTranslation.google.enabled = true;
            window.VN_TRANSLATOR_CONFIG.apiTranslation.libreTranslate.enabled = false;
            window.VN_TRANSLATOR_CONFIG.apiTranslation.microsoft.enabled = false;
        } else if (provider === "microsoft") {
            window.VN_TRANSLATOR_CONFIG.apiTranslation.microsoft.apiKey =
                apiKey;
            window.VN_TRANSLATOR_CONFIG.apiTranslation.microsoft.enabled = true;
            window.VN_TRANSLATOR_CONFIG.apiTranslation.libreTranslate.enabled = false;
        } else if (provider === "libre") {
            window.VN_TRANSLATOR_CONFIG.apiTranslation.libreTranslate.apiKey =
                apiKey;
            window.VN_TRANSLATOR_CONFIG.apiTranslation.libreTranslate.enabled = true;
            window.VN_TRANSLATOR_CONFIG.apiTranslation.google.enabled = false;
            window.VN_TRANSLATOR_CONFIG.apiTranslation.microsoft.enabled = false;
        }

        // Enable API translation
        window.VN_TRANSLATOR_CONFIG.apiTranslation.enabled = true;

        // Update translator instance
        if (window.vietnameseTranslator) {
            window.vietnameseTranslator.apiTranslationEnabled = true;
        }

        console.log(`API Translation configured for ${provider}`);
    },

    /**
     * Dịch lại toàn bộ trang
     */
    retranslate: function () {
        if (
            window.vietnameseTranslator &&
            window.vietnameseTranslator.isEnabled
        ) {
            window.vietnameseTranslator.translatePage();
        }
    },

    /**
     * Lấy thống kê
     */
    getStats: function () {
        if (window.vietnameseTranslator) {
            return {
                enabled: window.vietnameseTranslator.isEnabled,
                translationsCount: Object.keys(
                    window.vietnameseTranslator.getTranslations()
                ).length,
                processedNodes: window.vietnameseTranslator.processedNodes
                    ? window.vietnameseTranslator.processedNodes.size || 0
                    : 0,
            };
        }
        return null;
    },

    /**
     * Reset translator
     */
    reset: function () {
        if (window.vietnameseTranslator) {
            window.vietnameseTranslator.destroy();
            window.vietnameseTranslator = new VietnameseTranslator();
        }
    },

    /**
     * Export cấu hình
     */
    exportConfig: function () {
        return JSON.stringify(window.VN_TRANSLATOR_CONFIG, null, 2);
    },

    /**
     * Import cấu hình
     */
    importConfig: function (configJson) {
        try {
            const config = JSON.parse(configJson);
            Object.assign(window.VN_TRANSLATOR_CONFIG, config);
            this.reset();
            return true;
        } catch (e) {
            console.error("Invalid config JSON:", e);
            return false;
        }
    },

    /**
     * DOM is stable and fully translated.
     * Ready for user interaction.
     */
    onTranslationComplete: function () {
        document.body.classList.add("vn-translation-complete");
        document.body.classList.remove("vn-translation-in-progress");
        console.log("✅ LMS AI168 translation complete. DOM is stable.");
    },

    /**
     * An error occurred during translation.
     */
    onTranslationError: function (error) {
        console.error("❌ LMS AI168 translation error:", error);
    },
};

// Console commands cho developer
if (window.VN_TRANSLATOR_CONFIG.debugMode) {
    console.log("🇻🇳 Vietnamese Translator Debug Mode Enabled");
    console.log("📋 Available commands:");
    console.log("🔄 VN_TRANSLATOR_UTILS.toggle() - Bật/tắt translator");
    console.log("🌐 VN_TRANSLATOR_UTILS.toggleAPI() - Bật/tắt API translation");
    console.log(
        "📄 VN_TRANSLATOR_UTILS.translateFullPage() - Dịch toàn bộ trang"
    );
    console.log("🔙 VN_TRANSLATOR_UTILS.revertAll() - Khôi phục text gốc");
    console.log("📊 VN_TRANSLATOR_UTILS.showStats() - Hiển thị thống kê");
    console.log("📥 VN_TRANSLATOR_UTILS.exportCache() - Xuất cache dịch thuật");
    console.log(
        "🔧 VN_TRANSLATOR_UTILS.setApiKey('google', 'YOUR_KEY') - Cấu hình API"
    );
    console.log(
        "➕ VN_TRANSLATOR_UTILS.addCustomTranslation('English', 'Tiếng Việt') - Thêm từ dịch"
    );
    console.log("📈 VN_TRANSLATOR_UTILS.getStats() - Xem thống kê chi tiết");

    // Hiển thị cấu hình hiện tại
    console.log("⚙️ Current Configuration:", {
        enabled: window.VN_TRANSLATOR_CONFIG.enabled,
        apiEnabled: window.VN_TRANSLATOR_CONFIG.apiTranslation.enabled,
        provider: window.VN_TRANSLATOR_CONFIG.apiTranslation.google.enabled
            ? "Google"
            : window.VN_TRANSLATOR_CONFIG.apiTranslation.microsoft.enabled
            ? "Microsoft"
            : window.VN_TRANSLATOR_CONFIG.apiTranslation.libreTranslate.enabled
            ? "LibreTranslate"
            : "None",
    });
}

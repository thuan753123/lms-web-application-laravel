/**
 * Vietnamese Auto Translator Observer
 * Tự động dịch các text tiếng Anh thành tiếng Việt trên toàn bộ trang web
 * Hoạt động như Google Translate - dịch toàn bộ trang kể cả dữ liệu động
 *
 * @author AI Assistant
 * @version 2.0.0
 */

class VietnameseTranslator {
    constructor() {
        this.translations = this.initTranslations();
        this.observer = null;
        this.processedNodes = new WeakSet();
        this.translatedNodes = new Map(); // Lưu trữ text gốc và đã dịch
        this.isEnabled = true;
        this.isTranslating = false;
        this.translationQueue = [];
        this.apiTranslationEnabled = false;
        this.statistics = {
            totalTranslated: 0,
            apiCalls: 0,
            dictionaryHits: 0,
            startTime: Date.now(),
        };
        this.failedApiTranslations = new Set(); // Blacklist cho các text dịch API lỗi
        this.apiConsecutiveFailures = 0; // Bộ đếm lỗi API liên tiếp
        this.apiTemporarilyDisabled = false; // Cờ để ngắt tạm thời API
        this.isTranslatingPage = false; // Cờ kiểm soát chu trình dịch toàn trang

        // Khởi tạo observer
        this.init();
    }

    /**
     * Từ điển dịch thuật
     */
    initTranslations() {
        return {
            // Common UI Elements
            Login: "Đăng nhập",
            Register: "Đăng ký",
            "Sign Up": "Đăng ký",
            "Sign In": "Đăng nhập",
            Logout: "Đăng xuất",
            Submit: "Gửi",
            Cancel: "Hủy",
            Save: "Lưu",
            Delete: "Xóa",
            Edit: "Chỉnh sửa",
            Create: "Tạo",
            Update: "Cập nhật",
            Search: "Tìm kiếm",
            Filter: "Lọc",
            Export: "Xuất",
            Import: "Nhập",
            Print: "In",
            Download: "Tải xuống",
            Upload: "Tải lên",
            Close: "Đóng",
            Open: "Mở",
            View: "Xem",
            Details: "Chi tiết",
            Settings: "Cài đặt",
            Profile: "Hồ sơ",
            Dashboard: "Bảng điều khiển",
            Home: "Trang chủ",
            Back: "Quay lại",
            Next: "Tiếp theo",
            Previous: "Trước",
            Continue: "Tiếp tục",
            Finish: "Hoàn thành",
            Start: "Bắt đầu",
            Stop: "Dừng",
            Pause: "Tạm dừng",
            Resume: "Tiếp tục",
            Refresh: "Làm mới",
            Reload: "Tải lại",
            Reset: "Đặt lại",
            Clear: "Xóa",
            Apply: "Áp dụng",
            Confirm: "Xác nhận",
            Yes: "Có",
            No: "Không",
            OK: "Đồng ý",
            Accept: "Chấp nhận",
            Decline: "Từ chối",
            Agree: "Đồng ý",
            Disagree: "Không đồng ý",

            // Status & States
            Active: "Hoạt động",
            Inactive: "Không hoạt động",
            Enabled: "Đã bật",
            Disabled: "Đã tắt",
            Online: "Trực tuyến",
            Offline: "Ngoại tuyến",
            Available: "Có sẵn",
            Unavailable: "Không có sẵn",
            Published: "Đã xuất bản",
            Draft: "Bản nháp",
            Pending: "Đang chờ",
            Approved: "Đã duyệt",
            Rejected: "Đã từ chối",
            Completed: "Đã hoàn thành",
            "In Progress": "Đang tiến hành",
            Failed: "Thất bại",
            Success: "Thành công",
            Error: "Lỗi",
            Warning: "Cảnh báo",
            Info: "Thông tin",
            Loading: "Đang tải",
            Processing: "Đang xử lý",
            Expired: "Hết hạn",
            Valid: "Hợp lệ",
            Invalid: "Không hợp lệ",
            Required: "Bắt buộc",
            Optional: "Tùy chọn",

            // Time & Date
            Today: "Hôm nay",
            Yesterday: "Hôm qua",
            Tomorrow: "Ngày mai",
            "This Week": "Tuần này",
            "Last Week": "Tuần trước",
            "Next Week": "Tuần sau",
            "This Month": "Tháng này",
            "Last Month": "Tháng trước",
            "Next Month": "Tháng sau",
            "This Year": "Năm nay",
            "Last Year": "Năm ngoái",
            "Next Year": "Năm sau",
            Date: "Ngày",
            Time: "Thời gian",
            "Start Date": "Ngày bắt đầu",
            "End Date": "Ngày kết thúc",
            Created: "Đã tạo",
            Updated: "Đã cập nhật",
            Modified: "Đã sửa đổi",

            // Education & LMS
            Course: "Khóa học",
            Courses: "Các khóa học",
            Lesson: "Bài học",
            Lessons: "Các bài học",
            Student: "Học viên",
            Students: "Học viên",
            Teacher: "Giảng viên",
            Teachers: "Giảng viên",
            Instructor: "Giảng viên",
            Instructors: "Giảng viên",
            Class: "Lớp học",
            Classes: "Lớp học",
            Assignment: "Bài tập",
            Assignments: "Bài tập",
            Quiz: "Bài kiểm tra",
            Quizzes: "Bài kiểm tra",
            Test: "Kiểm tra",
            Tests: "Kiểm tra",
            Exam: "Thi",
            Exams: "Thi",
            Grade: "Điểm",
            Grades: "Điểm",
            Score: "Điểm số",
            Certificate: "Chứng chỉ",
            Certificates: "Chứng chỉ",
            Progress: "Tiến độ",
            Enrollment: "Đăng ký học",
            Webinar: "Hội thảo trực tuyến",
            Webinars: "Hội thảo trực tuyến",
            Video: "Video",
            Videos: "Video",
            Audio: "Âm thanh",
            Document: "Tài liệu",
            Documents: "Tài liệu",
            File: "Tập tin",
            Files: "Tập tin",
            Library: "Thư viện",
            Category: "Danh mục",
            Categories: "Danh mục",
            Tag: "Thẻ",
            Tags: "Thẻ",
            Forum: "Diễn đàn",
            Discussion: "Thảo luận",
            Comment: "Bình luận",
            Comments: "Bình luận",
            Review: "Đánh giá",
            Reviews: "Đánh giá",
            Rating: "Xếp hạng",
            Ratings: "Xếp hạng",

            // E-commerce & Payment
            Price: "Giá",
            Cost: "Chi phí",
            Free: "Miễn phí",
            Paid: "Trả phí",
            Purchase: "Mua",
            Buy: "Mua",
            Sell: "Bán",
            Sale: "Bán",
            Sales: "Bán hàng",
            Order: "Đơn hàng",
            Orders: "Đơn hàng",
            Cart: "Giỏ hàng",
            Checkout: "Thanh toán",
            Payment: "Thanh toán",
            Payments: "Thanh toán",
            Invoice: "Hóa đơn",
            Invoices: "Hóa đơn",
            Receipt: "Biên lai",
            Receipts: "Biên lai",
            Refund: "Hoàn tiền",
            Discount: "Giảm giá",
            Discounts: "Giảm giá",
            Coupon: "Phiếu giảm giá",
            Coupons: "Phiếu giảm giá",
            Promotion: "Khuyến mãi",
            Promotions: "Khuyến mãi",
            Subscription: "Đăng ký",
            Subscriptions: "Đăng ký",
            Plan: "Gói",
            Plans: "Gói",
            Package: "Gói",
            Packages: "Gói",
            Bundle: "Gói",
            Bundles: "Gói",

            // User Management
            User: "Người dùng",
            Users: "Người dùng",
            Account: "Tài khoản",
            Accounts: "Tài khoản",
            Username: "Tên đăng nhập",
            Password: "Mật khẩu",
            Email: "Email",
            Phone: "Điện thoại",
            Address: "Địa chỉ",
            Name: "Tên",
            "First Name": "Tên",
            "Last Name": "Họ",
            "Full Name": "Họ tên",
            Role: "Vai trò",
            Roles: "Vai trò",
            Permission: "Quyền",
            Permissions: "Quyền",
            Group: "Nhóm",
            Groups: "Nhóm",
            Organization: "Tổ chức",
            Organizations: "Tổ chức",
            Department: "Phòng ban",
            Departments: "Phòng ban",

            // System & Technical
            System: "Hệ thống",
            Database: "Cơ sở dữ liệu",
            Server: "Máy chủ",
            API: "API",
            Configuration: "Cấu hình",
            Installation: "Cài đặt",
            Backup: "Sao lưu",
            Restore: "Khôi phục",
            Migration: "Di chuyển",
            Version: "Phiên bản",
            License: "Giấy phép",
            Plugin: "Plugin",
            Plugins: "Plugin",
            Extension: "Tiện ích mở rộng",
            Extensions: "Tiện ích mở rộng",
            Module: "Mô-đun",
            Modules: "Mô-đun",
            Component: "Thành phần",
            Components: "Thành phần",
            Widget: "Widget",
            Widgets: "Widget",
            Theme: "Giao diện",
            Themes: "Giao diện",
            Template: "Mẫu",
            Templates: "Mẫu",
            Layout: "Bố cục",
            Layouts: "Bố cục",

            // Messages & Notifications
            Message: "Tin nhắn",
            Messages: "Tin nhắn",
            Notification: "Thông báo",
            Notifications: "Thông báo",
            Alert: "Cảnh báo",
            Alerts: "Cảnh báo",
            News: "Tin tức",
            Announcement: "Thông báo",
            Announcements: "Thông báo",
            Email: "Email",
            Emails: "Email",
            SMS: "SMS",
            Chat: "Trò chuyện",
            Support: "Hỗ trợ",
            Help: "Trợ giúp",
            FAQ: "Câu hỏi thường gặp",
            Contact: "Liên hệ",
            Feedback: "Phản hồi",

            // Reports & Analytics
            Report: "Báo cáo",
            Reports: "Báo cáo",
            Analytics: "Phân tích",
            Statistics: "Thống kê",
            Chart: "Biểu đồ",
            Charts: "Biểu đồ",
            Graph: "Đồ thị",
            Graphs: "Đồ thị",
            Data: "Dữ liệu",
            Summary: "Tóm tắt",
            Overview: "Tổng quan",
            Total: "Tổng",
            Count: "Số lượng",
            Amount: "Số tiền",
            Percentage: "Phần trăm",
            Average: "Trung bình",
            Maximum: "Tối đa",
            Minimum: "Tối thiểu",

            // Common Phrases
            "All rights reserved": "Tất cả quyền được bảo lưu",
            "This is a paid plugin": "Đây là một plugin trả phí",
            "You can purchase it by": "Bạn có thể mua nó qua",
            "this link": "liên kết này",
            "on Codecanyon": "trên Codecanyon",
            "Please activate your license":
                "Vui lòng kích hoạt giấy phép của bạn",
            "Activate License": "Kích hoạt Giấy phép",
            "Install License": "Cài đặt Giấy phép",
            "Filter Type": "Loại bộ lọc",
            "Deleted User": "Người dùng đã xóa",
            "User Deleted": "Người dùng đã xóa",
            "Rate Detail": "Chi tiết đánh giá",
            "Buy Now": "Mua ngay",
            "Add to Cart": "Thêm vào giỏ hàng",
            "Proceed to Checkout": "Tiến hành thanh toán",
            "Continue Shopping": "Tiếp tục mua sắm",
            "View Details": "Xem chi tiết",
            "Read More": "Đọc thêm",
            "Show More": "Hiển thị thêm",
            "Show Less": "Hiển thị ít hơn",
            "Load More": "Tải thêm",
            "See All": "Xem tất cả",
            "View All": "Xem tất cả",
            "Select All": "Chọn tất cả",
            "Deselect All": "Bỏ chọn tất cả",
            "Check All": "Đánh dấu tất cả",
            "Uncheck All": "Bỏ đánh dấu tất cả",

            // Placeholders
            "Search anything": "Tìm kiếm bất cứ gì",
            "Enter your email": "Nhập email của bạn",
            "Enter your password": "Nhập mật khẩu của bạn",
            "Confirm password": "Xác nhận mật khẩu",
            "Enter your name": "Nhập tên của bạn",
            "Enter your phone": "Nhập số điện thoại của bạn",
            "Enter your address": "Nhập địa chỉ của bạn",
            "Type your message": "Nhập tin nhắn của bạn",
            "Write a comment": "Viết bình luận",
            "Add a note": "Thêm ghi chú",
            "Select an option": "Chọn một tùy chọn",
            "Choose a file": "Chọn một tập tin",
            "Select a date": "Chọn một ngày",
            "Pick a time": "Chọn thời gian",

            // Error Messages
            "Page not found": "Không tìm thấy trang",
            "Access denied": "Truy cập bị từ chối",
            "Permission denied": "Quyền truy cập bị từ chối",
            "Invalid request": "Yêu cầu không hợp lệ",
            "Something went wrong": "Đã xảy ra lỗi",
            "Please try again": "Vui lòng thử lại",
            "Connection failed": "Kết nối thất bại",
            "Timeout error": "Lỗi hết thời gian chờ",
            "Server error": "Lỗi máy chủ",
            "Network error": "Lỗi mạng",

            // Success Messages
            "Successfully saved": "Đã lưu thành công",
            "Successfully updated": "Đã cập nhật thành công",
            "Successfully deleted": "Đã xóa thành công",
            "Successfully created": "Đã tạo thành công",
            "Operation completed": "Hoạt động đã hoàn thành",
            "Changes saved": "Đã lưu thay đổi",
            "Action completed": "Hành động đã hoàn thành",

            // Form Validation
            "This field is required": "Trường này là bắt buộc",
            "Please enter a valid email": "Vui lòng nhập email hợp lệ",
            "Password is too short": "Mật khẩu quá ngắn",
            "Passwords do not match": "Mật khẩu không khớp",
            "Please select an option": "Vui lòng chọn một tùy chọn",
            "File size is too large": "Kích thước tập tin quá lớn",
            "Invalid file format": "Định dạng tập tin không hợp lệ",
            "Please fill in all required fields":
                "Vui lòng điền tất cả các trường bắt buộc",

            // Additional common words for better coverage
            Welcome: "Chào mừng",
            About: "Giới thiệu",
            "About Us": "Về chúng tôi",
            Services: "Dịch vụ",
            Products: "Sản phẩm",
            Blog: "Blog",
            News: "Tin tức",
            Events: "Sự kiện",
            Gallery: "Thư viện ảnh",
            Portfolio: "Danh mục",
            Team: "Đội ngũ",
            Staff: "Nhân viên",
            Members: "Thành viên",
            Clients: "Khách hàng",
            Partners: "Đối tác",
            Testimonials: "Lời chứng thực",
            Reviews: "Đánh giá",
            Feedback: "Phản hồi",
            FAQ: "Câu hỏi thường gặp",
            Help: "Trợ giúp",
            Support: "Hỗ trợ",
            Contact: "Liên hệ",
            "Contact Us": "Liên hệ với chúng tôi",
            "Get in Touch": "Liên hệ",
            Address: "Địa chỉ",
            Phone: "Điện thoại",
            Email: "Email",
            Website: "Trang web",
            "Follow Us": "Theo dõi chúng tôi",
            Subscribe: "Đăng ký",
            Newsletter: "Bản tin",
            "Privacy Policy": "Chính sách bảo mật",
            "Terms of Service": "Điều khoản dịch vụ",
            "Terms and Conditions": "Điều khoản và điều kiện",
            Copyright: "Bản quyền",
            "All Rights Reserved": "Tất cả quyền được bảo lưu",

            // Navigation
            Menu: "Menu",
            Navigation: "Điều hướng",
            Breadcrumb: "Đường dẫn",
            Sidebar: "Thanh bên",
            Header: "Đầu trang",
            Footer: "Chân trang",
            Main: "Chính",
            Content: "Nội dung",

            // Actions
            "Learn More": "Tìm hiểu thêm",
            "Get Started": "Bắt đầu",
            "Sign Up Now": "Đăng ký ngay",
            "Try Now": "Thử ngay",
            "Book Now": "Đặt ngay",
            "Order Now": "Đặt hàng ngay",
            "Call Now": "Gọi ngay",
            "Contact Now": "Liên hệ ngay",
            "Download Now": "Tải xuống ngay",
            "Watch Now": "Xem ngay",
            Play: "Phát",
            Stop: "Dừng",
            Pause: "Tạm dừng",
            Resume: "Tiếp tục",

            // Common phrases
            "Welcome to": "Chào mừng đến với",
            "Thank you": "Cảm ơn bạn",
            "Please wait": "Vui lòng đợi",
            "Coming Soon": "Sắp ra mắt",
            "Under Construction": "Đang xây dựng",
            "Page Not Found": "Không tìm thấy trang",
            "Error 404": "Lỗi 404",
            "Go Back": "Quay lại",
            "Try Again": "Thử lại",
            "Refresh Page": "Làm mới trang",

            // Time expressions
            minute: "phút",
            minutes: "phút",
            hour: "giờ",
            hours: "giờ",
            day: "ngày",
            days: "ngày",
            week: "tuần",
            weeks: "tuần",
            month: "tháng",
            months: "tháng",
            year: "năm",
            years: "năm",
            ago: "trước",
            later: "sau",
            now: "bây giờ",
            soon: "sớm",

            // Numbers and quantities
            first: "đầu tiên",
            second: "thứ hai",
            third: "thứ ba",
            last: "cuối cùng",
            next: "tiếp theo",
            previous: "trước đó",
            all: "tất cả",
            none: "không có",
            some: "một số",
            many: "nhiều",
            few: "ít",
            more: "thêm",
            less: "ít hơn",
            most: "hầu hết",
            least: "ít nhất",
        };
    }

    /**
     * Khởi tạo observer - Optimized Best Practices
     */
    async init() {
        try {
            // Kiểm tra xem đã khởi tạo chưa
            if (window.vietnameseTranslatorInitialized) {
                console.warn("Vietnamese Translator already initialized");
                return this;
            }

            // Đánh dấu đã khởi tạo
            window.vietnameseTranslatorInitialized = true;

            // Performance monitoring
            const startTime = performance.now();

            // Khởi tạo các thành phần cơ bản
            await this.initializeCore();

            // Setup MutationObserver với advanced throttling
            this.setupMutationObserver();

            // Setup performance monitoring
            this.setupPerformanceMonitoring();

            // Dịch nội dung ban đầu với lazy loading
            this.scheduleInitialTranslation();

            const endTime = performance.now();
            console.log(
                `🚀 LMS AI168 Translator initialized in ${Math.round(
                    endTime - startTime
                )}ms`
            );

            return this;
        } catch (error) {
            console.error("LMS AI168 Translator initialization failed:", error);
            window.vietnameseTranslatorInitialized = false;
            throw error;
        }
    }

    /**
     * Khởi tạo các thành phần cơ bản
     */
    async initializeCore() {
        // Thêm CSS với lazy loading
        await this.addStyles();

        // Thêm toggle button
        this.addToggleButton();

        // Khởi tạo cache và statistics
        this.translatedNodes = this.translatedNodes || new Map();
        this.failedApiTranslations = new Set(); // Blacklist cho các text dịch API lỗi
        this.apiConsecutiveFailures = 0; // Bộ đếm lỗi API liên tiếp
        this.apiTemporarilyDisabled = false; // Cờ để ngắt tạm thời API
        this.statistics = this.statistics || {
            totalTranslations: 0,
            cacheHits: 0,
            apiCalls: 0,
            errors: 0,
            startTime: Date.now(),
        };

        // Setup error handling
        this.setupErrorHandling();
    }

    /**
     * Setup MutationObserver với advanced configuration
     */
    setupMutationObserver() {
        // Debounced observer với intelligent batching
        let observerTimeout = null;
        let mutationQueue = [];

        this.observer = new MutationObserver((mutations) => {
            if (!this.isEnabled || this.isTranslating) return;

            // Add mutations to queue
            mutationQueue.push(...mutations);

            // Debounce với adaptive delay
            if (observerTimeout) {
                clearTimeout(observerTimeout);
            }

            const delay = this.calculateOptimalDelay(mutationQueue.length);
            observerTimeout = setTimeout(async () => {
                await this.processMutationQueue(mutationQueue);
                mutationQueue = [];
            }, delay);
        });

        // Optimized observer configuration
        this.observerConfig = {
            childList: true,
            subtree: true,
            attributes: false, // Tắt để tối ưu, vì ta sẽ quét thuộc tính riêng
            attributeOldValue: false,
            characterData: true, // Bật để theo dõi thay đổi text
            characterDataOldValue: false,
        };
        this.observer.observe(document.body, this.observerConfig);
    }

    /**
     * Tính toán delay tối ưu dựa trên số lượng mutations
     */
    calculateOptimalDelay(mutationCount) {
        const baseDelay =
            window.VN_TRANSLATOR_CONFIG?.performance?.observerThrottle || 300;

        if (mutationCount < 5) return baseDelay;
        if (mutationCount < 20) return baseDelay * 1.5;
        if (mutationCount < 50) return baseDelay * 2;
        return baseDelay * 3; // Heavy mutations
    }

    /**
     * Setup performance monitoring
     */
    setupPerformanceMonitoring() {
        // Monitor memory usage
        if (window.performance && window.performance.memory) {
            setInterval(() => {
                const memory = window.performance.memory;
                const usedMB = Math.round(memory.usedJSHeapSize / 1024 / 1024);

                if (usedMB > 100) {
                    // > 100MB
                    console.warn(
                        `🔍 LMS AI168 Translator high memory usage: ${usedMB}MB`
                    );
                    this.optimizeMemory();
                }
            }, 30000); // Check every 30s
        }

        // Monitor translation performance
        this.performanceMetrics = {
            translationsPerSecond: 0,
            averageTranslationTime: 0,
            lastMeasurement: Date.now(),
        };
    }

    /**
     * Setup error handling
     */
    setupErrorHandling() {
        window.addEventListener("error", (event) => {
            if (
                event.message &&
                event.message.includes("vietnamese-translator")
            ) {
                console.error("🚨 LMS AI168 Translator Error:", event.error);
                this.statistics.errors++;

                // Auto-recovery for critical errors
                if (this.statistics.errors > 10) {
                    console.warn("🔄 Auto-recovering translator...");
                    this.restart();
                }
            }
        });
    }

    /**
     * Lên lịch dịch ban đầu với lazy loading
     */
    scheduleInitialTranslation() {
        if (window.VN_TRANSLATOR_CONFIG?.autoTranslateOnLoad === false) {
            console.log(
                "📋 LMS AI168 Translator ready (auto-translate disabled)"
            );
            return;
        }

        // Use requestIdleCallback for better performance
        if (window.requestIdleCallback) {
            window.requestIdleCallback(
                () => {
                    this.translatePage();
                },
                { timeout: 2000 }
            );
        } else {
            setTimeout(() => {
                this.translatePage();
            }, 1000);
        }
    }

    /**
     * Xử lý mutation queue với intelligent batching
     */
    async processMutationQueue(mutations) {
        if (!mutations.length) return;

        try {
            const startTime = performance.now();
            const nodesToProcess = this.extractNodesToProcess(mutations);

            if (nodesToProcess.length > 0) {
                await this.processBatchNodes(nodesToProcess);
            }

            // Update performance metrics
            const processingTime = performance.now() - startTime;
            this.updatePerformanceMetrics(mutations.length, processingTime);
        } catch (error) {
            console.error(
                "🚨 LMS AI168 Translator mutation processing error:",
                error
            );
            this.statistics.errors++;
        }
    }

    /**
     * Extract nodes cần xử lý từ mutations
     */
    extractNodesToProcess(mutations) {
        const nodesToProcess = [];
        const processedNodes = new Set();

        mutations.forEach((mutation) => {
            if (mutation.type === "childList") {
                mutation.addedNodes.forEach((node) => {
                    // Bỏ qua các node của translator để tránh loop
                    if (this.isTranslatorNode(node)) return;

                    // Bỏ qua node đã xử lý
                    if (processedNodes.has(node)) return;
                    processedNodes.add(node);

                    if (node.nodeType === Node.ELEMENT_NODE) {
                        nodesToProcess.push(node);
                    } else if (
                        node.nodeType === Node.TEXT_NODE &&
                        node.textContent.trim()
                    ) {
                        nodesToProcess.push(node);
                    }
                });
            } else if (mutation.type === "characterData") {
                const node = mutation.target;
                if (
                    node &&
                    node.textContent.trim() &&
                    !processedNodes.has(node)
                ) {
                    processedNodes.add(node);
                    nodesToProcess.push(node);
                }
            }
        });

        return nodesToProcess;
    }

    /**
     * Update performance metrics
     */
    updatePerformanceMetrics(mutationCount, processingTime) {
        const now = Date.now();
        const timeDiff = now - this.performanceMetrics.lastMeasurement;

        if (timeDiff > 1000) {
            // Update every second
            this.performanceMetrics.translationsPerSecond = Math.round(
                (this.statistics.totalTranslations * 1000) / timeDiff
            );
            this.performanceMetrics.averageTranslationTime =
                processingTime / mutationCount;
            this.performanceMetrics.lastMeasurement = now;
        }
    }

    /**
     * Optimize memory usage
     */
    optimizeMemory() {
        // Clear old cache entries
        if (this.translatedNodes.size > 1000) {
            const entries = Array.from(this.translatedNodes.entries());
            const keepEntries = entries.slice(-500); // Keep last 500
            this.translatedNodes.clear();
            keepEntries.forEach(([key, value]) => {
                this.translatedNodes.set(key, value);
            });
            console.log("🧹 LMS AI168 Translator cache optimized");
        }

        // Force garbage collection if available
        if (window.gc) {
            window.gc();
        }
    }

    /**
     * Restart translator
     */
    async restart() {
        try {
            console.log("🔄 Restarting LMS AI168 Translator...");

            // Cleanup
            this.destroy();

            // Wait a bit
            await this.sleep(1000);

            // Reinitialize
            window.vietnameseTranslatorInitialized = false;
            await this.init();

            console.log("✅ LMS AI168 Translator restarted successfully");
        } catch (error) {
            console.error("❌ LMS AI168 Translator restart failed:", error);
        }
    }

    /**
     * Destroy translator instance
     */
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }

        // Remove UI elements
        const elements = document.querySelectorAll(
            ".vn-translator-toggle, .vn-translator-status, .vn-translator-stats"
        );
        elements.forEach((el) => el.remove());

        // Clear caches
        if (this.translatedNodes) {
            this.translatedNodes.clear();
        }

        // Reset flags
        window.vietnameseTranslatorInitialized = false;
        this.isEnabled = false;
        this.isTranslating = false;

        console.log("🗑️ LMS AI168 Translator destroyed");
    }

    /**
     * Xử lý mutations từ observer (Legacy method for compatibility)
     */
    handleMutations(mutations) {
        try {
            const nodesToProcess = [];

            mutations.forEach((mutation) => {
                if (mutation.type === "childList") {
                    mutation.addedNodes.forEach((node) => {
                        // Bỏ qua các node của translator để tránh loop
                        if (this.isTranslatorNode(node)) return;

                        if (node.nodeType === Node.ELEMENT_NODE) {
                            nodesToProcess.push(node);
                        } else if (
                            node.nodeType === Node.TEXT_NODE &&
                            node.textContent.trim()
                        ) {
                            nodesToProcess.push(node);
                        }
                    });
                }
            });

            // Xử lý batch để tránh blocking
            if (nodesToProcess.length > 0) {
                this.processBatchNodes(nodesToProcess);
            }
        } catch (error) {
            console.warn("Error handling mutations:", error);
        }
    }

    /**
     * Kiểm tra xem node có phải của translator không
     */
    isTranslatorNode(node) {
        if (!node || !node.classList) return false;

        const translatorClasses = [
            "vn-translator-toggle",
            "vn-translator-status",
            "vn-translator-stats",
            "vn-progress-bar",
            "vn-message-container",
            "vn-message",
            "vn-translated",
        ];

        return translatorClasses.some(
            (className) =>
                node.classList.contains(className) ||
                (node.querySelector && node.querySelector(`.${className}`))
        );
    }

    /**
     * Xử lý batch nodes
     */
    async processBatchNodes(nodes) {
        if (this.isTranslating) return;

        const batchSize = Math.min(nodes.length, 10); // Giới hạn batch size

        for (let i = 0; i < nodes.length; i += batchSize) {
            const batch = nodes.slice(i, i + batchSize);

            try {
                await Promise.all(
                    batch.map(async (node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            await this.translateElement(node);
                        } else if (node.nodeType === Node.TEXT_NODE) {
                            await this.translateTextNode(node);
                        }
                    })
                );
            } catch (error) {
                console.warn("Error processing batch:", error);
            }

            // Yield control
            await this.sleep(10);
        }
    }

    /**
     * Dịch toàn bộ trang
     */
    translatePage() {
        // Dịch tất cả text nodes
        this.translateAllTextNodes(document.body);

        // Dịch các thuộc tính
        this.translateAllAttributes(document.body);
    }

    /**
     * Dịch tất cả text nodes trong element
     */
    translateAllTextNodes(element) {
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: (node) => {
                    // Bỏ qua script và style tags
                    const parent = node.parentElement;
                    if (
                        parent &&
                        (parent.tagName === "SCRIPT" ||
                            parent.tagName === "STYLE")
                    ) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                },
            }
        );

        const textNodes = [];
        let node;
        while ((node = walker.nextNode())) {
            textNodes.push(node);
        }

        textNodes.forEach((textNode) => this.translateTextNode(textNode));
    }

    /**
     * Dịch tất cả thuộc tính trong element
     */
    async translateAllAttributes(element) {
        const elements = element.querySelectorAll("*");
        for (const el of elements) {
            await this.translateElementAttributes(el);
        }
    }

    /**
     * Dịch một element và tất cả con của nó
     */
    translateElement(element) {
        if (this.processedNodes.has(element)) return;

        // Dịch text nodes
        this.translateAllTextNodes(element);

        // Dịch thuộc tính
        this.translateAllAttributes(element);

        // Đánh dấu đã xử lý
        this.processedNodes.add(element);
    }

    /**
     * Dịch text node - Enhanced version
     */
    async translateTextNode(node) {
        if (!node || !node.textContent || !node.textContent.trim()) return;

        const text = node.textContent.trim();
        if (this.isVietnamese(text)) return;

        // Gọi hàm translateText đã được tối ưu, truyền node vào làm context
        const translatedText = await this.translateText(text, node);

        if (translatedText !== text) {
            // Cập nhật DOM một cách an toàn
            if (node.textContent.trim() === text) {
                // Kiểm tra lại text gốc trước khi thay đổi
                node.textContent = translatedText;

                // Thêm class để đánh dấu node đã được dịch
                if (node.parentElement) {
                    node.parentElement.classList.add("vn-translated-node");
                }
            }
        }
    }

    /**
     * Dịch toàn bộ trang - Enhanced version
     */
    async translatePage() {
        if (this.isTranslatingPage) return; // Không chạy nếu chu trình dịch khác đang diễn ra
        this.isTranslatingPage = true; // Đặt khóa
        this.showLoadingIndicator();

        try {
            // Dịch tất cả text nodes
            await this.translateAllTextNodes(document.body);

            // Dịch các thuộc tính
            await this.translateAllAttributes(document.body);

            // Dịch nội dung động (data attributes, JSON, etc.)
            await this.translateDynamicContent();

            // Dịch form values và placeholders
            await this.translateFormElements();

            // Dịch table content
            await this.translateTableContent();

            this.showSuccessMessage();
            if (
                typeof window.VN_TRANSLATOR_CONFIG?.callbacks
                    ?.onTranslationComplete === "function"
            ) {
                window.VN_TRANSLATOR_CONFIG.callbacks.onTranslationComplete();
            }
        } catch (error) {
            console.error("Page translation failed:", error);
            this.showErrorMessage();
            if (
                typeof window.VN_TRANSLATOR_CONFIG?.callbacks
                    ?.onTranslationError === "function"
            ) {
                window.VN_TRANSLATOR_CONFIG.callbacks.onTranslationError(error);
            }
        } finally {
            this.hideLoadingIndicator();
            this.isTranslatingPage = false; // Mở khóa khi hoàn tất
        }
    }

    /**
     * Dịch tất cả text nodes - Tối ưu với batching
     */
    async translateAllTextNodes(element) {
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: (node) => {
                    const parent = node.parentElement;
                    if (parent && parent.tagName) {
                        const tagName = parent.tagName.toLowerCase();
                        const excludeTags = [
                            "script",
                            "style",
                            "noscript",
                            "iframe",
                        ];
                        if (
                            excludeTags.includes(tagName) ||
                            parent.isContentEditable
                        ) {
                            return NodeFilter.FILTER_REJECT;
                        }
                    }
                    return NodeFilter.FILTER_ACCEPT;
                },
            }
        );

        const nodesToTranslate = [];
        while (walker.nextNode()) {
            nodesToTranslate.push(walker.currentNode);
        }

        const updatePromises = nodesToTranslate.map((node) => {
            const text = node.textContent?.trim();
            if (text && !this.isVietnamese(text)) {
                return this.translateText(text, node).then((translatedText) => {
                    if (translatedText !== text) {
                        // Trả về một hàm callback để cập nhật DOM sau
                        return () => {
                            node.textContent = translatedText;
                        };
                    }
                    return null;
                });
            }
            return Promise.resolve(null);
        });

        await this.performSafeDOMUpdates(updatePromises);
    }

    /**
     * Thực hiện cập nhật DOM một cách an toàn để tránh vòng lặp observer
     */
    async performSafeDOMUpdates(updatePromises) {
        // Chờ tất cả các promise dịch text hoàn thành
        const domUpdateCallbacks = await Promise.all(updatePromises);
        const validUpdates = domUpdateCallbacks.filter(
            (callback) => typeof callback === "function"
        );

        if (validUpdates.length > 0) {
            this.observer.disconnect(); // Tạm ngắt observer

            try {
                // Thực hiện tất cả các thay đổi DOM
                validUpdates.forEach((updateCallback) => updateCallback());
            } finally {
                // Kết nối lại observer sau một khoảng delay ngắn để DOM ổn định
                // và tránh việc observer tự phát hiện các thay đổi vừa thực hiện
                setTimeout(() => {
                    if (this.observer && this.observerConfig) {
                        this.observer.observe(
                            document.body,
                            this.observerConfig
                        );
                    }
                }, 10); // 10ms delay
            }
        }
    }

    /**
     * Dịch nội dung động (JSON data, data attributes, API responses, etc.)
     */
    async translateDynamicContent() {
        // Dịch data attributes mở rộng
        const elementsWithData = document.querySelectorAll(
            "[data-title], [data-content], [data-original-title], [data-bs-original-title], [data-text], [data-label], [data-description], [data-message], [data-tooltip]"
        );
        for (const element of elementsWithData) {
            const attributes = [
                "data-title",
                "data-content",
                "data-original-title",
                "data-bs-original-title",
                "data-text",
                "data-label",
                "data-description",
                "data-message",
                "data-tooltip",
            ];
            for (const attr of attributes) {
                const value = element.getAttribute(attr);
                if (value && value.trim()) {
                    const translated = await this.translateText(value.trim());
                    if (translated !== value.trim()) {
                        element.setAttribute(attr, translated);
                    }
                }
            }
        }

        // Dịch JSON data trong script tags
        const scriptTags = document.querySelectorAll(
            'script[type="application/json"], script:not([src])'
        );
        for (const script of scriptTags) {
            try {
                const content = script.textContent.trim();
                if (content.startsWith("{") || content.startsWith("[")) {
                    const jsonData = JSON.parse(content);
                    const translatedData = await this.translateJSONRecursively(
                        jsonData
                    );
                    if (
                        JSON.stringify(translatedData) !==
                        JSON.stringify(jsonData)
                    ) {
                        script.textContent = JSON.stringify(
                            translatedData,
                            null,
                            2
                        );
                    }
                }
            } catch (e) {
                // Ignore invalid JSON
            }
        }

        // Dịch window variables chứa data
        await this.translateWindowVariables();

        // Dịch localStorage data
        await this.translateLocalStorageData();

        // Hook vào AJAX requests để dịch responses
        this.hookAjaxRequests();
    }

    /**
     * Dịch các biến window chứa dữ liệu
     */
    async translateWindowVariables() {
        const commonDataVars = [
            "appData",
            "pageData",
            "siteData",
            "configData",
            "translations",
            "messages",
            "labels",
            "content",
            "texts",
            "strings",
            "lang",
        ];

        for (const varName of commonDataVars) {
            if (window[varName] && typeof window[varName] === "object") {
                try {
                    const originalData = window[varName];
                    const translatedData = await this.translateJSONRecursively(
                        originalData
                    );

                    // Chỉ update nếu có thay đổi
                    if (
                        JSON.stringify(translatedData) !==
                        JSON.stringify(originalData)
                    ) {
                        window[varName] = translatedData;
                        console.log(`🔄 Translated window.${varName}`);
                    }
                } catch (error) {
                    console.warn(`Error translating window.${varName}:`, error);
                }
            }
        }
    }

    /**
     * Dịch dữ liệu trong localStorage
     */
    async translateLocalStorageData() {
        const keysToTranslate = [
            "messages",
            "labels",
            "content",
            "texts",
            "notifications",
            "lang",
            "translations",
        ];

        for (const key of keysToTranslate) {
            try {
                const data = localStorage.getItem(key);
                if (data) {
                    const parsedData = JSON.parse(data);
                    const translatedData = await this.translateJSONRecursively(
                        parsedData
                    );

                    if (
                        JSON.stringify(translatedData) !==
                        JSON.stringify(parsedData)
                    ) {
                        localStorage.setItem(
                            key,
                            JSON.stringify(translatedData)
                        );
                        console.log(`🔄 Translated localStorage.${key}`);
                    }
                }
            } catch (error) {
                // Ignore non-JSON data
            }
        }
    }

    /**
     * Hook vào AJAX requests để dịch responses
     */
    hookAjaxRequests() {
        if (this.ajaxHooked) return;
        this.ajaxHooked = true;

        // Hook XMLHttpRequest
        const originalXHROpen = XMLHttpRequest.prototype.open;
        const originalXHRSend = XMLHttpRequest.prototype.send;
        const translator = this;

        XMLHttpRequest.prototype.open = function (method, url, ...args) {
            this._url = url;
            this._method = method;
            return originalXHROpen.apply(this, [method, url, ...args]);
        };

        XMLHttpRequest.prototype.send = function (data) {
            const xhr = this;
            const originalOnReadyStateChange = xhr.onreadystatechange;

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    // Dịch response nếu là JSON
                    translator.translateAjaxResponse(xhr);
                }

                if (originalOnReadyStateChange) {
                    originalOnReadyStateChange.apply(xhr, arguments);
                }
            };

            return originalXHRSend.apply(this, [data]);
        };

        // Hook fetch API
        const originalFetch = window.fetch;
        window.fetch = async function (url, options = {}) {
            const response = await originalFetch(url, options);

            // Clone response để có thể đọc nhiều lần
            const clonedResponse = response.clone();

            try {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    const data = await clonedResponse.json();
                    const translatedData =
                        await translator.translateJSONRecursively(data);

                    // Tạo response mới với data đã dịch
                    if (
                        JSON.stringify(translatedData) !== JSON.stringify(data)
                    ) {
                        const newResponse = new Response(
                            JSON.stringify(translatedData),
                            {
                                status: response.status,
                                statusText: response.statusText,
                                headers: response.headers,
                            }
                        );
                        return newResponse;
                    }
                }
            } catch (error) {
                // Ignore non-JSON responses
            }

            return response;
        };

        console.log("🔗 AJAX hooks installed for data translation");
    }

    /**
     * Dịch AJAX response
     */
    async translateAjaxResponse(xhr) {
        try {
            const contentType = xhr.getResponseHeader("content-type");
            if (contentType && contentType.includes("application/json")) {
                const data = JSON.parse(xhr.responseText);
                const translatedData = await this.translateJSONRecursively(
                    data
                );

                if (JSON.stringify(translatedData) !== JSON.stringify(data)) {
                    // Override responseText (read-only, so we use defineProperty)
                    Object.defineProperty(xhr, "responseText", {
                        value: JSON.stringify(translatedData),
                        writable: false,
                    });
                    console.log("🔄 Translated AJAX response");
                }
            }
        } catch (error) {
            // Ignore non-JSON responses
        }
    }

    /**
     * Dịch form elements - Tối ưu với batching
     */
    async translateFormElements() {
        const updatePromises = [];
        const elementsToTranslate = document.querySelectorAll(
            'option, button, input[type="button"], input[type="submit"], input[type="reset"], label'
        );

        for (const element of elementsToTranslate) {
            let textToTranslate = null;
            let updateCallback = null;

            if (
                element.tagName === "OPTION" ||
                element.tagName === "BUTTON" ||
                element.tagName === "LABEL"
            ) {
                textToTranslate = element.textContent?.trim();
                if (textToTranslate) {
                    updateCallback = (translated) => {
                        element.textContent = translated;
                    };
                }
            } else if (element.tagName === "INPUT" && element.value?.trim()) {
                textToTranslate = element.value.trim();
                if (textToTranslate) {
                    updateCallback = (translated) => {
                        element.value = translated;
                    };
                }
            }

            if (textToTranslate && updateCallback) {
                const promise = this.translateText(
                    textToTranslate,
                    element
                ).then((translated) => {
                    if (translated !== textToTranslate) {
                        return () => updateCallback(translated);
                    }
                    return null;
                });
                updatePromises.push(promise);
            }
        }

        await this.performSafeDOMUpdates(updatePromises);
    }

    /**
     * Dịch nội dung table - Tối ưu với batching
     */
    async translateTableContent() {
        const cellsToTranslate = document.querySelectorAll("th, td");
        const updatePromises = [];

        for (const cell of cellsToTranslate) {
            const text = cell.textContent?.trim();
            if (text && !this.isVietnamese(text)) {
                const promise = this.translateText(text, cell).then(
                    (translated) => {
                        if (translated !== text) {
                            return () => {
                                cell.textContent = translated;
                            };
                        }
                        return null;
                    }
                );
                updatePromises.push(promise);
            }
        }

        await this.performSafeDOMUpdates(updatePromises);
    }

    /**
     * Dịch JSON object recursively - Enhanced version
     */
    async translateJSONRecursively(obj, depth = 0) {
        // Giới hạn depth để tránh infinite recursion
        if (depth > 10) return obj;

        if (typeof obj === "string") {
            // Chỉ dịch string có ý nghĩa, bỏ qua URL, email, code, etc.
            if (this.shouldTranslateString(obj)) {
                return await this.translateText(obj);
            }
            return obj;
        } else if (Array.isArray(obj)) {
            // Dịch từng item trong array
            const results = [];
            for (const item of obj) {
                results.push(
                    await this.translateJSONRecursively(item, depth + 1)
                );
            }
            return results;
        } else if (obj && typeof obj === "object") {
            const result = {};
            for (const [key, value] of Object.entries(obj)) {
                // Dịch cả key nếu nó là text có ý nghĩa
                let translatedKey = key;
                if (this.shouldTranslateString(key)) {
                    translatedKey = await this.translateText(key);
                }

                // Dịch value
                result[translatedKey] = await this.translateJSONRecursively(
                    value,
                    depth + 1
                );
            }
            return result;
        }
        return obj;
    }

    /**
     * Kiểm tra có nên dịch string này không
     */
    shouldTranslateString(str) {
        if (!str || typeof str !== "string") return false;

        // Bỏ qua string quá ngắn hoặc quá dài
        if (str.length < 2 || str.length > 1000) return false;

        // Bỏ qua URL
        if (/^https?:\/\//.test(str)) return false;

        // Bỏ qua email
        if (/^[^\s]+@[^\s]+\.[^\s]+$/.test(str)) return false;

        // Bỏ qua số thuần túy
        if (/^\d+(\.\d+)?$/.test(str)) return false;

        // Bỏ qua date/time format
        if (/^\d{4}-\d{2}-\d{2}/.test(str)) return false;
        if (/^\d{1,2}\/\d{1,2}\/\d{4}/.test(str)) return false;

        // Bỏ qua CSS classes, IDs
        if (/^[a-z-_]+$/.test(str) && str.length < 20) return false;

        // Bỏ qua code-like strings
        if (/^[A-Z_]+$/.test(str)) return false;
        if (/^[a-z]+[A-Z]/.test(str)) return false; // camelCase

        // Bỏ qua hex colors
        if (/^#[0-9a-fA-F]{3,6}$/.test(str)) return false;

        // Bỏ qua nếu đã là tiếng Việt
        if (this.isVietnamese(str)) return false;

        // Chỉ dịch nếu có chữ cái tiếng Anh
        if (!/[a-zA-Z]/.test(str)) return false;

        // Bỏ qua các key thường không cần dịch
        const skipKeys = [
            "id",
            "key",
            "type",
            "status",
            "code",
            "token",
            "hash",
            "url",
            "uri",
            "path",
            "method",
            "format",
            "version",
            "timestamp",
            "created_at",
            "updated_at",
            "api_key",
            "secret",
            "password",
            "email",
            "username",
            "slug",
        ];

        if (skipKeys.includes(str.toLowerCase())) return false;

        return true;
    }

    /**
     * Kiểm tra text có phải tiếng Việt không
     */
    isVietnamese(text) {
        if (!text || typeof text !== "string") return false;

        // Các ký tự đặc trưng tiếng Việt
        const vietnameseChars =
            /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;

        // Nếu có ký tự tiếng Việt thì là tiếng Việt
        if (vietnameseChars.test(text)) return true;

        // Kiểm tra các từ tiếng Việt phổ biến không dấu
        const vietnameseWords = [
            "trang",
            "chu",
            "khoa",
            "hoc",
            "sinh",
            "vien",
            "giao",
            "vien",
            "bai",
            "hoc",
            "dang",
            "nhap",
            "dang",
            "ky",
            "luu",
            "xoa",
            "sua",
            "xem",
            "chi",
            "tiet",
            "trang",
            "thai",
            "loai",
            "danh",
            "muc",
            "gia",
            "tien",
            "thoi",
            "gian",
            "nguoi",
            "dung",
            "quan",
            "tri",
            "he",
            "thong",
            "cai",
            "dat",
        ];

        const words = text.toLowerCase().split(/\s+/);
        const vietnameseWordCount = words.filter((word) =>
            vietnameseWords.includes(word)
        ).length;

        // Nếu > 30% từ là tiếng Việt thì coi như là tiếng Việt
        return vietnameseWordCount / words.length > 0.3;
    }

    /**
     * Kiểm tra text có hoàn toàn là tiếng Việt không
     */
    isFullyVietnamese(text) {
        // Nếu text chứa ít nhất 70% ký tự tiếng Việt thì coi là tiếng Việt
        const vietnameseChars = text.match(
            /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/gi
        );
        const totalChars = text.replace(/\s/g, "").length;

        if (totalChars === 0) return false;

        const vietnameseRatio = vietnameseChars
            ? vietnameseChars.length / totalChars
            : 0;
        return vietnameseRatio > 0.3; // 30% threshold
    }

    /**
     * Sleep utility
     */
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    /**
     * Dịch thuộc tính của element
     */
    async translateElementAttributes(element) {
        const attributes = [
            "placeholder",
            "title",
            "alt",
            "aria-label",
            "data-original-title",
        ];

        for (const attr of attributes) {
            const value = element.getAttribute(attr);
            if (value && value.trim()) {
                const translatedValue = await this.translateText(
                    value.trim(),
                    element
                );
                if (translatedValue !== value.trim()) {
                    element.setAttribute(attr, translatedValue);
                    // element.classList.add("vn-translated-attr");
                }
            }
        }
    }

    /**
     * Dịch text - Tối ưu với context node để xử lý DOM an toàn
     */
    async translateText(text, contextNode = null) {
        if (!text || typeof text !== "string") return text;

        // Kiểm tra cache trước
        if (this.translatedNodes.has(text)) {
            this.statistics.cacheHits++;
            return this.translatedNodes.get(text);
        }

        let translatedText = text;
        let wasTranslated = false;

        // 1. Dịch bằng từ điển nội bộ
        translatedText = this.translateWithDictionary(text);
        if (translatedText !== text) {
            wasTranslated = true;
        }

        // 2. Dịch bằng advanced matching
        if (!wasTranslated) {
            const matchedText = this.translateWithAdvancedMatching(text);
            if (matchedText !== text) {
                translatedText = matchedText;
                wasTranslated = true;
            }
        }

        // Xác định element mục tiêu để thêm/xóa class loading
        const targetElement = contextNode
            ? contextNode.nodeType === Node.ELEMENT_NODE
                ? contextNode
                : contextNode.parentElement
            : null;

        // 3. Dịch bằng API nếu cần
        if (!wasTranslated && this.shouldTranslateWithAPI(text)) {
            try {
                // if (targetElement) {
                //     targetElement.classList.add("vn-api-translating");
                // }
                translatedText = await this.translateWithAPI(text);
                wasTranslated = true;
            } catch (error) {
                console.warn(`API translation failed for "${text}":`, error);
                this.failedApiTranslations.add(text); // Thêm vào blacklist để không thử lại
                translatedText = text; // Trả về text gốc nếu API lỗi
            } finally {
                // if (targetElement) {
                //     targetElement.classList.remove("vn-api-translating");
                // }
            }
        }

        // Lưu vào cache nếu dịch thành công
        if (wasTranslated) {
            this.translatedNodes.set(text, translatedText);
            this.statistics.totalTranslations++;
        }

        return translatedText;
    }

    /**
     * Dịch bằng từ điển nội bộ
     */
    translateWithDictionary(text) {
        // Exact match trước
        if (this.translations[text]) {
            return this.translations[text];
        }

        // Case-insensitive match
        const lowerText = text.toLowerCase();
        for (const [english, vietnamese] of Object.entries(this.translations)) {
            if (english.toLowerCase() === lowerText) {
                return vietnamese;
            }
        }

        // Partial matches (từ trong câu)
        let translatedText = text;
        for (const [english, vietnamese] of Object.entries(this.translations)) {
            const regex = new RegExp(
                `\\b${this.escapeRegex(english)}\\b`,
                "gi"
            );
            translatedText = translatedText.replace(regex, vietnamese);
        }

        return translatedText;
    }

    /**
     * Dịch bằng advanced pattern matching
     */
    translateWithAdvancedMatching(text) {
        let result = text;

        // Enhanced patterns for better coverage
        const patterns = [
            // Dates (keep as is)
            { pattern: /(\d{1,2}\/\d{1,2}\/\d{4})/g, keep: true },
            { pattern: /(\d{1,2}-\d{1,2}-\d{4})/g, keep: true },

            // Numbers with units
            {
                pattern: /(\d+)\s*(USD|VND|%|GB|MB|KB|TB)/gi,
                replacement: "$1 $2",
            },

            // Common English patterns
            { pattern: /\b(\d+)\s+items?\b/gi, replacement: "$1 mục" },
            { pattern: /\b(\d+)\s+results?\b/gi, replacement: "$1 kết quả" },
            { pattern: /\b(\d+)\s+courses?\b/gi, replacement: "$1 khóa học" },
            { pattern: /\b(\d+)\s+students?\b/gi, replacement: "$1 học viên" },
            { pattern: /\b(\d+)\s+lessons?\b/gi, replacement: "$1 bài học" },
            { pattern: /\b(\d+)\s+hours?\b/gi, replacement: "$1 giờ" },
            { pattern: /\b(\d+)\s+minutes?\b/gi, replacement: "$1 phút" },

            // Pagination
            { pattern: /\bPage\s+(\d+)\b/gi, replacement: "Trang $1" },
            { pattern: /\bof\s+(\d+)\b/gi, replacement: "của $1" },
            {
                pattern: /\bShowing\s+(\d+)\s+to\s+(\d+)\b/gi,
                replacement: "Hiển thị $1 đến $2",
            },
            {
                pattern: /\bShowing\s+(\d+)\s+of\s+(\d+)\b/gi,
                replacement: "Hiển thị $1 trong $2",
            },

            // Status and labels
            { pattern: /\bStatus:\s*(.+)/gi, replacement: "Trạng thái: $1" },
            { pattern: /\bType:\s*(.+)/gi, replacement: "Loại: $1" },
            { pattern: /\bCategory:\s*(.+)/gi, replacement: "Danh mục: $1" },
            { pattern: /\bLevel:\s*(.+)/gi, replacement: "Cấp độ: $1" },
            { pattern: /\bPrice:\s*(.+)/gi, replacement: "Giá: $1" },

            // Action patterns
            { pattern: /\bClick\s+here\b/gi, replacement: "Nhấp vào đây" },
            { pattern: /\bRead\s+more\b/gi, replacement: "Đọc thêm" },
            { pattern: /\bShow\s+all\b/gi, replacement: "Hiển thị tất cả" },
            { pattern: /\bLoad\s+more\b/gi, replacement: "Tải thêm" },
            { pattern: /\bView\s+all\b/gi, replacement: "Xem tất cả" },
            { pattern: /\bLearn\s+more\b/gi, replacement: "Tìm hiểu thêm" },
            { pattern: /\bGet\s+started\b/gi, replacement: "Bắt đầu" },
            { pattern: /\bSign\s+up\b/gi, replacement: "Đăng ký" },
            { pattern: /\bLog\s+in\b/gi, replacement: "Đăng nhập" },

            // Time expressions
            { pattern: /\b(\d+)\s+ago\b/gi, replacement: "$1 trước" },
            { pattern: /\bjust\s+now\b/gi, replacement: "vừa xong" },
            { pattern: /\ba\s+moment\s+ago\b/gi, replacement: "một lúc trước" },

            // Common phrases
            { pattern: /\bWelcome\s+to\b/gi, replacement: "Chào mừng đến với" },
            { pattern: /\bThank\s+you\b/gi, replacement: "Cảm ơn bạn" },
            { pattern: /\bPlease\s+wait\b/gi, replacement: "Vui lòng đợi" },
            { pattern: /\bComing\s+soon\b/gi, replacement: "Sắp ra mắt" },
            {
                pattern: /\bPage\s+not\s+found\b/gi,
                replacement: "Không tìm thấy trang",
            },

            // Form elements
            { pattern: /\bFirst\s+name\b/gi, replacement: "Tên" },
            { pattern: /\bLast\s+name\b/gi, replacement: "Họ" },
            { pattern: /\bFull\s+name\b/gi, replacement: "Họ tên" },
            { pattern: /\bEmail\s+address\b/gi, replacement: "Địa chỉ email" },
            { pattern: /\bPhone\s+number\b/gi, replacement: "Số điện thoại" },

            // Educational terms
            {
                pattern: /\bOnline\s+course\b/gi,
                replacement: "Khóa học trực tuyến",
            },
            {
                pattern: /\bFree\s+course\b/gi,
                replacement: "Khóa học miễn phí",
            },
            { pattern: /\bEnroll\s+now\b/gi, replacement: "Đăng ký ngay" },
            { pattern: /\bStart\s+learning\b/gi, replacement: "Bắt đầu học" },
        ];

        patterns.forEach(({ pattern, replacement, keep }) => {
            if (!keep && replacement) {
                result = result.replace(pattern, replacement);
            }
        });

        return result;
    }

    /**
     * Kiểm tra có nên dịch bằng API không
     */
    shouldTranslateWithAPI(text) {
        // Ngắt mạch nếu API lỗi liên tục
        if (this.apiTemporarilyDisabled) {
            return false;
        }

        // Không thử lại các text đã bị lỗi API
        if (this.failedApiTranslations.has(text)) {
            return false;
        }

        // Chỉ dịch các chuỗi có vẻ là tên riêng hoặc câu hoàn chỉnh
        const wordCount = text.split(/\s+/).length;
        const hasUpperCase = /[A-Z]/.test(text);
        const hasLowerCase = /[a-z]/.test(text);

        // Chỉ dịch text dài hơn 3 ký tự
        if (text.length < 3) return false;

        // Bỏ qua số, URL, email
        if (/^[\d\s\-_.,;:!@#$%^&*()+=\[\]{}|\\<>?/~`"']*$/.test(text))
            return false;
        if (/^https?:\/\//.test(text)) return false;
        if (/^[^\s]+@[^\s]+\.[^\s]+$/.test(text)) return false;

        // Chỉ dịch text có chứa chữ cái tiếng Anh
        if (!/[a-zA-Z]/.test(text)) return false;

        // Bỏ qua nếu đã là tiếng Việt
        if (this.isVietnamese(text)) return false;

        return true;
    }

    /**
     * Dịch bằng API (Google, Microsoft, etc.) - Tối ưu
     */
    async translateWithAPI(text) {
        const config = window.VN_TRANSLATOR_CONFIG?.apiTranslation;
        if (!config || !config.enabled) {
            return text; // Trả về text gốc nếu API bị tắt
        }

        const providers = this.getAvailableApiProviders(config);

        if (providers.length === 0) {
            throw new Error(
                "API translation is enabled, but no provider is configured correctly."
            );
        }

        // Thử từng provider cho đến khi thành công
        for (const provider of providers) {
            try {
                const translatedText = await this.callTranslationAPI(
                    text,
                    provider
                );
                this.apiConsecutiveFailures = 0; // Reset bộ đếm lỗi khi thành công
                return translatedText; // Trả về kết quả ngay khi thành công
            } catch (error) {
                console.warn(
                    `Provider ${provider.name} failed. Trying next...`,
                    error
                );
                this.apiConsecutiveFailures++; // Tăng bộ đếm lỗi

                // Kích hoạt ngắt mạch nếu có quá nhiều lỗi
                if (this.apiConsecutiveFailures > 5) {
                    // Ngưỡng là 5 lỗi liên tiếp
                    this.apiTemporarilyDisabled = true;
                    console.error(
                        "🚨 [Circuit Breaker] Too many consecutive API errors. Temporarily disabling API translation for this session to prevent infinite loops. Please check your API key and configuration in your Google Cloud project."
                    );
                }
            }
        }

        // Ném lỗi nếu tất cả providers đều thất bại
        throw new Error("All API translation providers failed.");
    }

    /**
     * Lấy danh sách các provider API có sẵn và đã được cấu hình
     */
    getAvailableApiProviders(config) {
        const providers = [];

        // Google Translate
        if (config.google?.enabled && config.google.apiKey) {
            providers.push({
                name: "Google",
                apiKey: config.google.apiKey,
                url: "https://translation.googleapis.com/language/translate/v2",
                buildPayload: (text, key) => ({
                    q: text,
                    source: "en",
                    target: "vi",
                    format: "text",
                    key: key,
                }),
                parse: (data) => data?.data?.translations?.[0]?.translatedText,
            });
        }

        // Microsoft Translator
        if (
            config.microsoft?.enabled &&
            config.microsoft.apiKey &&
            config.microsoft.region
        ) {
            providers.push({
                name: "Microsoft",
                apiKey: config.microsoft.apiKey,
                url: `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=vi`,
                headers: {
                    "Ocp-Apim-Subscription-Key": config.microsoft.apiKey,
                    "Ocp-Apim-Subscription-Region": config.microsoft.region,
                    "Content-type": "application/json",
                },
                buildPayload: (text) => [{ text: text }],
                parse: (data) => data?.[0]?.translations?.[0]?.text,
            });
        }

        // LibreTranslate
        if (config.libreTranslate?.enabled) {
            providers.push({
                name: "LibreTranslate",
                apiKey: config.libreTranslate.apiKey || "",
                url:
                    config.libreTranslate.url ||
                    "https://libretranslate.de/translate",
                buildPayload: (text) => ({
                    q: text,
                    source: "en",
                    target: "vi",
                }),
                parse: (data) => data?.translatedText,
            });
        }

        return providers;
    }

    /**
     * Gọi API dịch - Tối ưu
     */
    async callTranslationAPI(text, provider) {
        const { url, apiKey, buildPayload, headers: customHeaders } = provider;
        const timeout =
            window.VN_TRANSLATOR_CONFIG?.apiTranslation?.timeout || 8000;

        let body,
            endpoint = url;
        let headers = customHeaders || { "Content-Type": "application/json" };

        if (provider.name === "Google") {
            // Google dùng key trong payload hoặc query param
            body = buildPayload(text, apiKey);
            endpoint = `${url}?key=${apiKey}`; // Gửi key qua URL param an toàn hơn
        } else {
            body = buildPayload(text);
        }

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body),
                signal: AbortSignal.timeout(timeout), // AbortController for timeout
            });

            if (!response.ok) {
                const errorBody = await response.text();
                console.error(
                    `API Error ${response.status}: ${response.statusText}`,
                    {
                        provider: provider.name,
                        text: text,
                        response: errorBody,
                    }
                );
                throw new Error(
                    `API request failed with status ${response.status}: ${errorBody}`
                );
            }

            const data = await response.json();
            const translatedText = provider.parse(data);

            if (!translatedText) {
                throw new Error("No translated text found in API response");
            }

            this.statistics.apiCalls++;
            return translatedText;
        } catch (error) {
            this.statistics.errors++;
            if (error.name === "TimeoutError") {
                console.error(
                    `API request timed out for provider: ${provider.name}`,
                    { text }
                );
                throw new Error("API request timed out");
            }
            console.error(`API call failed for provider: ${provider.name}`, {
                error: error,
                text: text,
            });
            throw error; // Re-throw the error to be handled by the caller
        }
    }

    /**
     * Kiểm tra xem text có phải tiếng Việt không
     */
    isVietnamese(text) {
        // Kiểm tra ký tự tiếng Việt
        const vietnameseChars =
            /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
        return vietnameseChars.test(text);
    }

    /**
     * Kiểm tra ký tự đặc biệt
     */
    hasSpecialChars(text) {
        // Bỏ qua các text chỉ chứa số, ký tự đặc biệt, hoặc code
        const specialPattern =
            /^[\d\s\-_.,;:!@#$%^&*()+=\[\]{}|\\<>?/~`"']*$|^\w+\.\w+|^[A-Z_]+$/;
        return specialPattern.test(text);
    }

    /**
     * Escape regex special characters
     */
    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    /**
     * Thêm styles
     */
    addStyles() {
        const style = document.createElement("style");
        style.textContent = `
            .vn-translated {
                position: relative;
            }
            
            .vn-translated-attr {
                position: relative;
            }
            
            .vn-translator-toggle {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                background: #007bff;
                color: white;
                border: none;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                cursor: pointer;
                font-size: 12px;
                font-weight: bold;
                box-shadow: 0 2px 10px rgba(0,0,0,0.3);
                transition: all 0.3s ease;
            }
            
            .vn-translator-toggle:hover {
                background: #0056b3;
                transform: scale(1.1);
            }
            
            .vn-translator-toggle.disabled {
                background: #6c757d;
            }
            
            .vn-translator-status {
                position: fixed;
                top: 80px;
                right: 20px;
                z-index: 9998;
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 12px;
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
            }
            
            .vn-translator-status.show {
                opacity: 1;
            }
            
            @media (max-width: 768px) {
                .vn-translator-toggle {
                    width: 40px;
                    height: 40px;
                    font-size: 10px;
                    top: 10px;
                    right: 10px;
                }
                
                .vn-translator-status {
                    top: 60px;
                    right: 10px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Thêm nút toggle
     */
    addToggleButton() {
        // Đã vô hiệu hóa theo yêu cầu
        return;

        if (!window.VN_TRANSLATOR_CONFIG?.UI?.showToggleButton) return;

        let button = document.querySelector(".vn-translator-toggle");
        if (!button) {
            button = document.createElement("button");
            button.className = "vn-translator-toggle";
            button.innerHTML = "VN<br>🌐";
            button.title = "Toggle Vietnamese Translator";

            const status = document.createElement("div");
            status.className = "vn-translator-status";
            status.textContent = "Vietnamese Translator: ON";

            button.addEventListener("click", () => {
                this.toggle();
                button.classList.toggle("disabled", !this.isEnabled);
                status.textContent = `Vietnamese Translator: ${
                    this.isEnabled ? "ON" : "OFF"
                }`;
                status.classList.add("show");
                setTimeout(() => status.classList.remove("show"), 2000);
            });

            document.body.appendChild(button);
            document.body.appendChild(status);
        }
    }

    /**
     * Toggle translator
     */
    toggle() {
        this.isEnabled = !this.isEnabled;

        if (this.isEnabled) {
            // Bật lại và dịch trang
            this.translatePage();
            console.log("Vietnamese Translator enabled");
        } else {
            console.log("Vietnamese Translator disabled");
        }
    }

    /**
     * Thêm từ dịch mới
     */
    addTranslation(english, vietnamese) {
        this.translations[english] = vietnamese;
    }

    /**
     * Thêm nhiều từ dịch
     */
    addTranslations(translations) {
        Object.assign(this.translations, translations);
    }

    /**
     * Hiển thị loading indicator
     */
    showLoadingIndicator() {
        // Tạm thời vô hiệu hóa để ẩn progress bar
        return;

        let container = document.querySelector(".vn-progress-container");
        if (!container) {
            container = document.createElement("div");
            container.className = "vn-progress-container";
            document.body.appendChild(container);
        }

        container.innerHTML = `
            <div class="vn-progress-fill"></div>
            <div class="vn-progress-text">Đang dịch trang...</div>
        `;
        container.style.display = "block";
    }

    /**
     * Ẩn loading indicator
     */
    hideLoadingIndicator() {
        const button = document.querySelector(".vn-translator-toggle");
        if (button) {
            button.classList.remove("processing");
            button.innerHTML = "VN<br>🌐";
        }

        const progressBar = document.querySelector(".vn-progress-bar");
        if (progressBar) {
            progressBar.style.display = "none";
        }
    }

    /**
     * Hiển thị thông báo thành công
     */
    showSuccessMessage() {
        this.showMessage(
            `✅ Đã dịch ${this.statistics.totalTranslated} đoạn text thành công!`,
            "success"
        );
    }

    /**
     * Hiển thị thông báo lỗi
     */
    showErrorMessage() {
        this.showMessage("❌ Có lỗi xảy ra khi dịch trang", "error");
    }

    /**
     * Hiển thị thông báo
     */
    showMessage(text, type = "info") {
        let messageContainer = document.querySelector(".vn-message-container");
        if (!messageContainer) {
            messageContainer = document.createElement("div");
            messageContainer.className = "vn-message-container";
            document.body.appendChild(messageContainer);
        }

        const message = document.createElement("div");
        message.className = `vn-message vn-message-${type}`;
        message.textContent = text;

        messageContainer.appendChild(message);

        // Auto remove after 3 seconds
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 3000);
    }

    /**
     * Hiển thị thống kê
     */
    showStatistics() {
        const stats = this.getStatistics();
        let statsPanel = document.querySelector(".vn-translator-stats");

        if (!statsPanel) {
            statsPanel = document.createElement("div");
            statsPanel.className = "vn-translator-stats";
            document.body.appendChild(statsPanel);
        }

        statsPanel.innerHTML = `
            <h4>📊 Thống kê dịch thuật</h4>
            <div class="stat-item">
                <span class="stat-label">Tổng số đã dịch:</span>
                <span class="stat-value">${stats.totalTranslated}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Từ điển nội bộ:</span>
                <span class="stat-value">${stats.dictionaryHits}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">API calls:</span>
                <span class="stat-value">${stats.apiCalls}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Thời gian hoạt động:</span>
                <span class="stat-value">${Math.round(
                    (Date.now() - stats.startTime) / 1000
                )}s</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Cache size:</span>
                <span class="stat-value">${this.translatedNodes.size}</span>
            </div>
            <button class="close-btn" onclick="this.parentElement.classList.remove('show')">&times;</button>
        `;

        statsPanel.classList.add("show");
    }

    /**
     * Lấy thống kê
     */
    getStatistics() {
        return {
            ...this.statistics,
            cacheSize: this.translatedNodes.size,
            uptime: Date.now() - this.statistics.startTime,
        };
    }

    /**
     * Bật/tắt API translation
     */
    toggleAPITranslation() {
        this.apiTranslationEnabled = !this.apiTranslationEnabled;
        const status = this.apiTranslationEnabled ? "BẬT" : "TẮT";
        this.showMessage(`API Translation: ${status}`, "info");

        // Lưu vào localStorage
        localStorage.setItem(
            "vn-api-translation",
            this.apiTranslationEnabled.toString()
        );
    }

    /**
     * Revert tất cả translations
     */
    revertAllTranslations() {
        // Revert text nodes
        document.querySelectorAll("[data-vn-original]").forEach((element) => {
            const original = element.getAttribute("data-vn-original");
            if (original && element.textContent) {
                element.textContent = original;
                element.removeAttribute("data-vn-original");
                element.removeAttribute("data-vn-translated");
                element.classList.remove("vn-translated");
            }
        });

        // Clear cache
        this.translatedNodes.clear();
        this.processedNodes = new WeakSet();

        // Reset statistics
        this.statistics = {
            totalTranslated: 0,
            apiCalls: 0,
            dictionaryHits: 0,
            startTime: Date.now(),
        };

        this.showMessage("🔄 Đã khôi phục tất cả text gốc", "info");
    }

    /**
     * Export translations cache
     */
    exportTranslationsCache() {
        const cache = {};
        for (const [key, value] of this.translatedNodes.entries()) {
            cache[key] = value;
        }

        const dataStr = JSON.stringify(cache, null, 2);
        const dataBlob = new Blob([dataStr], { type: "application/json" });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(dataBlob);
        link.download = "vietnamese-translations-cache.json";
        link.click();

        this.showMessage("📥 Đã xuất cache dịch thuật", "success");
    }

    /**
     * Import translations cache
     */
    importTranslationsCache(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const cache = JSON.parse(e.target.result);
                for (const [key, value] of Object.entries(cache)) {
                    this.translatedNodes.set(key, value);
                }
                this.showMessage(
                    `📤 Đã nhập ${Object.keys(cache).length} bản dịch`,
                    "success"
                );
            } catch (error) {
                this.showMessage("❌ Lỗi khi nhập cache", "error");
            }
        };
        reader.readAsText(file);
    }

    /**
     * Lấy từ điển dịch thuật
     */
    getTranslations() {
        return this.translations;
    }

    /**
     * Dừng observer
     */
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }

        // Xóa UI elements
        const elementsToRemove = [
            ".vn-translator-toggle",
            ".vn-translator-status",
            ".vn-translator-stats",
            ".vn-progress-bar",
            ".vn-message-container",
        ];

        elementsToRemove.forEach((selector) => {
            const element = document.querySelector(selector);
            if (element) element.remove();
        });

        console.log("Vietnamese Translator destroyed");
    }
}

// Khởi tạo khi DOM ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        window.vietnameseTranslator = new VietnameseTranslator();
    });
} else {
    window.vietnameseTranslator = new VietnameseTranslator();
}

// Export cho module systems
if (typeof module !== "undefined" && module.exports) {
    module.exports = VietnameseTranslator;
}

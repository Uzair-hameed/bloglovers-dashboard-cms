// data.js - Mock Data and Storage Management

// Mock posts data
const mockPosts = [
    {
        id: 1,
        title: "Getting Started with Bloglovers CMS",
        content: "<p>Welcome to Bloglovers CMS! This is a powerful content management system designed specifically for bloggers.</p><p>With our intuitive interface and advanced features, you can create stunning blog posts with ease.</p>",
        author: "Admin",
        status: "published",
        views: 1245,
        comments: 24,
        likes: 89,
        labels: ["Tutorial", "CMS", "Blogging"],
        featuredImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600",
        publishedDate: "2023-10-15T10:30:00",
        lastModified: "2023-10-15T10:30:00",
        allowComments: true,
        isFeatured: true,
        excerpt: "Learn how to get started with the Bloglovers CMS platform and create your first blog post."
    },
    {
        id: 2,
        title: "Advanced Blogging Techniques",
        content: "<h2>Master the Art of Blogging</h2><p>In this post, we'll explore advanced techniques that will take your blogging to the next level.</p><ul><li>Content optimization</li><li>Audience engagement</li><li>Monetization strategies</li></ul>",
        author: "Admin",
        status: "published",
        views: 892,
        comments: 18,
        likes: 67,
        labels: ["Blogging", "Tips", "Advanced"],
        featuredImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w-600",
        publishedDate: "2023-10-10T14:20:00",
        lastModified: "2023-10-12T09:15:00",
        allowComments: true,
        isFeatured: false,
        excerpt: "Discover advanced blogging techniques that will help you grow your audience and increase engagement."
    },
    {
        id: 3,
        title: "SEO Optimization for Beginners",
        content: "<p>Search Engine Optimization is crucial for any blog's success. Learn the basics in this comprehensive guide.</p><h3>Key SEO Factors</h3><p>From keywords to backlinks, we cover everything you need to know.</p>",
        author: "Admin",
        status: "draft",
        views: 0,
        comments: 0,
        likes: 0,
        labels: ["SEO", "Marketing", "Beginners"],
        featuredImage: "",
        publishedDate: "",
        lastModified: "2023-10-18T16:45:00",
        allowComments: true,
        isFeatured: false,
        excerpt: "A beginner's guide to SEO optimization for bloggers looking to improve their search engine rankings."
    },
    {
        id: 4,
        title: "Upcoming Features Preview",
        content: "<p>We're excited to announce several new features coming to Bloglovers CMS in the next update!</p><h2>What's Coming</h2><ul><li>AI-powered content suggestions</li><li>Enhanced analytics dashboard</li><li>Social media integration</li></ul>",
        author: "Admin",
        status: "scheduled",
        views: 0,
        comments: 0,
        likes: 0,
        labels: ["Announcement", "Update", "Features"],
        featuredImage: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600",
        publishedDate: "2023-10-20T09:00:00",
        lastModified: "2023-10-17T11:30:00",
        allowComments: true,
        isFeatured: true,
        excerpt: "Get a sneak peek at the exciting new features coming to Bloglovers CMS in our next major update."
    }
];

// Mock media library
const mockMedia = [
    {
        id: 1,
        filename: "blog-image-1.jpg",
        url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600",
        type: "image/jpeg",
        size: "245 KB",
        uploaded: "2023-10-15",
        dimensions: "1200x800"
    },
    {
        id: 2,
        filename: "featured-banner.png",
        url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600",
        type: "image/png",
        size: "180 KB",
        uploaded: "2023-10-10",
        dimensions: "1920x1080"
    },
    {
        id: 3,
        filename: "tutorial-screenshot.jpg",
        url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600",
        type: "image/jpeg",
        size: "320 KB",
        uploaded: "2023-10-05",
        dimensions: "1600x900"
    }
];

// Mock labels/categories
const mockLabels = [
    { id: 1, name: "Technology", count: 12, color: "#3b82f6" },
    { id: 2, name: "Blogging", count: 8, color: "#10b981" },
    { id: 3, name: "Web Development", count: 15, color: "#8b5cf6" },
    { id: 4, name: "Design", count: 7, color: "#f59e0b" },
    { id: 5, name: "Marketing", count: 9, color: "#ef4444" },
    { id: 6, name: "SEO", count: 11, color: "#06b6d4" },
    { id: 7, name: "Content Creation", count: 6, color: "#ec4899" },
    { id: 8, name: "Social Media", count: 5, color: "#84cc16" }
];

// Mock analytics data
const mockAnalytics = {
    totalViews: 45289,
    totalPosts: 12,
    totalComments: 328,
    totalLikes: 1245,
    monthlyData: [
        { month: "Jan", views: 3200, visitors: 2450 },
        { month: "Feb", views: 3800, visitors: 2900 },
        { month: "Mar", views: 4200, visitors: 3200 },
        { month: "Apr", views: 5100, visitors: 3800 },
        { month: "May", views: 6200, visitors: 4500 },
        { month: "Jun", views: 7300, visitors: 5200 },
        { month: "Jul", views: 8200, visitors: 5800 },
        { month: "Aug", views: 9100, visitors: 6200 }
    ],
    popularPosts: [
        { title: "Getting Started with Bloglovers CMS", views: 1245 },
        { title: "Advanced Blogging Techniques", views: 892 },
        { title: "Web Design Trends 2023", views: 765 },
        { title: "Content Marketing Strategies", views: 621 },
        { title: "Social Media Tips", views: 543 }
    ],
    trafficSources: [
        { source: "Organic Search", percentage: 45 },
        { source: "Social Media", percentage: 25 },
        { source: "Direct", percentage: 15 },
        { source: "Referral", percentage: 10 },
        { source: "Email", percentage: 5 }
    ]
};

// Local storage keys
const STORAGE_KEYS = {
    POSTS: 'bloglovers_posts',
    MEDIA: 'bloglovers_media',
    SETTINGS: 'bloglovers_settings',
    DRAFTS: 'bloglovers_drafts'
};

// Data management functions
function getPosts() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.POSTS);
        return stored ? JSON.parse(stored) : [...mockPosts];
    } catch (error) {
        console.error('Error loading posts:', error);
        return [...mockPosts];
    }
}

function savePosts(posts) {
    try {
        localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
        return true;
    } catch (error) {
        console.error('Error saving posts:', error);
        return false;
    }
}

function getMedia() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.MEDIA);
        return stored ? JSON.parse(stored) : [...mockMedia];
    } catch (error) {
        console.error('Error loading media:', error);
        return [...mockMedia];
    }
}

function saveMedia(media) {
    try {
        localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(media));
        return true;
    } catch (error) {
        console.error('Error saving media:', error);
        return false;
    }
}

function getSettings() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        return stored ? JSON.parse(stored) : {
            siteTitle: "My Blog",
            siteDescription: "A blog powered by Bloglovers CMS",
            theme: "dark",
            language: "en",
            timezone: "UTC",
            postsPerPage: 10,
            allowComments: true,
            commentModeration: false,
            socialSharing: true,
            analyticsCode: ""
        };
    } catch (error) {
        console.error('Error loading settings:', error);
        return null;
    }
}

function saveSettings(settings) {
    try {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
        return true;
    } catch (error) {
        console.error('Error saving settings:', error);
        return false;
    }
}

function getDrafts() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.DRAFTS);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Error loading drafts:', error);
        return [];
    }
}

function saveDrafts(drafts) {
    try {
        localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(drafts));
        return true;
    } catch (error) {
        console.error('Error saving drafts:', error);
        return false;
    }
}

// Post CRUD operations
function createPost(post) {
    const posts = getPosts();
    const newPost = {
        ...post,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        views: 0,
        comments: 0,
        likes: 0
    };
    
    posts.unshift(newPost);
    savePosts(posts);
    return newPost;
}

function updatePost(id, updates) {
    const posts = getPosts();
    const index = posts.findIndex(post => post.id === id);
    
    if (index !== -1) {
        posts[index] = {
            ...posts[index],
            ...updates,
            lastModified: new Date().toISOString()
        };
        savePosts(posts);
        return posts[index];
    }
    
    return null;
}

function deletePost(id) {
    const posts = getPosts();
    const filteredPosts = posts.filter(post => post.id !== id);
    savePosts(filteredPosts);
    return filteredPosts.length !== posts.length;
}

function getPost(id) {
    const posts = getPosts();
    return posts.find(post => post.id === id);
}

function searchPosts(query) {
    const posts = getPosts();
    query = query.toLowerCase();
    
    return posts.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.labels.some(label => label.toLowerCase().includes(query))
    );
}

// Media operations
function uploadMedia(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const mediaItems = getMedia();
            const newMedia = {
                id: Date.now(),
                filename: file.name,
                url: e.target.result,
                type: file.type,
                size: formatFileSize(file.size),
                uploaded: new Date().toISOString().split('T')[0],
                dimensions: "Unknown"
            };
            
            // For images, try to get dimensions
            if (file.type.startsWith('image/')) {
                const img = new Image();
                img.onload = function() {
                    newMedia.dimensions = `${this.width}x${this.height}`;
                    mediaItems.unshift(newMedia);
                    saveMedia(mediaItems);
                    resolve(newMedia);
                };
                img.onerror = function() {
                    mediaItems.unshift(newMedia);
                    saveMedia(mediaItems);
                    resolve(newMedia);
                };
                img.src = e.target.result;
            } else {
                mediaItems.unshift(newMedia);
                saveMedia(mediaItems);
                resolve(newMedia);
            }
        };
        
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Export data
function exportData(format = 'json') {
    const data = {
        posts: getPosts(),
        media: getMedia(),
        settings: getSettings(),
        drafts: getDrafts(),
        exportDate: new Date().toISOString(),
        exportVersion: '1.0'
    };
    
    switch(format) {
        case 'json':
            return JSON.stringify(data, null, 2);
        case 'csv':
            // Convert posts to CSV
            const posts = data.posts;
            if (posts.length === 0) return '';
            
            const headers = Object.keys(posts[0]).join(',');
            const rows = posts.map(post => 
                Object.values(post).map(value => 
                    typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value
                ).join(',')
            );
            
            return [headers, ...rows].join('\n');
        default:
            return data;
    }
}

// Import data
function importData(data, type = 'json') {
    try {
        let parsedData;
        
        if (type === 'json') {
            parsedData = JSON.parse(data);
        } else {
            // Handle other formats if needed
            return false;
        }
        
        if (parsedData.posts) {
            savePosts(parsedData.posts);
        }
        
        if (parsedData.media) {
            saveMedia(parsedData.media);
        }
        
        if (parsedData.settings) {
            saveSettings(parsedData.settings);
        }
        
        if (parsedData.drafts) {
            saveDrafts(parsedData.drafts);
        }
        
        return true;
    } catch (error) {
        console.error('Error importing data:', error);
        return false;
    }
}

// Initialize storage with mock data if empty
function initializeStorage() {
    if (!localStorage.getItem(STORAGE_KEYS.POSTS)) {
        savePosts(mockPosts);
    }
    
    if (!localStorage.getItem(STORAGE_KEYS.MEDIA)) {
        saveMedia(mockMedia);
    }
    
    if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
        saveSettings(getSettings());
    }
}

// Call initialization
initializeStorage();
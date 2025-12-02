// script.js - Main JavaScript for Bloglovers Dashboard CMS

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initDashboard();
    
    // Simulate loading
    setTimeout(() => {
        document.querySelector('.loading-screen').classList.add('hidden');
        document.querySelector('.dashboard-container').style.opacity = '1';
    }, 1000);
});

function initDashboard() {
    // Navigation
    setupNavigation();
    
    // Theme toggle
    setupThemeToggle();
    
    // Editor functionality
    setupEditor();
    
    // Modals
    setupModals();
    
    // Load initial data
    loadDashboardData();
    loadLabels();
    
    // Setup event listeners
    setupEventListeners();
}

function setupNavigation() {
    const navItems = document.querySelectorAll('.main-nav li');
    const contentSections = document.querySelectorAll('.content-section');
    const pageTitle = document.getElementById('page-title');
    const currentPage = document.getElementById('current-page');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            
            // Update active navigation item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding section
            contentSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === `${sectionId}-section`) {
                    section.classList.add('active');
                    
                    // Update page title
                    const sectionName = this.querySelector('span').textContent;
                    pageTitle.textContent = sectionName;
                    currentPage.textContent = sectionName;
                    
                    // Load section data if needed
                    if (sectionId === 'posts') {
                        loadPostsTable();
                    } else if (sectionId === 'media') {
                        loadMediaLibrary();
                    }
                }
            });
            
            // Add animation effect
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'pulse 0.5s ease';
            }, 10);
        });
    });
}

function setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        
        if (document.body.classList.contains('light-theme')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            document.documentElement.style.setProperty('--bg-dark', '#f8fafc');
            document.documentElement.style.setProperty('--bg-card', '#ffffff');
            document.documentElement.style.setProperty('--bg-sidebar', '#f1f5f9');
            document.documentElement.style.setProperty('--text-primary', '#1e293b');
            document.documentElement.style.setProperty('--text-secondary', '#475569');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            document.documentElement.style.setProperty('--bg-dark', '#0f172a');
            document.documentElement.style.setProperty('--bg-card', '#1e293b');
            document.documentElement.style.setProperty('--bg-sidebar', '#111827');
            document.documentElement.style.setProperty('--text-primary', '#f8fafc');
            document.documentElement.style.setProperty('--text-secondary', '#cbd5e1');
        }
        
        // Add animation effect
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
}

function setupEditor() {
    // Title character counter
    const titleInput = document.getElementById('post-title');
    const titleCharCount = document.querySelector('.title-char-count');
    
    titleInput.addEventListener('input', function() {
        const count = this.value.length;
        titleCharCount.textContent = `${count}/100`;
        
        if (count > 90) {
            titleCharCount.style.color = 'var(--warning-color)';
        } else if (count > 95) {
            titleCharCount.style.color = 'var(--danger-color)';
        } else {
            titleCharCount.style.color = 'var(--text-muted)';
        }
    });
    
    // Word and character count
    const editorContent = document.getElementById('editor-content');
    const wordCount = document.querySelector('.word-count span');
    const charCount = document.querySelector('.char-count span');
    
    editorContent.addEventListener('input', function() {
        const text = this.textContent || "";
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const chars = text.length;
        
        wordCount.textContent = words;
        charCount.textContent = chars;
    });
    
    // Save draft button
    document.getElementById('save-draft').addEventListener('click', function() {
        savePost('draft');
        showNotification('Post saved as draft!', 'success');
    });
    
    // Preview button
    document.getElementById('preview-post').addEventListener('click', function() {
        previewPost();
    });
    
    // Publish button
    document.getElementById('publish-post').addEventListener('click', function() {
        publishPost();
    });
    
    // Featured image upload
    const imageUploadArea = document.getElementById('image-upload-area');
    const featuredImageInput = document.getElementById('featured-image');
    const imageOptions = document.getElementById('image-options');
    
    imageUploadArea.addEventListener('click', () => featuredImageInput.click());
    
    featuredImageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imageUploadArea.innerHTML = `
                    <img src="${e.target.result}" alt="Featured Image" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">
                    <div class="image-overlay">
                        <button class="btn btn-sm btn-outline change-image">Change</button>
                        <button class="btn btn-sm btn-danger remove-image">Remove</button>
                    </div>
                `;
                imageOptions.style.display = 'block';
                
                // Add event listeners to new buttons
                imageUploadArea.querySelector('.change-image').addEventListener('click', () => {
                    featuredImageInput.click();
                });
                
                imageUploadArea.querySelector('.remove-image').addEventListener('click', () => {
                    imageUploadArea.innerHTML = `
                        <i class="fas fa-cloud-upload-alt"></i>
                        <p>Click to upload featured image</p>
                    `;
                    imageOptions.style.display = 'none';
                    featuredImageInput.value = '';
                });
            };
            reader.readAsDataURL(file);
        }
    });
}

function setupModals() {
    // Image modal
    const imageModal = document.getElementById('image-modal');
    const insertImageBtn = document.getElementById('insert-image');
    const modalCloses = document.querySelectorAll('.modal-close');
    
    insertImageBtn.addEventListener('click', () => {
        imageModal.classList.add('active');
    });
    
    // Video modal
    const videoModal = document.getElementById('video-modal');
    const insertVideoBtn = document.getElementById('insert-video');
    
    insertVideoBtn.addEventListener('click', () => {
        videoModal.classList.add('active');
    });
    
    // Special characters modal
    const charsModal = document.getElementById('chars-modal');
    const specialCharsBtn = document.getElementById('special-chars');
    
    specialCharsBtn.addEventListener('click', () => {
        charsModal.classList.add('active');
        loadSpecialCharacters();
    });
    
    // Close modals
    modalCloses.forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').classList.remove('active');
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });
    
    // Image upload options
    const uploadOptions = document.querySelectorAll('.upload-option');
    const imageDropZone = document.getElementById('image-drop-zone');
    const imageFileInput = document.getElementById('image-file-input');
    
    uploadOptions.forEach(option => {
        option.addEventListener('click', function() {
            uploadOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const optionType = this.getAttribute('data-option');
            showImageUploadOption(optionType);
        });
    });
    
    // Drag and drop for images
    imageDropZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('drag-over');
    });
    
    imageDropZone.addEventListener('dragleave', function() {
        this.classList.remove('drag-over');
    });
    
    imageDropZone.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('drag-over');
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            insertImageIntoEditor(file);
        }
    });
    
    // Browse for image
    imageDropZone.querySelector('.browse-link').addEventListener('click', () => {
        imageFileInput.click();
    });
    
    imageFileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            insertImageIntoEditor(file);
        }
    });
    
    // Video options
    const videoOptions = document.querySelectorAll('.video-option');
    
    videoOptions.forEach(option => {
        option.addEventListener('click', function() {
            videoOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Insert video
    document.getElementById('insert-video-btn').addEventListener('click', function() {
        const videoUrl = document.getElementById('video-url').value;
        if (videoUrl) {
            insertVideoIntoEditor(videoUrl);
            videoModal.classList.remove('active');
        }
    });
}

function showImageUploadOption(option) {
    const uploadArea = document.querySelector('.image-upload-area');
    const dropZone = document.getElementById('image-drop-zone');
    const urlInput = document.querySelector('.image-url-input');
    const mediaLibrary = document.querySelector('.media-library');
    
    switch(option) {
        case 'upload':
            dropZone.style.display = 'flex';
            urlInput.style.display = 'none';
            mediaLibrary.style.display = 'none';
            break;
        case 'url':
            dropZone.style.display = 'none';
            urlInput.style.display = 'block';
            mediaLibrary.style.display = 'none';
            break;
        case 'library':
            dropZone.style.display = 'none';
            urlInput.style.display = 'none';
            mediaLibrary.style.display = 'block';
            loadMediaLibrary();
            break;
    }
}

function insertImageIntoEditor(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.style.maxWidth = '100%';
        img.style.borderRadius = '8px';
        
        const editor = document.getElementById('editor-content');
        editor.focus();
        document.execCommand('insertHTML', false, img.outerHTML);
        
        // Close modal
        document.getElementById('image-modal').classList.remove('active');
        
        showNotification('Image inserted successfully!', 'success');
    };
    reader.readAsDataURL(file);
}

function insertVideoIntoEditor(url) {
    let embedCode = '';
    
    // Check if it's a YouTube URL
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        if (videoId) {
            embedCode = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId[1]}" frameborder="0" allowfullscreen></iframe>`;
        }
    }
    // Check if it's a Vimeo URL
    else if (url.includes('vimeo.com')) {
        const videoId = url.match(/vimeo\.com\/(\d+)/);
        if (videoId) {
            embedCode = `<iframe src="https://player.vimeo.com/video/${videoId[1]}" width="560" height="315" frameborder="0" allowfullscreen></iframe>`;
        }
    }
    
    // If we couldn't create an embed code, just insert the URL
    if (!embedCode) {
        embedCode = `<a href="${url}" target="_blank">${url}</a>`;
    }
    
    const editor = document.getElementById('editor-content');
    editor.focus();
    document.execCommand('insertHTML', false, embedCode);
    
    showNotification('Video inserted successfully!', 'success');
}

function loadSpecialCharacters() {
    const specialChars = [
        '©', '®', '™', '€', '£', '¥', '¢', '§', '¶', '†',
        '‡', '•', '‣', '◦', '‹', '›', '«', '»', '‐', '–',
        '—', '―', '‗', '‘', '‚', '‛', '“', '„', '‟', '′',
        '″', '‴', '‵', '‶', '‷', '⁂', '‡', '‰', '‱', '※',
        '‼', '‽', '‾', '⁇', '⁈', '⁉', '⁊', '⁋', '⁌', '⁍'
    ];
    
    const charsGrid = document.querySelector('.special-chars-grid');
    charsGrid.innerHTML = '';
    
    specialChars.forEach(char => {
        const charItem = document.createElement('div');
        charItem.className = 'char-item hover-grow';
        charItem.textContent = char;
        charItem.title = `Insert ${char}`;
        
        charItem.addEventListener('click', function() {
            const editor = document.getElementById('editor-content');
            editor.focus();
            document.execCommand('insertText', false, char);
            document.getElementById('chars-modal').classList.remove('active');
        });
        
        charsGrid.appendChild(charItem);
    });
}

function loadDashboardData() {
    // Load recent posts for dashboard
    const postsTable = document.querySelector('.posts-table');
    const posts = getRecentPosts();
    
    let html = `
        <div class="table-header">
            <div class="table-row">
                <div class="table-cell">Title</div>
                <div class="table-cell">Status</div>
                <div class="table-cell">Views</div>
                <div class="table-cell">Published</div>
                <div class="table-cell">Actions</div>
            </div>
        </div>
        <div class="table-body">
    `;
    
    posts.forEach(post => {
        const statusClass = post.status === 'published' ? 'status-published' : 
                          post.status === 'draft' ? 'status-draft' : 'status-scheduled';
        
        html += `
            <div class="table-row">
                <div class="table-cell">
                    <strong>${post.title}</strong>
                    <div class="post-labels">${post.labels.map(label => `<span class="label-tag">${label}</span>`).join('')}</div>
                </div>
                <div class="table-cell">
                    <span class="status-badge ${statusClass}">${post.status}</span>
                </div>
                <div class="table-cell">${post.views.toLocaleString()}</div>
                <div class="table-cell">${formatDate(post.published)}</div>
                <div class="table-cell">
                    <button class="action-btn edit-btn" data-id="${post.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" data-id="${post.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    html += `</div>`;
    postsTable.innerHTML = html;
    
    // Add event listeners to action buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const postId = this.getAttribute('data-id');
            editPost(postId);
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const postId = this.getAttribute('data-id');
            deletePost(postId);
        });
    });
}

function loadLabels() {
    const labels = [
        'Technology', 'Blogging', 'Web Development', 'Design',
        'Marketing', 'SEO', 'Content Creation', 'Social Media'
    ];
    
    const labelsContainer = document.querySelector('.labels-container');
    labelsContainer.innerHTML = '';
    
    labels.forEach(label => {
        const labelTag = document.createElement('span');
        labelTag.className = 'label-tag';
        labelTag.textContent = label;
        labelTag.addEventListener('click', function() {
            addLabelToPost(label);
        });
        labelsContainer.appendChild(labelTag);
    });
}

function addLabelToPost(label) {
    const labelsInput = document.getElementById('post-labels');
    const currentLabels = labelsInput.value.split(',').map(l => l.trim()).filter(l => l);
    
    if (!currentLabels.includes(label)) {
        currentLabels.push(label);
        labelsInput.value = currentLabels.join(', ');
    }
}

function loadPostsTable() {
    // Similar to loadDashboardData but for the posts section
    const postsTableContainer = document.querySelector('.posts-table-container');
    postsTableContainer.innerHTML = '<p>Loading posts...</p>';
    
    // Simulate API call
    setTimeout(() => {
        postsTableContainer.innerHTML = `
            <div class="posts-table">
                <div class="table-header">
                    <div class="table-row">
                        <div class="table-cell">Title</div>
                        <div class="table-cell">Author</div>
                        <div class="table-cell">Status</div>
                        <div class="table-cell">Comments</div>
                        <div class="table-cell">Published</div>
                        <div class="table-cell">Actions</div>
                    </div>
                </div>
                <div class="table-body">
                    <div class="table-row">
                        <div class="table-cell">
                            <strong>Getting Started with Bloglovers CMS</strong>
                            <div class="post-labels">
                                <span class="label-tag">Tutorial</span>
                                <span class="label-tag">CMS</span>
                            </div>
                        </div>
                        <div class="table-cell">Admin</div>
                        <div class="table-cell">
                            <span class="status-badge status-published">Published</span>
                        </div>
                        <div class="table-cell">24</div>
                        <div class="table-cell">2023-10-15</div>
                        <div class="table-cell">
                            <button class="action-btn edit-btn">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="action-btn view-btn">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }, 500);
}

function loadMediaLibrary() {
    // This would load media items from storage/API
    // For now, we'll just show a message
    const mediaGrid = document.querySelector('.media-grid');
    if (mediaGrid) {
        mediaGrid.innerHTML = `
            <div class="media-empty">
                <i class="fas fa-cloud-upload-alt"></i>
                <p>No media items yet. Upload some images!</p>
            </div>
        `;
    }
}

function savePost(status) {
    const post = {
        id: Date.now(),
        title: document.getElementById('post-title').value,
        content: document.getElementById('editor-content').innerHTML,
        labels: document.getElementById('post-labels').value.split(',').map(l => l.trim()).filter(l => l),
        searchDesc: document.getElementById('search-desc').value,
        publishDate: document.getElementById('publish-date').value || new Date().toISOString().slice(0, 16),
        status: status || document.getElementById('post-status').value,
        allowComments: document.getElementById('allow-comments').checked,
        featured: document.getElementById('featured-post').checked,
        createdAt: new Date().toISOString()
    };
    
    // In a real app, this would save to localStorage or an API
    console.log('Saving post:', post);
    
    return post;
}

function previewPost() {
    const post = savePost('draft');
    
    // Open preview in new window
    const previewWindow = window.open('', '_blank');
    previewWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Preview: ${post.title}</title>
            <style>
                body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
                .post-title { font-size: 2.5em; margin-bottom: 20px; }
                .post-meta { color: #666; margin-bottom: 30px; }
                .post-content { line-height: 1.8; }
                .post-labels { margin-top: 30px; }
                .label { display: inline-block; background: #eee; padding: 5px 10px; margin-right: 5px; border-radius: 3px; }
            </style>
        </head>
        <body>
            <h1 class="post-title">${post.title}</h1>
            <div class="post-meta">
                Published on ${new Date(post.publishDate).toLocaleDateString()} | 
                Status: ${post.status} | 
                ${post.allowComments ? 'Comments allowed' : 'Comments disabled'}
            </div>
            <div class="post-content">${post.content}</div>
            <div class="post-labels">
                ${post.labels.map(label => `<span class="label">${label}</span>`).join('')}
            </div>
        </body>
        </html>
    `);
    previewWindow.document.close();
}

function publishPost() {
    const post = savePost('published');
    
    // In a real app, this would send to an API
    console.log('Publishing post:', post);
    
    showNotification('Post published successfully!', 'success');
    
    // Reset form
    document.getElementById('post-title').value = '';
    document.getElementById('editor-content').innerHTML = '';
    document.getElementById('post-labels').value = '';
    document.getElementById('search-desc').value = '';
    
    // Update dashboard
    loadDashboardData();
}

function editPost(postId) {
    // In a real app, this would load the post from storage/API
    console.log('Editing post:', postId);
    
    // Switch to editor section
    document.querySelector('[data-section="create-post"]').click();
    
    // Fill form with post data (mock data for demo)
    document.getElementById('post-title').value = 'Sample Post Title';
    document.getElementById('editor-content').innerHTML = '<p>This is a sample post content.</p>';
    document.getElementById('post-labels').value = 'Sample, Demo, Post';
    document.getElementById('search-desc').value = 'This is a sample post for demonstration purposes.';
    
    showNotification('Post loaded for editing', 'info');
}

function deletePost(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
        // In a real app, this would delete from storage/API
        console.log('Deleting post:', postId);
        showNotification('Post deleted successfully!', 'success');
        
        // Update dashboard
        setTimeout(() => {
            loadDashboardData();
        }, 500);
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', function() {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
}

function setupEventListeners() {
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchPosts(this.value);
        }
    });
    
    // Publish button in header
    document.querySelector('.publish-btn').addEventListener('click', function() {
        document.querySelector('[data-section="create-post"]').click();
    });
    
    // Text and background color pickers
    document.getElementById('text-color').addEventListener('click', function() {
        showColorPicker('text');
    });
    
    document.getElementById('bg-color').addEventListener('click', function() {
        showColorPicker('background');
    });
    
    // Font family and size changes
    document.getElementById('font-family').addEventListener('change', function() {
        document.execCommand('fontName', false, this.value);
    });
    
    document.getElementById('font-size').addEventListener('change', function() {
        document.execCommand('fontSize', false, this.value);
    });
}

function searchPosts(query) {
    if (!query.trim()) return;
    
    showNotification(`Searching for: ${query}`, 'info');
    
    // In a real app, this would search through posts
    console.log('Search query:', query);
}

function showColorPicker(type) {
    // Create color picker
    const colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.style.position = 'fixed';
    colorPicker.style.opacity = '0';
    colorPicker.style.pointerEvents = 'none';
    
    document.body.appendChild(colorPicker);
    
    colorPicker.click();
    
    colorPicker.addEventListener('input', function() {
        if (type === 'text') {
            document.execCommand('foreColor', false, this.value);
        } else {
            document.execCommand('backColor', false, this.value);
        }
    });
    
    colorPicker.addEventListener('change', function() {
        this.remove();
    });
}

// Helper functions
function getRecentPosts() {
    return [
        {
            id: 1,
            title: 'Getting Started with Bloglovers CMS',
            status: 'published',
            views: 1245,
            published: '2023-10-15',
            labels: ['Tutorial', 'CMS']
        },
        {
            id: 2,
            title: 'Advanced Blogging Techniques',
            status: 'published',
            views: 892,
            published: '2023-10-10',
            labels: ['Blogging', 'Tips']
        },
        {
            id: 3,
            title: 'SEO Optimization for Beginners',
            status: 'draft',
            views: 0,
            published: '',
            labels: ['SEO', 'Marketing']
        },
        {
            id: 4,
            title: 'Upcoming Features Preview',
            status: 'scheduled',
            views: 0,
            published: '2023-10-20',
            labels: ['Announcement', 'Update']
        }
    ];
}

function formatDate(dateString) {
    if (!dateString) return 'Not published';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-card);
        border-left: 4px solid var(--primary-color);
        border-radius: var(--border-radius-sm);
        padding: 15px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        box-shadow: var(--shadow-lg);
        transform: translateX(400px);
        transition: transform 0.3s ease;
        z-index: 10000;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        border-left-color: var(--secondary-color);
    }
    
    .notification-error {
        border-left-color: var(--danger-color);
    }
    
    .notification-warning {
        border-left-color: var(--warning-color);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
    }
    
    .notification-content i {
        font-size: 20px;
    }
    
    .notification-success .notification-content i {
        color: var(--secondary-color);
    }
    
    .notification-error .notification-content i {
        color: var(--danger-color);
    }
    
    .notification-warning .notification-content i {
        color: var(--warning-color);
    }
    
    .notification-close {
        background: none;
        border: none;
        color: var(--text-muted);
        cursor: pointer;
        padding: 5px;
        transition: all 0.2s;
    }
    
    .notification-close:hover {
        color: var(--text-primary);
        transform: rotate(90deg);
    }
`;

document.head.appendChild(notificationStyles);
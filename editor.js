// editor.js - Rich Text Editor Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Setup toolbar buttons
    setupToolbar();
    
    // Setup image insertion
    setupImageInsertion();
    
    // Setup link insertion
    setupLinkInsertion();
    
    // Setup list insertion
    setupLists();
    
    // Setup heading styles
    setupHeadings();
});

function setupToolbar() {
    const toolbarButtons = document.querySelectorAll('.toolbar-btn');
    
    toolbarButtons.forEach(button => {
        button.addEventListener('click', function() {
            const command = this.getAttribute('data-command');
            const value = this.getAttribute('data-value');
            
            // Special handling for some commands
            if (command === 'createLink') {
                createLink();
            } else {
                // Execute the command
                document.execCommand(command, false, value);
                
                // Update active state for formatting buttons
                if (['bold', 'italic', 'underline'].includes(command)) {
                    this.classList.toggle('active');
                }
            }
            
            // Focus back on editor
            document.getElementById('editor-content').focus();
        });
    });
}

function setupImageInsertion() {
    // This is handled in the main script via modals
    // Additional image formatting can be added here
}

function setupLinkInsertion() {
    // Link insertion is handled by the createLink function
}

function setupLists() {
    // List functionality is handled by the toolbar buttons
}

function setupHeadings() {
    // Heading functionality is handled by the toolbar buttons
}

function createLink() {
    const url = prompt('Enter the URL:');
    if (url) {
        // Check if text is selected
        const selection = window.getSelection();
        const selectedText = selection.toString();
        
        if (selectedText) {
            // Wrap selected text in link
            document.execCommand('createLink', false, url);
        } else {
            // Insert link with URL as text
            document.execCommand('insertHTML', false, `<a href="${url}" target="_blank">${url}</a>`);
        }
    }
}

// Additional editor functions
function insertCustomHTML(html) {
    const editor = document.getElementById('editor-content');
    editor.focus();
    document.execCommand('insertHTML', false, html);
}

function getEditorContent() {
    return document.getElementById('editor-content').innerHTML;
}

function setEditorContent(content) {
    document.getElementById('editor-content').innerHTML = content;
}

function clearEditor() {
    document.getElementById('editor-content').innerHTML = '';
}

// Image formatting functions
function formatImage(imageElement, options) {
    // Apply formatting options to image
    if (options.align) {
        imageElement.style.float = options.align;
        imageElement.style.margin = options.align === 'left' ? '0 15px 15px 0' :
                                   options.align === 'right' ? '0 0 15px 15px' : '15px auto';
    }
    
    if (options.size) {
        const sizes = {
            small: '150px',
            medium: '300px',
            large: '500px',
            full: '100%'
        };
        imageElement.style.maxWidth = sizes[options.size] || sizes.medium;
    }
    
    if (options.border) {
        imageElement.style.border = options.border;
    }
    
    if (options.borderRadius) {
        imageElement.style.borderRadius = options.borderRadius;
    }
}

// Text formatting functions
function formatText(style, value) {
    document.execCommand(style, false, value);
}

function changeTextColor(color) {
    document.execCommand('foreColor', false, color);
}

function changeBackgroundColor(color) {
    document.execCommand('backColor', false, color);
}

function changeFontFamily(font) {
    document.execCommand('fontName', false, font);
}

function changeFontSize(size) {
    document.execCommand('fontSize', false, size);
}

// Editor state management
let editorHistory = [];
let currentHistoryIndex = -1;

function saveEditorState() {
    const content = getEditorContent();
    const title = document.getElementById('post-title').value;
    
    editorHistory.push({ content, title });
    currentHistoryIndex = editorHistory.length - 1;
    
    // Limit history size
    if (editorHistory.length > 50) {
        editorHistory.shift();
        currentHistoryIndex--;
    }
}

function undo() {
    if (currentHistoryIndex > 0) {
        currentHistoryIndex--;
        const state = editorHistory[currentHistoryIndex];
        setEditorContent(state.content);
        document.getElementById('post-title').value = state.title;
    }
}

function redo() {
    if (currentHistoryIndex < editorHistory.length - 1) {
        currentHistoryIndex++;
        const state = editorHistory[currentHistoryIndex];
        setEditorContent(state.content);
        document.getElementById('post-title').value = state.title;
    }
}

// Auto-save functionality
let autoSaveInterval;

function startAutoSave(interval = 30000) { // 30 seconds
    autoSaveInterval = setInterval(() => {
        saveEditorState();
        console.log('Auto-saved editor state');
    }, interval);
}

function stopAutoSave() {
    if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
    }
}

// Initialize auto-save when editor gains focus
document.getElementById('editor-content').addEventListener('focus', () => {
    startAutoSave();
});

document.getElementById('editor-content').addEventListener('blur', () => {
    stopAutoSave();
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Check if editor is focused
    const editorFocused = document.activeElement.id === 'editor-content';
    
    if (editorFocused) {
        // Ctrl/Cmd + S to save
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            document.getElementById('save-draft').click();
        }
        
        // Ctrl/Cmd + B for bold
        if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
            e.preventDefault();
            document.execCommand('bold', false, null);
        }
        
        // Ctrl/Cmd + I for italic
        if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
            e.preventDefault();
            document.execCommand('italic', false, null);
        }
        
        // Ctrl/Cmd + U for underline
        if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
            e.preventDefault();
            document.execCommand('underline', false, null);
        }
        
        // Ctrl/Cmd + Z for undo
        if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
            e.preventDefault();
            undo();
        }
        
        // Ctrl/Cmd + Shift + Z for redo
        if ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) {
            e.preventDefault();
            redo();
        }
    }
});

// Export editor content
function exportContent(format = 'html') {
    const content = getEditorContent();
    const title = document.getElementById('post-title').value;
    
    switch(format) {
        case 'html':
            return `<!DOCTYPE html>
<html>
<head>
    <title>${title}</title>
    <meta charset="UTF-8">
</head>
<body>
    <article>
        <h1>${title}</h1>
        ${content}
    </article>
</body>
</html>`;
            
        case 'markdown':
            // Simple HTML to Markdown conversion
            let markdown = `# ${title}\n\n`;
            markdown += content
                .replace(/<h1[^>]*>(.*?)<\/h1>/g, '# $1\n\n')
                .replace(/<h2[^>]*>(.*?)<\/h2>/g, '## $1\n\n')
                .replace(/<h3[^>]*>(.*?)<\/h3>/g, '### $1\n\n')
                .replace(/<p[^>]*>(.*?)<\/p>/g, '$1\n\n')
                .replace(/<strong[^>]*>(.*?)<\/strong>/g, '**$1**')
                .replace(/<em[^>]*>(.*?)<\/em>/g, '*$1*')
                .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/g, '[$2]($1)')
                .replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/g, '![$2]($1)')
                .replace(/<[^>]*>/g, '')
                .replace(/&nbsp;/g, ' ')
                .replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>');
            
            return markdown;
            
        case 'text':
            return `${title}\n\n${content.replace(/<[^>]*>/g, '')}`;
            
        default:
            return content;
    }
}
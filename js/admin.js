// Admin JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    if (localStorage.getItem('adminLoggedIn') === 'true' && window.location.pathname.includes('login.html')) {
        window.location.href = 'dashboard.html';
    }
    
    // Login functionality
    if (document.getElementById('admin-login-form')) {
        const loginForm = document.getElementById('admin-login-form');
        const errorMessage = document.getElementById('login-error');
        
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Check credentials
            if (username === 'twoem' && password === 'Twoemweb@2020') {
                // Successful login
                localStorage.setItem('adminLoggedIn', 'true');
                localStorage.setItem('lastLogin', new Date().toLocaleString());
                window.location.href = 'dashboard.html';
            } else {
                // Failed login
                errorMessage.textContent = 'Invalid username or password';
            }
        });
    }
    
    // Dashboard functionality
    if (document.getElementById('logout-btn')) {
        document.getElementById('logout-btn').addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('adminLoggedIn');
            window.location.href = 'login.html';
        });
    }
    
    // Display last login time
    if (document.getElementById('login-time')) {
        const lastLogin = localStorage.getItem('lastLogin') || 'First login';
        document.getElementById('login-time').textContent = lastLogin;
    }
    
    // Upload section toggle
    if (document.getElementById('upload-public')) {
        document.getElementById('upload-public').addEventListener('click', function(e) {
            e.preventDefault();
            showUploadSection('public');
        });
        
        document.getElementById('upload-eulogy').addEventListener('click', function(e) {
            e.preventDefault();
            showUploadSection('eulogy');
        });
    }
    
    function showUploadSection(type) {
        const uploadSection = document.getElementById('upload-section');
        const uploadTitle = document.getElementById('upload-title');
        const documentType = document.getElementById('document-type');
        const deceasedNameGroup = document.getElementById('deceased-name-group');
        
        uploadSection.style.display = 'block';
        documentType.value = type;
        
        if (type === 'public') {
            uploadTitle.textContent = 'Upload Public Document';
            deceasedNameGroup.style.display = 'none';
        } else {
            uploadTitle.textContent = 'Upload Eulogy';
            deceasedNameGroup.style.display = 'block';
        }
        
        // Scroll to upload section
        uploadSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Upload form submission
    if (document.getElementById('upload-form')) {
        document.getElementById('upload-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const documentName = document.getElementById('document-name').value;
            const documentFile = document.getElementById('document-file').files[0];
            const documentType = document.getElementById('document-type').value;
            const deceasedName = documentType === 'eulogy' ? document.getElementById('deceased-name').value : '';
            
            if (!documentFile) {
                alert('Please select a file to upload');
                return;
            }
            
            if (documentFile.type !== 'application/pdf') {
                alert('Only PDF files are allowed');
                return;
            }
            
            // In a real implementation, you would upload the file to your server here
            // This is just a simulation
            alert(`File "${documentName}" (${documentFile.name}) uploaded successfully as ${documentType} document`);
            
            // Reset form
            this.reset();
            
            // Update documents list
            updateRecentUploads({
                id: Date.now(),
                name: documentName,
                type: documentType === 'public' ? 'Public Document' : 'Eulogy',
                date: new Date().toLocaleDateString(),
                deceased: deceasedName
            });
        });
    }
    
    // Update recent uploads list
    function updateRecentUploads(newDoc) {
        const tableBody = document.getElementById('recent-uploads');
        
        // Create new row
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${newDoc.name}</td>
            <td>${newDoc.type}</td>
            <td>${newDoc.date}</td>
            <td>
                <button class="action-btn btn-view"><i class="fas fa-eye"></i></button>
                <button class="action-btn btn-delete"><i class="fas fa-trash"></i></button>
            </td>
        `;
        
        // Add to beginning of table
        if (tableBody.firstChild) {
            tableBody.insertBefore(row, tableBody.firstChild);
        } else {
            tableBody.appendChild(row);
        }
        
        // Update stats
        updateStats();
    }
    
    // Update dashboard stats
    function updateStats() {
        // In a real implementation, you would fetch these from your backend
        document.getElementById('public-docs-count').textContent = '5';
        document.getElementById('eulogies-count').textContent = '3';
        document.getElementById('total-downloads').textContent = '42';
    }
    
    // Initialize dashboard data
    if (document.getElementById('recent-uploads')) {
        // Mock data for recent uploads
        const recentUploads = [
            { id: 1, name: 'Public Document 1', type: 'Public Document', date: '2023-05-15' },
            { id: 2, name: 'Eulogy for John Doe', type: 'Eulogy', date: '2023-05-12' },
            { id: 3, name: 'Public Document 2', type: 'Public Document', date: '2023-05-10' }
        ];
        
        recentUploads.forEach(doc => {
            updateRecentUploads(doc);
        });
        
        updateStats();
    }
    
    // Delete document functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-delete') || e.target.closest('.btn-delete')) {
            e.preventDefault();
            const deleteModal = document.getElementById('delete-modal');
            deleteModal.style.display = 'block';
            
            // Get the row to delete
            const row = e.target.closest('tr');
            
            // Confirm delete
            document.getElementById('confirm-delete').onclick = function() {
                row.remove();
                deleteModal.style.display = 'none';
                updateStats();
                // In a real implementation, you would also delete from the server
            };
            
            // Cancel delete
            document.getElementById('cancel-delete').onclick = function() {
                deleteModal.style.display = 'none';
            };
        }
    });
    
    // Close modals
    const closeButtons = document.querySelectorAll('.close-btn');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
});

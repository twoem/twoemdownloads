// Main JavaScript for the frontend
document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality for downloads page
    function openTab(tabName) {
        const tabContents = document.getElementsByClassName('tab-content');
        for (let i = 0; i < tabContents.length; i++) {
            tabContents[i].classList.remove('active');
        }
        
        const tabButtons = document.getElementsByClassName('tab-btn');
        for (let i = 0; i < tabButtons.length; i++) {
            tabButtons[i].classList.remove('active');
        }
        
        document.getElementById(tabName).classList.add('active');
        event.currentTarget.classList.add('active');
        
        // Load documents for the active tab
        if (tabName === 'public') {
            loadPublicDocuments();
        } else if (tabName === 'eulogies') {
            loadEulogies();
        }
    }
    
    // Load public documents
    function loadPublicDocuments() {
        const publicDocsContainer = document.getElementById('public-documents');
        publicDocsContainer.innerHTML = '<p>Loading public documents...</p>';
        
        // In a real implementation, you would fetch this from your backend
        setTimeout(() => {
            // Mock data - replace with actual API call
            const publicDocs = [
                { id: 1, name: 'Public Document 1', date: '2023-05-15', size: '2.4 MB' },
                { id: 2, name: 'Public Document 2', date: '2023-05-10', size: '1.8 MB' },
                { id: 3, name: 'Public Document 3', date: '2023-05-05', size: '3.2 MB' }
            ];
            
            let html = '';
            publicDocs.forEach(doc => {
                html += `
                    <div class="document-card">
                        <h3>${doc.name}</h3>
                        <p>Uploaded: ${doc.date} • ${doc.size}</p>
                        <div class="document-actions">
                            <a href="#" class="btn">Download</a>
                        </div>
                    </div>
                `;
            });
            
            publicDocsContainer.innerHTML = html;
        }, 500);
    }
    
    // Load eulogies
    function loadEulogies() {
        const eulogiesContainer = document.getElementById('eulogy-documents');
        eulogiesContainer.innerHTML = '<p>Loading eulogies...</p>';
        
        // In a real implementation, you would fetch this from your backend
        setTimeout(() => {
            // Mock data - replace with actual API call
            const eulogies = [
                { id: 1, name: 'Eulogy for John Doe', deceased: 'John Doe', date: '2023-05-12' },
                { id: 2, name: 'Eulogy for Jane Smith', deceased: 'Jane Smith', date: '2023-05-08' },
                { id: 3, name: 'Eulogy for Robert Johnson', deceased: 'Robert Johnson', date: '2023-05-01' }
            ];
            
            let html = '';
            eulogies.forEach(eulogy => {
                html += `
                    <div class="eulogy-card">
                        <h3>${eulogy.name}</h3>
                        <p>Uploaded: ${eulogy.date}</p>
                        <button class="btn view-eulogy" data-deceased="${eulogy.deceased}" data-id="${eulogy.id}">View Eulogy</button>
                    </div>
                `;
            });
            
            eulogiesContainer.innerHTML = html;
            
            // Add event listeners to view buttons
            document.querySelectorAll('.view-eulogy').forEach(button => {
                button.addEventListener('click', viewEulogy);
            });
        }, 500);
    }
    
    // View eulogy in modal
    function viewEulogy(event) {
        event.preventDefault();
        const deceasedName = event.currentTarget.getAttribute('data-deceased');
        const eulogyId = event.currentTarget.getAttribute('data-id');
        
        const modal = document.getElementById('eulogy-modal');
        const loader = document.getElementById('eulogy-loader');
        const viewer = document.getElementById('eulogy-viewer');
        const nameSpan = document.getElementById('deceased-name');
        
        nameSpan.textContent = deceasedName;
        modal.style.display = 'block';
        loader.style.display = 'block';
        viewer.style.display = 'none';
        
        // Simulate loading for 5 seconds
        setTimeout(() => {
            loader.style.display = 'none';
            viewer.style.display = 'block';
            // In a real implementation, you would set the PDF source here
            // viewer.src = `/uploads/eulogies/${eulogyId}.pdf`;
            viewer.src = 'https://example.com/sample.pdf'; // Placeholder
        }, 5000);
    }
    
    // Close modal
    function closeModal() {
        const modal = document.getElementById('eulogy-modal');
        modal.style.display = 'none';
    }
    
    // Initialize page functionality
    if (document.getElementById('public-documents')) {
        loadPublicDocuments();
    }
    
    // Event listeners
    if (document.querySelector('.close-btn')) {
        document.querySelector('.close-btn').addEventListener('click', closeModal);
    }
    
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('eulogy-modal');
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Make openTab function available globally
    window.openTab = openTab;
});

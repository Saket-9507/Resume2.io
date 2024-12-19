// Add event listeners to skill links
document.querySelectorAll('.skill-link').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault(); // Prevent default link behavior (like navigation or opening in a new tab)
        
        const pageUrl = link.dataset.skill; // Get the page URL from the data attribute
        const contentDiv = document.getElementById('dynamic-content'); // Select the dynamic content area

        // Show a loading indicator
        contentDiv.innerHTML = `<p>Loading...</p>`;

        // Fetch the content of the page and insert it into the dynamic content area
        fetch(pageUrl)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.text();
            })
            .then(html => {
                // Update the dynamic content with the fetched HTML
                contentDiv.innerHTML = html;

                // Apply vertical stacking for the loaded content
                const dynamicContentContainer = document.getElementById('dynamic-content');
                if (dynamicContentContainer) {
                    dynamicContentContainer.style.display = 'flex';
                    dynamicContentContainer.style.flexDirection = 'column';  // Ensure the content is stacked vertically
                    dynamicContentContainer.style.gap = '20px';  // Add space between sections
                }
            })
            .catch(error => {
                console.error('Error loading page:', error);
                contentDiv.innerHTML = `<h2>Error loading content</h2>`;
            });
    });
});

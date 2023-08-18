document.addEventListener('DOMContentLoaded', function() {
    // Retrieve stored links from local storage (if any)
    const storedLinks = JSON.parse(localStorage.getItem('socialLinks')) || [];
  
    // Create social media links from stored data
    const socialBoxesContainer = document.querySelector('.social-boxes');
    storedLinks.forEach(linkData => {
      const newLink = createSocialLink(linkData.url, linkData.name);
      socialBoxesContainer.appendChild(newLink);
    });
    // ... (your existing code) ...
  
    const addLinkBtn = document.getElementById('addLinkBtn');
    const newLinkInput = document.getElementById('newLink');
    const newLinkNameInput = document.getElementById('newLinkName');

    socialBoxesContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('social-remove-button')) {
          const linkToRemove = event.target.parentElement;
          socialBoxesContainer.removeChild(linkToRemove);
          const linkUrl = linkToRemove.getAttribute('href');
          storedLinks.forEach((linkData, index) => {
            if (linkData.url === linkUrl) {
              storedLinks.splice(index, 1);
            }
          });          localStorage.setItem('socialLinks', JSON.stringify(storedLinks));
        }
      });
    
    addLinkBtn.addEventListener('click', function() {
      const newLinkUrl = newLinkInput.value.trim();
      const newLinkName = newLinkNameInput.value.trim();
      
      if (newLinkUrl !== '' && newLinkName !== '') {
        const newLink = createSocialLink(newLinkUrl, newLinkName);
        socialBoxesContainer.appendChild(newLink);
        newLinkInput.value = '';
        newLinkNameInput.value = '';
        storedLinks.push({ url: newLinkUrl, name: newLinkName });
        localStorage.setItem('socialLinks', JSON.stringify(storedLinks));
      }
    });

  
    function createSocialLink(url, name) {
      const link = document.createElement('a');
      link.classList.add('social-box');
      link.href = url;
      link.target = '_blank';
  
      const img = document.createElement('img');
      img.src = 'costum.png';
      img.alt = name + ' Logo';
      img.style.maxWidth = '70px';
      img.style.maxHeight = '70px';
  
      const span = document.createElement('span');
      span.classList.add('social-name');
      span.textContent = name;
  
      const removeButton = document.createElement('button');
      removeButton.classList.add('social-remove-button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', function() {
        socialBoxesContainer.removeChild(link); // Remove the social box when Remove button is clicked
      });
  
      link.appendChild(img);
      link.appendChild(span);
      link.appendChild(removeButton); // Append the remove button to the social box
  
      return link;
    }
  });
  

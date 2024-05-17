document.addEventListener('DOMContentLoaded', () => {
    const featuredContainer = document.getElementById('featured-blogs');
    const sidebarContainer = document.getElementById('sidebar-blogs');
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const closeModalBtn = document.querySelector('.close-btn');

    const apiURL = 'https://coding-week-2024-api.onrender.com/api/data';

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            renderBlogs(data);
        })
        .catch(error => console.error('Error fetching data:', error));

    function renderBlogs(data) {
        data.forEach(blog => {
            if (blog.type === 'science') {
                createFeaturedBlog(blog);
            }
            createSidebarBlog(blog);
        });
    }

    function createFeaturedBlog(blog) {
        const blogElement = document.createElement('div');
        blogElement.classList.add('img-container');

        blogElement.innerHTML = `
            <img src="${blog.image}" alt="${blog.headline}">
            <span class="text">
                <span class="button1">Featured</span>
                &nbsp;&nbsp;
                <span class="button1">${capitalizeFirstLetter(blog.type)}</span>
                <br>${blog.headline}<br>
                <i class="fa-regular fa-calendar"></i>&nbsp;${blog.date}
            </span>
        `;

        blogElement.addEventListener('click', () => openModal(blog));

        featuredContainer.appendChild(blogElement);
    }

    function createSidebarBlog(blog) {
        const blogElement = document.createElement('div');
        blogElement.classList.add('side');

        blogElement.innerHTML = `
            <img src="${blog.image}" alt="${blog.headline}">
            <a href="#">
                <p><b>${blog.headline}</b></p>
            </a>
            <br>
            <i class="fa-regular fa-calendar"></i> ${blog.date}
        `;

        blogElement.addEventListener('click', () => openModal(blog));

        sidebarContainer.appendChild(blogElement);
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function openModal(blog) {
        modalBody.innerHTML = `
            <h2>${blog.headline}</h2>
            <p><i>${blog.date}</i> by ${blog.author}</p>
            <img src="${blog.image}" alt="${blog.headline}" style="width: 100%;">
            <p>${blog.content}</p>
        `;
        modal.style.display = 'block';
    }

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

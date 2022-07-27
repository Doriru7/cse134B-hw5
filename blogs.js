/**
 * @typedef {{
 *  title: string,
 *  date: string,
 *  summary: string
 * }} Blog
 */

export function defineBlogElement() {
    class BlogArticle extends HTMLElement { }
    customElements.define('blog-article', BlogArticle, {extends: 'div'});

    class BlogTitle extends HTMLElement {}
    customElements.define('blog-title', BlogTitle, {extends: 'div'});

    class BlogSummary extends HTMLElement {}
    customElements.define('blog-summary', BlogSummary, {extends: 'div'});

}

export function generateBlogId() {
    return crypto.randomUUID();
};

export const exampleBlogs = [
    {
        "title": "This is title1",
        "date": "7/26/2022",
        "summary": "This is summary1."
    },
    {
        "title": "This is title2",
        "date": "7/26/2022",
        "summary": "This is summary2."
    },
    {
        "title": "This is title3",
        "date": "7/26/2022",
        "summary": "This is summary3."
    },
    {
        "title": "This is title4",
        "date": "7/26/2022",
        "summary": "This is summary4."
    }
];

/* Storage Layer
 * ============= */

function loadBlogs() {
    return JSON.parse(localStorage.getItem('blogs')) || {};
}

/**
 * @param {{string: Blog}} blogs a JSON map of id->book to put into local storage.
 */
 function storeBlogs(blogs) {
    localStorage.setItem('blogs', JSON.stringify(blogs));
}


/* Crud Operations Layer
 * ===================== */

/**
 * (CREATE) Add a new book to the DB. 
 * @param {Blog} [blog] the book to be added to the DB.
 * @returns {String} the generated UUID for this book in the DB.
 */
 export function insertBlog(blog) {
    const blogs = loadBlogs();
    const blogId = generateBlogId();

    blogs[blogId] = blog;
    storeBlogs(blogs);
    
    return blogId;
}

export function selectBlog(blogId) {
    const blogs = loadBlogs();

    return blogs[blogId];
}

export function selectAllBlogs() {
    const blogs = loadBlogs();
    return blogs;
}

export function updateBlog(blogId, blog) {
    const blogs = loadBlogs();

    blogs[blogId] = blog;

    storeBlogs();
}

export function deleteBlog(blogId) {
    const blogs = loadBlogs();

    // If it's not there, just return false. If it is there, delete it.
    if (!(blogId in blogs)) return false;
    delete blogs[blogId];
    
    storeBlogs(blogs)
    return true;
}

export function countBlogs() {
    const blogs = loadBlogs();
    return Object.keys(blogs).length;
}

/**
 * 
 * @param {String} [blogID] 
 * @param {Blog} [blog] 
 * @return {BlogArticle} 
 */
export function renderBlog(blogID, blog) {
    const tpl = document.getElementById('blog_template');

    const blogEl = tpl.content.cloneNode(true);
    blogEl.children[0].dataset.blogId = blogID;

    const titleH1 = blogEl.querySelector('blog-title > h1');
    titleH1.textContent = blog.title;

    const dateP = blogEl.querySelector('blog-date >p');
    dateP.textContent  = blog.date;

    const summaryP = blogEl.querySelector('blog-summary > p');
    summaryP.textContent = blog.summary;

   
    const delete_btn = blogEl.querySelector('#delete');
    delete_btn.addEventListener('click', (ev)=>{
        const parent_blog = ev.target.parentElement;
        //console.log(parent_blog);
        let blog_id = parent_blog.getAttribute('data-blog-id');
        console.log(blog_id);
        deleteBlog(blog_id);

        location.reload();
    })

    const edit_btn = blogEl.querySelector('#edit');
    edit_btn.addEventListener('click', (ev)=>{
        const parent_blog = ev.target.parentElement;
        edit_dialog_function(parent_blog);
    });

    return blogEl;
}

function edit_dialog_function(blog) {
    //let body = document.querySelector('body');
    let template = document.querySelector('#edit_dialog_template');
    let clone = template.content.cloneNode(true);
    let edit_dialog = clone.querySelector('dialog');

    let title = clone.querySelector('#edit_title');
    let pre_title = blog.querySelector('blog-title > h1').textContent;
    title.setAttribute('value', pre_title);
    console.log(pre_title); 

    let summary = clone.querySelector('#edit_summary');
    let pre_summary = blog.querySelector('blog-summary > p').textContent;
    summary.textContent = pre_summary;
    console.log(pre_summary);

    document.querySelector('#blogs').appendChild(clone); 

    edit_dialog.showModal();

    const editBlogForm = document.getElementById("edit-blog-form");
    editBlogForm.addEventListener("submit", (ev) => {

        //console.log(ev.target);
        
        // Stop the form submission event from continuing and refreshing the page.
        ev.preventDefault();

        // Load the data from the form into a FormData.
        const formData = new FormData(ev.target);

        console.log(ev.target);
        console.log(formData);

        // The names of our form fields are identical to our book JSON, so just copy it over.
        const new_blog = {};
        for (const [key, value] of formData.entries()) {
            new_blog[key] = value;
        }

        edit_dialog.remove();
        let old_id = blog.getAttribute('data-blog-id');
        //console.log(blog.getAttribute('data-blog-id'));//.getAttribute('data-blog-id')
        //updateBlog(blog.getAttribute('data-blog-id'), blog);
        deleteBlog(blog.getAttribute('data-blog-id'));
        
        const blogs = loadBlogs();
        //const blogId = generateBlogId();

        blogs[old_id] = new_blog;
        storeBlogs(blogs);

        location.reload();
        
    });  
}

/**

 * @param {string} [blogId]
 * @param {Blog|undefined} [blog] 
 * @param {HTMLElement} [container]
 */
 export function displayBlog(blogId, blog, container) {
    const blogEl = renderBlog(blogId, blog);

    const existingBlog = container.querySelector(`[data-blog-id="${blogId}"]`);
    if (existingBlog) {
        existingBlog.remove();
    }
    
    if (blog) {
        container.appendChild(blogEl);
    }
}


export function displayAllBlogs(container) {
    const blogs = selectAllBlogs();

    for (const [id, blog] of Object.entries(blogs)) {
        displayBlog(id, blog, container);
    }
}
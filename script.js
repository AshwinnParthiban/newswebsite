const apikey = '243a47e1d7d0489c8c5936a273d2f175'

const blogContainer =  document.getElementById('blog-container');
const searchField = document.getElementById('search-input')
const searchButton = document.getElementById('btn-search')

async function fetchRandomNews(){
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=10&apikey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles
    }catch(error){
        console.error("Error fetching random news",error)
        return[]
    }
}

searchButton.addEventListener("click",async()=>{
    const query = searchField.value.trim()
    if(query !== ""){
        try {
            const articless = await fetchNewsQuery(query)
            displayBlogs(articless)
        } catch (error) {
            console.error("Error fetching news by query",error)
        }
    }
})

async function fetchNewsQuery(query){
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles
    }catch(error){
        console.error("Error fetching random news",error)
        return[]
    }
}

function displayBlogs(articles){
    blogContainer.innerHTML = ""
    articles.forEach((articles)=>{
    const blogCard = document.createElement("div")
    blogCard.classList.add("blog-card")
    const img = document.createElement("img")
    img.src = articles.urlToImage
    img.alt = articles.title

    const title = document.createElement("h2")
    const truncartedTitle = 
    articles.title.length> 30
    ? articles.title.slice(0,30)+"..." 
    : articles.title
    title.textContent = truncartedTitle;

    const description = document.createElement("p")
    const truncartedDes = articles.description.length> 220
    ? articles.description.slice(0,220)+"...see more" 
    : articles.description;
    description.textContent = truncartedDes;

    blogCard.appendChild(img)
    blogCard.appendChild(title)
    blogCard.appendChild(description)
    blogContainer.appendChild(blogCard)
    blogCard.addEventListener("click",()=>{
        window.open(articles.url,"blank");
    })
    })
}

(async()=>{
    try {
        const articles = await fetchRandomNews()
        displayBlogs(articles)

    } catch (error) {
        console.error("Error fetching random news",error)
    }
})
();
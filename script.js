const newsContainer = document.querySelector('.news-content')
const categories = document.querySelector('.categories')
const navbar = document.querySelector('.navbar')
const main= document.querySelector('main');
const menu = document.querySelector('.menu');
const dropDown = document.querySelector('.nav-links');

let me = false;
let type = 'business'
let resPerPage= 30
let url = `https://newsapi.org/v2/top-headlines?country=in&category=${type}&pageSize=${resPerPage}&apiKey=0b73ddfbdf614279bcc3086a488a23a2`



const getNews=async function(url){
    try {
        const res = await fetch(url)
        const data = await res.json();
        if(!res.ok)throw new Error(`${res.status} ${data.message}`)
        console.log(data);
        return data;
    } catch (error) {
        throw error
    }
}

const renderNews = async function(){
    const {articles} = await getNews(url)  
    console.log(articles);  
    const markup=articles.slice(0,21).map(article => {
        return `
            <div class="news">
            <h4 class="news-title"><a class="news-url" target="_blank" href="${article.url}">${article.title}</a></h4>
            <div class="row news-item">
                <img class="news-img" src="${article.urlToImage}" alt="image">
                <div class="new-desc">${article.content?.substring(0,100)}</div>
            </div>
            </div>
        `
    }).join('');
    newsContainer.innerHTML=markup
}

getNews(url)
renderNews()

categories.addEventListener('click',function(e){
    e.preventDefault()
    if(!e.target.closest('a')) return 
    url=`https://newsapi.org/v2/top-headlines?country=in&category=${e.target.innerHTML.toLowerCase()}&pageSize=${resPerPage}&apiKey=0b73ddfbdf614279bcc3086a488a23a2`
    getNews(url)
    window.scrollTo({top:true,behavior:'smooth'})
    renderNews()
})

menu.addEventListener('click',(e)=>{
    e.preventDefault()
    dropDown.classList.toggle('open')
    me=!me;
})


const API_KEY = `9a96511015cb43af9731bf49782c2a17`;
let newsList=[];
const menus = document.querySelectorAll(".menus button");
console.log(menus);
menus.forEach(menu => menu.addEventListener("click",(event)=>getNewsByCategory(event)));
let url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`);

const getNews = async() =>{
    try {
        const response = await fetch(url);
        const data = await response.json();
        if(response.status===200){
            if(data.articles.length === 0 ){
                throw new Error("No result for this search");
            }
            newsList = data.articles;
            render();
        }else{
            throw new Error(data.message);
        }

    }catch(error){
        errorRender(error.message);
    }

}

const getLatesNews = async ()=>{
    url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`);
    getNews();
};

const getNewsByCategory= async (event)=>{
    const category = event.target.textContent.toLowerCase();
    url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`);
    getNews();
    
};
const getNewsByKeyword = async() =>{
    const keyword = document.getElementById("search-input").value; 
    url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`);
    getNews();
};

const render=()=>{
    const newsHTML = newsList.map(news=>`<div class="row news">
        <div class="col-lg-4">
            <img class="news-img-size" src=${news.urlToImage}/>
        </div>
        <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>
                ${news.description}
            </p>
            <div>
                ${news.source.name} * ${news.publishedAt}
            </div>
        </div>
    </div>`).join('');
   
    document.getElementById("news-board").innerHTML = newsHTML;
}

const errorRender = (errorMessage) => {
    const errorHTML=`<div class="alert alert-danger" role="alert">
   ${errorMessage} </div>`;
   document.getElementById("news-board").innerHTML = errorHTML;
}

getLatesNews();

//버튼 클릭이벤트
//카테고리별 뉴스 가져오기
//뉴스 보여줌 (render)
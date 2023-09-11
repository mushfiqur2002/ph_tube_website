let phoneContainer = document.querySelector('.main_video_container');
let buttonContainer = document.querySelector('.main_button_container');
let cardsContainer = document.querySelector('.main_video_container');
let cardTime = document.querySelector('.cardTime');
//---------------> fetch data <---------------\\
const loadBtn = async ()=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    displayButton(data.data);
 }
 const loadCard = async (id='1000')=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    displayCard(data.data,id);
 }
 loadBtn();
 loadCard();
 
 //---------------> button <---------------\\
 let btnIdArr = [];
 function displayButton(event){
    //--->add btn in DOM
    let BtnNames = event.map(function(a){
        return `<button id=${a.category_id}>${a.category}</button>`
    })
    let displayBtn = BtnNames.join("");
    buttonContainer.innerHTML = displayBtn;

    //--->select all button
    const BTN = document.querySelectorAll(".main_button_container button");
    //--->click handler for all button
     BTN.forEach(function(btn){
        //---> default button
        let currentBtnId = '1000';
        if(currentBtnId === btn.id){
            btn.classList.add('active');
        }
        btn.addEventListener("click", function(x){   
            //--->abb and remove button background color
            let id = x.target.id;
            if(id){
                BTN.forEach(function(y){
                    y.classList.remove("active");
                });
                x.target.classList.add("active");
            }

            // find the id
            const clickCategory = btn.id;
            const specificCategory = event.filter(function(item){
                if(item.category_id === clickCategory){
                    return item;
                }
            })

            let clickID = specificCategory[0].category_id;
            loadCard(clickID);
        })
    })
};

 //---------------> card <---------------\\

 const displayCard =(event,btnID)=>{
    let card = event.map(function(data){
        return `<div class="card">
                    <div class="image">
                        <img src='${data.thumbnail}'>
                        <p class="cardTime">${disTime(data.others.posted_date)}</p>
                    </div>
                    <div class="info">
                        <div class="info_img">
                            <img src='${data.authors[0].profile_picture}'>
                        </div>
                        <div class="info_text">
                            <p class="info_title">Building a Winning UX Strategy Using the Kano Model</p>
                            <p class="name">${data.authors[0].profile_name}<span></span></p>
                            <p class="view">${data.others.views} views</p>
                        </div>
                    </div>
                </div>`
    })
    let showCard = card.join("");
    cardsContainer.innerHTML = showCard;
}

 //---> display time
 function disTime(data){
    let sec = parseInt(data);
    if(data ===''){
        return '';
    }else{
        var d = Math.floor(sec / (3600*24));
        var h = Math.floor(sec % (3600*24) / 3600);
        var m = Math.floor(sec % 3600 / 60);
        if(d>0){
            return `${d} days ${h} hrs ${m} min ago`;
        }else{
            return `${h} hrs ${m} min ago`;
        }

    }
 }
import{a as f,S as m,i as n}from"./assets/vendor-frHSA4Lh.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const d="50762825-7fe49127b3d94f6c93c99dfe1";async function g(s){return(await f.get("https://pixabay.com/api/",{params:{key:d,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40}})).data}const c=document.querySelector(".gallery"),l=document.querySelector(".loader-wrapper"),y=new m(".gallery a",{captionsData:"alt",captionDelay:250});function h(s){const r=s.map(({webformatURL:o,largeImageURL:a,tags:e,likes:t,views:i,comments:p,downloads:u})=>`
            <li class="gallery-item">
                <a class="gallery-link" href="${a}">
                    <img class="gallery-image" src="${o}" alt="${e}" />
                </a>
                <div class="info">
                    <p class="info-item"><b>Likes:</b> ${t}</p>
                    <p class="info-item"><b>Views:</b> ${i}</p>
                    <p class="info-item"><b>Comments:</b> ${p}</p>
                    <p class="info-item"><b>Downloads:</b> ${u}</p>
                </div>
            </li>
        `).join("");c.innerHTML+=r,y.refresh()}function b(){c.innerHTML=""}function L(){l.classList.remove("is-hidden")}function P(){l.classList.add("is-hidden")}const w=document.querySelector(".form");w.addEventListener("submit",q);async function q(s){s.preventDefault();const r=s.target.elements["search-text"].value.trim();if(b(),r===""){n.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}L();try{const o=await g(r),a=o.hits;if(a.length===0){n.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}h(a),n.success({message:`We found ${o.totalHits} images.`,position:"topRight"})}catch(o){console.error("Помилка запиту:",o),n.error({message:"We're sorry, but we couldn't fetch images. Please try again later!",position:"topRight"})}finally{P(),s.target.reset()}}
//# sourceMappingURL=index.js.map

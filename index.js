import{a as p,S as m,i as n}from"./assets/vendor-Bz4lgVUE.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const g="50762825-7fe49127b3d94f6c93c99dfe1";function d(i){return p.get("https://pixabay.com/api/",{params:{key:g,q:i,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40}}).then(t=>t.data)}const c=document.querySelector(".gallery"),l=document.querySelector(".loader-wrapper"),y=new m(".gallery a",{captionsData:"alt",captionDelay:250});function h(i){const r=i.map(({webformatURL:o,largeImageURL:s,tags:e,likes:t,views:a,comments:u,downloads:f})=>`
            <li class="gallery-item">
                <a class="gallery-link" href="${s}">
                    <img class="gallery-image" src="${o}" alt="${e}" />
                </a>
                <div class="info">
                    <p class="info-item"><b>Likes:</b> ${t}</p>
                    <p class="info-item"><b>Views:</b> ${a}</p>
                    <p class="info-item"><b>Comments:</b> ${u}</p>
                    <p class="info-item"><b>Downloads:</b> ${f}</p>
                </div>
            </li>
        `).join("");c.innerHTML+=r,y.refresh()}function b(){c.innerHTML=""}function L(){l.classList.remove("is-hidden")}function P(){l.classList.add("is-hidden")}const q=document.querySelector(".form");q.addEventListener("submit",S);function S(i){i.preventDefault();const r=i.target.elements["search-text"].value.trim();if(b(),r===""){n.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}L(),d(r).then(o=>{const s=o.hits;if(s.length===0){n.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}h(s),n.success({message:`We found ${o.totalHits} images.`,position:"topRight"})}).catch(o=>{console.error("Помилка запиту:",o),n.error({message:"We're sorry, but we couldn't fetch images. Please try again later!",position:"topRight"})}).finally(()=>{P(),i.target.reset()})}
//# sourceMappingURL=index.js.map

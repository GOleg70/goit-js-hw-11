import{i as n,a as h,S as y}from"./assets/vendor-frHSA4Lh.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const c=document.querySelector(".gallery"),b=document.querySelector(".form"),l=document.querySelector(".loader-wrapper"),L="50762825-7fe49127b3d94f6c93c99dfe1",$="photo";b.addEventListener("submit",q);function w(){l.classList.remove("is-hidden")}function x(){l.classList.add("is-hidden")}function q(a){a.preventDefault();const o=a.target.elements["search-text"].value.trim();if(c.innerHTML="",o===""){n.info({message:"Будь ласка, введіть щось для пошуку.",position:"topRight"});return}w(),h.get("https://pixabay.com/api/",{params:{key:L,q:o,image_type:$,orientation:"horizontal",safesearch:!0,per_page:40}}).then(r=>{const i=r.data.hits;if(i.length===0){n.info({message:"На жаль, за вашим запитом не знайдено зображень. Спробуйте ще раз!",position:"topRight"});return}const e=i.map(({webformatURL:s,largeImageURL:p,tags:f,likes:d,views:m,comments:u,downloads:g})=>`
                <li class="gallery-item">
                    <a class="gallery-link" href="${p}">
                        <img class="gallery-image" src="${s}" alt="${f}" />
                    </a>
                    <div class="info">
                        <p class="info-item"><b>Likes:</b> ${d}</p>
                        <p class="info-item"><b>Views:</b> ${m}</p>
                        <p class="info-item"><b>Comments:</b> ${u}</p>
                        <p class="info-item"><b>Downloads:</b> ${g}</p>
                    </div>
                </li>
            `).join("");c.innerHTML=e,new y(".gallery a",{captionsData:"alt",captionDelay:250}).refresh(),n.success({message:`Знайдено ${r.data.totalHits} зображень за вашим запитом.`,position:"topRight"})}).catch(r=>{console.error("Помилка запиту до Pixabay API:",r),n.error({message:"Не вдалося отримати зображення. Будь ласка, спробуйте пізніше.",position:"topRight"})}).finally(()=>{x(),a.target.reset()})}
//# sourceMappingURL=index.js.map

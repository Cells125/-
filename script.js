
// Плавная прокрутка меню
document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener('click', function(e){

        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        if(target){

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

        }

    });

});

// Показать сертификаты
const certificates = document.querySelectorAll('.certificate');
const showMoreBtn = document.querySelector('.show-more');

if(certificates.length > 4){

    certificates.forEach((item,index)=>{

        if(index > 3){
            item.style.display = 'none';
        }

    });

    showMoreBtn.addEventListener('click',()=>{

        const hidden = [...certificates].filter(item => item.style.display === 'none');

        if(hidden.length){

            hidden.forEach(item=>{
                item.style.display = 'block';
            });

            showMoreBtn.textContent = 'Скрыть документы';

        }else{

            certificates.forEach((item,index)=>{

                if(index > 3){
                    item.style.display = 'none';
                }

            });

            showMoreBtn.textContent = 'Показать все документы';

        }

    });

}else{

    showMoreBtn.style.display = 'none';

}


// ============================
// Слайдер отзывов
// ============================
const slider = document.querySelector('.reviews-slider');
const reviews = document.querySelectorAll('.review');
const dotsContainer = document.querySelector('.reviews-dots');

let currentSlide = 0;

function getSlidesCount(){

    if(window.innerWidth <= 768){
        return reviews.length;
    }

    return Math.ceil(reviews.length / 2);
}

function createDots(){

    dotsContainer.innerHTML = '';

    for(let i = 0; i < getSlidesCount(); i++){

        const dot = document.createElement('span');

        dot.classList.add('dot');

        if(i === 0){
            dot.classList.add('active');
        }

        dotsContainer.appendChild(dot);
    }

}

createDots();

function updateSlider(){

    const slideWidth = slider.clientWidth;

    slider.scrollTo({
        left: currentSlide * slideWidth,
        behavior: 'smooth'
    });

    document.querySelectorAll('.dot').forEach(dot=>{
        dot.classList.remove('active');
    });

    document.querySelectorAll('.dot')[currentSlide]
        ?.classList.add('active');

}

document.querySelector('.reviews-next')
.addEventListener('click',()=>{

    if(currentSlide < getSlidesCount() - 1){

        currentSlide++;

        updateSlider();

    }

});

document.querySelector('.reviews-prev')
.addEventListener('click',()=>{

    if(currentSlide > 0){

        currentSlide--;

        updateSlider();

    }

});

window.addEventListener('resize',()=>{

    currentSlide = 0;

    createDots();

    updateSlider();

});
// ============================
// Анимация появления блоков
// ============================

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add('show');

        }

    });

},{
    threshold:0.15
});

document.querySelectorAll(
`
.hero,
.work-card,
.certificate,
.format-card,
.review,
.footer-container
`
).forEach(item=>{

    item.classList.add('hidden');
    observer.observe(item);

});


// ============================
// Читать дальше в отзывах
// ============================

const reviewTexts = document.querySelectorAll('.review p');

reviewTexts.forEach(text => {

    const fullText = text.textContent;

    if(fullText.length > 180){

        const shortText = fullText.substring(0,180) + '...';

        text.textContent = shortText;

        const btn = document.createElement('a');

        btn.href = '#';
        btn.classList.add('read-more');
        btn.textContent = 'Читать дальше';

        text.after(btn);

        let opened = false;

        btn.addEventListener('click',(e)=>{

            e.preventDefault();

            if(!opened){

                text.textContent = fullText;
                btn.textContent = 'Свернуть';

            }else{

                text.textContent = shortText;
                btn.textContent = 'Читать дальше';

            }

            opened = !opened;

        });

    }

});
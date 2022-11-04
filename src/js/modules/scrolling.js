const scrolling = (upSelector) => {
    const upElem = document.querySelector(upSelector);

    // Показ и скрытие элемента в зависимости от отлистанной сверху величины
    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 1650) {
            upElem.classList.add('animated', 'fadeIn');
            upElem.classList.remove('fadeOut');
        } else {
            upElem.classList.add('fadeOut');
            upElem.classList.remove('fadeIn');
        }
    });

    // Скроллинг с помощью RequestAnimationFrame

    let links = document.querySelectorAll('[href^="#"]'),
        speed = 0.1;

    links.forEach(link => {
        if (link.getAttribute('href') != '#') {
            link.addEventListener('click', function(e) {
                e.preventDefault();
    
                let heightTop = document.documentElement.scrollTop,
                    hash = this.hash,
                    // Верхняя граница эл-та к которому скроллим
                    toBlock = document.querySelector(hash).getBoundingClientRect().top,
                    // Стартовая позиция
                    start = null;
    
                requestAnimationFrame(step);
    
                function step(time) {
                    // Узнать 1-ый ли раз запускается анимация(выполнится только 1 раз)
                    if (start === null) {
                        start = time;
                    }
    
                    let progress = time - start,
                    // Кол-во px, на которые нужно пролистать в течении анимации
                        r = (toBlock < 0 ? Math.max(heightTop - progress / speed, heightTop + toBlock) : Math.min(heightTop + progress / speed, heightTop + toBlock));
                        
                        // Координаты скролла по X,Y
                        document.documentElement.scrollTo(0, r);
                    // Условие для остановки анимации
                    if (r != heightTop + toBlock) {
                        requestAnimationFrame(step);
                    } else {
                        location.hash = hash;
                    }
                }
            });
        }       
    });


    // Скроллинг на чистом JS
    // Реализация плавного скролла
    
    // const element = document.documentElement,
    //       body = document.body;

          
    // // Функция для подсчета того, сколько нужно пролистать

    // const calcScroll = () => {
    //     upElem.addEventListener('click', function(event) {
    //         // 1-ый вариант
    //         let scrollTop = Math.round(body.scrollTop || element.scrollTop);

    //         if (this.hash !== '') {
    //             event.preventDefault();
    //         // Получаем тот элемент к которому мы будем скролить нашу страницу
    //             let hashElement = document.querySelector(this.hash),
    //             // Переменная, обозначающая, сколько еще нужно пролистать px до родителя hash элемента
    //                 hashElementTop = 0;

    //             // Цикл перербирает всех родителей искомого элемента и узнать сколько пикселей нужно отлистать
    //             while (hashElement.offsetParent) { //offsetParent - тот элемент онтносительно которого будет позиционироваться hashElement
                    
    //                 hashElementTop += hashElement.offsetTop; //offsetTop - сколько пикселей осталось до верхней границы родительского эл-та от хэш эл-та
    //                 hashElement = hashElement.offsetParent; //
    //             }

    //             hashElementTop = Math.round(hashElementTop);

    //             smoothScroll(scrollTop,hashElementTop,this.hash);
    //         }
    //     });
    // };

    // const smoothScroll = (from, to, hash) => {
    //     let timeInterval = 1, //значение через которое будет производиться анимация
    //         prevScrollTop,
    //         speed;

    //     if (to > from) {
    //         speed = 30;
    //     } else {
    //         speed = -30;
    //     }



    //     let move = setInterval(function () {
    //         let scrollTop = Math.round(body.scrollTop || element.scrollTop);

    //         if (
    //             prevScrollTop === scrollTop ||
    //             (to > from && scrollTop >= to) ||
    //             (to < from && scrollTop <= to)
    //         ) {
    //             clearInterval(move);
    //             history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
    //         } else {
    //             body.scrollTop += speed;
    //             element.scrollTop += speed;
    //             prevScrollTop = scrollTop;
    //         }
    //     }, timeInterval);
    // };

    // calcScroll();
};

export default scrolling;
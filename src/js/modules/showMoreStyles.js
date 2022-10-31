import { getResource } from "../services/requests";

const showMoreStyles = (trigger, wrapper) => {
    const btn = document.querySelector(trigger);
          

    // Вариант реализации если карточки уже есть в верстке и они скрыти

    // cards.forEach(card => {
    //     card.classList.add('animated', 'fadeInUp');
    // });

    // btn.addEventListener('click', () => {
    //     cards.forEach(card => {
    //         card.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');
    //         card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
    //     });
    //     // btn.styles.display = 'none';
    //     btn.remove();
    // });

    function responseError() {
        let statusMessage = document.createElement('div');
        statusMessage.classList.add('animated', 'fadeIn');
        statusMessage.textContent = 'Что-то пошло не так...';
        statusMessage.style.cssText = 'text-align: center; color: red; font-size: 18px; font-weight: bold';
        document.querySelector(wrapper).appendChild(statusMessage);
    }

    btn.addEventListener('click', function () {
        getResource('assets/db.json') //использование базы данных без json-server
            .then(res => {
                createCards(res.styles); // обращаемся к styles в файле db.json
                this.remove(); // удаляем кнопку на странице
            }) 
            .catch(() => {
                responseError();
            });


    });

    // Функция конструирует блоки и помещает их на страницу
    function createCards(response) {
        // forEach т.к. в консоли видно, что получаем массив эл-тов
        response.forEach(({src, title, link}) => { //деструктуризация - вытаскиваем сразу нужные нам данные из db.json
            // Блок для каждой карточки(каркас)
            let card = document.createElement('div');
            // Классы для каждой карточки
            card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
            // Вставляем динамическую верстку на страницу
            card.innerHTML = `
                <div class="styles-block">
                    <img src=${src} alt="style">
                    <h4>${title}</h4>
                    <a href=${link}>Подробнее</a>
                </div>
            `;
            // Помещаем карточки на страницу
            document.querySelector(wrapper).appendChild(card);
        });
    }
};

export default showMoreStyles;
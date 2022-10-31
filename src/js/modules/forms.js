import { postData } from "../services/requests";

const forms = () => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          upload = document.querySelectorAll('[name="upload"]');

    // checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: 'Загрузка',
        succes: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png',
    };

    // Пути для отправки данных (для img и message разные)
    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    };


    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
        upload.forEach(item => {
            item.previousElementSibling.textContent = 'Файл не выбран';
        });
    };
    // Замена статичного имени отправляемого файла
    upload.forEach(item => {
        item.addEventListener('input', () => {
            console.log(item.files[0]); // получаем имя загружаемого файла
            // проверка на количество символов в имени файла
            let dots;
            // Оптимизация повторяемых участков
            const arr =  item.files[0].name.split('.');
            arr[0].length > 6 ? dots = '...' : dots = '.';
            // Формируем имя файла
            const name =  arr[0].substring(0, 6) + dots +  arr[1];
            // Вставляем имя элемента в нужный блок на странице
            item.previousElementSibling.textContent = name;
        });
    });

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();
            // Блок для показа статусов
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.parentNode.appendChild(statusMessage);

            // Делаем форму прозрачной
            item.classList.add('animated', 'fadeOutUp');
            // Через 400 мс она исчезнет со страницы
            setTimeout(() => {
                item.style.display = 'none';
            }, 400);

            // Отображение статуса сообщения
            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            // Помещаем блок на страницу
            statusMessage.appendChild(statusImg);

            // Добавляем текстовое сообщение
            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);

            // Сбор данных из формы
            const formData = new FormData(item);
            // Переменная для формирования динамического пути отправки
            let api;
            // Ищем блок '.popup-design' в родителях
            item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;
            console.log(api);

            postData(api, formData)
                .then(res => {
                    console.log(res);
                    statusImg.setAttribute('src', message.ok);
                    textMessage.textContent = message.succes;
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail);
                    textMessage.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        // Возвращаем скрытую выше форму назад, после отправки данных
                        item.style.display = 'block';
                        item.classList.remove('fadeOutUp');
                        item.classList.add('fadeInUp');
                    }, 2000);
                });
        });
    });
};

export default forms;
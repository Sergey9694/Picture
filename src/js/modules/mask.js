const mask = (selector) => {

    let setCursorPosition = (position, element) => {
        element.focus(); // установили фокус на элементе

        if (element.setSelectionRange) {
            element.setSelectionRange(position, position);
        } else if (element.createTextRange) {
            let range = element.createTextRange();

            range.collapse(true); // граничные точки диапазона (1ю с последн позицией)
            range.moveEnd('character', position); //конечная точка выделения
            range.moveStart('character', position); //начальная точка выделения
            range.select(); // установили курсор и выделили значение при установке 2-х параметров выше
        }
    };

    function createMask(event) {
        let matrix = '+7 (___) ___ __ __',
            i = 0,
            def = matrix.replace(/\D/g, ''), // статичное значение на основе матрицы
            val = this.value.replace(/\D/g, ''); // динамичное значение на основе того, что ввел юзер

        if (def.length >= val.length) {
            val = def;
        }

        this.value = matrix.replace(/./g, function(a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });

        if (event.type === 'blur') {
            if (this.value.length == 2) {
                this.value = '';
            }
        } else {
            setCursorPosition(this.value.length, this);
        }
    }

    let inputs = document.querySelectorAll(selector);

    inputs.forEach(input => {
        input.addEventListener('input', createMask);
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
    });
};

export default mask;
const filter = () => {
    const menu = document.querySelector('.portfolio-menu'),
          portfolioBlock = document.querySelectorAll('.portfolio-block'),
          items = menu.querySelectorAll('li'),
          no = document.querySelector('.portfolio-no');


        menu.addEventListener('click', (e) => {
            const target = e.target;
            const targetClass = target.className;

                if (target && target.tagName == 'LI') {
                    items.forEach(btn => {
                        btn.classList.remove('active');
                        target.classList.add('active');
                    });
                }
            
        portfolioBlock.forEach(item => {
            item.style.display = 'none';
            item.classList.remove('animated', 'fadeIn');
            
            if (item.className.match(targetClass)) {
                item.style.display = 'block';
                item.classList.add('animated', 'fadeIn');
            }

            if (targetClass == 'grandmother' || targetClass == 'granddad') {
                no.style.display = 'block';
                no.classList.add('animated', 'fadeIn');
            } else {
                no.style.display = 'none';
            }
        });
    });
};

export default filter;
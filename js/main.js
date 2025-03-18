// Main JavaScript for EA77 Casino

document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    const tickerContainer = document.querySelector('.ticker-container');
    
    // Проверяем наличие кнопки и меню перед добавлением обработчика
    if (mobileMenuBtn && navList) {
        mobileMenuBtn.addEventListener('click', function() {
            // Переключаем класс .active для кнопки меню
            this.classList.toggle('active');
            
            // Переключаем класс .active для меню
            navList.classList.toggle('active');
            
            // Добавляем/удаляем класс .menu-opened для body, чтобы предотвратить прокрутку
            document.body.classList.toggle('menu-opened');
            
            // Скрываем/показываем тикер при открытии/закрытии меню
            if (tickerContainer) {
                if (navList.classList.contains('active')) {
                    // Скрываем тикер при открытии меню
                    tickerContainer.style.visibility = 'hidden';
                } else {
                    // Показываем тикер при закрытии меню
                    tickerContainer.style.visibility = 'visible';
                }
            }
        });
    }
    
    // Закрытие меню при клике по пункту меню на мобильных устройствах
    const menuItems = document.querySelectorAll('.nav-list li a');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Проверяем, открыто ли меню (на мобильных устройствах)
            if (window.innerWidth <= 768 && navList.classList.contains('active')) {
                // Закрываем меню
                navList.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.classList.remove('menu-opened');
                
                // Показываем тикер при закрытии меню
                if (tickerContainer) {
                    tickerContainer.style.visibility = 'visible';
                }
            }
        });
    });
    
    // Закрытие меню при изменении размера окна
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navList.classList.contains('active')) {
            // Закрываем меню при переходе к десктопной версии
            navList.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.classList.remove('menu-opened');
            
            // Показываем тикер при закрытии меню
            if (tickerContainer) {
                tickerContainer.style.visibility = 'visible';
            }
        }
    });

    // Слайдер для промо-акций
    initSlider();

    // Табы для категорий игр
    initGameTabs();
});

// Инициализация слайдера
function initSlider() {
    const slides = document.querySelectorAll('.slider-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');
    
    if (!slides.length || !dots.length) return;
    
    let currentSlide = 0;
    
    // Показ определенного слайда
    function showSlide(index) {
        // Скрываем текущий активный слайд
        document.querySelector('.slider-slide.active').classList.remove('active');
        document.querySelector('.slider-dot.active').classList.remove('active');
        
        // Показываем новый активный слайд
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // Обработчик для точек навигации
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Обработчик для кнопки "Следующий"
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            let nextIndex = currentSlide + 1;
            if (nextIndex >= slides.length) {
                nextIndex = 0;
            }
            showSlide(nextIndex);
        });
    }
    
    // Обработчик для кнопки "Предыдущий"
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            let prevIndex = currentSlide - 1;
            if (prevIndex < 0) {
                prevIndex = slides.length - 1;
            }
            showSlide(prevIndex);
        });
    }
    
    // Автопрокрутка слайдера
    let sliderInterval = setInterval(() => {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= slides.length) {
            nextIndex = 0;
        }
        showSlide(nextIndex);
    }, 5000);
    
    // Остановка автопрокрутки при наведении мыши
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(sliderInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            sliderInterval = setInterval(() => {
                let nextIndex = currentSlide + 1;
                if (nextIndex >= slides.length) {
                    nextIndex = 0;
                }
                showSlide(nextIndex);
            }, 5000);
        });
    }
}

// Инициализация табов для категорий игр
function initGameTabs() {
    const tabs = document.querySelectorAll('.category-tab');
    
    if (!tabs.length) return;
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Удаляем активный класс со всех табов
            document.querySelector('.category-tab.active').classList.remove('active');
            
            // Добавляем активный класс на текущий таб
            this.classList.add('active');
            
            // Скрываем текущий активный контент
            document.querySelector('.game-category-content.active').classList.remove('active');
            
            // Показываем новый контент
            const category = this.getAttribute('data-category');
            document.getElementById(`${category}-content`).classList.add('active');
        });
    });
} 
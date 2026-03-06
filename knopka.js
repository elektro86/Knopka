(function () {
    // Базовый URL для ваших иконок на GitHub
    const iconBaseUrl = "https://raw.githubusercontent.com/elektro86/Knopka/main/buttonIcons/";

    Lampa.Listener.follow('full', function (e) {
        if (e.type === 'complite') {
            
            setTimeout(function () {
                try {
                    const activity = Lampa.Activity.active();
                    if (!activity || !activity.activity || !activity.activity.render) return;

                    const render = activity.activity.render();
                    if (!render || render.length === 0) return;

                    // --- ПОДГОТОВКА СТИЛЕЙ ---
                    if (!$('#krilzov-style').length) {
                        $('head').append(`
                            <style id="krilzov-style">
                                .custom-style-applied { display: flex !important; align-items: center; gap: 10px; }
                                .custom-style-applied img { width: 35px; height: 35px; object-fit: contain; flex-shrink: 0; }
                                .custom-style-applied span { margin-left: 5px; white-space: nowrap; }
                            </style>
                        `);
                    }

                    // Очистка иконок инфо
                    $(".full-start__icons > .info__icon", render).css({
                        'background-image': 'url("")',
                        'padding': '0.7em'
                    });

                    /**
                     * Функция стилизации с загрузкой из GitHub
                     */
                    const safelyStyleButton = (selector, iconName, text) => {
                        const button = $(selector, render); 
                        const fullIconPath = iconBaseUrl + iconName;

                        if (button.length > 0 && !button.hasClass('custom-style-applied')) {
                            button.children().hide();
                            button.prepend(`
                                <img src="${fullIconPath}" alt="${text}" onerror="this.style.display='none'"/>
                                <span>${text}</span>
                            `);
                            button.addClass('custom-style-applied'); 
                        }
                    };
                    
                    // --- ПРИМЕНЕНИЕ СТИЛЕЙ КНОПОК ---
                    
                    // Кнопка ONLINE
                    const onlineBtn = $(".view--online", render);
                    if (onlineBtn.length > 0 && !onlineBtn.hasClass('custom-style-applied')) {
                        $('.view--online lampac', render).insertBefore($('.button--play', render));
                        onlineBtn.empty()
                                 .append(`<img src="${iconBaseUrl}on.png" alt="Онлайн"/><span>Онлайн</span>`)
                                 .addClass('custom-style-applied');
                    }
                    
                    safelyStyleButton('.view--torrent', 'torrent.png', 'Торрент');
                    safelyStyleButton('.view--trailer', 'trailer.png', 'Трейлеры');
                    safelyStyleButton('.button--book', 'izbr.png', 'Избранное');
                    safelyStyleButton('.button--reaction', 'reaction.png', 'Реакции');

                    // --- РЕОРГАНИЗАЦИЯ ---
                    const playButton = $('.button--play', render);
                    if (playButton.length > 0) {
                        $('.view--online', render).insertBefore(playButton);
                        $('.view--torrent', render).insertBefore(playButton);
                        $('.view--trailer', render).insertBefore(playButton);
                        $('.button--book', render).insertBefore(playButton);
                        $('.button--reaction', render).insertBefore(playButton);
                        
                        playButton.hide();
                        $('.button--subscribe', render).hide();
                    }
                    
                    // Удаление дублей
                    $('.view--torrent:gt(0)', render).remove();
                    $('.view--trailer:gt(0)', render).remove();
                    $('.button--book:gt(0)', render).remove();
                    $('.button--reaction:gt(0)', render).remove();

                    Lampa.Controller.toggle('full_start');

                } catch (error) {
                    console.error("Krilzov Buttons Error:", error);
                }
            }, 200); 
        }
        
        if (e.type === 'destroy') {
            setTimeout(function() {
                if (Lampa.Activity.active()) {
                    Lampa.Controller.toggle('body'); 
                }
            }, 50); 
        }
    });
})();
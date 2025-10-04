// 简化版本的成员页面交互脚本
document.addEventListener('DOMContentLoaded', function() {
    console.log('Members page interaction script loaded');
    
    // 简单延迟确保DOM完全准备好
    setTimeout(() => {
        initCardFlips();
        initCarousel();
    }, 200);
});

function initCardFlips() {
    const cards = document.querySelectorAll('.member-card');
    console.log(`Found ${cards.length} member cards`);
    
    cards.forEach((card, index) => {
        // 移除现有事件监听器
        card.replaceWith(card.cloneNode(true));
        const newCard = document.querySelectorAll('.member-card')[index];
        
        newCard.addEventListener('click', function(e) {
            console.log(`Card ${index} clicked`);
            
            // 检查是否点击了社交链接
            if (e.target.closest('.social-link')) {
                console.log('Social link clicked, ignoring flip');
                return;
            }
            
            // 切换翻转状态
            const isFlipped = newCard.classList.contains('flipped');
            if (isFlipped) {
                newCard.classList.remove('flipped');
                console.log(`Card ${index} flipped to front`);
            } else {
                newCard.classList.add('flipped');
                console.log(`Card ${index} flipped to back`);
            }
        });
        
        // 确保卡片可点击
        newCard.style.cursor = 'pointer';
        newCard.style.zIndex = '1000';
        console.log(`Card ${index} initialized`);
    });
}

function initCarousel() {
    const track = document.getElementById('lab-carousel-track');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const indicators = document.querySelectorAll('.indicator');
    
    console.log('Carousel elements:', {
        track: !!track,
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn,
        indicators: indicators.length
    });
    
    if (!track || !prevBtn || !nextBtn) {
        console.error('Missing carousel elements');
        return;
    }
    
    let currentSlide = 0;
    const totalSlides = 3;
    
    function updateCarousel() {
        const translateX = -currentSlide * (100 / totalSlides);
        track.style.transform = `translateX(${translateX}%)`;
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
        
        console.log(`Carousel updated to slide ${currentSlide}`);
    }
    
    // 移除现有事件监听器并重新绑定
    prevBtn.replaceWith(prevBtn.cloneNode(true));
    nextBtn.replaceWith(nextBtn.cloneNode(true));
    
    const newPrevBtn = document.getElementById('prev-btn');
    const newNextBtn = document.getElementById('next-btn');
    
    newPrevBtn.addEventListener('click', function() {
        console.log('Previous button clicked');
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    });
    
    newNextBtn.addEventListener('click', function() {
        console.log('Next button clicked');
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    });
    
    // 指示器点击
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            console.log(`Indicator ${index} clicked`);
            currentSlide = index;
            updateCarousel();
        });
    });
    
    console.log('Carousel initialized successfully');
}
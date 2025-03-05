// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 轮播图功能
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const indicators = document.querySelector('.indicators');
    let currentSlide = 0;
    const slideInterval = 5000; // 5秒切换一次
    let slideTimer;

    // 初始化第一张幻灯片
    if (slides.length > 0) {
        slides[0].classList.add('current');
    }

    // 创建指示器
    function createIndicators() {
        for (let i = 0; i < slides.length; i++) {
            const button = document.createElement('button');
            if (i === 0) {
                button.classList.add('active');
            }
            button.addEventListener('click', () => {
                goToSlide(i);
                resetTimer();
            });
            indicators.appendChild(button);
        }
    }

    // 显示指定的幻灯片
    function goToSlide(n) {
        slides[currentSlide].classList.remove('current');
        indicators.children[currentSlide].classList.remove('active');
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('current');
        indicators.children[currentSlide].classList.add('active');
    }

    // 显示下一张幻灯片
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // 显示上一张幻灯片
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // 重置定时器
    function resetTimer() {
        clearInterval(slideTimer);
        slideTimer = setInterval(nextSlide, slideInterval);
    }

    // 初始化轮播图
    function initSlider() {
        createIndicators();
        resetTimer();
        
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetTimer();
        });
        
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetTimer();
        });
    }

    // 移动端菜单切换
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // 滚动时导航栏效果
    const mainHeader = document.querySelector('.main-header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 向下滚动
            mainHeader.classList.add('hide');
        } else {
            // 向上滚动
            mainHeader.classList.remove('hide');
        }
        
        lastScrollTop = scrollTop;
    });

    // 初始化轮播图
    if (slides.length > 0) {
        initSlider();
    }

    // 添加响应式样式
    function addResponsiveStyles() {
        if (window.innerWidth <= 768) {
            // 移动端样式
            mainNav.style.display = 'none';
            mobileMenuBtn.style.display = 'block';
        } else {
            // 桌面端样式
            mainNav.style.display = 'block';
            mobileMenuBtn.style.display = 'none';
            mainNav.classList.remove('active');
        }
    }

    // 初始化响应式
    addResponsiveStyles();

    // 窗口大小改变时重新计算
    window.addEventListener('resize', addResponsiveStyles);
});

// 添加平滑滚动效果
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 添加数字增长动画效果
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        const suffix = stat.textContent.replace(/[0-9]/g, '').trim();
        let current = 0;
        const increment = target / 50; // 50步完成动画
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            stat.textContent = Math.floor(current) + suffix;
        }, 30);
    });
}

// 当元素进入视口时触发动画
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('stats')) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// 观察统计部分
const statsSection = document.querySelector('.stats');
if (statsSection) {
    observer.observe(statsSection);
}
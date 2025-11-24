// Portfolio Main JavaScript - Larry Otieno Cybersecurity Portfolio

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeThreatIndicator();
    initializeSkillsRadar();
    initializeProjectCarousel();
    initializeScrollEffects();
    initializeContactForm();
    initializeQuiz();
});

// Smooth scroll navigation
function initializeScrollEffects() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active navigation highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize typewriter effect and animations
function initializeAnimations() {
    // Typewriter effect for hero text
    if (document.querySelector('.typewriter-text')) {
        new Typed('.typewriter-text', {
            strings: [
                'Cybersecurity Analyst',
                'Digital Forensics Expert',
                'Threat Detection Specialist',
                'Security Researcher'
            ],
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Cyber Threat Level Indicator
function initializeThreatIndicator() {
    const indicator = document.getElementById('threat-indicator');
    if (!indicator) return;

    const threatLevels = [
        { level: 'LOW', color: '#39FF14', description: 'Normal operations, all systems secure' },
        { level: 'MEDIUM', color: '#FFA500', description: 'Elevated monitoring, potential risks detected' },
        { level: 'HIGH', color: '#FF073A', description: 'Critical alert, immediate action required' }
    ];

    let currentThreat = 0;

    function updateThreatLevel() {
        const threat = threatLevels[currentThreat];
        const gauge = indicator.querySelector('.threat-gauge');
        const levelText = indicator.querySelector('.threat-level');
        const descText = indicator.querySelector('.threat-description');

        // Animate gauge rotation
        anime({
            targets: gauge,
            rotate: currentThreat * 60, // 0, 60, 120 degrees
            duration: 1000,
            easing: 'easeInOutQuad'
        });

        // Update colors and text
        gauge.style.borderColor = threat.color;
        levelText.textContent = threat.level;
        levelText.style.color = threat.color;
        descText.textContent = threat.description;

        currentThreat = (currentThreat + 1) % threatLevels.length;
    }

    // Initialize first threat level
    updateThreatLevel();

    // Change threat level every 4 seconds
    setInterval(updateThreatLevel, 4000);

    // Click to manually cycle through threats
    indicator.addEventListener('click', updateThreatLevel);
}

// Skills Radar Chart
function initializeSkillsRadar() {
    const radarContainer = document.getElementById('skills-radar');
    if (!radarContainer) return;

    const skillsData = [
        { skill: 'Python', value: 85, category: 'Programming' },
        { skill: 'Java', value: 75, category: 'Programming' },
        { skill: 'Digital Forensics', value: 90, category: 'Security' },
        { skill: 'Network Security', value: 80, category: 'Security' },
        { skill: 'Ethical Hacking', value: 85, category: 'Security' },
        { skill: 'Threat Analysis', value: 88, category: 'Analysis' },
        { skill: 'Incident Response', value: 82, category: 'Operations' },
        { skill: 'Database Security', value: 78, category: 'Data' }
    ];

    const chart = echarts.init(radarContainer);
    
    const option = {
        backgroundColor: 'transparent',
        radar: {
            indicator: skillsData.map(item => ({
                name: item.skill,
                max: 100
            })),
            center: ['50%', '50%'],
            radius: '70%',
            axisLine: {
                lineStyle: {
                    color: '#2D3748'
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#2D3748'
                }
            },
            axisLabel: {
                color: '#00D4FF',
                fontSize: 12
            },
            name: {
                textStyle: {
                    color: '#00D4FF',
                    fontSize: 14
                }
            }
        },
        series: [{
            type: 'radar',
            data: [{
                value: skillsData.map(item => item.value),
                name: 'Skills Proficiency',
                areaStyle: {
                    color: 'rgba(0, 212, 255, 0.2)'
                },
                lineStyle: {
                    color: '#00D4FF',
                    width: 2
                },
                itemStyle: {
                    color: '#39FF14',
                    borderColor: '#00D4FF',
                    borderWidth: 2
                }
            }],
            animationDuration: 2000,
            animationEasing: 'cubicOut'
        }]
    };

    chart.setOption(option);

    // Add hover interactions
    chart.on('mouseover', function(params) {
        if (params.componentType === 'series') {
            const skillIndex = params.dataIndex;
            const skill = skillsData[skillIndex];
            
            // Show skill details tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'skill-tooltip';
            tooltip.innerHTML = `
                <h4>${skill.skill}</h4>
                <p>Category: ${skill.category}</p>
                <p>Proficiency: ${skill.value}%</p>
            `;
            
            document.body.appendChild(tooltip);
            
            // Position tooltip
            tooltip.style.left = params.event.offsetX + 'px';
            tooltip.style.top = params.event.offsetY + 'px';
            
            // Remove tooltip after delay
            setTimeout(() => {
                if (tooltip.parentNode) {
                    tooltip.parentNode.removeChild(tooltip);
                }
            }, 3000);
        }
    });

    // Responsive resize
    window.addEventListener('resize', function() {
        chart.resize();
    });
}

// Project Carousel
function initializeProjectCarousel() {
    const carousel = document.querySelector('.project-carousel');
    if (!carousel) return;

    new Splide(carousel, {
        type: 'loop',
        perPage: 3,
        perMove: 1,
        gap: '2rem',
        autoplay: true,
        interval: 4000,
        pauseOnHover: true,
        breakpoints: {
            1024: { perPage: 2 },
            768: { perPage: 1 }
        }
    }).mount();

    // Add hover effects to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                rotateY: 5,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });

        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                rotateY: 0,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });
}

// Contact Form Validation
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (validateContactForm(data)) {
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
        } else {
            showNotification('Please fill in all required fields correctly.', 'error');
        }
    });

    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let message = '';

    switch (fieldName) {
        case 'name':
            isValid = value.length >= 2;
            message = isValid ? '' : 'Name must be at least 2 characters long';
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
            message = isValid ? '' : 'Please enter a valid email address';
            break;
        case 'subject':
            isValid = value.length >= 5;
            message = isValid ? '' : 'Subject must be at least 5 characters long';
            break;
        case 'message':
            isValid = value.length >= 20;
            message = isValid ? '' : 'Message must be at least 20 characters long';
            break;
    }

    // Update field styling
    if (isValid) {
        field.classList.remove('error');
        field.classList.add('valid');
    } else {
        field.classList.remove('valid');
        field.classList.add('error');
    }

    // Show/hide error message
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.style.display = message ? 'block' : 'none';

    return isValid;
}

function validateContactForm(data) {
    const required = ['name', 'email', 'subject', 'message'];
    return required.every(field => {
        const input = document.querySelector(`[name="${field}"]`);
        return validateField(input);
    });
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    anime({
        targets: notification,
        translateY: [-50, 0],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuad'
    });
    
    // Remove after 5 seconds
    setTimeout(() => {
        anime({
            targets: notification,
            translateY: [0, -50],
            opacity: [1, 0],
            duration: 300,
            easing: 'easeInQuad',
            complete: () => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }
        });
    }, 5000);
}

// Security Quiz
function initializeQuiz() {
    const quizContainer = document.getElementById('security-quiz');
    if (!quizContainer) return;

    const questions = [
        {
            question: "What is the primary goal of digital forensics?",
            options: [
                "Prevent cyber attacks",
                "Investigate and analyze digital evidence",
                "Build secure networks",
                "Develop encryption algorithms"
            ],
            correct: 1,
            explanation: "Digital forensics focuses on investigating and analyzing digital evidence to support legal proceedings."
        },
        {
            question: "Which tool is commonly used for network security analysis?",
            options: [
                "Microsoft Word",
                "Wireshark",
                "Photoshop",
                "Excel"
            ],
            correct: 1,
            explanation: "Wireshark is a popular network protocol analyzer used for network troubleshooting and analysis."
        },
        {
            question: "What does AES stand for in encryption?",
            options: [
                "Advanced Encryption Standard",
                "Automatic Encryption System",
                "Advanced Email Security",
                "Authentication Encryption Service"
            ],
            correct: 0,
            explanation: "AES stands for Advanced Encryption Standard, a symmetric encryption algorithm used worldwide."
        }
    ];

    let currentQuestion = 0;
    let score = 0;

    function displayQuestion() {
        const question = questions[currentQuestion];
        quizContainer.innerHTML = `
            <div class="quiz-question">
                <h3>Question ${currentQuestion + 1} of ${questions.length}</h3>
                <p>${question.question}</p>
                <div class="quiz-options">
                    ${question.options.map((option, index) => `
                        <button class="quiz-option" data-index="${index}">
                            ${option}
                        </button>
                    `).join('')}
                </div>
                <div class="quiz-progress">
                    <div class="progress-bar" style="width: ${((currentQuestion + 1) / questions.length) * 100}%"></div>
                </div>
            </div>
        `;

        // Add click handlers to options
        quizContainer.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', function() {
                const selectedIndex = parseInt(this.dataset.index);
                checkAnswer(selectedIndex);
            });
        });
    }

    function checkAnswer(selectedIndex) {
        const question = questions[currentQuestion];
        const isCorrect = selectedIndex === question.correct;
        
        if (isCorrect) {
            score++;
        }

        // Show feedback
        const feedback = document.createElement('div');
        feedback.className = `quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
        feedback.innerHTML = `
            <p class="feedback-result">${isCorrect ? 'Correct!' : 'Incorrect'}</p>
            <p class="feedback-explanation">${question.explanation}</p>
            <button class="next-question">Next Question</button>
        `;
        
        quizContainer.appendChild(feedback);

        // Add next question handler
        feedback.querySelector('.next-question').addEventListener('click', function() {
            currentQuestion++;
            if (currentQuestion < questions.length) {
                displayQuestion();
            } else {
                showQuizResults();
            }
        });

        // Animate feedback in
        anime({
            targets: feedback,
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 300,
            easing: 'easeOutQuad'
        });
    }

    function showQuizResults() {
        const percentage = Math.round((score / questions.length) * 100);
        quizContainer.innerHTML = `
            <div class="quiz-results">
                <h3>Quiz Complete!</h3>
                <div class="score-display">
                    <span class="score">${score}/${questions.length}</span>
                    <span class="percentage">${percentage}%</span>
                </div>
                <p class="score-message">
                    ${percentage >= 80 ? 'Excellent! You have strong cybersecurity knowledge.' :
                      percentage >= 60 ? 'Good job! Keep learning about cybersecurity.' :
                      'Keep studying! Cybersecurity is a constantly evolving field.'}
                </p>
                <button class="restart-quiz">Take Quiz Again</button>
            </div>
        `;

        quizContainer.querySelector('.restart-quiz').addEventListener('click', function() {
            currentQuestion = 0;
            score = 0;
            displayQuestion();
        });
    }

    // Initialize quiz
    displayQuestion();
}

// Particle background effect
function initializeParticleBackground() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 50;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2
        };
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }
    }

    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Wrap around edges
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
        });
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 212, 255, ${particle.opacity})`;
            ctx.fill();
        });

        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 * (1 - distance / 100)})`;
                    ctx.stroke();
                }
            });
        });
    }

    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }

    // Initialize
    resizeCanvas();
    initParticles();
    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
}

// Initialize particle background
initializeParticleBackground();


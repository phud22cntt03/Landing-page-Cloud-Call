document.addEventListener('DOMContentLoaded', () => {
    /* ==========================================================================
       1. HEADER INTERACTION
       ========================================================================== */
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    /* ==========================================================================
       2. MOBILE DRAWER NAVIGATION
       ========================================================================== */
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileDrawer = document.querySelector('.mobile-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-drawer .btn');
    function toggleMenu() {
        mobileToggle.classList.toggle('active');
        mobileDrawer.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }
    mobileToggle.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileDrawer.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    /* ==========================================================================
       3. INTERACTIVE FEATURES TAB SYSTEM
       ========================================================================== */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const mockContents = document.querySelectorAll('.mock-content');
    
    let activeTabId = 'telephony';
    let tabAutoCycleTimer = null;
    const tabListOrder = ['telephony', 'productivity', 'coaching', 'ai-agents'];
    function switchTab(tabId) {
        activeTabId = tabId;
        
        // Remove active class from all buttons and add to selected
        tabBtns.forEach(btn => {
            if (btn.getAttribute('data-tab') === tabId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        // Toggle text pane content
        tabPanes.forEach(pane => {
            if (pane.id === `pane-${tabId}`) {
                pane.classList.add('active');
            } else {
                pane.classList.remove('active');
            }
        });
        // Toggle simulated mockup content inside window
        mockContents.forEach(content => {
            if (content.classList.contains(tabId === 'ai-agents' ? 'ai-agents' : tabId)) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    }
    // Event listener for tab clicking
    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Stop auto cycle on user interaction
            clearInterval(tabAutoCycleTimer);
            const selectedTab = e.target.getAttribute('data-tab');
            switchTab(selectedTab);
        });
    });
    // Auto cycle tabs every 8 seconds
    function startTabAutoCycle() {
        tabAutoCycleTimer = setInterval(() => {
            let currentIndex = tabListOrder.indexOf(activeTabId);
            let nextIndex = (currentIndex + 1) % tabListOrder.length;
            switchTab(tabListOrder[nextIndex]);
        }, 8000);
    }
    startTabAutoCycle();
    /* ==========================================================================
       4. AUTO-PLAYING WORKFLOW TIMELINE
       ========================================================================== */
    const steps = document.querySelectorAll('.workflow-step');
    const workflowLine = document.querySelector('.workflow-line');
    let currentStep = 1;
    let workflowTimer = null;
    function activeStep(stepNum) {
        currentStep = stepNum;
        steps.forEach(step => {
            const num = parseInt(step.getAttribute('data-step'));
            if (num === stepNum) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        // Adjust background line progress
        if (workflowLine) {
            const percentage = ((stepNum - 1) / (steps.length - 1)) * 84 + 8;
            workflowLine.style.setProperty('--line-progress', `${percentage}%`);
            
            // Apply line active progress dynamically
            const styleSheet = document.createElement("style");
            styleSheet.innerText = `.workflow-line::after { width: ${percentage}%; }`;
            document.head.appendChild(styleSheet);
        }
    }
    steps.forEach(step => {
        step.addEventListener('click', () => {
            clearInterval(workflowTimer);
            const num = parseInt(step.getAttribute('data-step'));
            activeStep(num);
        });
    });
    function startWorkflowCycle() {
        workflowTimer = setInterval(() => {
            let nextStep = currentStep + 1;
            if (nextStep > steps.length) nextStep = 1;
            activeStep(nextStep);
        }, 4000);
    }
    startWorkflowCycle();
    /* ==========================================================================
       5. MONTHLY / YEARLY PRICING TOGGLE
       ========================================================================== */
    const billingToggle = document.getElementById('billing-toggle');
    const labelMonthly = document.getElementById('label-monthly');
    const labelYearly = document.getElementById('label-yearly');
    const priceAmounts = document.querySelectorAll('.price-amount');
    let billingCycle = 'monthly';
    function toggleBillingCycle() {
        if (billingCycle === 'monthly') {
            billingCycle = 'yearly';
            billingToggle.classList.add('yearly');
            labelYearly.classList.add('active');
            labelMonthly.classList.remove('active');
            
            // Animate price update
            priceAmounts.forEach(price => {
                price.style.transform = 'scale(0.8)';
                price.style.opacity = '0';
                setTimeout(() => {
                    price.textContent = price.getAttribute('data-yearly');
                    price.style.transform = 'scale(1)';
                    price.style.opacity = '1';
                }, 200);
            });
        } else {
            billingCycle = 'monthly';
            billingToggle.classList.remove('yearly');
            labelMonthly.classList.add('active');
            labelYearly.classList.remove('active');
            priceAmounts.forEach(price => {
                price.style.transform = 'scale(0.8)';
                price.style.opacity = '0';
                setTimeout(() => {
                    price.textContent = price.getAttribute('data-monthly');
                    price.style.transform = 'scale(1)';
                    price.style.opacity = '1';
                }, 200);
            });
        }
    }
    if (billingToggle) {
        billingToggle.addEventListener('click', toggleBillingCycle);
        labelMonthly.addEventListener('click', () => { if(billingCycle === 'yearly') toggleBillingCycle(); });
        labelYearly.addEventListener('click', () => { if(billingCycle === 'monthly') toggleBillingCycle(); });
    }
    /* ==========================================================================
       6. PRICING PLAN INJECTION & AUTO-SCROLL
       ========================================================================== */
    const planBtns = document.querySelectorAll('.plan-btn');
    const selectedPlanInput = document.getElementById('selectedPlan');
    planBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const planName = btn.getAttribute('data-plan');
            if (selectedPlanInput) {
                selectedPlanInput.value = planName;
            }
            
            // Smooth scroll to form
            const targetSection = document.querySelector('#register');
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                
                // Highlight the form header briefly
                const formCard = document.querySelector('.cta-form-card');
                formCard.style.boxShadow = '0 0 30px rgba(26, 86, 219, 0.4)';
                setTimeout(() => {
                    formCard.style.boxShadow = '0 10px 40px rgba(0,0,0,0.15)';
                }, 1500);
            }
        });
    });
    /* ==========================================================================
       7. FAQ ACCORDION EXPANSION
       ========================================================================== */
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const faqItem = btn.parentElement;
            const faqAnswer = faqItem.querySelector('.faq-answer');
            const isActive = faqItem.classList.contains('active');
            // Close all items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-answer').style.maxHeight = '0px';
            });
            // If not active before, open this item
            if (!isActive) {
                faqItem.classList.add('active');
                faqAnswer.style.maxHeight = `${faqAnswer.scrollHeight}px`;
            }
        });
    });
    /* ==========================================================================
       8. LEAD FORM VALIDATION & SIMULATION
       ========================================================================== */
    const leadForm = document.getElementById('lead-form');
    const successMsg = document.getElementById('form-success');
    const resetSuccessBtn = document.getElementById('btn-success-reset');
    const submitBtn = leadForm.querySelector('.submit-btn');
    const spinnerIcon = submitBtn.querySelector('.btn-spinner-icon');
    // Live Validation RegEx
    const vietnamPhoneRegex = /^(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Error messages helpers
    function showError(fieldId, message) {
        const errorSpan = document.getElementById(`err-${fieldId}`);
        const inputElement = document.getElementById(fieldId);
        if (errorSpan) {
            errorSpan.textContent = message;
            errorSpan.style.display = 'block';
        }
        if (inputElement) {
            inputElement.style.borderColor = '#ef4444';
        }
    }
    function clearError(fieldId) {
        const errorSpan = document.getElementById(`err-${fieldId}`);
        const inputElement = document.getElementById(fieldId);
        if (errorSpan) {
            errorSpan.textContent = '';
            errorSpan.style.display = 'none';
        }
        if (inputElement) {
            inputElement.style.borderColor = '#cbd5e1';
        }
    }
    // Input listener to clear errors on change
    ['fullName', 'phoneNumber', 'email', 'companyName'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', () => clearError(id));
        }
    });
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Validate fields
            const fullName = document.getElementById('fullName').value.trim();
            const phoneNumber = document.getElementById('phoneNumber').value.trim();
            const email = document.getElementById('email').value.trim();
            const companyName = document.getElementById('companyName').value.trim();
            
            let isValid = true;
            if (fullName.length < 2) {
                showError('fullName', 'Họ tên phải dài ít nhất 2 ký tự.');
                isValid = false;
            } else {
                clearError('fullName');
            }
            if (!vietnamPhoneRegex.test(phoneNumber)) {
                showError('phoneNumber', 'Số điện thoại Việt Nam không hợp lệ (10 chữ số, ví dụ 0912345678).');
                isValid = false;
            } else {
                clearError('phoneNumber');
            }
            if (!emailRegex.test(email)) {
                showError('email', 'Địa chỉ email không hợp lệ.');
                isValid = false;
            } else {
                clearError('email');
            }
            if (companyName.length < 2) {
                showError('companyName', 'Vui lòng cung cấp tên công ty hợp lệ.');
                isValid = false;
            } else {
                clearError('companyName');
            }
            if (!isValid) return;
            // Show loading spinner
            submitBtn.disabled = true;
            spinnerIcon.style.display = 'inline-block';
            submitBtn.querySelector('span').textContent = 'Đang xử lý thông tin...';
            // Simulate form submission to database
            setTimeout(() => {
                submitBtn.disabled = false;
                spinnerIcon.style.display = 'none';
                submitBtn.querySelector('span').textContent = 'Nhận Tư Vấn Miễn Phí';
                // Display success box
                leadForm.classList.add('hidden');
                successMsg.classList.add('active');
                
                // Clear fields
                leadForm.reset();
            }, 1800);
        });
    }
    if (resetSuccessBtn) {
        resetSuccessBtn.addEventListener('click', () => {
            successMsg.classList.remove('active');
            leadForm.classList.remove('hidden');
        });
    }
});
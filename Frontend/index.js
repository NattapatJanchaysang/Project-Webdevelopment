document.addEventListener('DOMContentLoaded', function() {
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    const btn3 = document.getElementById('btn3');

    // Button 1 - View Config
    btn1.addEventListener('click', function() {
        window.location.href = 'ViewConfig.html';
    });

    // Button 2 - Temperature Log Form
    btn2.addEventListener('click', function() {
        window.location.href = 'TLF.html';
    });

    // Button 3 - View Logs
    btn3.addEventListener('click', function() {
        window.location.href = 'ViewLogs.html';
    });

    // Add some interactive effects
    const buttons = [btn1, btn2, btn3];
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

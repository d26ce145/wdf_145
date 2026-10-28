/**
 * Practical 4: Collapsible FAQ Accordion Component
 * Subject: Web Development Frameworks (ITUE203) - Semester 3
 */

document.addEventListener("DOMContentLoaded", function () {
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(function (button) {
        button.addEventListener("click", function () {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains("active");

            // Close all open items (accordion behavior)
            document.querySelectorAll(".faq-item").forEach(function (item) {
                item.classList.remove("active");
            });

            // If the clicked item was not active, open it
            if (!isActive) {
                faqItem.classList.add("active");
            }
        });
    });
});

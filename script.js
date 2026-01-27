document.querySelectorAll(".form-tab-btn").forEach(button => {
    button.addEventListener("click", () => {
        // Remove active from all buttons
        document.querySelectorAll(".form-tab-btn").forEach(btn => btn.classList.remove("active"));
        // Remove active from all tab contents
        document.querySelectorAll(".form-tab-content").forEach(tab => tab.classList.remove("active"));

        // Add active to clicked button
        button.classList.add("active");

        // Show corresponding tab
        const tabName = button.getAttribute("data-tab");
        document.getElementById(tabName + "-tab").classList.add("active");
    });
});
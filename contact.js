const form = document.getElementById("contactForm");

/* Contact Form Send to Telegram */
form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const category = document.getElementById("category").value;
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !category || !message) {
        alert("Please fill all required fields!");
        return;
    }

    const botToken = "8268544927:AAH3yBRTGUXhIvPMAkeOTHkl7Dr9pSTXUIQ";
    const chatId = "2082718430";

    const text = `
📩 New Contact Message

👤 Name: ${name}
📧 Email: ${email}
📞 Phone: ${phone || "No phone"}
📦 Category: ${category}

💬 Message:
${message}
`;

    try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: text
            })
        });

        const data = await response.json();

        if (data.ok) {
            alert("ខាងយើងនិងទាក់ទងទៅអ្នកវិញ តាម Telegram ✅");
            form.reset();
        } else {
            alert("Telegram Error: " + data.description);
        }

    } catch (error) {
        alert("Network Error ❌ Please check internet or bot token");
        console.error(error);
    }
});


/* FAQ Toggle */
const faqButtons = document.querySelectorAll(".faq-question");

faqButtons.forEach(button => {
    button.addEventListener("click", () => {
        const text = button.nextElementSibling;
        const icon = button.querySelector("i");

        if (text.style.display === "none" || text.style.display === "") {
            text.style.display = "block";
            icon.classList.remove("fa-chevron-down");
            icon.classList.add("fa-chevron-up");
        } else {
            text.style.display = "none";
            icon.classList.remove("fa-chevron-up");
            icon.classList.add("fa-chevron-down");
        }
    });
});